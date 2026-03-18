export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bedrooms: number;
  hasOffice: boolean;
  preferredTime1: string;
  preferredTime2: string;
  preferredTime3: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  id?: string;
}
