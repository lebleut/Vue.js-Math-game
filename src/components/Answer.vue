<template>
	<div>
		<button class="btn btn-primary btn-lg" v-for="sugg in suggestions" @click="answered(sugg)" :disabled="questionAnswered">{{ sugg }}</button>
	</div>
</template>

<script>
import { eventBus } from "../main.js"

export default {
	props:["suggestions","questionAnswered"],
	data () {
		return {
		}
	},methods:{
		answered: function(answer){
			eventBus.$emit("userAnswered", answer)
		}
	}
}
</script>

<style type="text/css" scoped>
	button{
		margin: 20px;
	}
</style>