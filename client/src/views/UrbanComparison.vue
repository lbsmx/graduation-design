<script setup lang="ts">
import { onMounted, inject } from 'vue';

const echarts = inject<any>('echarts');

onMounted(() => {
    change();
    getData();
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
const getData = async () => {
    // const res = await fetchData();
    // console.log('res', res);
};
</script>

<template>
    <div id="main"></div>
</template>

<style scoped>
#main {
    min-width: 31.25rem;
    min-height: 31.25rem;
}
</style>
