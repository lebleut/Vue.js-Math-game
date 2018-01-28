<template>
	<div class="alert alert-info">
		<h4>Game Over</h4>
		<button type="button" class="btn btn-primary btn-lg text-center" @click="initGame">New Game</button>
		<ul class="list-group">
			<li class="list-group-item d-flex justify-content-between align-items-center">
				Score
				<span class="badge badge-primary badge-pill">{{ score }}</span>
			</li>
			<li class="list-group-item d-flex justify-content-between align-items-center">
				Total Time
				<span class="badge badge-primary badge-pill">{{ totalTime }}s</span>
			</li>              
		</ul>

	</div>
</template>

<script>
export default {
	props:["score", "totalTime", "initGame"],
	data () {
		return {
		}
	}
}
</script>

<style type="text/css">
</style>