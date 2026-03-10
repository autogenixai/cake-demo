import React, { useEffect, useRef, useState } from 'react'
import HeroSlider from '../components/home/HeroSlider'
import FeaturedMenu from '../components/home/FeaturedMenu'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OccasionsSection from '../components/home/OccasionsSection'
import TestimonialStrip from '../components/home/TestimonialStrip'
import CustomOrderBanner from '../components/home/CustomOrderBanner'
import SectionDivider from '../components/layout/SectionDivider'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'

function GalleryStrip() {
    return (
        <section className="bg-sn-cream py-section-sm px-6 md:px-gutter-sm lg:px-gutter">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-10"
            >
                <h3 className="font-display text-h3 text-sn-darkest">
                    @sweetnoir.cakes
                </h3>
                <p className="font-body text-body-s text-sn-muted mt-2">
                    Follow our journey one layer at a time
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <motion.div
                        key={n}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: n * 0.08 }}
                        className="relative aspect-square overflow-hidden rounded-card group"
                    >
                        <img
                            src={`/images/gallery/gallery${n}.png`}
                            alt={`Gallery ${n}`}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                            onError={(e) => {
                                e.target.parentElement.style.backgroundColor = '#E0E0E0'
                                e.target.style.display = 'none'
                            }}
                        />
                        <div className="absolute inset-0 bg-sn-primary/0 group-hover:bg-sn-primary/30 transition-all duration-300 flex items-center justify-center">
                            <Instagram
                                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                size={28}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-10"
            >
                <Link
                    to="/gallery"
                    className="font-body font-bold text-[16px] text-sn-primary inline-flex items-center gap-2 group hover:underline"
                >
                    View Full Gallery
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </motion.div>
        </section>
    )
}

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Hero */}
            <HeroSlider />

            {/* Divider: hero → cream */}
            <SectionDivider fromColor="transparent" color="#FDF6F0" />

            {/* Featured Menu */}
            <FeaturedMenu />

            {/* Divider: cream → white */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" flip />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Divider: white → cream */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/* Occasions */}
            <OccasionsSection />

            {/* Divider: cream → white */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" flip />

            {/* Testimonials */}
            <TestimonialStrip />

            {/* Divider: white → deep */}
            <SectionDivider fromColor="#FFFFFF" color="#281612" />

            {/* Custom Order Banner */}
            <CustomOrderBanner />

            {/* Divider: deep → cream */}
            <SectionDivider fromColor="#281612" color="#FDF6F0" flip />

            {/* Gallery Strip */}
            <GalleryStrip />
        </motion.div>
    )
}
