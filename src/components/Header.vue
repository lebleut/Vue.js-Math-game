<template>
	<nav class="navbar navbar-light bg-light">
		<button class="btn btn-success my-2 my-sm-0 btn-lg" disabled>Your score <span class="badge badge-light">{{ score }}</span></button>
		<button class="btn btn-primary my-2 my-sm-0 btn-lg" disabled>Health <span class="badge badge-light">{{ health }}</span></button>
	</nav>
</template>

<script>
export default {
	props:["score","health"],
	data () {
		return {
		}
	}
}
</script>
