import api from "../lib/axios-interceptor";

export interface CampaignLead {
  id: number;
  name: string;
  phone_number: string;
  car_brand: string;
  car_model: string;
  campaign_name: string;
  lead_status: string;
}

interface LeadsResponse {
  success: boolean;
  data: CampaignLead[];
}

export const getHotLeads = async () => {
  const res = await api.get<LeadsResponse>("/leads/hot");

  if (!res.data.success) {
    throw new Error("Failed to fetch hot leads");
  }

  return res.data.data;
};
