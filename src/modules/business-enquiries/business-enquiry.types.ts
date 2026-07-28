export interface BusinessEnquiryRecord {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  businessType: string;
  city: string | null;
  monthlyRequirement: string | null;
  message: string | null;
  enquirySource: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBusinessEnquiryDto {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  businessType: string;
  city?: string | null;
  monthlyRequirement?: string | null;
  message?: string | null;
  enquirySource: string;
  status?: string;
}
