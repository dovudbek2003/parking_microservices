import { Observable } from "rxjs";
import { CreateParkDto } from "../dto/create-park.dto";
import { UpdateParkDto } from "../dto/update-park.dto";

export interface IPark {
    id: number;
    name: string;
    owner: number;
    image: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface IParkResponseData<T> {
    message: string;
    statusCode: number;
    data: T
}

export interface IParkService {
    create(createParkDto: CreateParkDto): Observable<IParkResponseData<IPark>>
    findAll({ }): Observable<IParkResponseData<Array<IPark>>>
    findOne({ id }: { id: number }): Observable<IParkResponseData<IPark>>
    update(updateParkDto: UpdateParkDto): Observable<IParkResponseData<IPark>>
    remove({ id }: { id: number }): Observable<IParkResponseData<IPark>>
}