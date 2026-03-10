import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CakeCard from '../ui/CakeCard'
import { cakes, categories } from '../../data/cakes'

export default function FeaturedMenu() {
    const [activeCategory, setActiveCategory] = useState('Cakes')

    const filteredCakes = cakes
        .filter((c) => c.category === activeCategory)
        .slice(0, 4)

    return (
        <section className="bg-sn-cream py-section px-8 md:px-gutter-sm lg:px-gutter">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12"
            >
                <p className="font-body font-bold text-[12px] text-sn-primary tracking-[4px] uppercase mb-3">
                    Our Specialties
                </p>
                <h2 className="font-display text-h1 text-sn-darkest mb-4">
                    Your Indulgence
                </h2>
                <p className="font-body text-body-m text-sn-grey max-w-[500px] mx-auto">
                    From moist chocolate cakes to artisan pistachio delights - find the perfect treat for any moment.
                </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`font-body font-medium text-[14px] px-6 py-2.5 rounded-pill border transition-all duration-300 ${activeCategory === cat
                            ? 'bg-sn-primary text-white border-sn-primary'
                            : 'bg-transparent text-sn-grey border-sn-muted hover:bg-[#F5EDE8] hover:border-sn-primary'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredCakes.map((cake, i) => (
                    <CakeCard key={cake.id} cake={cake} index={i} />
                ))}
                {filteredCakes.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <p className="font-display text-h3 text-sn-muted">Coming Soon</p>
                        <p className="font-body text-body-s text-sn-grey mt-2">
                            We're crafting something special for this category.
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom CTA + Arrows */}
            <div className="flex items-center justify-between mt-12">
                <Link
                    to="/menu"
                    className="font-body font-bold text-[16px] text-sn-primary group inline-flex items-center gap-2 hover:underline"
                >
                    View Full Menu
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <div className="flex gap-3">
                    <button className="w-[48px] h-[48px] rounded-full border border-sn-darkest text-sn-darkest flex items-center justify-center hover:bg-sn-primary hover:border-sn-primary hover:text-white transition-all duration-300">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-[48px] h-[48px] rounded-full border border-sn-darkest text-sn-darkest flex items-center justify-center hover:bg-sn-primary hover:border-sn-primary hover:text-white transition-all duration-300">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    )
}
