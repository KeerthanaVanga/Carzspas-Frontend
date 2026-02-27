import { TableRow, TableCell, Skeleton } from "@mui/material";

interface Props {
  columns: number;
}

export default function UsersTableSkeleton({ columns }: Props) {
  return (
    <>
      {[...Array(6)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(columns)].map((__, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
