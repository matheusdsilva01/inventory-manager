"use client"

import { Plus, Pencil, Trash2, CookingPot, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { PageHeader } from "@/components/common/page-header"
import { TableSkeleton } from "@/components/common/table-skeleton"
import { EmptyState } from "@/components/common/empty-state"
import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog"
import { ProductFormDialog } from "@/components/pages/products/form-dialog"
import { RecipeDetailDialog } from "@/components/pages/recipes/detail-dialog"
import { useProductsPage } from "@/hooks/use-products-page"

export default function ProductsPage() {
  const {
    products,
    loading,
    formDialog,
    deleteDialog,
    recipe,
    handleViewRecipe,
    handleSubmit,
    handleConfirmDelete,
  } = useProductsPage()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Produtos"
        description="Gerencie os produtos do seu estoque"
        action={
          <Button onClick={formDialog.openNew}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        }
      />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="w-17.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={["w-40", "w-24", "w-20", "w-8"]} />
            ) : products.length === 0 ? (
              <EmptyState colSpan={4} message="Nenhum produto cadastrado." />
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {product.code}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => formDialog.openWith(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewRecipe(product)}>
                          <CookingPot className="mr-2 h-4 w-4" />
                          Ver Receita
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteDialog.openWith(product)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormDialog
        key={formDialog.open ? (formDialog.item?.id ?? "new") : "closed"}
        open={formDialog.open}
        onOpenChange={formDialog.setOpen}
        product={formDialog.item}
        onSubmit={handleSubmit}
      />

      {deleteDialog.item && (
        <ConfirmDeleteDialog
          open={deleteDialog.open}
          onOpenChange={deleteDialog.setOpen}
          entityLabel="O produto"
          entityName={deleteDialog.item.name}
          onConfirm={handleConfirmDelete}
        />
      )}

      <RecipeDetailDialog
        open={recipe.open}
        onOpenChange={recipe.onOpenChange}
        recipe={recipe.data}
        onUpdate={() => {}}
      />
    </div>
  )
}
