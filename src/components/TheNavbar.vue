<template>
	<nav class="navbar">
		<h3>Online Bank</h3>

		<ul class="navbar-menu">
			<li>
				<router-link to="/">Requests</router-link>
			</li>
			<li>
				<router-link to="/help">Help</router-link>
			</li>
			<li>
				<a href="#" @click.prevent="openSidebar">Messages</a>
			</li>
			<li>
				<a
					href="#"
					@click.prevent="logout"
				>
					Logout
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
	setup() {
		const store = useStore();
		const router = useRouter();

		return {
			logout: () => {
				store.commit('auth/logout')
				router.push('/auth')
			},
			openSidebar: () => store.commit('openSidebar')
		}
	}
}
</script>

<style>

</style>