import { Observable } from "rxjs";

export interface IShot {
    id: number;
    userId: number;
    amount: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface IShotResponseData<T> {
    message: string;
    statusCode: number;
    data: T
}

export interface CreateShotDto {
    userId: number;
    amount: number;
}

export interface UpdateShotDto extends CreateShotDto {
    id: number;
}

export interface IShotService {
    create(createShotDto: CreateShotDto): Observable<IShotResponseData<IShot>>
    findAll({}): Observable<IShotResponseData<Array<IShot>>>
    findOne({id}: {id:number}): Observable<IShotResponseData<IShot>>
    update(updateShotDto: UpdateShotDto): Observable<IShotResponseData<IShot>>
    remove({id}: {id:number}): Observable<IShotResponseData<IShot>>
}