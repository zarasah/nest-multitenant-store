import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ProductTenantEntity} from "./entity/product.tenant.entity";
import {JwtTenantAuthGuard} from "../../common/guards/jwt.tenant.auth.guard";
import {User} from "../../common/decorators/current.user.decorator";
import {CurrentTenantUser} from "../../common/types/current.tenant.user";

@Controller('tenant/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtTenantAuthGuard)
    @Post()
    async create(
        @User() user,
        @Body() body: Partial<ProductTenantEntity>) {
        return this.productService.createProduct(user, body);
    }

    @UseGuards(JwtTenantAuthGuard)
    @Get()
    async findAll(
        @User('schemaName') schemaName: string,
    ) {
        return this.productService.getAllProducts(schemaName);
    }

    @UseGuards(JwtTenantAuthGuard)
    @Get(':id')
    async findOne(
        @User() user: CurrentTenantUser,
        @Param('id') id: number
    ) {
        const products = await this.productService.getAllProducts(user.schemaName);
        return products.find(p => p.id === id);
    }

    @UseGuards(JwtTenantAuthGuard)
    @Put(':id')
    async update(
        @User() user: CurrentTenantUser,
        @Param('id') id: number,
        @Body() body: Partial<ProductTenantEntity>,
    ) {
        return this.productService.updateProduct(user, id, body);
    }

    @UseGuards(JwtTenantAuthGuard)
    @Delete(':id')
    async remove(
        @User() user: CurrentTenantUser,
        @Param('id') id: number
    ) {
        return this.productService.deleteProduct(user, id);
    }
}
