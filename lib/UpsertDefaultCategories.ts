import { createCategory } from "@/actions/categories";

export async function upsertDefaultCategories() {
    const defaultCategories = [
        { id: "1", name: "Technology" },
        { id: "2", name: "Lifestyle" },
        { id: "3", name: "Health" },
        { id: "4", name: "Finance" }
    ];

    for (const category of defaultCategories) {
        try {
            await createCategory(category.id, category.name);
        } catch (error) {
            console.error(`Error upserting category ${category.name}:`, error);
        }
    }
}
