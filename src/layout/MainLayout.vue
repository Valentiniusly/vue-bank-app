<template>
	<TheNavbar />
	<TheSidebar />
	<div class="container with-nav">
		<AppMessage />
		<RouterView />
	</div>
</template>

<script>
import TheNavbar from '../components/TheNavbar';
import TheSidebar from '../components/TheSidebar';
import AppMessage from '../components/ui/AppMessage';

export default {
	components: {TheNavbar, TheSidebar, AppMessage},
}
</script>

<style scoped>

</style>