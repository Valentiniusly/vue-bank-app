import axios from 'axios';
import { error } from '../../utils/error';

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem('jwt-token')
		};
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			localStorage.setItem('jwt-token', state.token);
		},
		logout(state) {
			state.token = null;
			localStorage.removeItem('jwt-token');
		}
	},
	actions: {
		async login({ commit, dispatch }, payload) {
			try {
				const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
				const { data } = await axios.post(url, {
					...payload,
					returnSecureToken: true
				});
				commit('setToken', data.idToken);
				commit('clearMessage', null, { root: true });
			} catch (err) {
				dispatch(
					'setMessage',
					{
						value: error(err.response.data.error.message),
						type: 'danger'
					},
					{ root: true }
				);
				console.log(error(err.response.data.error.message));
				throw new Error();
			}
		},
		async register({ commit, dispatch }, payload) {
			try {
				const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`;
				const { data } = await axios.post(url, {
					...payload,
					returnSecureToken: true
				});
				commit('setToken', data.idToken);
				commit('clearMessage', null, { root: true });
			} catch (err) {
				dispatch(
					'setMessage',
					{
						value: error(err.response.data.error.message),
						type: 'danger'
					},
					{ root: true }
				);
				console.log(error(err.response.data.error.message));
				throw new Error();
			}
		}
	},
	getters: {
		token(state) {
			return state.token;
		},
		isAuthenticated(_, getters) {
			return !!getters.token;
		}
	}
};
