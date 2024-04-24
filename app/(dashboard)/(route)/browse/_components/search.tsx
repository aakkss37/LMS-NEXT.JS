"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


const Search: React.FC = () => {
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const [searchInput, setSearchInput] = useState<string>(searchParams.get('search') || '');
    const router = useRouter();

    useEffect(() => {
        if (isMounted) {
            let url = `/browse`
            if (searchParams.get('category') && !searchInput) {
                url = `/browse?category=${searchParams.get('category')}`
            } else if (!searchParams.get('category') && searchInput) {
                url = `/browse?search=${searchInput}`
            } else if (searchParams.get('category') && searchInput) {
                url = `/browse?category=${searchParams.get('category')}&search=${searchInput}`
            }
            router.push(url)
        } else setIsMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput])
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
                {isSearchLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-700"></div> : <SearchIcon className='text-neutral-500 h-5 w-5' />}
            </span>
        </div>
    )
}

export default Search