<template>
	<div>
		<h4>Debug table</h4>
		<pre>
			gameLevel = {{ gameLevel }}
			
			nbr1 = {{ nbr1 }}
			nbr1 = {{ nbr1 }}
			nbr2 = {{ nbr2 }}
			playerAnswer = {{ playerAnswer }}
			notification = {{ notification }}
			score = {{ score }}
			questionAnswered = {{ questionAnswered }}
			time = {{ time }}
			health = {{ health }}
			result = {{ result }}
			gameOver = {{ gameOver }}
			totalTime = {{ totalTime }}
		</pre>
	</div>
</template>

<script>
export default{
	props:[ "gameLevel", "nbr1", "nbr2", "playerAnswer", "notification", "score", "questionAnswered", "time", "health", "result", "gameOver", "totalTime"]
}
</script>

<style scoped>
	table tr{
		border-bottom: 1px solid grey
	}
	table tr td:nth-child(1){
		color: red;
	}
	table tr td:nth-child(2){
		color: green;
		font-weight: bold;
	}
</style>