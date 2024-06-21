import { onMounted, ref, toValue, watchEffect, type UnwrapRef } from "vue";

export default function useLocalStorage<T>(key: string) {
	const data = ref<T | null>(null);

	const writeToStorageKey = (value: T) => {
		data.value = value as UnwrapRef<T>;
	};

	const clearFromStorage = () => {
		data.value = null;
	};

	const read = (key: string) => {
		try {
			return JSON.parse(localStorage.getItem(key) as string);
		} catch (_err) {
			return null;
		}
	};

	const write = (key: string, value: UnwrapRef<T>) => {
		localStorage.setItem(key, JSON.stringify(value));
		data.value = value;
	};

	const remove = (key: string) => {
		localStorage.removeItem(key);
	};

   // making sure code runs on client side (onMounted is only available on client side)
	onMounted(() => {
		const storedValue = read(key);
		if (storedValue) {
			data.value = storedValue;
		}

		watchEffect(() => {
			if (toValue(data) !== null) {
				write(key, toValue(data as UnwrapRef<T>));
				return;
			}
			remove(key);
		});
	});
	return { data, writeToStorageKey, clearFromStorage };
}

