import { createApi } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosRequestConfig } from "axios"
import { api as axiosInstance } from "@/lib/axios"
import type {
    Product,
    ProductResponse,
    CreateProduct,
    UpdateProduct,
    RawMaterial,
    CreateRawMaterial,
    UpdateRawMaterial,
    RecipeResponse,
    CreateRecipe,
    RecipeItemInput,
} from "@/types"

const axiosBaseQuery: BaseQueryFn<AxiosRequestConfig, unknown, string> = async (config) => {
    try {
        const result = await axiosInstance(config)
        return { data: result.data }
    } catch (error) {
        const err = error as Error
        return { error: err.message }
    }
}

export const inventoryApi = createApi({
    reducerPath: "inventoryApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Products", "RawMaterials", "Recipes"],
    endpoints: (builder) => ({
        // ── Products ───────────────────────────────────────────
        getProducts: builder.query<Product[], void>({
            query: () => ({ url: "/products", method: "get" }),
            providesTags: ["Products"],
        }),

        getProductRecipe: builder.query<RecipeResponse, string>({
            query: (id) => ({ url: `/products/${id}/recipe`, method: "get" }),
            providesTags: ["Recipes"],
        }),

        createProduct: builder.mutation<ProductResponse, CreateProduct>({
            query: (data) => ({ url: "/products", method: "post", data }),
            invalidatesTags: ["Products"],
        }),

        updateProduct: builder.mutation<ProductResponse, UpdateProduct>({
            query: ({ id, ...data }) => ({ url: `/products/${id}`, method: "put", data }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({ url: `/products/${id}`, method: "delete" }),
            invalidatesTags: ["Products"],
        }),

        // ── Raw Materials ──────────────────────────────────────
        getRawMaterials: builder.query<RawMaterial[], void>({
            query: () => ({ url: "/raw-materials", method: "get" }),
            providesTags: ["RawMaterials"],
        }),

        createRawMaterial: builder.mutation<RawMaterial, CreateRawMaterial>({
            query: (data) => ({ url: "/raw-materials", method: "post", data }),
            invalidatesTags: ["RawMaterials"],
        }),

        updateRawMaterial: builder.mutation<RawMaterial, UpdateRawMaterial>({
            query: ({ id, ...data }) => ({ url: `/raw-materials/${id}`, method: "put", data }),
            invalidatesTags: ["RawMaterials"],
        }),

        deleteRawMaterial: builder.mutation<void, string>({
            query: (id) => ({ url: `/raw-materials/${id}`, method: "delete" }),
            invalidatesTags: ["RawMaterials"],
        }),

        // ── Recipes ────────────────────────────────────────────
        getRecipes: builder.query<RecipeResponse[], void>({
            query: () => ({ url: "/recipes", method: "get" }),
            providesTags: ["Recipes"],
        }),

        getRecipeById: builder.query<RecipeResponse, string>({
            query: (id) => ({ url: `/recipes/${id}`, method: "get" }),
            providesTags: (_result, _error, id) => [{ type: "Recipes" as const, id }],
        }),

        createRecipe: builder.mutation<RecipeResponse, CreateRecipe>({
            query: (data) => ({ url: "/recipes", method: "post", data }),
            invalidatesTags: ["Recipes", "Products"],
        }),

        addRecipeItem: builder.mutation<RecipeResponse, { recipeId: string; item: RecipeItemInput }>({
            query: ({ recipeId, item }) => ({
                url: `/recipes/${recipeId}/items`,
                method: "post",
                data: item,
            }),
            invalidatesTags: ["Recipes"],
        }),

        removeRecipeItem: builder.mutation<RecipeResponse, { recipeId: string; rawMaterialId: string }>({
            query: ({ recipeId, rawMaterialId }) => ({
                url: `/recipes/${recipeId}/items/${rawMaterialId}`,
                method: "delete",
            }),
            invalidatesTags: ["Recipes"],
        }),

        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({ url: `/recipes/${id}`, method: "delete" }),
            invalidatesTags: ["Recipes"],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetProductRecipeQuery,
    useLazyGetProductRecipeQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetRawMaterialsQuery,
    useCreateRawMaterialMutation,
    useUpdateRawMaterialMutation,
    useDeleteRawMaterialMutation,
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useAddRecipeItemMutation,
    useRemoveRecipeItemMutation,
    useDeleteRecipeMutation,
} = inventoryApi
