export interface CampaignLead {
  id: number;
  campaign_name: string;
  name: string;
  phone_number: string;
  car_type?: string;
  car_brand?: string;
  car_model?: string;
  car_year?: number;
  preferred_date?: string;
  preferred_time?: string;
  user_intent?: string;
  lead_status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
