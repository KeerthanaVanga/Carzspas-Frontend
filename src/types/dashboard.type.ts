export interface DashboardData {
  totalLeads: number;
  totalBookings: number;
  todayBookings: number;
  todayLeads: number;
  leadStatus: {
    name: string;
    value: number;
  }[];
  campaigns: {
    campaigns_name: string;
    value: number;
  }[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
