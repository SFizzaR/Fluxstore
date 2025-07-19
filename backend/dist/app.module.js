"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const order_module_1 = require("./order/order.module");
const user_entity_1 = require("./users/entities/user.entity");
const products_module_1 = require("./products/products.module");
const product_entity_1 = require("./products/entities/product.entity");
const order_entity_1 = require("./order/entities/order.entity");
const order_items_module_1 = require("./order-items/order-items.module");
const order_item_entity_1 = require("./order-items/entities/order-item.entity");
const user_address_module_1 = require("./user-address/user-address.module");
const user_address_entity_1 = require("./user-address/entities/user-address.entity");
const user_card_module_1 = require("./user-card/user-card.module");
const user_card_entity_1 = require("./user-card/entities/user-card.entity");
const passport_1 = require("@nestjs/passport");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Internship18@',
                database: 'nestjs_mysql',
                entities: [violation_entity_1.Violation, user_entity_1.User, product_entity_1.Product, order_entity_1.Orders, order_item_entity_1.OrderItem, user_address_entity_1.UserAddress, user_card_entity_1.UserCard],
                synchronize: true,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            violations_module_1.ViolationsModule,
            users_module_1.UsersModule,
            order_module_1.OrderModule,
            products_module_1.ProductsModule,
            order_items_module_1.OrderItemsModule,
            user_address_module_1.UserAddressModule,
            user_card_module_1.UserCardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map