import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { Orders } from './order/entities/order.entity';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderItem } from './order-items/entities/order-item.entity';
import { UserAddressModule } from './user-address/user-address.module';
import { UserAddress } from './user-address/entities/user-address.entity';
import { UserCardModule } from './user-card/user-card.module';
import { UserCard } from './user-card/entities/user-card.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, //default port 
      username: 'root',
      password: 'Internship18@',
      database: 'nestjs_mysql',
      entities: [User, Product, Orders, OrderItem, UserAddress, UserCard],
      synchronize: true,
    }
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    OrderModule,
    ProductsModule,
    OrderItemsModule,
    UserAddressModule,
    UserCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
