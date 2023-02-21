<script setup lang="ts">
import { CHINA } from '@/constants/map';
import { tooltipComp } from '@/echarts/map/utils';
import { useProAqiStore } from '@/stores';
import { Color, type ProvinceAqiInfo, type ProvinceName } from '@/types';
import { generateColor } from '@/utils';
import type { EChartsType } from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { onMounted, inject, ref, reactive } from 'vue';

const echarts = inject<any>('echarts');

const proAqiStore = useProAqiStore();

const chinaMap = ref<EChartsType | null>(null);
const provinceAqi = ref<ProvinceAqiInfo | null>(null);

const options = reactive<EChartsOption>({
    title: {
        text: 'Map of Air Pollution in China',
        subtext: 'Only the provincial overview is displayed',
        left: '3%',
        top: '85%',
        textStyle: {
            color: '#ffffff',
        },
    },
    tooltip: {
        triggerOn: 'mousemove',
        formatter: (params: any) => {
            let comp = tooltipComp(params, provinceAqi.value);
            return comp;
        },
        backgroundColor: 'rgba(64, 67, 88, 0.4)',
        borderColor: '#6a6c76',
        textStyle: {
            color: '#ffffff',
            fontSize: 14,
        },
    },
    visualMap: {
        type: 'continuous',
        orient: 'vertical',
        min: 0,
        max: 300,
        left: '3%',
        top: '5%',
        textStyle: {
            color: '#ffffff',
        },
        inRange: {
            color: [
                Color['Excellent'],
                Color['Good'],
                Color['Mild'],
                Color['Moderate'],
                Color['Severe'],
                Color['Serious'],
            ],
        },
        indicatorIcon: 'pin',
    },
    backgroundColor: '#242f3e',
    series: [
        {
            type: 'map',
            name: 'province',
            map: CHINA,
            zoom: 1.2,
            nameMap: {
                [CHINA]: '中国',
            },
            // This is global style settings, for every province below
            // data property is setted dynamically
            itemStyle: {
                areaColor: '#ffffff',
                borderColor: '#0f0f0f',
                opacity: 0.9,
            },
            emphasis: {
                label: {
                    show: false,
                },
                itemStyle: {
                    areaColor: '#ffffff',
                    opacity: 1,
                },
            },
            data: [
                {
                    name: '',
                    value: 0,
                    itemStyle: {
                        areaColor: '',
                        opacity: 0,
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '',
                            opacity: 0,
                        },
                    },
                },
            ],
        },
    ],
});

proAqiStore.$subscribe((_, state) => {
    provinceAqi.value = state.proAqiInfo.data;
});

onMounted(() => {
    initMap();
});

const initMap = async (): Promise<void> => {
    await proAqiStore.fetchProvinceAqi();
    fetch('/src/echarts/map/China.json')
        .then((response: Response) => response.json())
        .then((data: any) => {
            echarts.registerMap(CHINA, data);
            chinaMap.value = echarts.init(document.getElementById('map')!);
            // mock fetch province data
            data.features.forEach((province: any) => {
                const proName: ProvinceName = province.properties.name;
                if (proName) {
                    (options.series as any)[0].data.push({
                        name: proName,
                        value: provinceAqi.value![proName].aqi,
                        itemStyle: {
                            areaColor: generateColor(
                                provinceAqi.value![proName].aqi
                            ),
                            opacity: 0.9,
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: generateColor(
                                    provinceAqi.value![proName].aqi
                                ),
                                opacity: 1,
                            },
                        },
                    });
                }
            });
            chinaMap.value!.setOption(options);
            window.addEventListener('resize', function () {
                chinaMap.value!.resize();
            });
        });
};
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
