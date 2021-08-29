<template>
	<AppLoader v-if="loading" />
  <app-page title="Requests list" v-else>
		<template v-slot:header>
			<button
				class="btn"
				@click="modal = true"
			>
				New request
			</button>
		</template>

		<RequestFilter v-model="filter"/>
		<RequestTable :requests="requests || []" />

		<teleport to="body">
			<app-modal
				v-if="modal"
				title="Create new request"
				@close="modal = false"
			>
				<RequestModal @created="modal = false" />
			</app-modal>
		</teleport>
	</app-page>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue';
import {useStore} from 'vuex';
import AppPage from '../components/ui/AppPage';
import AppModal from '../components/ui/AppModal';
import AppLoader from '../components/ui/AppLoader';
import RequestTable from '../components/request/RequestTable';
import RequestModal from '../components/request/RequestModal';
import RequestFilter from '../components/request/RequestFilter';

export default {
	components: {
		AppPage,
		AppModal,
		AppLoader,
		RequestTable,
		RequestModal,
		RequestFilter
	},
	setup() {
		const store = useStore();
		const modal = ref(false);
		const loading = ref(false);
		const filter = ref({});

		onMounted(async () => {
			loading.value = true;
			await store.dispatch('request/loadRequests');
			loading.value = false;
		})

		const requests = computed(() => store.getters['request/requests']
			.filter(req => {
				if (filter.value.name) {
					return req.fullname.includes(filter.value.name)
				}
				return req
			})
			.filter(req => {
				if (filter.value.status) {
					return req.status === filter.value.status
				}
				return req
			})
		)

		return {
			modal, requests, loading, filter
		}
	}
}
</script>
