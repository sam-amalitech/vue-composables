import type { FormFields } from "./@types";

export const formFields = [
	{
		inputName: "username",
		placeholder: "Enter your name",
		label: "Username",
		class: "col-span-2",
	},
	{
		inputName: "firstname",
		placeholder: "Enter your first name",
		label: "First name",
		class: "col-span-1",
	},
	{
		inputName: "lastname",
		placeholder: "Enter your last name",
		label: "Last name",
		class: "col-span-1",
	},
	{
		inputName: "email",
		placeholder: "Enter your email",
		label: "Email",
		class: "col-span-2",
	},
	{
		inputName: "password",
		placeholder: "Enter your password",
		label: "Password",
		type: "password",
		class: "col-span-1",
	},
	{
		inputName: "confirmPassword",
		placeholder: "Confirm your password",
		label: "Confirm Password",
		type: "password",
		class: "col-span-1",
	},
	{
		inputName: "phone",
		placeholder: "Enter your phone number",
		label: "Phone",
		type: "tel",
		class: "col-span-2",
	},
] as FormFields[];