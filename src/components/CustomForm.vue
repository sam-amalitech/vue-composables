<script setup lang="ts">
import {
	onMounted,
	onUnmounted,
	reactive,
	watchEffect,
	type PropType,
} from "vue";
import {
	type ErrorsObject,
	type FormFields,
	type FormInitialValues,
	type FormValidation,
} from "@/@types";
import { cn } from "@/utils";

const props = defineProps({
	formFields: {
		default: [],
		type: Array as PropType<FormFields[]>,
	},
	formValidation: {
		type: Object as PropType<FormValidation>,
	},
	formInitialValues: {
		default: {},
		type: Object as PropType<FormInitialValues>,
	},
	persist: {
		type: String,
		default: "",
	},
	onSubmit: {
		type: Function as PropType<(data?: FormInitialValues) => Promise<void>>,
		default: () => {},
	},
	formTitle: String,
	className: {
		type: String,
	},
});

const formData = reactive({
	fields: props.formInitialValues,
	isSubmitting: false,
	errors: {} as ErrorsObject,
	async handleSubmit(
		submitterCallback: (data?: FormInitialValues) => Promise<void>,
		errorsCallback: (errors: ErrorsObject | undefined) => void
	) {
		this.errors = {};
		const errors = this.validate() ?? {};
		if (!Object.keys(errors).length) {
			this.isSubmitting = true;
			await submitterCallback(this.fields).then(() => {
				errorsCallback(undefined);
				localStorage.removeItem(props.persist);
				formData.fields = props.formInitialValues;
			});
			this.isSubmitting = false;
			return;
		}
		this.errors = errors;
		errorsCallback(errors);
	},
	validate() {
		if (!props.formValidation) return;
		return Object.keys(this.fields).reduce((acc, cur) => {
			const validationFun = (props.formValidation as FormValidation)[cur];
			if (validationFun instanceof Function) {
				const results = validationFun(this.fields[cur], this.fields);
				if (results) {
					acc[cur] = results;
				}
			}
			return acc;
		}, {} as ErrorsObject);
	},
});

onMounted(() => {
	if (!!props.persist) {
		const persistedData = localStorage.getItem(props.persist);
		if (persistedData) {
			try {
				formData.fields = JSON.parse(persistedData);
			} catch (error) {
				formData.fields = props.formInitialValues;
			}
		}

		watchEffect(() => {
			localStorage.setItem(props.persist, JSON.stringify(formData.fields));
		});
	}
});

onUnmounted(() => {
	if (!!props.persist) {
		localStorage.removeItem(props.persist);
	}
});
</script>
<template>
	<form
		:class="cn('p-4 grid gap-4 text-[#34495e]', className)"
		@submit.prevent="
			formData.handleSubmit(onSubmit, (errors) => console.log(errors))
		"
	>
		<h3
			class="text-3xl font-black text-center col-span-2 bg-gradient-to-b from-[#6cc5c1] to-[#446280] bg-clip-text text-transparent"
		>
			{{ formTitle }}
		</h3>
		<div
			:class="cn('flex flex-col gap-y-1 relative', field.class ?? '')"
			v-for="field in formFields"
		>
			<label class="text-lg font-semibold" :for="field.inputName">{{
				field.label
			}}</label>
			<input
				autocomplete="on"
				:placeholder="field.placeholder"
				:name="field.inputName"
				:id="field.inputName"
				:type="field.type ?? 'text'"
				v-model="formData.fields[field.inputName]"
				:class="
					cn(
						' p-3 w-full h-full rounded-lg outline-none bg-[#eff7f6] focus-within:outline-2 focus-within:outline-[#96a8b9]'
					)
				"
			/>
			<p class="text-red-500 text-sm absolute -bottom-5">{{ formData.errors[field.inputName] }}</p>
		</div>
		<button
			class="p-3 font-bold col-span-2 rounded-lg bg-gradient-to-b from-[#6cc5c1] to-[#446280] duration-300 text-white hover:to-[#263d52] mt-4"
		>
			{{ formData.isSubmitting ? "Submitting..." : "Submit" }}
		</button>
	</form>
</template>

