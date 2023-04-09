import { ChartTypes } from '@/constants/urbanComp';
import type { CityData, Collection, DateStr } from '@/types';

export const generateChartOption = (
    sourceData: CityData[],
    chartType: string,
    dataType: string
): any => {
    const options = {
        title: {
            text: `Urban ${dataType} comparison`,
            left: 'center',
            padding: 10,
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            icon: 'rect',
            textStyle: {
                color: '#ccc',
            },
        },
        xAxis: {
            show: true,
            type: 'category',
            name: 'Date',
        },

        yAxis: {
            show: true,
            type: 'value',
            name: dataType,
        },

        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const rawData = params[0];
                if (!rawData) return;
                const data = rawData.data;
                const dimensionNames = rawData.dimensionNames;
                const date = data[0];
                let htmlStr = `${date} <br/>`;
                for (let i = 1; i < data.length; i++) {
                    htmlStr += dimensionNames[i] + ' ' + data[i] + '<br />';
                }
                return htmlStr;
            },
        },
        dataset: {
            // mock data
            source: [
                ['City', '2015', '2016', '2017', '2018', '2019', '2020'],
                ['Beijing', 43.3, 85.8, 93.7, 43.3, 85.8, 93.7],
                ['Shanghai', 83.1, 73.4, 55.1, 83.1, 73.4, 55.1],
                ['Hangzhou', 86.4, 65.2, 82.5, 86.4, 65.2, 82.5],
            ],
        },
        series: [
            {
                type: chartType.toLowerCase(),
                seriesLayoutBy: 'row',
            },
            {
                type: chartType.toLowerCase(),
                seriesLayoutBy: 'row',
            },
            {
                type: chartType.toLowerCase(),
                seriesLayoutBy: 'row',
            },
        ],
    };

    // Change the series array length dynamically by the sourceData length
    const cityCount = sourceData.length;
    options.series.length = cityCount;
    // Pie config
    // todo: Tip of pie
    if (chartType === ChartTypes[1]) {
        options.xAxis.show = false;
        options.yAxis.show = false;
        options.tooltip.trigger = 'item';
        options.series.forEach((series) => {
            series.seriesLayoutBy = 'column';
        });

        const source: any[] = [];

        const dimensionsRow = ['City', 'average'];
        source.push(dimensionsRow);

        for (let i = 0; i < sourceData.length; i++) {
            const cityData: number[] = sourceData[i].data.map(
                (item: Collection) =>
                    parseFloat(
                        item[getFormatPollutionType(dataType.toLowerCase())]
                    )
            );
            const average: number =
                cityData.reduce(
                    (prev: number, next: number): number => prev + next,
                    0
                ) / cityData.length;
            const dataRow = [sourceData[i].cityName, average.toFixed(2)];
            source.push(dataRow);
        }
        options.dataset.source = source;
    }
    // Other type config
    else {
        options.series.forEach((series) => {
            series.seriesLayoutBy = 'row';
        });

        const source: any[] = [];

        // todo: 后端加参数粒度，返回结果新增日期；前端修改x轴数据获取方式
        const dateRange = sourceData[0].data.map(
            (data: Collection) => data.date
        );
        const dimensionsRow = ['City', ...dateRange];
        source.push(dimensionsRow);

        for (let i = 0; i < sourceData.length; i++) {
            const dataRow = [
                sourceData[i].cityName,
                ...sourceData[i].data.map(
                    (item: Collection) =>
                        item[getFormatPollutionType(dataType.toLowerCase())]
                ),
            ];
            source.push(dataRow);
        }

        options.dataset.source = source;
    }
    return options;
};

export const getDiffDay = (startDate: DateStr, endDate: DateStr) => {
    const formatStartDate = Date.parse(startDate);
    const formatEndDate = Date.parse(endDate);
    const diffDate = Math.abs(formatEndDate - formatStartDate);
    const totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) + 1;
    return totalDays;
};

const getFormatPollutionType = (pollutionType: string): string => {
    if (pollutionType === 'pm2.5') {
        return 'pm25';
    } else {
        return pollutionType;
    }
};
