<script setup lang="ts">
import CommonLayout from '@/components/CommonLayout.vue';
import echarts from '@/echarts/index';
import 'echarts/extension/bmap/bmap';
import { provide } from 'vue';
import '@/styles/index.css';

provide('echarts', echarts);
</script>

<template>
    <div class="app">
        <CommonLayout />
    </div>
</template>

<style scoped></style>
