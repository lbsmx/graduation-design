export type ProvinceName = string;

export type CityName = string;

export type Aqi = number;

export type Rank = number | null;

export type AirData = string[];

export type Field = string;
export type Value = string;

export type DateStr = string;

export type Collection = Record<Field, Value>;

export type CityData = {
    cityName: CityName;
    data: Collection[];
};

export type CityAlias = {
    zh: CityName;
    value: CityName;
};

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
