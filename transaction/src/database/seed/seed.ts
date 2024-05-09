import { createConnection, DataSource } from 'typeorm';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { typeormConfig } from 'src/common/config/database';
import { Shot } from 'src/modules/shot/entities/shot.entity';

(async () => {
    const datasource: DataSource = await createConnection(typeormConfig);

    const queryRunner = datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const shotRepository = queryRunner.manager.getRepository(Shot);
        const transactionRepository = queryRunner.manager.getRepository(TransactionEntity);

        // All shot data delete
        const shot = await shotRepository.find();
        await shotRepository.remove(shot);

        // All transaction data delete
        const transaction = await transactionRepository.find();
        await transactionRepository.remove(transaction);

        // Create new shot data
        let shot1 = shotRepository.create({ userId: 1, amount: 200000 });
        shot1 = await shotRepository.save(shot1);

        let shot2 = shotRepository.create({ userId: 2, amount: 150000 });
        shot2 = await shotRepository.save(shot2);

        // Create new transaction data
        let transaction1 = transactionRepository.create({ shotCreditId: shot1.id, shotDebitId: shot2.id, serviceId: 1, amount: 50000 });
        transaction1 = await transactionRepository.save(transaction1);

        await queryRunner.commitTransaction();
    } catch (err) {
        console.log(err)
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
})();