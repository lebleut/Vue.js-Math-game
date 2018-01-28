<template>
	<div>
		<h4>Debug table</h4>
		<table>
			<tr>
				<td>nbr1</td>
				<td>{{ nbr1 }}</td>
			</tr>
			<tr>
				<td>nbr2</td>
				<td>{{ nbr2 }}</td>
			</tr>
			<tr>
				<td>playerAnswer</td>
				<td>{{ playerAnswer }}</td>
			</tr>
			<tr>
				<td>notification</td>
				<td>{{ notification }}</td>
			</tr>
			<tr>
				<td>score</td>
				<td>{{ score }}</td>
			</tr>
			<tr>
				<td>questionAnswered</td>
				<td>{{ questionAnswered }}</td>
			</tr>
			<tr>
				<td>time</td>
				<td>{{ time }}</td>
			</tr>
			<tr>
				<td>health</td>
				<td>{{ health }}</td>
			</tr>
			<tr>
				<td>result</td>
				<td>{{ result }}</td>
			</tr>
			<tr>
				<td>gameOver</td>
				<td>{{ gameOver }}</td>
			</tr>
			<tr>
				<td>totalTime</td>
				<td>{{ totalTime }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default{
	props:["nbr1", "nbr2", "playerAnswer", "notification", "score", "questionAnswered", "time", "health", "result", "gameOver", "totalTime"]
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