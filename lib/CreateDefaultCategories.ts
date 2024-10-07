import prisma from "./db";

async function createDefaultCategories() {
    const categories = ['Technology', 'Health', 'Finance', 'Education', 'Travel'];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
        });
    }
}
