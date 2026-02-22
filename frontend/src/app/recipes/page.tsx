"use client"

import { Plus, Eye, Trash2, MoreHorizontal } from "lucide-react"
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
import { PageHeader } from "@/components/common/page-header"
import { TableSkeleton } from "@/components/common/table-skeleton"
import { EmptyState } from "@/components/common/empty-state"
import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog"
import { RecipeCreateDialog } from "@/components/pages/recipes/create-dialog"
import { RecipeDetailDialog } from "@/components/pages/recipes/detail-dialog"
import { useRecipesPage } from "@/hooks/use-recipes-page"

export default function RecipesPage() {
  const {
    recipes,
    loading,
    createDialog,
    deleteDialog,
    detail,
    handleViewDetail,
    handleCreateSubmit,
    handleConfirmDelete,
  } = useRecipesPage()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Receitas"
        description="Gerencie as receitas e seus itens"
        action={
          <Button onClick={createDialog.openNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Receita
          </Button>
        }
      />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-center">Itens</TableHead>
              <TableHead className="w-17.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={["w-48", "w-8 mx-auto", "w-8"]} />
            ) : recipes.length === 0 ? (
              <EmptyState colSpan={3} message="Nenhuma receita cadastrada." />
            ) : (
              recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">
                    {recipe.productName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">
                      {recipe.recipeItems.length}{" "}
                      {recipe.recipeItems.length === 1 ? "item" : "itens"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(recipe)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver / Editar Itens
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteDialog.openWith(recipe)}
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

      <RecipeCreateDialog
        key={createDialog.open ? "open" : "closed"}
        open={createDialog.open}
        onOpenChange={createDialog.setOpen}
        onSubmit={handleCreateSubmit}
      />

      <RecipeDetailDialog
        open={detail.open}
        onOpenChange={detail.onOpenChange}
        recipe={detail.data}
        onUpdate={() => {}}
      />

      {deleteDialog.item && (
        <ConfirmDeleteDialog
          open={deleteDialog.open}
          onOpenChange={deleteDialog.setOpen}
          entityLabel="A receita do produto"
          entityName={deleteDialog.item.productName}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
