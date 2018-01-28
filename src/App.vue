<template>
  <div id="app">
    <!-- Playing section -->
    <template  v-if="!gameOver && !newLevel">
      <j-header :score="score" :health="health"/>
      <j-question :nbr1="nbr1" :nbr2="nbr2" />
      <j-answer :suggestions="suggestions" :questionAnswered="questionAnswered" />
      <j-timer :remaining="time" :settings="settings" :getProgressClass="getProgressClass" :messageClass="messageClass" :getBonus="getBonus" :notification="notification" :result="result" />
    </template>

    <!-- Stats section -->
    <template v-if="gameOver">
      <j-stats :score="score" :totalTime="totalTime" :initGame="initGame" />
    </template>

    <!-- New level alert -->
      <div v-show="newLevel" class="new-level alert alert-success text-center" role="alert">
        <h4 class="alert-heading">Level {{ gameLevel+1 }}</h4>
      </div>
    <!-- DEBUG section -->
    <j-debug v-if="settings.showDebugTable" :gameLevel="gameLevel" :nbr1="nbr1" :nbr2="nbr2" :playerAnswer="playerAnswer" :notification="notification" :score="score" :questionAnswered="questionAnswered" :time="time" :health="health" :result="result" :gameOver="gameOver" :totalTime="totalTime" />

  </div>
</template>

<script>
import Header from './components/Header.vue'
import Question from './components/Question.vue'
import Answer from './components/Answer.vue'
import Timer from './components/Timer.vue'
import Stats from './components/Stats.vue'
import Debug from './components/Debug.vue'

import { eventBus } from "./main.js"

export default {
  name: 'app',
  data () {
    return {
      nbr1: 0,
      nbr2: 0,
      playerAnswer: "",
      notification:"",
      score: 0,
      questionAnswered: false,
      time: 0,
      health: 0,
      result:"",
      gameOver:false,
      totalTime:0,
      suggestions:[],
      tries:0,
      gameLevel:0,
      newLevel:false,

      timerInertval: null,

      settings:{
        timeOut: 20,
        health:3,
        pauseAfterQuestion:2000,
        nbrSuggestions:6,
        showDebugTable:true,
        levels:[
          {
            nbrMin: 1,
            nbrMax: 10,
          },
          {
            nbrMin: 10,
            nbrMax: 50,
          },
          {
            nbrMin: 50,
            nbrMax: 100,
          },
          {
            nbrMin: 100,
            nbrMax: 200,
          },
        ],
      }

    }
  },
  components:{
    "j-header":   Header,
    "j-question": Question,
    "j-answer":   Answer,
    "j-timer":    Timer,
    "j-stats":    Stats,
    "j-debug":    Debug,
  },
  created:function(){
    self = this

    eventBus.$on("userAnswered",function(answer){
      self.sendResult(answer)
    })
  },
  methods:{
    getRandomInt: function(min, max, except) {
      /* Returns a random int in a range from 'min' to 'max' and not including 'except' */
      var nbrMin,nbrMax
      var currentLevel = this.settings.levels[ this.gameLevel ]

      if( min === undefined || min == 0  ){
        nbrMin = currentLevel.nbrMin
      }else{
        nbrMin = min
      }

      if( max === undefined || max == 0 ){
        nbrMax = currentLevel.nbrMax
      }else{
        nbrMax = max
      }

      var ret

      do{
        ret = Math.floor(Math.random() * (nbrMax - nbrMin)) + nbrMin
      }while( (except != undefined && except.includes(ret) ) )

      return ret
    },
    sendResult: function(ans){

      this.tries++

      this.playerAnswer = ans

      if( this.playerAnswer == "" && this.time > 0 ){
        return false
      }

      clearInterval(this.timerInertval)
      
      var theAnswer = this.theGoodAnswer()

      if( this.playerAnswer == theAnswer ){
        this.goodAnswer()
      }else if( this.playerAnswer == "" && this.time == 0 ){
        this.timeOutAnswer()
      }else{
        this.badAnswer(theAnswer)
      }

      this.questionAnswered = true

      var self = this
      setTimeout(function(){
        if( !self.gameOver ){
          self.newQuestion()
        }
      }, self.settings.pauseAfterQuestion)
    },
    goodAnswer: function(){
      this.result = "good"
      this.notification = "Good answer"

      this.totalTime += (this.settings.timeOut - this.time)

      this.score += ( 1 + this.getBonus() )
    },
    getBonus:function(){
      return this.time < (this.settings.timeOut/2) ? (this.time < (this.settings.timeOut/4) ? 0 : 1 ) : 2
    },
    badAnswer: function( ans ){
      this.result = "bad"
      this.notification = "Bad answer! the answer is ["+ans+"]"
      this.health --
    },
    timeOutAnswer: function(){
      this.result = "empty"
      this.notification = "Time out!"
      this.health --
    },
    initGame: function(){
      this.health = this.settings.health
      this.score = 0
      this.gameOver = false
      this.totalTime = 0

      this.newQuestion()
    },
    newQuestion: function(){
      this.nbr1 = this.getRandomInt()
      this.nbr2 = this.getRandomInt()
      
      this.assignSuggestions()

      this.playerAnswer = ""
      this.questionAnswered = false
      this.notification = ""
      this.time = this.settings.timeOut
      this.setTimer()
    },
    setTimer: function(){
      self = this
      this.timerInertval = setInterval(function(){
        self.time--
      },1000)
    },
    endGame: function(){
      this.gameOver = true
      clearInterval(this.timerInertval)
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
    },
    theGoodAnswer:function(){
      return this.nbr1 + this.nbr2
    },
    assignSuggestions:function(){
      var arrLn = this.settings.nbrSuggestions

      var currentLevel = this.settings.levels[ this.gameLevel ]

      var min = currentLevel.nbrMin
      var theAnswer = this.theGoodAnswer()
      var max = 2 * theAnswer

      /* Debug */
      //jDebug("the good Answer ", theAnswer)

      var ret = [theAnswer]

      for (var i = arrLn - 2; i >= 0; i--) {
        ret.push( this.getRandomInt( min, max, ret ) )
      }

      /* Shuffle array order */
      ret = ret.sort(() => Math.random() * 2 - 1).sort(() => Math.random() * 2 - 1)

      this.suggestions = ret
    },
  },
  computed:{

  },
  mounted: function(){
    this.initGame()
  },

  watch:{
    time: function (tm, oldVal) {
      if( tm == 0 ){
        this.sendResult("")
      }
    },
    health: function(hlt, oldVal){
      if( hlt == 0 ){
        this.endGame()
      }
    },
    tries: function(tries){
      /* Change levels */
      if( tries <= 5 ){
        this.gameLevel = 0
      }else if( tries <= 10 ){
        this.gameLevel = 1        
      }else if( tries <= 15 ){
        this.gameLevel = 2        
      }else if( tries <= 20 ){
        this.gameLevel = 3        
      }
    },
    gameLevel:function(lvl){
      self = this
      
      self.newLevel = true

      setTimeout(function(){
        self.newLevel = false
      },self.settings.pauseAfterQuestion)
    }
  }
}

/* The Debug function */
var jDebug = function(msg, val){
  var daches = msg.split("").map(function(c){ return "-"}).join("") + "---"

  console.log( "/-"+ daches )
  console.log( "| "+msg+" : "+val+" #" )
  console.log( "\\-"+ daches )
}
</script>

<style type="text/css">
body {
  padding-top: 60px;
}
.operation div {
  display: inline-block;
}
.new-level .alert-heading{
  font-size: 4rem;  
}
</style>