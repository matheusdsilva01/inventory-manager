"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
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
import { Skeleton } from "@/components/ui/skeleton"
import {
    useGetRawMaterialsQuery,
    useCreateRawMaterialMutation,
    useUpdateRawMaterialMutation,
    useDeleteRawMaterialMutation,
} from "@/store/api"
import type { RawMaterial, CreateRawMaterial, UpdateRawMaterial } from "@/types"
import { RawMaterialFormDialog } from "@/components/pages/raw-materials/form-dialog"
import { RawMaterialDeleteDialog } from "@/components/pages/raw-materials/delete-dialog"

export default function RawMaterialsPage() {
    const { data = [], isLoading: loading } = useGetRawMaterialsQuery()
    const [createRawMaterial] = useCreateRawMaterialMutation()
    const [updateRawMaterial] = useUpdateRawMaterialMutation()
    const [deleteRawMaterial] = useDeleteRawMaterialMutation()

    const [formOpen, setFormOpen] = useState(false)
    const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deletingMaterial, setDeletingMaterial] = useState<RawMaterial | null>(null)

    const handleCreate = () => {
        setEditingMaterial(null)
        setFormOpen(true)
    }

    const handleEdit = (material: RawMaterial) => {
        setEditingMaterial(material)
        setFormOpen(true)
    }

    const handleDelete = (material: RawMaterial) => {
        setDeletingMaterial(material)
        setDeleteOpen(true)
    }

    const handleSubmit = async (formData: CreateRawMaterial | UpdateRawMaterial) => {
        if ("id" in formData) {
            await updateRawMaterial(formData as UpdateRawMaterial).unwrap()
            toast.success("Matéria-prima atualizada com sucesso")
        } else {
            await createRawMaterial(formData as CreateRawMaterial).unwrap()
            toast.success("Matéria-prima criada com sucesso")
        }
    }

    const handleConfirmDelete = async () => {
        if (!deletingMaterial) return
        await deleteRawMaterial(deletingMaterial.id).unwrap()
        toast.success("Matéria-prima excluída com sucesso")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Matérias-Primas</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie as matérias-primas do seu estoque
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Matéria-Prima
                </Button>
            </div>

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
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                    Nenhuma matéria-prima cadastrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((material) => (
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
                                                <DropdownMenuItem onClick={() => handleEdit(material)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(material)}
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
                key={formOpen ? (editingMaterial?.id ?? "new") : "closed"}
                open={formOpen}
                onOpenChange={setFormOpen}
                material={editingMaterial}
                onSubmit={handleSubmit}
            />

            {deletingMaterial && (
                <RawMaterialDeleteDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    materialName={deletingMaterial.name}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    )
}
