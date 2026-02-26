import { TableRow, TableCell, Skeleton } from "@mui/material";

interface Props {
  columns: number;
}

export default function CampaignLeadsTableSkeleton({ columns }: Props) {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(columns)].map((__, i) => (
            <TableCell key={i}>
              <Skeleton variant="text" height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
