import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productRepository;
    private datasource;
    constructor(productRepository: Repository<Product>, datasource: DataSource);
    create(createProductDto: CreateProductDto): any;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
