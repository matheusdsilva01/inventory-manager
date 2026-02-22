import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  rows?: number
  columns: string[]
}

export function TableSkeleton({ rows = 5, columns }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {columns.map((width, j) => (
            <TableCell key={j}>
              <Skeleton className={`h-5 ${width}`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
