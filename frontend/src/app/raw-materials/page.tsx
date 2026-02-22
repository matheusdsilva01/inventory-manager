"use client"

import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react"
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
import { RawMaterialFormDialog } from "@/components/pages/raw-materials/form-dialog"
import { useRawMaterialsPage } from "@/hooks/use-raw-materials-page"

export default function RawMaterialsPage() {
  const {
    materials,
    loading,
    formDialog,
    deleteDialog,
    handleSubmit,
    handleConfirmDelete,
  } = useRawMaterialsPage()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Matérias-Primas"
        description="Gerencie as matérias-primas do seu estoque"
        action={
          <Button onClick={formDialog.openNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Matéria-Prima
          </Button>
        }
      />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="w-17.5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={["w-40", "w-24", "w-16 ml-auto", "w-8"]} />
            ) : materials.length === 0 ? (
              <EmptyState colSpan={4} message="Nenhuma matéria-prima cadastrada." />
            ) : (
              materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {material.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {material.quantity}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => formDialog.openWith(material)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteDialog.openWith(material)}
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

      <RawMaterialFormDialog
        key={formDialog.open ? (formDialog.item?.id ?? "new") : "closed"}
        open={formDialog.open}
        onOpenChange={formDialog.setOpen}
        material={formDialog.item}
        onSubmit={handleSubmit}
      />

      {deleteDialog.item && (
        <ConfirmDeleteDialog
          open={deleteDialog.open}
          onOpenChange={deleteDialog.setOpen}
          entityLabel="A matéria-prima"
          entityName={deleteDialog.item.name}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
