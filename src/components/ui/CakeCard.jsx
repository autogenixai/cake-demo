import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Bookmark } from 'lucide-react'
import React, { useState } from 'react'

export default function CakeCard({ cake, index = 0 }) {
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-sn-cream rounded-[16px] p-5 pb-0 flex flex-col group overflow-hidden border border-dashed border-sn-muted/80 hover:border-sn-primary/60 hover:shadow-[0_8px_30px_rgba(64,28,19,0.08)] transition-all duration-300"
            style={{ minHeight: '300px' }}
        >
            {/* Top: Name, Price + Icons */}
            <div className="flex items-start justify-between">
                <div>
                    <Link to={`/menu/${cake.slug}`}>
                        <h3 className="font-display text-[18px] text-sn-darkest leading-tight hover:text-sn-primary transition-colors">
                            {cake.name}
                        </h3>
                    </Link>
                    <p className="font-body font-bold text-[16px] text-sn-darkest mt-0.5">
                        ₹{cake.price.toLocaleString()}
                    </p>
                </div>

                {/* Heart + Bookmark Icons */}
                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={() => setLiked(!liked)}
                        className="w-[32px] h-[32px] rounded-full border border-sn-light flex items-center justify-center hover:border-sn-primary transition-all duration-300"
                    >
                        <Heart
                            size={15}
                            className={liked ? 'fill-sn-primary text-sn-primary' : 'text-sn-muted'}
                        />
                    </button>
                    <button
                        onClick={() => setSaved(!saved)}
                        className="w-[32px] h-[32px] rounded-full border border-sn-light flex items-center justify-center hover:border-sn-primary transition-all duration-300"
                    >
                        <Bookmark
                            size={15}
                            className={saved ? 'fill-sn-primary text-sn-primary' : 'text-sn-muted'}
                        />
                    </button>
                </div>
            </div>

            {/* Bottom: Cake Image */}
            <Link to={`/menu/${cake.slug}`} className="mt-auto flex items-end justify-center">
                <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-[85%] max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
                />
            </Link>
        </motion.div>
    )
}
