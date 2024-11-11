import { Injectable } from '@nestjs/common';
import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ItemsService {
    async create(name: string): Promise<Item> {
        return prisma.item.create({
            data: { name },
        });
    }

    async findAll(): Promise<Item[]> {
        return prisma.item.findMany();
    }

    async findOne(id: number): Promise<Item | null> {
        return prisma.item.findUnique({ where: { id } });
    }

    async update(id: number, name: string): Promise<Item> {
        return prisma.item.update({
            where: { id },
            data: { name },
        });
    }

    async remove(id: number): Promise<Item> {
        return prisma.item.delete({ where: { id } });
    }
}