"use client"
import React, { useEffect, useState } from 'react'
import { Category } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'

interface CategoriesProps {
    categories: Category[]
}
const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    const router = useRouter();
    const searchParam = useSearchParams();
    const selectedCategory = searchParam.get('category') ?? "";
    const searchQuery = searchParam.get('search') ?? "";

    const handleClickOnCategory = (id: string) => {
        if (id === selectedCategory && searchQuery) {
            router.push(`/browse/?&search=${searchQuery}`)
            return
        } else if (id === selectedCategory && !searchQuery) {
            router.push(`/browse`)
            return
        }
        if (searchQuery) {
            router.push(`/browse/?category=${id}&search=${searchQuery}`)
        } else {
            router.push(`/browse/?category=${id}`)
        }
    }
    return (
        <>
            {
                categories.map((category) => (
                    <div
                        key={category.id}
                        className={
                            cn(
                                'border px-4 py-2 cursor-default rounded-sm bg-white ring-1 ring-neutral-500 hover:bg-black hover:text-white hover:ring-1 hover:ring-black transition duration-300',
                                searchParam.get('category') === category.id && 'bg-black text-white ring-black'
                            )
                        }
                        onClick={() => {
                            handleClickOnCategory(category.id)
                        }}
                    >
                        {category.name}
                    </div>
                ))
            }
        </>
    )
}

export default Categories
