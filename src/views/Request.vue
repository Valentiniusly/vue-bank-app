<template>
	<AppLoader v-if="loading" />
	<app-page back title="Request" v-else-if="request">
		<p><strong>Holder's name</strong>: {{request.fullname}}</p>
		<p><strong>Phone number</strong>: {{request.phone}}</p>
		<p><strong>Amount</strong>: {{currency(request.amount)}}</p>
		<p><strong>Status</strong>: <AppStatus :type="request.status " /></p>

		<div class="form-control">
			<label for="status">Change status</label>
			<select id="status" name="status" v-model="status">
				<option value="done">Done</option>
				<option value="cancelled">Cancelled</option>
				<option value="active">Active</option>
				<option value="pending">Pending</option>
			</select>
		</div>

		<button class="btn danger" @click="remove">Delete</button>
		<button class="btn" @click="update" v-if="hasChanges">Update</button>
	</app-page>
	<h3 class="text-center text-white" v-else >
		No such request with ID {{$route.params.id}}
	</h3>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import AppPage from '../components/ui/AppPage';
import AppLoader from '../components/ui/AppLoader';
import AppStatus from '../components/ui/AppStatus';
import {currency} from '../utils/currency'

export default {
	components: {AppPage, AppLoader, AppStatus},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();

		const loading = ref(true);
		const request = ref({})
		const status = ref();

		onMounted(async () => {
			loading.value = true;
			request.value = await store.dispatch('request/loadReqById', route.params.id);
			status.value = request.value?.status;
			loading.value = false;
		});

		const hasChanges = computed(() => request.value.status !== status.value);

		const remove = async () => {
			await store.dispatch('request/remove', route.params.id);
			router.push('/')
		}

		const update = async () => {
			const data = {...request.value, status: status.value, id: route.params.id}
			await store.dispatch('request/update', data);
			request.value.status = status.value;
		}

		return {
			loading, request,
			AppLoader, AppStatus,
			currency, remove, update, status, hasChanges
		}
	}
}
</script>

<style>

</style> 