import React from 'react'
import { CircleCheck, TriangleAlert } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                default: "bg-slate-200/80 border-slate-200/10 text-slate-800",
                success: "bg-emerald-200/80 border-emerald-200/10 text-emerald-800",
                warning: "bg-yellow-200/80 border-yellow-200/10 text-yellow-800",
                danger: "bg-red-200/80 border-red-200/10 text-red-800",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const Banner: React.FC<BannerProps> = ({ label, variant }) => {
    return (
        <div className={cn(bannerVariants({ variant }))}>
            {variant === "success" && <CircleCheck className="h-4 w-4 mr-2" />}
            {variant === "default" && <TriangleAlert className="h-4 w-4 mr-2" />}
            {variant === "warning" && <TriangleAlert className="h-4 w-4 mr-2" />}
            {variant === "danger" && <TriangleAlert className="h-4 w-4 mr-2" />}
            <p>{label}</p>
        </div>
    )
}

export default Banner

