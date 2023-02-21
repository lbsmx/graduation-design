import { AqiRange, type Aqi, type ProvinceAqiInfo } from '@/types';

export const tooltipComp = (
    params: any,
    provinceAqi: ProvinceAqiInfo | null
): string =>
    `
        <div class="tooltip">
            <div class="provinceName">
                <span>${params.name}</span>
            </div>
            <hr class="divider_infoWindow" />
            <div class="aqi"><span>AQI:</span><span>${params.value}</span></div>
            <div class="provinceRank">
                <span>Rank:</span><span>${
                    provinceAqi == null ? 'N/A' : provinceAqi[params.name].rank
                }/31</span>
            </div>
            <div class="provinceRating">
                <span>Rating:</span
                ><span>${getProvinceRating(params.value)}</span>
            </div>
        </div>
    `;

const getProvinceRating = (proAqi: Aqi) => {
    if (0 < proAqi && proAqi <= 50) return AqiRange[0];
    if (50 < proAqi && proAqi <= 100) return AqiRange[1];
    if (100 < proAqi && proAqi <= 150) return AqiRange[2];
    if (150 < proAqi && proAqi <= 200) return AqiRange[3];
    if (200 < proAqi && proAqi <= 300) return AqiRange[4];
    if (300 < proAqi) return AqiRange[5];
    // for null(0) and undefined(NaN)
    return AqiRange[6];
};
