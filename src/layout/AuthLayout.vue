<template>
	<div class="container">
		<AppMessage />
		<router-view></router-view>
	</div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage'
export default {
	components: {AppMessage},
	setup() {
	}
}
</script>

<style scoped>

</style>