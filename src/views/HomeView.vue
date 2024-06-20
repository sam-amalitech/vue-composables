<script setup lang="ts">
import type { FormInitialValues, User } from "@/@types";
import CustomForm from "@/components/CustomForm.vue";
import UserCard from "@/components/UserCard.vue";
import { formFields } from "@/data";
import { getEnv } from "@/utils";
import { ref } from "vue";

const allUsers = ref<User[]>([]);

fetch(`${getEnv("API_URL")}/users`)
	.then((res) => res.json())
	.then((data) => (allUsers.value = data));

const handleCreateUser = async (data?: FormInitialValues) => {
	const json = await fetch(`${getEnv("API_URL")}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const res = await json.json();
	allUsers.value.push(res);
};

const handleDeleteUser = (id: string) => {
	fetch(`${getEnv("API_URL")}/users/${id}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then(() => {
			allUsers.value = allUsers.value.filter((user) => user.id !== id);
		});
};

</script>

<template>
	<div class="grid grid-cols-2 h-[80vh]">
		<CustomForm
			:form-title="'Create User'"
			:class-name="'grid-cols-2 border-r-4 border-[#96a8b9] '"
			:form-fields="formFields"
			:persist="'userForm'"
			:on-submit="handleCreateUser"
			:form-validation="{
				confirmPassword: (fieldValue, formValues) => {
					return fieldValue === formValues.password
						? false
						: 'Passwords miss-match';
				},
			}"
		/>
		<section class="flex flex-col flex-wrap p-2 gap-4 overflow-y-auto">
			<UserCard
				v-for="user in allUsers"
				:email="user.email"
				:firstname="user.firstname"
				:lastname="user.lastname"
				:key="user.id"
				:id="user.id"
				@delete-user="handleDeleteUser"
			/>
		</section>
	</div>
</template>

