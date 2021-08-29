const ERROR_CODES = {
	auth: 'Please log in into your account',
	EMAIL_NOT_FOUND: 'No user with that email address',
	INVALID_PASSWORD: 'Invalid password'
};

export function error(code) {
	return ERROR_CODES[code] || 'Unknown error';
}
