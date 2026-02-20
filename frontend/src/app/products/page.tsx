"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, CookingPot, MoreHorizontal } from "lucide-react"
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
    useGetProductsQuery,
    useGetProductRecipeQuery,
    useLazyGetProductRecipeQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from "@/store/api"
import type { Product, CreateProduct, UpdateProduct } from "@/types"
import { ProductFormDialog } from "@/components/pages/products/form-dialog"
import { ProductDeleteDialog } from "@/components/pages/products/delete-dialog"
import { RecipeDetailDialog } from "@/components/pages/recipes/detail-dialog"

export default function ProductsPage() {
    const { data = [], isLoading: loading } = useGetProductsQuery()
    const [createProduct] = useCreateProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    // Form dialog
    const [formOpen, setFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    // Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

    // Recipe dialog — subscribe to auto-refresh after mutations
    const [recipeProductId, setRecipeProductId] = useState<string | null>(null)
    const [recipeOpen, setRecipeOpen] = useState(false)
    const [triggerRecipe] = useLazyGetProductRecipeQuery()
    const { data: recipeData = null } = useGetProductRecipeQuery(recipeProductId ?? "", {
        skip: !recipeProductId,
    })

    const handleCreate = () => {
        setEditingProduct(null)
        setFormOpen(true)
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setFormOpen(true)
    }

    const handleDelete = (product: Product) => {
        setDeletingProduct(product)
        setDeleteOpen(true)
    }

    const handleViewRecipe = async (product: Product) => {
        try {
            await triggerRecipe(product.id).unwrap()
            setRecipeProductId(product.id)
            setRecipeOpen(true)
        } catch {
            toast.error("Este produto não possui uma receita cadastrada.")
        }
    }

    const handleSubmit = async (formData: CreateProduct | UpdateProduct) => {
        if ("id" in formData) {
            await updateProduct(formData as UpdateProduct).unwrap()
            toast.success("Produto atualizado com sucesso")
        } else {
            await createProduct(formData as CreateProduct).unwrap()
            toast.success("Produto criado com sucesso")
        }
    }

    const handleConfirmDelete = async () => {
        if (!deletingProduct) return
        await deleteProduct(deletingProduct.id).unwrap()
        toast.success("Produto excluído com sucesso")
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie os produtos do seu estoque
                    </p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Produto
                </Button>
            </div>

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
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                    Nenhum produto cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((product) => (
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
                                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleViewRecipe(product)}>
                                                    <CookingPot className="mr-2 h-4 w-4" />
                                                    Ver Receita
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(product)}
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

            {/* Form Dialog */}
            <ProductFormDialog
                key={formOpen ? (editingProduct?.id ?? "new") : "closed"}
                open={formOpen}
                onOpenChange={setFormOpen}
                product={editingProduct}
                onSubmit={handleSubmit}
            />

            {/* Delete Dialog */}
            {deletingProduct && (
                <ProductDeleteDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    productName={deletingProduct.name}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {/* Recipe Dialog — auto-refreshes via RTK Query tag invalidation */}
            <RecipeDetailDialog
                open={recipeOpen}
                onOpenChange={(open) => {
                    setRecipeOpen(open)
                    if (!open) setRecipeProductId(null)
                }}
                recipe={recipeData}
                onUpdate={() => {}}
            />
        </div>
    )
}
