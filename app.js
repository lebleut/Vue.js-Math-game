new Vue({
  el: '#game',
  
  data: {
    nbr1: 0,
    nbr2: 0,
    answer: "",
    message:"",
    score: 0,
    questionAnswered: false,
    time: 0,
    health: 0,
    result:"",
    gameOver:false,
    totalTime:0,
    settings:{
      nbrMax: 99,
      nbrMin: 1,
      timeOut: 20,
      health:3,
      pauseAfterQuestion:1000, // 1 sec
    }
  },

  methods:{
    getRandomInt: function() {
      nbrMin = Math.ceil(this.settings.nbrMin);
      nbrMax = Math.floor(this.settings.nbrMax);
      return Math.floor(Math.random() * (nbrMax - nbrMin)) + nbrMin;
    },
    sendResult: function(){
      if( this.answer == "" && this.time > 0 ){
        return false
      }

      clearInterval(timeInertval)

      var theGoodAnswer = this.nbr1+this.nbr2

      if( this.answer == theGoodAnswer ){
        this.goodAnswer()
      }else if( this.answer == "" && this.time == 0 ){
        this.timeOutAnswer()
      }else{
        this.badAnswer(theGoodAnswer)
      }

      this.questionAnswered = true

      var self = this
      setTimeout(function(){
        if( !self.gameOver ){
          self.newQuestion()
        }
      },this.settings.pauseAfterQuestion)
    },
    goodAnswer: function(){
      this.result = "good"
      this.message = "Good answer"

      this.totalTime += (this.settings.timeOut - this.time)
      
      this.score += ( 1 + this.getBonus() )
    },
    getBonus:function(){
      return this.time < (this.settings.timeOut/2) ? (this.time < (this.settings.timeOut/4) ? 0 : 1 ) : 2
    },
    badAnswer: function( ans ){
      this.result = "bad"
      this.message = "Bad answer! the answer is ["+ans+"]"
      this.health --
    },
    timeOutAnswer: function(){
      this.result = "empty"
      this.message = "Time out!"
      this.health --
    },
    initGame: function(){
      this.health = this.settings.health
      this.newQuestion()
      this.score = 0
      this.gameOver = false
      this.totalTime = 0
    },
    newQuestion: function(){
      this.nbr1 = this.getRandomInt()
      this.nbr2 = this.getRandomInt()
      this.answer = ""
      this.questionAnswered = false
      this.message = ""
      this.time = this.settings.timeOut
      this.setTimer()

      self = this
      setTimeout(function(){
        self.$refs.answer.focus();        
      },100);

    },
    setTimer: function(){
      self = this
      timeInertval = setInterval(function(){
        self.time--
      },1000)

    },
    endGame: function(){
      this.gameOver = true
      clearInterval(timeInertval)
    },
    messageClass:function(){

      switch(this.result){

        case "good":
          return "alert-success"
          break;

        case "bad":
          return "alert-danger"
          break;

        case "empty":
          return "alert-primary"
          break;

        default:
          break;
      }
    },
    getProgressClass:function(){
      switch (this.getBonus()){
        case 0:
          return 'bg-danger'
          break;
          
        case 1:
          return 'bg-warning'
          break;
          
        case 2:
          return 'bg-success'
          break;
          
        default:
          break;

      }
    }
  },

  mounted: function(){
    this.initGame()
  },

  watch:{
    time: function (tm, oldVal) {
      if( tm == 0 ){
        this.sendResult()
      }
    },
    health: function(hlt, oldVal){
      if( hlt == 0 ){
        this.endGame()
      }
    }
  }
});
