import { Module } from '@nestjs/common';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { ShotModule } from './modules/shot/shot.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FileServiceModule } from './modules/file-service/file-service.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: '127.0.0.1', port: 6379 },
          ttl: 10 * 60 * 1000 /** 10 min */
        })

        return { store }
      }
    }),
    AuthModule,
    UserModule,
    UserTariffModule,
    UserDetailModule,
    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
    ShotModule,
    TransactionModule,
    FileServiceModule,
  ]
})
export class AppModule { }
