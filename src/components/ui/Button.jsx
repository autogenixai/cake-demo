import { motion } from 'framer-motion'
import React from 'react'

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    const base = 'font-body font-bold rounded-pill transition-colors duration-300 inline-flex items-center justify-center'

    const variants = {
        primary: 'bg-sn-primary text-white hover:bg-sn-darkest',
        dark: 'bg-sn-darkest text-white hover:bg-sn-primary',
        outline: 'border border-sn-darkest text-sn-darkest hover:bg-sn-primary hover:text-white hover:border-sn-primary',
        light: 'bg-white text-sn-deep hover:bg-sn-cream',
    }

    const sizes = {
        sm: 'text-[13px] px-6 py-2.5',
        md: 'text-[14px] px-9 py-3.5',
        lg: 'text-[16px] px-10 py-4',
    }

    return (
        <motion.button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            {...props}
        >
            {children}
        </motion.button>
    )
}
