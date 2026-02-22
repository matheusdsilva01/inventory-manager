import { TableCell, TableRow } from "@/components/ui/table"

interface EmptyStateProps {
  colSpan: number
  message: string
}

export function EmptyState({ colSpan, message }: EmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  )
}
