import { Box, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import CampaignLeadsTable from "../components/campaign-leads/CampaignLeadsTable";
import CampaignLeadsFilters from "../components/campaign-leads/CampaignLeadsFilters";
import type { CampaignLead } from "../types/campaign-leads-types";

export default function CampaignLeadsPage() {
  const [leads, setLeads] = useState<CampaignLead[]>([]);
  const [loading, setLoading] = useState(true);

  const [campaign, setCampaign] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLeads([
        {
          id: 1,
          campaign_name: "Ceramic Offer",
          name: "Ravi Kumar",
          phone_number: "9876543210",
          car_type: "SUV",
          car_brand: "Hyundai",
          car_model: "Creta",
          car_year: 2023,
          preferred_date: "2026-02-27",
          preferred_time: "10:30 AM",
          user_intent: "Ceramic Coating",
          lead_status: "Cold",
          notes: "Interested this weekend",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 1,
          campaign_name: "Ceramic Offer",
          name: "Ravi Kumar",
          phone_number: "9876543210",
          car_type: "SUV",
          car_brand: "Hyundai",
          car_model: "Creta",
          car_year: 2023,
          preferred_date: "2026-02-27",
          preferred_time: "10:30 AM",
          user_intent: "Ceramic Coating",
          lead_status: "Warm",
          notes: "Interested this weekend",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 1,
          campaign_name: "Ceramic Offer",
          name: "Ravi Kumar",
          phone_number: "9876543210",
          car_type: "SUV",
          car_brand: "Hyundai",
          car_model: "Creta",
          car_year: 2023,
          preferred_date: "2026-02-27",
          preferred_time: "10:30 AM",
          user_intent: "Ceramic Coating",
          lead_status: "Hot",
          notes: "Interested this weekend",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesCampaign =
        campaign === "" || lead.campaign_name === campaign;
      const matchesStatus = status === "" || lead.lead_status === status;
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone_number.includes(search);

      return matchesCampaign && matchesStatus && matchesSearch;
    });
  }, [leads, campaign, status, search]);

  const campaignsList = [...new Set(leads.map((l) => l.campaign_name))];

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Campaign Leads
      </Typography>

      <CampaignLeadsFilters
        campaign={campaign}
        status={status}
        search={search}
        campaigns={campaignsList}
        onChange={(field, value) => {
          if (field === "campaign") setCampaign(value);
          if (field === "status") setStatus(value);
          if (field === "search") setSearch(value);
        }}
      />

      <CampaignLeadsTable data={filteredLeads} loading={loading} />
    </Box>
  );
}
