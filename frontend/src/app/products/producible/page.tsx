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
import { Skeleton } from "@/components/ui/skeleton"
import { useGetProducibleProductsQuery } from "@/store/api"

export default function ProducibleProductsPage() {
    const { data = [], isLoading: loading } = useGetProducibleProductsQuery()

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3">
                    <PackageCheck className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Produtos Produzíveis
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Produtos com receita e estoque suficiente para produção
                        </p>
                    </div>
                </div>
            </div>

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
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton className="h-5 w-40" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-20" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-12 ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    Nenhum produto disponível para produção.
                                </TableCell>
                            </TableRow>
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
