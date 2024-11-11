import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    create(@Body('name') name: string) {
        return this.itemsService.create(name);
    }

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('name') name: string) {
        return this.itemsService.update(+id, name);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.itemsService.remove(+id);
    }
}