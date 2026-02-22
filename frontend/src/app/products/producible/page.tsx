"use client"

import { PackageCheck } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useGetProducibleProductsQuery } from "@/store/api"
import { formatPrice } from "@/lib/utils"
import { PageHeader } from "@/components/common/page-header"
import { TableSkeleton } from "@/components/common/table-skeleton"
import { EmptyState } from "@/components/common/empty-state"

export default function ProducibleProductsPage() {
  const { data = [], isLoading: loading } = useGetProducibleProductsQuery()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Produtos Produzíveis"
        description="Produtos com receita e estoque suficiente para produção"
        icon={<PackageCheck className="h-8 w-8 text-violet-600 dark:text-violet-400" />}
      />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Qtd produzível</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={["w-40", "w-24", "w-20", "w-12 ml-auto"]} />
            ) : data.length === 0 ? (
              <EmptyState colSpan={4} message="Nenhum produto disponível para produção." />
            ) : (
              data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {product.code}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {product.maxProducibleUnits}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
