import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  getCampaignLeads,
  updateLeadStatus,
  type GetCampaignLeadsParams,
  type CampaignLeadsResponse,
  getCampaignNames,
} from "../api/campaignLeads.api";

export const useCampaignLeads = (params: GetCampaignLeadsParams) => {
  return useQuery<CampaignLeadsResponse>({
    queryKey: ["campaign-leads", params],
    queryFn: () => getCampaignLeads(params),
    placeholderData: keepPreviousData,
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLeadStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaign-leads"],
      });
    },
  });
};

export const useCampaignNames = () => {
  return useQuery<string[]>({
    queryKey: ["campaign-names"],
    queryFn: getCampaignNames,
  });
};
