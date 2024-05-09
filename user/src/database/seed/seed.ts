import { typeormConfig } from 'src/common/config/database';
import { Role } from 'src/common/enums/role.enum';
import { hash } from 'src/lib/bcrypt';
import { UserDetail } from 'src/modules/user-detail/entities/user-detail.entity';
import { UserTariff } from 'src/modules/user-tariff/entities/user-tariff.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource, createConnection } from 'typeorm';


(async () => {
  const datasource: DataSource = await createConnection(typeormConfig);
  const queryRunner = datasource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const userRepository = queryRunner.manager.getRepository(User);
    const detailRepository = queryRunner.manager.getRepository(UserDetail);
    const tarifRepository = queryRunner.manager.getRepository(UserTariff);

    // All user data delete
    const users = await userRepository.find();
    await userRepository.remove(users);

    // All detail data delete
    const detail = await detailRepository.find();
    await detailRepository.remove(detail);

    // All tarif data delete
    const tarif = await tarifRepository.find();
    await tarifRepository.remove(tarif);

    const heshPassword1 = await hash('qwerty');
    const dto1 = {
      phone: '+998936931452',
      password: heshPassword1,
      parkId: 1,
      role: Role.CLIENT,
    };

    let user1 = userRepository.create(dto1);
    user1 = await userRepository.save(user1);


    const heshPassword2 = await hash('1234');
    const dto2 = {
      phone: '+998936931453',
      password: heshPassword2,
      parkId: 1,
      role: Role.OWNER,
    };

    let user2 = userRepository.create(dto2);
    user2 = await userRepository.save(user2);

    const heshPassword = await hash('dovudbek');
    const dto3 = {
      phone: '+998936931454',
      password: heshPassword,
      parkId: 1,
      role: Role.ADMIN,
    };


    let user3 = userRepository.create(dto3);
    user3 = await userRepository.save(user3);


    let detail1 = detailRepository.create({
      firstname: 'John',
      lastname: 'Doe',
      userId: 2,
    });
    detail1 = await detailRepository.save(detail1);

    let detail2 = detailRepository.create({
      firstname: 'Toshmet',
      lastname: 'Ahmad',
      userId: 2,
    });
    detail2 = await detailRepository.save(detail2);

    let detail3 = detailRepository.create({
      firstname: 'Dovudbek',
      lastname: 'O\'ktamov',
      userId: 3,
    });
    detail3 = await detailRepository.save(detail3);

    let tariff1 = tarifRepository.create({
      userId: 1,
      tariffId: 1,
      startedAt: '2024-05-09',
      endedAt: '2024-05-10',
    });
    tariff1 = await tarifRepository.save(tariff1);

    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err)
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();