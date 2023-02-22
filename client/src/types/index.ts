export type ProvinceName = string;

export type Aqi = number;

export type Rank = number | null;

export type AqiInfo = {
    aqi: Aqi;
    rank: Rank;
};

export type ProvinceAqiInfo = Record<string, AqiInfo>;

export enum AqiRange {
    Excellent,
    Good,
    Mild,
    Moderate,
    Severe,
    Serious,
    None,
}

export enum Color {
    Excellent = '#43ce17',
    Good = '#efdc31',
    Mild = '#ffaa00',
    Moderate = '#ff401a',
    Severe = '#d20040',
    Serious = '#9c0a4e',
    None = '#ffffff',
}
