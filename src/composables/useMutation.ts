import type { RequestParams } from "@/@types";
import {  ref, toValue } from "vue";

export default function useMutation(url: RequestParams) {
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const mutate = {
		async delete(data: Record<string, unknown>) {
			return fetchData(data, "DELETE");
		},
		async post(data: Record<string, unknown>) {
			return fetchData(data, "POST");
		},
		async put(data: Record<string, unknown>) {
			return fetchData(data, "PUT");
		},
		async patch(data: Record<string, unknown>) {
			return fetchData(data, "PATCH");
		},
	};

	const fetchData = async (
		body: Record<string, unknown>,
		method: "POST" | "DELETE" | "PUT" | "PATCH" = "POST"
	) => {
		try {
			loading.value = true;
			const res = await fetch(
				//Append id to url if method is delete
				`${toValue(url)}${method === "DELETE" ? "/" + body["id"] : ""}`,
				{
					method,
					headers: {
						"Content-Type": "application/json",
					},
					//Delete method has no body
					body: method !== "DELETE" ? JSON.stringify(body) : null,
				}
			);
			const json = await res.json();
			data.value = json;
		} catch (err: any) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};
	return { mutate, data, error, loading };
}

