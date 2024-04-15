"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


const Search: React.FC = () => {
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const debounceValue = useDebounce(searchInput, 500)
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (isMounted) {
            const url = `/browse${searchParams.get('category') ? `?category=${searchParams.get('category')}` : ''}${debounceValue ? `&search=${debounceValue}` : ''}`
            router.push(url)
        } else setIsMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])
    return (
        <div className='relative'>
            <Input
                placeholder="Search course name"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                {isSearchLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-700"></div> : <SearchIcon className='text-neutral-500 h-5 w-5' />}
            </span>
        </div>
    )
}

export default Search