import type { ErrorsObject, FormInitialValues, FormValidation } from "@/@types";
import { onMounted, onUnmounted, ref, toValue, watchEffect } from "vue";
import useLocalStorage from "./useLocalStorage";

export default function useForm({
	fields,
	validation,
	persist,
}: {
	fields: FormInitialValues;
	validation: FormValidation;
	persist?: string;
}) {
	const isSubmitting = ref(false);
	const errors = ref<ErrorsObject>({});
	const formInputs = ref({ ...fields });
	const usePersist = persist
		? useLocalStorage<FormInitialValues>(persist)
		: null;

	const handleSubmit = async (
		submitterCallback: (data?: FormInitialValues) => Promise<void>,
		errorsCallback: (errors: ErrorsObject | undefined) => void
	) => {
		errors.value = {};
		errors.value = validate(toValue(formInputs)) ?? {};
		if (!Object.keys(toValue(errors)).length) {
			isSubmitting.value = true;
			await submitterCallback(toValue(formInputs)).then(() => {
				errorsCallback(undefined);
				usePersist?.clearFromStorage();
				formInputs.value = { ...fields };
			});
			isSubmitting.value = false;
			return;
		}
		errorsCallback(errors.value);
	};

	const validate = (inputs: FormInitialValues) => {
		if (!validation) return;
		return Object.keys(inputs).reduce((acc, cur) => {
			console.log("cur::", cur);
			const validationFun = validation[cur];
			if (validationFun instanceof Function) {
				const results = validationFun(inputs[cur], inputs);
				if (results) {
					acc[cur] = results;
				}
			}
			return acc;
		}, {} as ErrorsObject);
   };


   //if you want live validation
	/*
	watchEffect(() => {
		errors.value = validate(toValue(formInputs)) ?? {};
	});
   */

	onMounted(() => {
		if (!persist) return;
		formInputs.value = { ...(usePersist?.data.value ?? fields) };

		watchEffect(() => {
			usePersist?.writeToStorageKey(toValue(formInputs));
		});
	});

	onUnmounted(() => {
		usePersist?.clearFromStorage();
	});

	return {
		isSubmitting,
		errors,
		formInputs,
		handleSubmit,
	};
}

