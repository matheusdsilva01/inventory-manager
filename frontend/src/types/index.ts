// ── Product ──────────────────────────────────────────────
export interface Product {
    id: string;
    name: string;
    code: string;
    price: number;
}

export interface ProductResponse {
    id: string;
    name: string;
    code: string;
    price: number;
    recipe: RecipeProductResponse | null;
}

export interface CreateProduct {
    name: string;
    code: string;
    price: number;
}

export interface UpdateProduct {
    id: string;
    name: string;
    code: string;
    price: number;
}

// ── Raw Material ─────────────────────────────────────────
export interface RawMaterial {
    id: string;
    name: string;
    code: string;
    quantity: number;
}

export interface CreateRawMaterial {
    name: string;
    code: string;
    quantity: number;
}

export interface UpdateRawMaterial {
    id: string;
    name: string;
    code: string;
    quantity: number;
}

// ── Recipe ────────────────────────────────────────────────
export interface RecipeResponse {
    id: string;
    productId: string;
    productName: string;
    recipeItems: RecipeItemResponse[];
}

export interface RecipeProductResponse {
    id: string;
    recipeItems: RecipeItemResponse[];
}

export interface RecipeItemResponse {
    rawMaterialId: string;
    rawMaterialName: string;
    rawMaterialCode: string;
    quantity: number;
}

export interface CreateRecipe {
    productId: string;
    recipeItems: RecipeItemInput[];
}

export interface RecipeItemInput {
    rawMaterialId: string;
    quantity: number;
}
