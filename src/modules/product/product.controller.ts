import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ProductTenantEntity} from "./entity/product.tenant.entity";
import {Request} from "express"
import {RoleGuard} from "../../common/guards/role.guard";
import {JwtAuthGuard} from "../../common/guards/jwt.auth.guard";

@Controller('tenant/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    async create(
        @Req() req: Request,
        @Body() body: Partial<ProductTenantEntity>) {
        return this.productService.createProduct(req, body);
    }

    @Get()
    async findAll(@Req() req: Request) {
        return this.productService.getAllProducts(req);
    }

    @Get(':id')
    async findOne(
        @Req() req: Request,
        @Param('id') id: number
    ) {
        const products = await this.productService.getAllProducts(req);
        return products.find(p => p.id === id);
    }

    @Put(':id')
    async update(
        @Req() req: Request,
        @Param('id') id: number,
        @Body() body: Partial<ProductTenantEntity>,
    ) {
        return this.productService.updateProduct(req, id, body);
    }

    @Delete(':id')
    async remove(
        @Req() req: Request,
        @Param('id') id: number
    ) {
        return this.productService.deleteProduct(req, id);
    }
}
