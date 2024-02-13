import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'
import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'flex items-center justify-center rounded-md bg-primary hover:bg-blue-light text-sm font-normal text-white disabled:bg-blue-lightSky disabled:text-white',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                primary: 'text-primary font-normal text-sm leading-5',
                outline:
                    'border border-gray-400 hover:border-blue-light bg-background hover:text-blue-light text-gray-500 rounded-md hover:bg-accent',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                upload: 'bg-blue-50 text-xs text-blue-200 rounded-md font-semibold hover:bg-accent',
                transparent: 'bg-transparent hover:bg-transparent',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                azure: 'hover:bg-azure-thin bg-azure-thin',
                link: 'border-gray-300 hover:text-blue-light text-xs border rounded-md px-8 py-2 text-gray-600 font-semibold hover:border-blue-light',
                search: 'rounded-l-none rounded-r-md border border-l-0 bg-transparent hover:bg-transparent',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-5',
                lg: ' h-9 rounded-md px-8',
                medium: 'h-12 px-6 py-4',
                mediumSm: 'h-8 px-5',
                icon: 'h-10 w-10',
                iconSquare: 'h-15 w-20 px-2',
                base: 'h-10 px-8',
                baseSm: 'h-9 px-2.5',
                baseLg: 'h-12 px-4',
                full: 'h-10 w-full px-3',
                fullSm: 'h-14 w-full px-8',
                fullLg: 'h-12 w-full px-3',
                square: 'h-12 w-12 px-3',
                auto: 'px-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            children,
            isLoading,
            variant,
            size,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {isLoading ? <LoadingIcon /> : children}
            </Comp>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
