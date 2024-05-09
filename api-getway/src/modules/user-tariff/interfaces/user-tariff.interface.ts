export interface IUserTariff {
    id: number;
    userId: number;
    tariffId: number;
    startedAt: Date;
    endedAt: Date;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface IUserTariffResponseData {
    message: string;
    statusCode: number;
    data: IUserTariff;
}