import * as React from 'react'

import { cn } from '@/src/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
    'focus:outline-none focus-visible:outline-none text-s',
    {
        variants: {
            variant: {
                default:
                    'focus:shadow-outline border placeholder:text-gray-250 border-gray-300 appearance-none rounded-md hover:border bg-gray-300 text-[16px] leading-tight text-gray-700 hover:border-blue-light focus:border-blue-light disabled:cursor-not-allowed disabled:opacity-50',
                secondary:
                    'bg-background border border-r-0  placeholder:text-gray-250 flex file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
                search: 'bg-white border rounded-md font-medium placeholder:text-[12px] placeholder:text-gray-250 shadow-search',
            },
            size: {
                default: 'w-full h-12 px-4 py-1',
                sm: 'h-9 w-full px-4',
                medium: 'h-16 max-w-sm px-8 py-2',
                base: 'h-10 w-full px-4 py-1',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof inputVariants> {
    icon?: ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, size, icon, type, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    ref={ref}
                    {...props}
                    className={cn(inputVariants({ variant, size, className }))}
                />
                {icon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                        {icon}
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
