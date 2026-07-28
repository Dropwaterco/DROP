import clientPromise from '@/lib/mongodb';
import { ObjectId, type Collection, type WithId } from 'mongodb';
import { ConsumerLeadRecord, CreateLeadDto } from './waitlist.types';

type ConsumerLeadDocument = Omit<ConsumerLeadRecord, 'id'> & { id?: string };

export class WaitlistRepository {
  private async getCollection(): Promise<Collection<ConsumerLeadDocument>> {
    const client = await clientPromise;
    return client.db('Drop').collection<ConsumerLeadDocument>('waitlist');
  }

  private toRecord(document: WithId<ConsumerLeadDocument>): ConsumerLeadRecord {
    return {
      id: document.id || document._id.toHexString(),
      name: document.name || null,
      email: document.email,
      city: document.city || null,
      drinkContext: document.drinkContext || null,
      leadSource: document.leadSource || 'homepage_waitlist',
      status: document.status || 'active',
      utmSource: document.utmSource || null,
      utmMedium: document.utmMedium || null,
      utmCampaign: document.utmCampaign || null,
      consentAt: document.consentAt || document.createdAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt || document.createdAt,
    };
  }

  /**
   * Find a lead by email address (case-insensitive lookup by lowercasing input)
   */
  public async findByEmail(email: string): Promise<ConsumerLeadRecord | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const collection = await this.getCollection();
    const document = await collection.findOne({ email: normalizedEmail });
    return document ? this.toRecord(document) : null;
  }

  /**
   * Create a new lead record
   */
  public async create(dto: CreateLeadDto): Promise<ConsumerLeadRecord> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const now = new Date();
    const document: ConsumerLeadDocument = {
      name: dto.name || null,
      email: normalizedEmail,
      city: dto.city || null,
      drinkContext: dto.drinkContext || null,
      leadSource: dto.leadSource,
      utmSource: dto.utmSource || null,
      utmMedium: dto.utmMedium || null,
      utmCampaign: dto.utmCampaign || null,
      status: dto.status || 'active',
      consentAt: now,
      createdAt: now,
      updatedAt: now,
    };
    const collection = await this.getCollection();
    const result = await collection.insertOne(document);
    return this.toRecord({ ...document, _id: result.insertedId });
  }

  /**
   * Update an existing lead record
   */
  public async update(
    id: string,
    data: Partial<Omit<CreateLeadDto, 'email'>>
  ): Promise<ConsumerLeadRecord> {
    const collection = await this.getCollection();
    const identifier = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { id };
    const update = Object.fromEntries(
      Object.entries({
        name: data.name,
        city: data.city,
        drinkContext: data.drinkContext,
        leadSource: data.leadSource,
        status: data.status,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        updatedAt: new Date(),
      }).filter(([, value]) => value !== undefined)
    );
    const document = await collection.findOneAndUpdate(
      identifier,
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!document) {
      throw new Error(`Waitlist lead not found: ${id}`);
    }
    return this.toRecord(document);
  }
}

export const waitlistRepository = new WaitlistRepository();
