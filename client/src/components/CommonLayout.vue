<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { routerManager } from '@/utils/index';
import { DISTRIBUTIONMAP, URBANCOMPARISON } from '@/constants';

const router = useRouter();
const currentRoute = ref(window.location.pathname);
const activeIndex = ref(DISTRIBUTIONMAP);

onMounted(() => {
    const currentIndex = routerManager(router, [
        currentRoute.value.substring(1) === ''
            ? DISTRIBUTIONMAP
            : currentRoute.value.substring(1),
    ]);
    activeIndex.value = currentIndex;
});

const handleSelect = (_: string, keyPath: string[]) => {
    routerManager(router, keyPath);
};
</script>

<template>
    <div class="layout">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="my-gitHub">BySMX</el-menu-item>
            <div class="flex-grow"></div>
            <el-menu-item :index="DISTRIBUTIONMAP"
                >Distrubution Map</el-menu-item
            >
            <el-menu-item :index="URBANCOMPARISON"
                >Urban Comparison</el-menu-item
            >
        </el-menu>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
