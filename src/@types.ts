import type { Ref } from "vue";

type FunctionCallback = (
	value: string,
	fields: FormInitialValues
) => boolean | string;
export type FormValidation = Record<string, FunctionCallback | undefined>;

export type FormInitialValues = Record<string, string>;

export type FormFields = {
	inputName: string;
	label: string;
	placeholder: string;
	type?: string;
	class?: string;
};

export type User = {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
};

export type ErrorsObject = Record<string, string | boolean>;

export type RequestParams = string | Ref<string> | (() => string);

