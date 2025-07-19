import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: number): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
