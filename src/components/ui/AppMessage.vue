<template>
	<transition name='message'>
		<div v-if="message" :class="['alert', message.type]">
			<p class="alert-title">{{title}}</p>
			<p>{{message.value}}</p>
			<span class="alert-close" @click="close">&times;</span>
		</div>
	</transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore ();

		const TITLE_MAP = {
			primary: 'Success!',
			danger: 'Error!',
			warning: 'Attention!'
		}

		const message = computed(() => store.state.message);
		const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)
		return {
			message, title,
			close: () => store.commit('clearMessage')
		}
	}
}
</script>

<style scoped>
	.message-enter-active, .message-leave-active {
		transition: all .3s;
	}
	.message-enter-from, .message-leave-to {
		opacity: 0;
	}
</style>