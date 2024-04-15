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
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const selectedCategory = searchParam.get('category') ?? "";
    const [isMounted, setIsMounted] = useState(false);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`/api/browse?category=${selectedCategory}`);
            console.log(response);
        } catch (error: any | Error) {
            setIsSearchLoading(false)
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsSearchLoading(false)
        }
    };

    useEffect(() => {
        if (selectedCategory && isMounted) {
            fetchCourseData();
        } else {
            setIsMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory])

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
                            router.push(`/browse/?category=${category.id}`)
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
