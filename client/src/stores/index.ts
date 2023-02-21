import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { requestInstance } from '@/api';
import type { ProvinceAqiInfo } from '@/types';

export const useProAqiStore = defineStore('proAqi', () => {
    const proAqiInfo = reactive<{ data: ProvinceAqiInfo }>({ data: {} });

    const fetchProvinceAqi = async (): Promise<void> => {
        try {
            const res: ProvinceAqiInfo = await requestInstance.request({
                method: 'GET',
                url: '/',
            });
            proAqiInfo.data = res;
        } catch (error) {
            console.log('error', error);
        }
    };

    return { proAqiInfo, fetchProvinceAqi };
});
