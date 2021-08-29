<template>
	<div class="filter">
		<div class="form-control">
			<input type="text" placeholder="Enter name" v-model="name">
		</div>
		<div class="form-control">
			<select v-model="status" :selected="status">
				<option value="" disabled>Choose status</option>
				<option value="done">Done</option>
				<option value="cancelled">Cancelled</option>
				<option value="active">Active</option>
				<option value="pending">Pending</option>
			</select>
		</div>
	</div>
		<button class="btn warning" v-if="isActive" @click="clear">Clear</button>
</template>

<script>
import {ref, watch, computed} from 'vue';

export default {
	props: ['modelValue'],
	emits: ['update:modelValue'],
	setup(_, {emit}) {
		const name = ref();
		const status = ref('');

		watch([name, status], values => {
			emit('update:modelValue', {
				name: values[0],
				status: values[1]
			})
		})

		const isActive = computed(() => name.value || status.value)

		return {
			name, status, isActive,
			clear() {
				name.value = '';
				status.value = '';
			} 
		}
	}
}
</script>

<style>

</style>