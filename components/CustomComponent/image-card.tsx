import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { Suspense } from 'react'

interface ImageCardProps {
    imageUrl: string | null | undefined;
    altImageUrl?: string | null | undefined;
    children?: React.ReactNode;
    onClick?: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, altImageUrl, children, onClick }) => {
    return (
        <li className="rounded-lg shadow-md hover:shadow-xl duration-300" onClick={onClick}>
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-0 ">
                <div className="relative aspect-video">
                    <Suspense fallback={<p>Loading...</p>}>
                        {
                            imageUrl
                                ? <Image
                                    alt="Upload"
                                    fill
                                    className="object-cover"
                                    src={imageUrl ?? ""}
                                // sizes="(max-width: 220px) 50vw, (max-width: 480px) 25vw, 20vw"
                                />
                                :
                                <ImageIcon className="absolute top-0 left-0 right-0 bottom-0 w-full h-full m-auto text-neutral-400" />
                        }

                    </Suspense>
                </div>
            </div>
            <div className='p-2'>
                {children}
            </div>
        </li>
    )
}

export default ImageCard