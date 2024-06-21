<script setup lang="ts">
defineProps({
	firstname: {
		default: "",
		type: String,
	},
	lastname: {
		default: "",
		type: String,
	},
	email: {
		default: "",
		type: String,
	},
	id: {
		default: "",
		type: String,
	},
});

const emit = defineEmits(["deleteUser"]);
</script>

<template>
	<div
		class="b group p-4 max-w-[50%] rounded-xl flex items-center gap-x-4 relative"
	>
		<span
			class="flex-shrink-0 flex items-center justify-center w-14 h-14 row-span-2 text-lg font-semibold text-[#3e5061] uppercase rounded-full bg-[#8ab1d4]"
		>
			{{ firstname[0] }}{{ lastname[0] }}
		</span>
		<p class="flex flex-col">
			<span class="capitalize font-bold"
				>{{ firstname }} {{ lastname }}</span
			>
			<span class="text-sm">{{ email }}</span>
		</p>
		<button
			@click="emit('deleteUser', id)"
			class="hidden group-hover:flex absolute right-4 top-2 hover:scale-110 active:scale-90"
		>
			x
		</button>
	</div>
</template>

