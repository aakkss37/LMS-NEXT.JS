"use client"
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';


const Search: React.FC<{ params: { filters: string[] }, searchParams: { [key: string]: string } }> = ({ params, searchParams }) => {
    const [searchInput, setSearchInput] = React.useState(searchParams.s ?? '')
    const debounceValue = useDebounce(searchInput, 500);
    const [isMounted, setIsMounted] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isMounted) {
            if (debounceValue) {
                if (params.filters) {
                    router.push(`/browse/${params.filters[0]}?s=${debounceValue}`)
                } else {
                    router.push(`/browse?s=${debounceValue}`)
                }
            } else {
                if (params.filters) {
                    router.push(`/browse/${params.filters[0]}`)
                } else {
                    router.push(`/browse`)
                }
            }
        }
        setIsMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])

    return (
        <div className='relative'>
            <Input
                placeholder="Search course name"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
                value={searchInput}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SearchIcon className='text-neutral-500 h-5 w-5' />
            </span>
        </div>
    )
}

export default Search