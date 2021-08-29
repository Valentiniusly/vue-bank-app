<template>
	<form class="card" @submit.prevent="onSubmit">
		<h1>Register</h1>

		<div :class="['form-control', {invalid: eError}]">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				v-model="email"
				@blur="eBlur"
			>
			<small v-if="eError">{{ eError }}</small>
		</div>
		<div :class="['form-control', {invalid: pError}]">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				v-model="password"
				@blur="pBlur"
			>
			<small v-if="pError">{{ pError }}</small>
		</div>

		<button class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Register</button>
		<router-link to="/auth">Login</router-link>
		<p v-if="isTooManyAttempts">Too many attempts. Try later.</p>
	</form>
</template>

<script>
import {useRegisterForm} from '../use/register-form'
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {error} from '../utils/error'

export default {
	setup() {
		const route = useRoute();
		const store = useStore();

		if (route.query.message) {
			store.dispatch('setMessage', {
				value: error(route.query.message),
				type: 'warning'
			})
		}

		return {
			...useRegisterForm()
		}
	} 
}
</script>

<style>

</style>