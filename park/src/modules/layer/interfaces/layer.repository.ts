import { Layer } from "../entities/layer.entity";

export interface ILayerRepository {
    create(layerEntity: Layer): Promise<Layer>
    findAll():Promise<Array<Layer>>
    findOne(id: number): Promise<Layer>
    update(layerEntity: Layer): Promise<Layer>
    remove(id: number): Promise<Layer>
}