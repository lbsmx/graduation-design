import { ref } from 'vue';
import { defineStore } from 'pinia';
import { requestInstance } from '@/api';
import type { CityData, CityAlias } from '@/types';
type QueryInfo = {
    cityName: string[];
    date: string;
    dataType: string;
    dateGranularity: string;
};

export const useCityDataStore = defineStore('cityData', () => {
    const cityData = ref<CityData[] | null>(null);

    const fetchCityData = async (queryInfo: QueryInfo): Promise<void> => {
        try {
            const res: CityData[] = await requestInstance.request({
                method: 'GET',
                url: `/getCityAirData?cityName=${queryInfo.cityName}&date=${queryInfo.date}&dataType=${queryInfo.dataType}&dateGranularity=${queryInfo.dateGranularity}`,
            });
            cityData.value = res;
        } catch (error) {
            console.log('error', error);
        }
    };

    return { cityData, fetchCityData };
});

export const useCityListStore = defineStore('cityList', () => {
    const cityList = ref<CityAlias[] | null>(null);

    const fetchCityList = async (): Promise<void> => {
        try {
            const res: CityAlias[] = await requestInstance.request({
                method: 'GET',
                url: '/getCityList',
            });
            cityList.value = res;
        } catch (error) {
            console.log('error', error);
        }
    };

    return { cityList, fetchCityList };
});
