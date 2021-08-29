<template>
	<transition name="sidebar">
		<div class="sidebar" v-if="sidebar">
			<span class="sidebar-close" @click="close">&times;</span>

			<div class="sidebar-content">
				<p>A bank is a financial institution that accepts deposits from the public and creates a demand deposit while simultaneously making loans. Lending activities can be directly performed by the bank or indirectly through capital markets.</p>
			</div>
		</div>
	</transition>
	
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
	setup() {
		const store = useStore();

		const sidebar = computed(() => store.state.sidebar)

		return {
			sidebar,
			close: () => store.commit('closeSidebar')
		}
	}
}
</script>

<style scoped>
	.sidebar-enter-active, .sidebar-leave-active {
		transition: all .3s;
	}
	.sidebar-enter-from, .sidebar-leave-to {
		opacity: 0;
		right: -300px;
	}
</style>