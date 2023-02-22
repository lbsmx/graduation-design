<script setup lang="ts">
import { onMounted, inject, ref } from 'vue';
import {
    ElRow,
    ElCol,
    ElInput,
    ElRadioGroup,
    ElRadioButton,
} from 'element-plus';
import { CreditCard } from '@element-plus/icons-vue';

const echarts = inject<any>('echarts');

const city_1 = ref<string>('Beijing');
const city_2 = ref<string>('Shanghai');
const city_3 = ref<string>('Hangzhou');

const timeRadio = ref<string | number>('Last day');

const timeItems = ref<(string | number)[]>([
    'Last day',
    'Last week',
    'Last month',
    'Last year',
]);

const chartTypeRadio = ref<string | number>('Line');

const chartTypeItems = ref<(string | number)[]>([
    'Line',
    'Pie',
    'Last month',
    'Last year',
]);

onMounted(() => {
    change();
});

const change = () => {
    const chartBox = echarts.init(document.getElementById('main'), 'dark');
    const option = {
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [
            {
                name: 'Pie',
                type: 'pie',
                data: [
                    {
                        value: 23,
                        name: 'Mon',
                    },
                    {
                        value: 24,
                        name: 'Tue',
                    },
                    {
                        value: 18,
                        name: 'Wed',
                    },
                    {
                        value: 25,
                        name: 'Thu',
                    },
                    {
                        value: 40,
                        name: 'Fri',
                    },
                    {
                        value: 16,
                        name: 'Sat',
                    },
                    {
                        value: 33,
                        name: 'Sun',
                    },
                ],
            },
        ],
    };
    chartBox.setOption(option);
    window.addEventListener('resize', function () {
        chartBox.resize();
    });
};

const onTimeChange = async (currentSlot: string | number | boolean) => {
    // one bug here, the @change function's parameter type is different from ElCheckboxGroup
    // v-model value's type, so we need to add type assert here.
    timeRadio.value = currentSlot as string | number;
};

const onchartTypeChange = async (currentChartType: string | number | boolean) => {
    // one bug here, the @change function's parameter type is different from ElCheckboxGroup
    // v-model value's type, so we need to add type assert here.
    chartTypeRadio.value = currentChartType as string | number;
};
</script>

<template>
    <div class="urban-comparison">
        <!-- city list -->
        <el-row :gutter="20">
            <el-col :span="3">
                <el-input
                    v-model="city_1"
                    placeholder="Pick a city"
                    :suffix-icon="CreditCard"
                />
            </el-col>
            <el-col :span="3">
                <el-input
                    v-model="city_2"
                    placeholder="Pick a city"
                    :suffix-icon="CreditCard"
                />
            </el-col>
            <el-col :span="3">
                <el-input
                    v-model="city_3"
                    placeholder="Pick a city"
                    :suffix-icon="CreditCard"
                />
            </el-col>
        </el-row>

        <!-- timeslot radio -->
        <el-row>
            <el-radio-group v-model="timeRadio" @change="onTimeChange">
                <el-radio-button
                    v-for="item in timeItems"
                    :key="item"
                    :label="item"
                >
                    {{ item }}
                </el-radio-button>
            </el-radio-group>
        </el-row>

        <!-- chart type radio -->
        <el-row>
            <el-radio-group v-model="chartTypeRadio" @change="onchartTypeChange">
                <el-radio-button
                    v-for="item in chartTypeItems"
                    :key="item"
                    :label="item"
                >
                    {{ item }}
                </el-radio-button>
            </el-radio-group>
        </el-row>

        <!-- chart -->
        <div id="main"></div>
    </div>
</template>

<style scoped>
.urban-comparison {
    display: flex;
    flex-direction: column;
    height: 80%;
}
.el-row {
    margin: 10px 20px !important;
}
.el-col {
    padding-left: 0 !important;
}
#main {
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
}
</style>
