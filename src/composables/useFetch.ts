import type { RequestParams } from "@/@types";
import { ref, toValue, watchEffect } from "vue";

export default function useFetch<T>(url: RequestParams) {
	const data = ref<T[] | null>(null);
	const loading = ref(false);
	const error = ref(null);

	const fetchData = async (url: string) => {
		loading.value = true;
		try {
			const res = await fetch(url);
			data.value = await res.json();
			loading.value = false;
		} catch (err: any) {
			error.value = err;
			loading.value = false;
		}
	};

	const refetch = () => {
		fetchData(toValue(url));
	};

	watchEffect(() => {
		fetchData(toValue(url));
	});

	return { data, loading, error, refetch };
}
