<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<header class="header flex-center p-2">
		<img
			alt="Vue logo"
			class="logo"
			src="@/assets/logo.svg"
			width="100"
			height="110"
		/>
	</header>
	<main class="">
		<RouterView />
	</main>
</template>

<style scoped>
.b {
	border: 1px solid black;
}
.header {
	background-color: #446280;
	background-image: linear-gradient(#446280, #6cc5c1);
	width: 100;
}

.flex-center {
	display: flex;
	justify-content: center;
}
</style>

