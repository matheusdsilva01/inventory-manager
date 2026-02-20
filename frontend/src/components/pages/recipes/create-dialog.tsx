"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useGetProductsQuery, useGetRawMaterialsQuery } from "@/store/api"
import type { RecipeItemInput, CreateRecipe } from "@/types"

interface RecipeCreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateRecipe) => Promise<void>;
}

export function RecipeCreateDialog({
    open,
    onOpenChange,
    onSubmit,
}: RecipeCreateDialogProps) {
    const { data: productsList = [] } = useGetProductsQuery()
    const { data: materialsList = [] } = useGetRawMaterialsQuery()

    const [selectedProductId, setSelectedProductId] = useState("")
    const [items, setItems] = useState<(RecipeItemInput & { name: string; code: string })[]>(
        []
    )
    const [selectedMaterialId, setSelectedMaterialId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [loading, setLoading] = useState(false)

    const addItem = () => {
        if (!selectedMaterialId || !quantity) return
        const mat = materialsList.find((m) => m.id === selectedMaterialId)
        if (!mat) return
        if (items.some((i) => i.rawMaterialId === selectedMaterialId)) return

        setItems((prev) => [
            ...prev,
            {
                rawMaterialId: selectedMaterialId,
                quantity: parseFloat(quantity),
                name: mat.name,
                code: mat.code,
            },
        ])
        setSelectedMaterialId("")
        setQuantity("")
    }

    const removeItem = (rawMaterialId: string) => {
        setItems((prev) => prev.filter((i) => i.rawMaterialId !== rawMaterialId))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedProductId || items.length === 0) return
        setLoading(true)
        try {
            await onSubmit({
                productId: selectedProductId,
                recipeItems: items.map(({ rawMaterialId, quantity }) => ({
                    rawMaterialId,
                    quantity,
                })),
            })
            onOpenChange(false)
        } finally {
            setLoading(false)
        }
    }

    // Filter out materials already added
    const availableMaterials = materialsList.filter(
        (m) => !items.some((i) => i.rawMaterialId === m.id)
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Nova Receita</DialogTitle>
                    <DialogDescription>
                        Selecione o produto e adicione os itens necessários.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Product select */}
                    <div className="space-y-2">
                        <Label>Produto</Label>
                        <Select
                            value={selectedProductId}
                            onValueChange={setSelectedProductId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um produto" />
                            </SelectTrigger>
                            <SelectContent>
                                {productsList.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                        {p.name}{" "}
                                        <span className="text-muted-foreground ml-1">({p.code})</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Add item row */}
                    <div className="space-y-2">
                        <Label>Adicionar Item</Label>
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
                                type="button"
                                variant="secondary"
                                size="icon"
                                onClick={addItem}
                                disabled={!selectedMaterialId || !quantity}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Items list */}
                    {items.length > 0 && (
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
                                    {items.map((item) => (
                                        <TableRow key={item.rawMaterialId}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-mono text-xs">
                                                    {item.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right tabular-nums">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => removeItem(item.rawMaterialId)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !selectedProductId || items.length === 0}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Criar Receita
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
