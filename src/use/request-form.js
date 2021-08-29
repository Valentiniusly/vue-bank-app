import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export function useRequestForm(fn) {
	const { handleSubmit, isSubmitting } = useForm({
		initialValues: {
			status: 'active'
		}
	});

	const {
		value: fullname,
		errorMessage: fnError,
		handleBlur: fnBlur
	} = useField(
		'fullname',
		yup
			.string()
			.trim()
			.required('Enter your full name')
	);
	const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
		'phone',
		yup
			.string()
			.trim()
			.required('Enter your phone number')
	);
	const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
		'amount',
		yup
			.number('Please enter a number')
			.typeError('Enter a number')
			.required()
			.min(0, 'Amount can not be 0 or less')
	);
	const { value: status } = useField('status');

	const onSubmit = handleSubmit(fn);

	return {
		isSubmitting,
		onSubmit,
		fullname,
		phone,
		amount,
		status,
		fnError,
		pError,
		aError,
		fnBlur,
		pBlur,
		aBlur
	};
}
