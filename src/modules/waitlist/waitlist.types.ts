export interface ConsumerLeadRecord {
  id: string;
  name: string | null;
  email: string;
  city: string | null;
  drinkContext: string | null;
  leadSource: string;
  status: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  consentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLeadDto {
  name?: string;
  email: string;
  city?: string | null;
  drinkContext?: string | null;
  leadSource: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  status?: string;
}
