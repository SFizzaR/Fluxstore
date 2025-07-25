import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private datasource: DataSource
  ) { }

  create(createProductDto: CreateProductDto) {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      this.productRepository.save(newProduct)
      return 'Product created';
    } catch (error) {
      return error;
    }
  }

    async findAll(pagenumber: number, pagesize: number): Promise<Product[]> {
    const res = await this.datasource.query(
      `CALL FetchPaginatedProducts(?, ?)`,
      [pagesize, pagenumber]
    );
    return res
  }

  async findOne(id: number): Promise<Product> {
    try {
      const query = `select * from product where Id = ?`
      const params: any[] = []
      params.push(id)
      return this.datasource.query(query, params)

    } catch (err) {
      return err
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
