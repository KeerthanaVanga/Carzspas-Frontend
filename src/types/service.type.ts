export interface Service {
  id: number;
  name: string;
  url?: string;
  images: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
}
