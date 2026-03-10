import { motion } from 'framer-motion'
import { testimonials } from '../../data/cakes'
import React from 'react'

export default function TestimonialStrip() {
    return (
        <section className="bg-white py-section px-6 md:px-gutter-sm lg:px-gutter">
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-h2 text-sn-darkest mb-14"
            >
                What Our Guests Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.9,
                            delay: i * 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative bg-sn-cream p-10 border-l-[3px] border-sn-primary rounded-card"
                    >
                        {/* Quote Mark */}
                        <span className="absolute top-4 left-4 font-display text-[80px] text-sn-light leading-none select-none pointer-events-none">
                            "
                        </span>

                        <p className="font-body text-body-m text-sn-grey leading-[1.7] relative z-10 mt-6">
                            "{t.quote}"
                        </p>

                        <div className="mt-6">
                            <p className="font-body font-bold text-[14px] text-sn-darkest">
                                - {t.author}
                            </p>
                            <p className="font-body text-[12px] text-sn-muted mt-0.5">
                                {t.location}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
