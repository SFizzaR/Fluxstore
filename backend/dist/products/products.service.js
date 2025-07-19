"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productRepository;
    datasource;
    constructor(productRepository, datasource) {
        this.productRepository = productRepository;
        this.datasource = datasource;
    }
    create(createProductDto) {
        try {
            const newProduct = this.productRepository.create(createProductDto);
            this.productRepository.save(newProduct);
            return 'Product created';
        }
        catch (error) {
            return error;
        }
    }
    async findAll() {
        return this.productRepository.find();
    }
    async findOne(id) {
        try {
            const query = `select * from product where Id = ?`;
            const params = [];
            params.push(id);
            return this.datasource.query(query, params);
        }
        catch (err) {
            return err;
        }
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], ProductsService);
//# sourceMappingURL=products.service.js.map