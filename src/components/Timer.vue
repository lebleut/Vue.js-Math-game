<template>
	<div>
		<div>Remaining : {{ remaining }}</div>
		<div class="progress">
			<div
			class="progress-bar progress-bar-striped progress-bar-animated"
			:class="getProgressClass()"
			:style="{ width: ( 100 - ( 100 * remaining/settings.timeOut ) ) + '%'}"
			:aria-valuenow="remaining"
			aria-valuemin="0"
			:aria-valuemax="settings.timeOut"></div>
		</div>

		<div class="messages alert" :class="messageClass()" v-if="notification != ''">{{ notification }} <strong v-if="getBonus()>0 && result == 'good'">Bonus + {{ getBonus() }}</strong></div>
	</div>
</template>

<script>
export default {
	props:["remaining", "settings", "getProgressClass", "messageClass", "getBonus" ,"notification", "result"],
	data () {
		return {
		}
	}
}
</script>

<style type="text/css">
	.progress{
		height: 3px;
	}
</style>