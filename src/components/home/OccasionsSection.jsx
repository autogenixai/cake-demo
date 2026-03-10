import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { occasions } from '../../data/cakes'
import React from 'react'

export default function OccasionsSection() {
    return (
        <section className="bg-sn-cream py-section px-6 md:px-gutter-sm lg:px-gutter">
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-h2 text-sn-darkest text-center mb-14"
            >
                Made for Every Moment
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {occasions.map((occ, i) => (
                    <motion.div
                        key={occ.id}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: i * 0.15,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <Link to="/custom-orders" className="block group">
                            <div className="relative h-[380px] rounded-card overflow-hidden">
                                {/* Background Image */}
                                <img
                                    src={`/images/occasions/occasion${i + 1}.png`}
                                    alt={occ.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-sn-deep/60 via-transparent to-transparent group-hover:from-sn-deep/80 transition-all duration-500" />

                                {/* Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="font-display text-h4 text-white mb-1">
                                        {occ.title}
                                    </h3>
                                    <p className="font-body text-[14px] text-sn-light">
                                        {occ.subtitle}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="absolute bottom-6 right-6">
                                    <ArrowRight
                                        className="text-white transition-transform duration-300 group-hover:translate-x-1.5"
                                        size={20}
                                    />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
