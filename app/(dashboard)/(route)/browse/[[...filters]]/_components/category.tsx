import React from 'react'
import { Category } from '@prisma/client'
import { cn } from '@/lib/utils'
import Link from 'next/link';

interface CategoriesProps {
    categories: Category[];
    selectedCategory: string | undefined;
}
const Categories: React.FC<CategoriesProps> = ({ categories, selectedCategory }) => {

    return (
        <>
            {
                categories.map((category) => (
                    <Link
                        href={`/browse/${category.id}`}
                        key={category.id}
                        className={
                            cn(
                                'border px-4 py-2 cursor-default rounded-sm bg-white ring-1 ring-neutral-500 hover:bg-black hover:text-white hover:ring-1 hover:ring-black transition duration-300',
                                selectedCategory === category.id && 'bg-black text-white ring-black'
                            )
                        }
                    >
                        {category.name}
                    </Link>
                ))
            }
        </>
    )
}

export default Categories
