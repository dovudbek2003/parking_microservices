import { typeormConfig } from 'src/common/config/database';
import { Layer } from 'src/modules/layer/entities/layer.entity';
import { Park } from 'src/modules/park/entities/park.entity';
import { Place } from 'src/modules/place/entities/place.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Tariff } from 'src/modules/tariff/entities/tariff.entity';
import { createConnection, DataSource } from 'typeorm';

(async () => {
    const datasource: DataSource = await createConnection(typeormConfig);
    const queryRunner = datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const parkRepository = queryRunner.manager.getRepository(Park);
        const layerRepository = queryRunner.manager.getRepository(Layer);
        const placeRepository = queryRunner.manager.getRepository(Place);
        const serviceRepository = queryRunner.manager.getRepository(Service);
        const tariffRepository = queryRunner.manager.getRepository(Tariff);

        // All Park data delete
        const park = await parkRepository.find();
        await parkRepository.remove(park);

        // All Layer data delete
        const layer = await layerRepository.find();
        await layerRepository.remove(layer);

        // All Place data delete
        const place = await placeRepository.find();
        await placeRepository.remove(place);

        // All Service data delete
        const service = await serviceRepository.find();
        await serviceRepository.remove(service);

        // All Tariff data delete
        const tariff = await tariffRepository.find();
        await tariffRepository.remove(tariff);


        let park1 = parkRepository.create({ name: 'Parking', owner: 1, image: 1 });
        park1 = await parkRepository.save(park1);

        let layer1 = layerRepository.create({ name: 'Layer Pro', floor: 1, parkId: park1.id });
        layer1 = await layerRepository.save(layer1);

        let place1 = placeRepository.create({ name: 'vip', layerId: layer1.id, price: 2000 });
        place1 = await placeRepository.save(place1);

        let tariff1 = tariffRepository.create({ name: 'standart', parkId: park1.id, price: 50000, time: 12 });
        tariff1 = await tariffRepository.save(tariff1);

        let service1 = serviceRepository.create({ parkId: park1.id, userId: 1, startedAt: '2024-05-09', endedAt: '2024-05-15', price: 50000, tariffId: tariff1.id });
        service1 = await serviceRepository.save(service1);

        await queryRunner.commitTransaction();
    } catch (err) {
        console.log(err)
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
})();