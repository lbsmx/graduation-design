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
                    name: 'urban-comparison',
                    path: '/urban-comparison',
                    component: () => import('@/views/UrbanComparison.vue'),
                },
            ],
        },
    ],
});

export default router;
