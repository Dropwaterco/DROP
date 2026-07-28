import clientPromise from '@/lib/mongodb';
import type { Collection, WithId } from 'mongodb';
import { BusinessEnquiryRecord, CreateBusinessEnquiryDto } from './business-enquiry.types';

type BusinessEnquiryDocument = Omit<BusinessEnquiryRecord, 'id'> & { id?: string };

export class BusinessEnquiryRepository {
  private async getCollection(): Promise<Collection<BusinessEnquiryDocument>> {
    const client = await clientPromise;
    return client.db('Drop').collection<BusinessEnquiryDocument>('b2b_leads');
  }

  private toRecord(document: WithId<BusinessEnquiryDocument>): BusinessEnquiryRecord {
    return {
      id: document.id || document._id.toHexString(),
      businessName: document.businessName,
      contactName: document.contactName,
      email: document.email,
      phone: document.phone,
      businessType: document.businessType,
      city: document.city,
      monthlyRequirement: document.monthlyRequirement,
      message: document.message,
      enquirySource: document.enquirySource,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  /**
   * Find a B2B enquiry created recently to prevent spam/accidental clicks
   */
  public async findRecent(
    email: string,
    businessName: string,
    since: Date
  ): Promise<BusinessEnquiryRecord | null> {
    const collection = await this.getCollection();
    const document = await collection.findOne({
      email: email.trim().toLowerCase(),
      businessName: businessName.trim(),
      createdAt: { $gte: since },
    }, {
      collation: { locale: 'en', strength: 2 },
    });
    return document ? this.toRecord(document) : null;
  }

  /**
   * Create a new B2B enquiry record
   */
  public async create(
    dto: CreateBusinessEnquiryDto
  ): Promise<BusinessEnquiryRecord> {
    const now = new Date();
    const document: BusinessEnquiryDocument = {
      businessName: dto.businessName.trim(),
      contactName: dto.contactName.trim(),
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone || null,
      businessType: dto.businessType.trim(),
      city: dto.city || null,
      monthlyRequirement: dto.monthlyRequirement || null,
      message: dto.message || null,
      enquirySource: dto.enquirySource,
      status: dto.status || 'new',
      createdAt: now,
      updatedAt: now,
    };
    const collection = await this.getCollection();
    const result = await collection.insertOne(document);
    return this.toRecord({ ...document, _id: result.insertedId });
  }
}

export const businessEnquiryRepository = new BusinessEnquiryRepository();
