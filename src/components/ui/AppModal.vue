<template>
		<div class="modal-backdrop" @click="$emit('close')"></div>
		<div class="container modal">
			<h3 v-if="title" class="text-center">{{title}}</h3>

			<slot />
		</div>
</template>

<script>
export default {
	props: ['title'],
	emits: ['close']
}
</script>

<style>

</style>