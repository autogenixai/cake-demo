import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CakeCard from '../components/ui/CakeCard'
import SectionDivider from '../components/layout/SectionDivider'
import { menuItems, menuCategories } from '../data/menuData'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
    const [searchParams, setSearchParams] = useSearchParams()
    const urlCategory = searchParams.get('category')

    // Map URL param to display category (case-insensitive)
    const getActiveCategory = () => {
        if (!urlCategory) return 'All'
        const match = menuCategories.find(
            (c) => c.toLowerCase() === urlCategory.toLowerCase()
        )
        return match || 'All'
    }

    const [activeCategory, setActiveCategory] = useState(getActiveCategory)

    // Hero GSAP refs
    const eyebrowRef = useRef(null)
    const headingRef = useRef(null)
    const subtextRef = useRef(null)
    const lineRef = useRef(null)

    // CTA strip GSAP refs
    const ctaLeftRef = useRef(null)
    const ctaRightRef = useRef(null)
    const ctaSectionRef = useRef(null)

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory)

    // Update URL when category changes
    const handleCategoryChange = (cat) => {
        setActiveCategory(cat)
        if (cat === 'All') {
            setSearchParams({})
        } else {
            setSearchParams({ category: cat.toLowerCase() })
        }
    }

    // Sync from URL on mount / navigation
    useEffect(() => {
        setActiveCategory(getActiveCategory())
    }, [urlCategory])

    // Hero GSAP stagger
    useEffect(() => {
        const els = [eyebrowRef.current, headingRef.current, subtextRef.current, lineRef.current]
        gsap.set(els, { opacity: 0, y: 30 })
        gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
        })
    }, [])

    // CTA strip GSAP
    useEffect(() => {
        const left = ctaLeftRef.current
        const right = ctaRightRef.current
        if (!left || !right) return

        gsap.set(left, { opacity: 0, x: -40 })
        gsap.set(right, { opacity: 0, x: 40 })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        })

        tl.to(left, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
            .to(right, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '<')

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/*  HERO SECTION  */}
            <section className="bg-sn-cream text-center pt-[140px] md:pt-[160px] pb-[60px] md:pb-[80px] px-5 md:px-10 lg:px-[135px]">
                <p
                    ref={eyebrowRef}
                    className="font-body font-bold text-[12px] text-sn-primary tracking-[4px] uppercase mb-4"
                >
                    OUR MENU
                </p>
                <h1
                    ref={headingRef}
                    className="font-display text-[36px] md:text-[50px] text-sn-darkest"
                >
                    Every Bite Tells a Story
                </h1>
                <p
                    ref={subtextRef}
                    className="font-body text-[16px] md:text-[18px] text-sn-grey max-w-[520px] mx-auto mt-4 leading-relaxed"
                >
                    Explore our full collection of handcrafted cakes,
                    cupcakes, chocolates, and more - each made fresh
                    daily with the finest ingredients.
                </p>
                <div
                    ref={lineRef}
                    className="w-[80px] h-px bg-sn-light mx-auto mt-8"
                />
            </section>

            {/*  FILTER + GRID SECTION  */}
            <section className="bg-white pt-[60px] md:pt-[80px] pb-[80px] md:pb-[120px] px-5 md:px-10 lg:px-[135px]">
                {/* Category Filter Tabs */}
                <div className="flex md:flex-wrap md:justify-center gap-3 mb-14 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                    {menuCategories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className={`font-body font-medium text-[14px] tracking-[1px] px-6 py-2.5 rounded-full border whitespace-nowrap shrink-0 transition-all duration-200 ${activeCategory === cat
                                ? 'bg-sn-primary text-white border-sn-primary'
                                : 'bg-transparent text-sn-grey border-sn-muted hover:bg-sn-cream hover:border-sn-primary hover:text-sn-primary'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Results Count */}
                <p className="font-body text-[14px] text-sn-muted mb-6">
                    Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                </p>

                {/* Card Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, i) => (
                            <CakeCard key={item.id} cake={item} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/*  SECTION DIVIDER: white → cream  */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  CUSTOM ORDER CTA STRIP  */}
            <section
                ref={ctaSectionRef}
                className="bg-sn-cream py-[60px] md:py-[80px] px-5 md:px-10 lg:px-[135px]"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Left - Text */}
                    <div ref={ctaLeftRef}>
                        <h2 className="font-display text-[24px] md:text-[30px] text-sn-darkest">
                            Don't see what you're looking for?
                        </h2>
                        <p className="font-body text-[16px] text-sn-grey mt-3 max-w-[480px] leading-relaxed">
                            We create fully custom cakes for any occasion,
                            flavour, or vision you have in mind.
                        </p>
                    </div>

                    {/* Right - CTA Button */}
                    <div ref={ctaRightRef}>
                        <Link to="/custom-orders">
                            <motion.button
                                className="font-body font-bold text-[15px] text-white bg-sn-primary px-9 py-4 rounded-full hover:bg-sn-darkest transition-colors duration-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Design Your Cake
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
