import { Injectable } from '@nestjs/common';

import type { ICompany } from '@company/domain/entity/Company.interface';
import type {
  CompanyQuery,
  ICompanyRepository,
} from '@company/domain/repository/Company.repository.interface';

import { CompanyFactory } from '@company/domain/factory/Company.factory';

import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CompanyPrismaRepository implements ICompanyRepository {
  private static readonly DEFAULT_LIMIT = 50;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ICompany> {
    const foundCompany = await this.prisma.company.findUnique({
      where: { id },
      include: { evaluations: { include: { categories: true } } },
    });

    return CompanyFactory.createFromPersistence(foundCompany as any);
  }

  async search(query?: CompanyQuery): Promise<ICompany[]> {
    if (!query) {
      const companies = await this.prisma.company.findMany({
        include: { evaluations: { include: { categories: true } } },
        take: CompanyPrismaRepository.DEFAULT_LIMIT,
      });

      return companies.map((company) =>
        CompanyFactory.createFromPersistence(company as any),
      );
    }

    const { search, limit, offset } = query;
    const take = limit ? Number(limit) - (offset ? Number(offset) : 0) : 0;

    const companies = await this.prisma.company.findMany({
      where: {
        [search?.field]: { contains: search?.value, mode: 'insensitive' },
      },
      take: take ?? CompanyPrismaRepository.DEFAULT_LIMIT,
      include: { evaluations: { include: { categories: true } } },
    });

    return companies.map((company) =>
      CompanyFactory.createFromPersistence(company as any),
    );
  }

  async create(company: ICompany): Promise<void> {
    await this.prisma.company.create({
      data: {
        id: company.id,
        name: company.name,
        image: company.image,
        description: company.description,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      },
    });
  }

  async update(company: ICompany): Promise<void> {
    const evaluationsObj = company.evaluations.map((e) => e.toObject());
    const lastEvaluation = evaluationsObj[evaluationsObj.length - 1];

    const createEvaluation = this.prisma.evaluation.create({
      data: {
        id: lastEvaluation.id,
        companyId: company.id,
        workerId: lastEvaluation.workerId,
        comment: lastEvaluation.comment,
        createdAt: lastEvaluation.createdAt,
        updatedAt: lastEvaluation.updatedAt,
      },
      select: { id: true },
    });

    const createCategories = this.prisma.category.createMany({
      data: lastEvaluation.categories.map(({ id, name, rating }) => ({
        id,
        name,
        rating,
        evaluationId: lastEvaluation.id,
      })),
    });

    await this.prisma.$transaction([createEvaluation, createCategories]);
  }
}
