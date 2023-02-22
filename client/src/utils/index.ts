// router manager
import { MYGITHUB, DISTRIBUTIONMAP, URBANCOMPARISON } from '@/constants';
import { AqiRange, Color, type Aqi } from '@/types';
import type { Router } from 'vue-router';
export const routerManager = (router: Router, keyPath: string[]) => {
    switch (keyPath[0]) {
        case MYGITHUB:
            window.location.href = 'https://github.com/lbsmx/graduation-design';
            return '';
        case DISTRIBUTIONMAP:
            router.push(`/${DISTRIBUTIONMAP}`);
            return DISTRIBUTIONMAP;
        case URBANCOMPARISON:
            router.push(`/${URBANCOMPARISON}`);
            return URBANCOMPARISON;
        default:
            return '';
    }
};

// generate color according to the aqi
export const generateColor = (proAqi: Aqi) => {
    const range: AqiRange = getAqiRange(proAqi);
    const { color, aqi } = getLimitColorByRange(range);
    const [startColor, endColor] = color;
    const [startAqi, endAqi] = aqi;
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);
    const r = Math.floor(
        ((endRgb[0] - startRgb[0]) * (proAqi - startAqi)) /
            (endAqi - startAqi) +
            startRgb[0]
    );
    const g = Math.floor(
        ((endRgb[1] - startRgb[1]) * (proAqi - startAqi)) /
            (endAqi - startAqi) +
            startRgb[1]
    );
    const b = Math.floor(
        ((endRgb[2] - startRgb[2]) * (proAqi - startAqi)) /
            (endAqi - startAqi) +
            startRgb[2]
    );
    if (isNaN(r) || isNaN(g) || isNaN(b)) return '#ffffff';
    const currentColor = `#${
        r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16)
    }${g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16)}${
        b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16)
    }
    `;
    return currentColor;
};

// hex to rgb
type Hex = string;
const hexToRgb = (hex: Hex) => {
    const rgb: number[] = [];
    for (let i: number = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)));
    }
    return rgb;
};

// get the range by aqi
const getAqiRange = (proAqi: Aqi): AqiRange => {
    if (0 < proAqi && proAqi <= 50) return AqiRange['Excellent'];
    if (50 < proAqi && proAqi <= 100) return AqiRange['Good'];
    if (100 < proAqi && proAqi <= 150) return AqiRange['Mild'];
    if (150 < proAqi && proAqi <= 200) return AqiRange['Moderate'];
    if (200 < proAqi && proAqi <= 300) return AqiRange['Severe'];
    if (300 < proAqi) return AqiRange['Serious'];
    // for null(0) and undefined(NaN)
    return AqiRange['None'];
};

// get the start color and end color by range
const getLimitColorByRange = (range: AqiRange) => {
    switch (range) {
        case 0:
            return {
                color: [Color['Excellent'], Color['Good']],
                aqi: [0, 50],
            };
        case 1:
            return {
                color: [Color['Good'], Color['Mild']],
                aqi: [50, 100],
            };
        case 2:
            return {
                color: [Color['Mild'], Color['Moderate']],
                aqi: [100, 150],
            };
        case 3:
            return {
                color: [Color['Moderate'], Color['Severe']],
                aqi: [150, 200],
            };
        case 4:
            return {
                color: [Color['Severe'], Color['Serious']],
                aqi: [200, 300],
            };
        case 5:
            return {
                color: [Color['Serious'], '#ff0000'],
                aqi: [300, 500],
            };
        default:
            return {
                color: [Color['None'], Color['None']],
                aqi: [0, 0],
            };
    }
};
