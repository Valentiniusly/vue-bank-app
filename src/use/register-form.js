import { computed, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export function useRegisterForm() {
	const store = useStore();
	const router = useRouter();

	const { handleSubmit, isSubmitting, submitCount } = useForm();
	const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
		'email',
		yup
			.string()
			.trim()
			.required('Please enter your email')
			.email('This must be a valid email')
	);
	const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
		'password',
		yup
			.string()
			.trim()
			.required('Please enter your password')
			.min(6, 'Password must be at least 6 characters')
	);

	const onSubmit = handleSubmit(async values => {
		try {
			await store.dispatch('auth/register', values);
			router.push('/');
		} catch (err) {}
	});

	const isTooManyAttempts = computed(() => submitCount.value > 3);
	watch(isTooManyAttempts, val => {
		if (val) {
			setTimeout(() => (submitCount.value = 0), 1500);
		}
	});

	return {
		email,
		password,
		eError,
		pError,
		eBlur,
		pBlur,
		onSubmit,
		isSubmitting,
		isTooManyAttempts
	};
}
