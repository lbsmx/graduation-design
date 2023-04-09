import { createRouter, createWebHistory, type Router } from 'vue-router';

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/distribution-map',
            children: [
                {
                    name: 'distribution-map',
                    path: '/distribution-map',
                    component: () => import('@/views/DistributionMap.vue'),
                },
                {
                    name: 'history-data',
                    path: '/history-data',
                    component: () => import('@/views/HistoryData.vue'),
                },
                {
                    name: 'influencing-factors',
                    path: '/influencing-factorsa',
                    component: () => import('@/views/InfluencingFactors.vue'),
                },
            ],
        },
    ],
});

export default router;
