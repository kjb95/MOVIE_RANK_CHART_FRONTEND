<template>
	<TheBodyHeader />
	<RouterView />
	<TheBodyFooter />
</template>

<script setup lang="ts">
import TheBodyHeader from '@/layouts/section/header/TheBodyHeader.vue';
import TheBodyFooter from '@/layouts/section/footer/TheBodyFooter.vue';
</script>

<style scoped></style>
