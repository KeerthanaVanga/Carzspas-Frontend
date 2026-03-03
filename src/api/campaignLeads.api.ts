import api from "../lib/axios-interceptor";

/* -----------------------------
   Backend Lead Shape
------------------------------ */
export interface BackendCampaignLead {
  id: number;
  campaign_name: string;
  name: string;
  phone_number: string;
  car_type: string;
  car_brand: string;
  car_model: string;
  car_year: number;
  preferred_date: string;
  preferred_time: string;
  user_intent: string;
  lead_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

/* -----------------------------
   Query Params
------------------------------ */
export interface GetCampaignLeadsParams {
  page: number;
  limit: number;
  search?: string;
  lead_status?: string;
  campaign_name?: string;
  fromDate?: string;
  toDate?: string;
}

/* -----------------------------
   API Response
------------------------------ */
export interface CampaignLeadsResponse {
  success: boolean;
  message: string;
  data: BackendCampaignLead[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

/* -----------------------------
   Fetch Leads
------------------------------ */
export const getCampaignLeads = async (
  params: GetCampaignLeadsParams,
): Promise<CampaignLeadsResponse> => {
  const response = await api.get<CampaignLeadsResponse>("/campaign-leads", {
    params,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

/* -----------------------------
   Update Lead Status
------------------------------ */
export interface UpdateLeadStatusPayload {
  id: number;
  lead_status: string;
}

export const updateLeadStatus = async (
  payload: UpdateLeadStatusPayload,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.patch(`/campaign-leads/${payload.id}/status`, {
    lead_status: payload.lead_status,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const getCampaignNames = async (): Promise<string[]> => {
  const response = await api.get("/campaign-leads/campaigns");

  if (!response.data.success) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.data.data;
};
