<script setup lang="ts">
import { type PropType } from "vue";
import {
	type FormFields,
	type FormInitialValues,
	type FormValidation,
} from "@/@types";
import { cn } from "@/utils";
import useForm from "@/composables/useForm";

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

const { errors, formInputs, handleSubmit, isSubmitting } = useForm({
	fields: props.formInitialValues,
	validation: props.formValidation as FormValidation,
	persist: props.persist,
});

</script>
<template>
	<form
		:class="cn('p-4 grid gap-4 text-[#34495e]', className)"
		@submit.prevent="handleSubmit(onSubmit, (errors) => console.log(errors))"
	>
		<h3
			class="text-3xl font-black text-center col-span-2 bg-gradient-to-b from-[#6cc5c1] to-[#446280] bg-clip-text text-transparent"
		>
			{{ formTitle }}
		</h3>
		<div
			:class="cn('flex flex-col gap-y-1 relative', field['class'] ?? '')"
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
				v-model="formInputs[field.inputName]"
				:class="
					cn(
						' p-3 w-full h-full rounded-lg outline-none bg-[#eff7f6] focus-within:outline-2 focus-within:outline-[#96a8b9]'
					)
				"
			/>
			<p class="text-red-500 text-sm absolute -bottom-5">
				{{ errors[field.inputName] }}
			</p>
		</div>
		<button
			class="p-3 font-bold col-span-2 rounded-lg bg-gradient-to-b from-[#6cc5c1] to-[#446280] duration-300 text-white hover:to-[#263d52] mt-4"
		>
			{{ isSubmitting ? "Submitting..." : "Submit" }}
		</button>
	</form>
</template>

