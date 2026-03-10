import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import React from 'react'

export default function CustomOrderBanner() {
    return (
        <section className="bg-sn-deep py-section px-6 md:px-gutter-sm lg:px-gutter overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Left - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:w-1/2"
                >
                    <p className="font-body font-bold text-[12px] text-sn-muted tracking-[4px] uppercase mb-4">
                        Bespoke Creations
                    </p>
                    <h2 className="font-display text-h1 text-white mb-6 leading-[1.1]">
                        A Cake as Unique as Your Moment
                    </h2>
                    <p className="font-body text-body-m text-sn-light leading-relaxed mb-8 max-w-[480px]">
                        Tell us your dream. We'll bake it into reality - custom flavours, designs, and sizes for weddings, celebrations, and everything in between.
                    </p>
                    <Link to="/custom-orders">
                        <motion.button
                            className="font-body font-bold text-[16px] text-white bg-sn-primary px-10 py-4 rounded-pill hover:bg-white hover:text-sn-deep transition-colors duration-400"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Start Your Order
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Right - Image */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:w-1/2 flex justify-center"
                >
                    <div className="relative">
                        <img
                            src="/images/hero/custom-banner.png"
                            alt="Custom celebration cake"
                            className="w-[380px] md:w-[460px] h-auto object-contain rotate-3 drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
                            onError={(e) => {
                                e.target.style.display = 'none'
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
