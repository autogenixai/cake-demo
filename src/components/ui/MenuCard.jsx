import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function MenuCard({ item, index = 0 }) {
    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                to={`/menu/${item.slug}`}
                className="block group"
            >
                <div className="bg-white border border-dashed border-sn-muted rounded-[2px] p-5 transition-all duration-[350ms] group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(64,28,19,0.12)] group-hover:border-sn-primary">

                    {/* Image Area */}
                    <div className="h-[200px] md:h-[260px] flex items-center justify-center mb-4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none'
                            }}
                        />
                    </div>

                    {/* Category Tag */}
                    <p className="font-body font-bold text-[11px] text-sn-primary tracking-[2px] uppercase mb-2">
                        {item.category}
                    </p>

                    {/* Cake Name */}
                    <h3 className="font-display text-[22px] text-sn-darkest mb-2">
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[14px] text-sn-muted leading-[1.5] line-clamp-2 mb-4">
                        {item.description}
                    </p>

                    {/* Price Row */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-body font-bold text-[20px] text-sn-darkest">
                            ${item.price.toFixed(2)}
                        </span>
                        <span className="font-body font-medium text-[13px] text-sn-primary inline-flex items-center gap-1">
                            View Details
                            <ArrowRight
                                size={14}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </span>
                    </div>

                    {/* Divider Line */}
                    <div className="h-px bg-sn-light mb-4" />

                    {/* Add to Cart Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                        className="w-full bg-sn-darkest text-white font-body font-bold text-[14px] py-[13px] rounded-[2px] hover:bg-sn-primary transition-colors duration-[250ms]"
                    >
                        Add to Cart
                    </button>
                </div>
            </Link>
        </motion.div>
    )
}
