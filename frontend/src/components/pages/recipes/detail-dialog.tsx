"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useGetRawMaterialsQuery, useAddRecipeItemMutation, useRemoveRecipeItemMutation } from "@/store/api"
import type { RecipeResponse } from "@/types"

interface RecipeDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    recipe: RecipeResponse | null;
    onUpdate: () => void;
}

export function RecipeDetailDialog({
    open,
    onOpenChange,
    recipe,
    onUpdate,
}: RecipeDetailDialogProps) {
    const { data: materialsList = [] } = useGetRawMaterialsQuery()
    const [addRecipeItem] = useAddRecipeItemMutation()
    const [removeRecipeItem] = useRemoveRecipeItemMutation()

    const [selectedMaterialId, setSelectedMaterialId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [addingItem, setAddingItem] = useState(false)
    const [removingId, setRemovingId] = useState<string | null>(null)

    if (!recipe) return null

    const usedIds = new Set(recipe.recipeItems.map((i) => i.rawMaterialId))
    const availableMaterials = materialsList.filter((m) => !usedIds.has(m.id))

    const handleAddItem = async () => {
        if (!selectedMaterialId || !quantity) return
        setAddingItem(true)
        try {
            await addRecipeItem({
                recipeId: recipe.id,
                item: {
                    rawMaterialId: selectedMaterialId,
                    quantity: parseFloat(quantity),
                },
            }).unwrap()
            toast.success("Item adicionado")
            setSelectedMaterialId("")
            setQuantity("")
            onUpdate()
        } catch {
            toast.error("Erro ao adicionar item")
        } finally {
            setAddingItem(false)
        }
    }

    const handleRemoveItem = async (rawMaterialId: string) => {
        setRemovingId(rawMaterialId)
        try {
            await removeRecipeItem({ recipeId: recipe.id, rawMaterialId }).unwrap()
            toast.success("Item removido")
            onUpdate()
        } catch {
            toast.error("Erro ao remover item")
        } finally {
            setRemovingId(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Receita — {recipe.productName}</DialogTitle>
                    <DialogDescription>
                        Gerencie os itens desta receita.
                    </DialogDescription>
                </DialogHeader>

                {/* Current items */}
                {recipe.recipeItems.length > 0 ? (
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Código</TableHead>
                                    <TableHead className="text-right">Qtd</TableHead>
                                    <TableHead className="w-12.5" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recipe.recipeItems.map((item) => (
                                    <TableRow key={item.rawMaterialId}>
                                        <TableCell className="font-medium">
                                            {item.rawMaterialName}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {item.rawMaterialCode}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums">
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={() => handleRemoveItem(item.rawMaterialId)}
                                                disabled={removingId === item.rawMaterialId}
                                            >
                                                {removingId === item.rawMaterialId ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        Esta receita não possui itens.
                    </p>
                )}

                <Separator />

                {/* Add new item */}
                <div className="space-y-2">
                    <p className="text-sm font-medium">Adicionar item</p>
                    <div className="flex gap-2">
                        <Select
                            value={selectedMaterialId}
                            onValueChange={setSelectedMaterialId}
                        >
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Matéria-prima" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableMaterials.map((m) => (
                                    <SelectItem key={m.id} value={m.id}>
                                        {m.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="Qtd"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-24"
                        />
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleAddItem}
                            disabled={addingItem || !selectedMaterialId || !quantity}
                        >
                            {addingItem ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
