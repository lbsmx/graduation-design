<script setup lang="ts">
import { onMounted, inject, ref, shallowRef, watch } from 'vue';
import {
    ElRow,
    ElButton,
    ElAutocomplete,
    ElRadioGroup,
    ElRadioButton,
    ElDatePicker,
    ElMessage,
    ElLoading,
} from 'element-plus';
import type { ECharts } from 'echarts/core';
import {
    ChartTypes,
    DefaultCites,
    DateGranularity,
    PollutionTypes,
    DefaultDateRange,
} from '@/constants/urbanComp';
import { generateChartOption, getDiffDay } from '@/echarts/utils';
import { useCityDataStore, useCityListStore } from '@/stores/index';
import type { CityAlias, CityData } from '@/types';
import type { CityName } from '@/types';
import { LOADING } from '@/constants';

// Dependency inject
const echarts = inject<any>('echarts');

const cityDataStore = useCityDataStore();
const cityListStore = useCityListStore();

// Here is a serious problem with Vue3---The ref to echart instance
// could influence the properties of the instance, which is caused by
// the reactive principle. This means when operation the properties
// the executor could not get the right value. It has cause the exception
// such as 'could not find property type', the tooltip component useless
// and the resize function useless.
// shallowRef just make proxy for the shallow one, so it's a good practice.
const chartBox = shallowRef<ECharts | null>(null);

const hd = ref<HTMLElement | null>(null);

const cityItems = ref<string[]>([
    DefaultCites[0],
    DefaultCites[1],
    DefaultCites[2],
]);

const granularityRadio = ref<string | number>(DateGranularity[0]);

const dateGranularity = ref<(string | number)[]>([
    DateGranularity[0],
    DateGranularity[1],
    DateGranularity[2],
    DateGranularity[3],
]);

const activeGranularityButton = ref<string[]>([]);

const dateRange = ref<any>([DefaultDateRange[0], DefaultDateRange[1]]);

const chartTypeRadio = ref<string | number>(ChartTypes[0]);

const chartTypeItems = ref<(string | number)[]>([
    ChartTypes[0],
    ChartTypes[1],
    ChartTypes[2],
    ChartTypes[3],
]);

const pollutionTypeRadio = ref<string | number>(PollutionTypes[0]);

const pollutionTypeItems = ref<(string | number)[]>([
    PollutionTypes[0],
    PollutionTypes[1],
    PollutionTypes[2],
    PollutionTypes[3],
    PollutionTypes[4],
    PollutionTypes[5],
    PollutionTypes[6],
]);

// Not found the correct type for now
const options = ref<any>({});

const cityData = ref<CityData[]>([]);

const cityList = ref<CityAlias[]>([]);

cityDataStore.$subscribe((_, state) => {
    cityData.value = state.cityData as CityData[];
});

cityListStore.$subscribe((_, state) => {
    cityList.value = state.cityList as CityAlias[];
});

onMounted(async () => {
    await cityListStore.fetchCityList();
    await cityDataStore.fetchCityData({
        cityName: mappingToZh(cityItems.value),
        date: dateRange.value,
        dataType: pollutionTypeRadio.value as string,
        dateGranularity: granularityRadio.value as string,
    });
    setChartOption();
    initChart();
});

const onConfirm = async () => {
    const cities: string[] = cityItems.value;
    const cities_filtered: string[] = [];
    cities.forEach((city: string, index: number) => {
        if (city !== '') {
            const results = cityList.value.filter(createFilter(city));
            if (results.length === 0) {
                ElMessage({
                    message: `Warning, the ${index} city is invalid`,
                    type: 'warning',
                });
                cityItems.value[index] = '';
            } else {
                cities_filtered.push(city);
            }
        }
    });
    if (cities_filtered.length === 0) {
        ElMessage({
            message: `Error, there must be at least one city inputted`,
            type: 'error',
        });
    } else {
        await getQualityData();
        setChartOption();
    }
};

const initChart = async (): Promise<void> => {
    chartBox.value = echarts.init(document.getElementById('main'), 'dark');
    chartBox.value!.setOption(options.value);
    window.addEventListener('resize', function () {
        chartBox.value!.resize();
    });
};

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? cityList.value.filter(createFilter(queryString))
        : cityList.value;
    // call callback function to return suggestions
    cb(results);
};

const createFilter = (queryString: string) => {
    return (city: CityAlias) => {
        return (
            city.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
    };
};

// make a function for multiple uses
const setChartOption = (): void => {
    options.value = generateChartOption(
        cityData.value,
        chartTypeRadio.value as string,
        pollutionTypeRadio.value as string
    );
    // The second params is for reflowing the chart and update the legend
    chartBox.value?.setOption(options.value, true);
};

// make a function for multiple uses
const getQualityData = async (): Promise<void> => {
    const loadingInstance = ElLoading.service({
        target: hd.value as HTMLElement,
        text: LOADING,
    });
    await cityDataStore.fetchCityData({
        cityName: mappingToZh(cityItems.value),
        date: dateRange.value,
        dataType: pollutionTypeRadio.value as string,
        dateGranularity: granularityRadio.value as string,
    });
    setTimeout(() => loadingInstance.close(), 300);
};

const onPollutionTypeChange = async (
    currentPollutionType: string | number | boolean
) => {
    // One bug here, the @change function's parameter type is different from ElCheckboxGroup
    // v-model value's type, so we need to add type assert here.
    pollutionTypeRadio.value = currentPollutionType as string | number;
    await getQualityData();
    setChartOption();
};

const mappingToZh = (cityItems: string[]): CityName[] =>
    cityItems
        .filter((cityName: CityName) => cityName !== '')
        .map(
            (cityName: CityName) =>
                cityList.value.find(
                    (item: CityAlias) => item.value === cityName
                )!.zh
        );

watch([granularityRadio, dateRange, pollutionTypeRadio], async () => {
    await getQualityData();
    setChartOption();
});

watch(chartTypeRadio, () => {
    setChartOption();
});

watch(
    dateRange,
    () => {
        const diffDay = getDiffDay(dateRange.value[1], dateRange.value[0]);
        if (diffDay >= 1 && diffDay < 7) {
            activeGranularityButton.value = [DateGranularity[0]];
        } else if (diffDay >= 7 && diffDay <= 14) {
            activeGranularityButton.value = [
                DateGranularity[0],
                DateGranularity[1],
            ];
        } else if (diffDay > 14 && diffDay < 30) {
            activeGranularityButton.value = [DateGranularity[1]];
        } else if (diffDay >= 30 && diffDay < 60) {
            activeGranularityButton.value = [
                DateGranularity[1],
                DateGranularity[2],
            ];
        } else if (diffDay >= 60 && diffDay < 360) {
            activeGranularityButton.value = [DateGranularity[2]];
        } else if (diffDay >= 360 && diffDay < 480) {
            activeGranularityButton.value = [
                DateGranularity[2],
                DateGranularity[3],
            ];
        } else {
            activeGranularityButton.value = [DateGranularity[3]];
        }

        granularityRadio.value = activeGranularityButton.value[0];
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <div class="history-data" ref="hd">
        <!-- city list -->
        <el-row :gutter="20">
            <el-autocomplete
                v-model="cityItems[0]"
                :fetch-suggestions="querySearch"
                placeholder="Pick a city"
            />
            <el-autocomplete
                v-model="cityItems[1]"
                :fetch-suggestions="querySearch"
                placeholder="Pick a city"
            />
            <el-autocomplete
                v-model="cityItems[2]"
                :fetch-suggestions="querySearch"
                placeholder="Pick a city"
            />
            <el-button type="primary" @click="onConfirm">Confirm</el-button>
        </el-row>

        <!-- DateGranularity radio -->
        <el-row>
            <el-radio-group v-model="granularityRadio">
                <el-radio-button
                    v-for="item in dateGranularity"
                    :key="item"
                    :label="item"
                    :disabled="
                        activeGranularityButton.findIndex(
                            (active: string) => active === item
                        ) === -1
                    "
                >
                    {{ item }}
                </el-radio-button>
            </el-radio-group>

            <div class="date-picker">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    value-format="YYYY-MM-DD"
                />
            </div>
        </el-row>

        <!-- chart type radio -->
        <el-row>
            <el-radio-group v-model="chartTypeRadio">
                <el-radio-button
                    v-for="item in chartTypeItems"
                    :key="item"
                    :label="item"
                >
                    {{ item }}
                </el-radio-button>
            </el-radio-group>

            <!-- polluation type -->
            <div class="pollution">
                <el-radio-group
                    v-model="pollutionTypeRadio"
                    @change="onPollutionTypeChange"
                >
                    <el-radio-button
                        v-for="item in pollutionTypeItems"
                        :key="item"
                        :label="item"
                    >
                        {{ item }}
                    </el-radio-button>
                </el-radio-group>
            </div>
        </el-row>

        <!-- chart -->
        <div id="main"></div>
    </div>
</template>

<style scoped lang="less">
.history-data {
    display: flex;
    flex-direction: column;
    height: 80%;
}
.el-row {
    margin: 10px 20px !important;
    :deep(.el-autocomplete) {
        margin-right: 10px;
    }
}

.date-picker {
    margin-left: 10px;
    width: 300px;
    min-width: 300px;
    :deep(.el-date-editor) {
        width: 100%;
    }
}
.pollution {
    margin-left: 10px;
}
#main {
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
}
</style>
