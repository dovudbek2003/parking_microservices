export interface ITariff {
    id: number;
    name: string;
    price: number;
    time: number;
    parkId: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface ITariffResponseData {
    message: string;
    statusCode: number;
    data: ITariff
}