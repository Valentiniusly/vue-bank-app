<template>
	<form @submit.prevent="onSubmit">
		<div class="form-control" :class="{invalid: fnError}">
			<label for="fullname">Full name</label>
			<input
				type="text"
				id="fullname"
				name="fullname"
				v-model="fullname"
				@blur="fnBlur"
			>
			<small v-if="fnError">{{fnError}}</small>
		</div>
		<div class="form-control" :class="{invalid: pError}">
			<label for="phone">Phone number</label>
			<input
				type="text"
				id="phone"
				name="phone"
				v-model="phone"
				@blur="pBlur"
			>
			<small v-if="pError">{{pError}}</small>
		</div>
		<div class="form-control" :class="{invalid: aError}">
			<label for="amount">Amount</label>
			<input
				type="text"
				id="amount"
				name="amount"
				v-model="amount"
				@blur="aBlur"
			>
			<small v-if="aError">{{aError}}</small>
		</div>
		<div class="form-control">
			<label for="status">Status</label>
			<select id="status" name="status" v-model="status">
				<option value="done">Done</option>
				<option value="cancelled">Cancelled</option>
				<option value="active">Active</option>
				<option value="pending">Pending</option>
			</select>
		</div>

		<button type="submit" class="btn primary" :disabled="isSubmitting">Create</button>
	</form>
</template>

<script>
import { useStore } from 'vuex';
import {useRequestForm} from '../../use/request-form'
export default {
	emits: ['created'],
	setup(_, {emit}) {
		const store = useStore();

		const submit = async values => {
			await store.dispatch('request/create', values);
			emit('created');
		}
		
		return {
			...useRequestForm(submit)
		}
	}
}
</script>

<style>

</style>