import { TableRow, TableCell, Skeleton } from "@mui/material";

export default function BookingsTableSkeleton({
  columns,
}: {
  columns: number;
}) {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(columns)].map((__, j) => (
            <TableCell key={j}>
              <Skeleton height={28} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
