<script setup lang="ts">
import type { FormInitialValues, User } from "@/@types";
import CustomForm from "@/components/CustomForm.vue";
import UserCard from "@/components/UserCard.vue";
import useFetch from "@/composables/useFetch";
import useMutation from "@/composables/useMutation";
import { formFields } from "@/data";
import { getEnv } from "@/utils";

const { data: allUsers, refetch } = useFetch<User>(
	`${getEnv("API_URL")}/users`
);
const { mutate } = useMutation(`${getEnv("API_URL")}/users`);

const handleCreateUser = async (data?: FormInitialValues) => {
	mutate.post(data!).then(() => {
		refetch();
	});
};
const handleDeleteUser = (id: string) => {
	mutate.delete({ id }).then(() => {
		refetch();
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
				confirmPassword: (confirmPasswordField, formValues) => {
					console.log(
						'confirmPasswordField:::::::::::::::',
						confirmPasswordField,
						formValues
					);
					return confirmPasswordField === formValues.password
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

