import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Star, Truck, CheckCircle } from 'lucide-react'
import { menuItems } from '../data/menuData'
import SectionDivider from '../components/layout/SectionDivider'
import CakeCard from '../components/ui/CakeCard'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function CakeDetails() {
    const { slug } = useParams()
    const cake = menuItems.find((item) => item.slug === slug)

    const containerRef = useRef(null)
    const item1Ref = useRef(null)
    const item2Ref = useRef(null)
    const item3Ref = useRef(null)
    const item4Ref = useRef(null)

    // Derived data
    const relatedCakes = menuItems
        .filter((item) => item.slug !== cake?.slug)
        .sort((a, b) => {
            if (a.category === cake?.category && b.category !== cake?.category) return -1
            if (a.category !== cake?.category && b.category === cake?.category) return 1
            return 0
        })
        .slice(0, 4)

    // Product Details State
    const [size, setSize] = useState('Slice')
    const [quantity, setQuantity] = useState(1)
    const [activeThumb, setActiveThumb] = useState(1)

    // Product Details Refs
    const detailsLeftRef = useRef(null)
    const detailsRightRef = useRef(null)
    const detailsSectionRef = useRef(null)

    // Storytelling Refs
    const storyLeftRef = useRef(null)
    const storyRightRef = useRef(null)
    const storySectionRef = useRef(null)

    // Cross-sell & Review Refs
    const crossSellRef = useRef(null)
    const reviewsRef = useRef(null)

    // Wait for component mount to setup GSAP
    useEffect(() => {
        if (!cake) return

        const items = [
            { ref: item1Ref.current, x: -40, y: -60 },
            { ref: item2Ref.current, x: 40, y: -60 },
            { ref: item3Ref.current, x: -40, y: 40 },
            { ref: item4Ref.current, x: 40, y: 40 },
        ]

        items.forEach(({ ref, x, y }) => {
            if (!ref || !containerRef.current) return

            gsap.to(ref, {
                x,
                y,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [cake])

    // GSAP for Details Section
    useEffect(() => {
        if (!detailsLeftRef.current || !detailsRightRef.current || !detailsSectionRef.current) return

        gsap.fromTo(
            detailsLeftRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: detailsSectionRef.current,
                    start: 'top 75%',
                },
            }
        )

        gsap.fromTo(
            detailsRightRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: detailsSectionRef.current,
                    start: 'top 75%',
                },
            }
        )

        // GSAP for Storytelling Section
        if (!storyLeftRef.current || !storyRightRef.current || !storySectionRef.current) return

        gsap.fromTo(
            storyLeftRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: storySectionRef.current,
                    start: 'top 75%',
                },
            }
        )

        gsap.fromTo(
            storyRightRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2, // slight delay for right image
                scrollTrigger: {
                    trigger: storySectionRef.current,
                    start: 'top 75%',
                },
            }
        )

        // GSAP for Cross Sell
        if (crossSellRef.current) {
            gsap.fromTo(
                crossSellRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: crossSellRef.current,
                        start: 'top 80%',
                    },
                }
            )
        }

        // GSAP for Reviews
        if (reviewsRef.current) {
            gsap.fromTo(
                reviewsRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: reviewsRef.current,
                        start: 'top 75%',
                    },
                }
            )
        }
    }, [cake])

    // Framer Motion scroll value for the scroll indicator
    const { scrollY } = useScroll()
    const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0])

    if (!cake) {
        return <Navigate to="/menu" replace />
    }

    const { ui } = cake
    const ease = [0.16, 1, 0.3, 1]

    return (
        <div className="bg-white">
            {/*  HERO SECTION  */}
            <motion.section
                ref={containerRef}
                initial={{ backgroundColor: '#FFFFFF' }}
                animate={{ backgroundColor: ui.bg }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center"
            >
                {/* Back Navigation */}
                <div className="absolute top-[100px] left-6 md:left-[135px] z-50">
                    <Link to="/menu" className="group flex items-center gap-1">
                        <motion.div
                            className="font-body font-medium text-[13px] tracking-[1px] flex items-center transition-colors duration-300"
                            style={{ color: '#673E34' }}
                            whileHover={{ x: -4, color: '#401C13' }}
                        >
                            <ArrowLeft size={14} className="mr-1" />
                            Back to Menu
                        </motion.div>
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-[4] flex flex-col items-center justify-center w-full pt-[80px] px-6">
                    {/* Word Line 1 */}
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="z-[2]"
                    >
                        <h1
                            className="font-romul text-hero text-center tracking-[-2px] select-none"
                            style={{ color: ui.text }}
                        >
                            {ui.line1}
                        </h1>
                    </motion.div>

                    {/* Product Image */}
                    <motion.div
                        initial={{ scale: 0.88, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, ease }}
                        className="relative z-[3] -my-8 md:-my-16"
                    >
                        <img
                            src={`/images/cakes/${cake.slug}-hero.png`}
                            alt={cake.name}
                            className="w-[280px] md:w-[400px] lg:w-[480px] h-auto object-contain mix-blend-multiply pointer-events-none"
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
                    </motion.div>

                    {/* Word Line 2 */}
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="z-[1]"
                    >
                        <h1
                            className="font-romul text-hero text-center tracking-[-2px] select-none"
                            style={{ color: ui.text }}
                        >
                            {ui.line2}
                        </h1>
                    </motion.div>
                </div>

                {/* Floating Ingredients */}
                <motion.img
                    ref={item1Ref}
                    src={ui.ingredients[0]}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -12, 0],
                        rotate: [0, 6, 0, -6, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.5 },
                        y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="hidden md:block absolute top-[15%] left-[6%] w-[80px] md:w-[120px] object-contain opacity-80 z-20"
                    onError={(e) => { e.target.style.display = 'none' }}
                />
                <motion.img
                    ref={item2Ref}
                    src={ui.ingredients[1]}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -15, 0],
                        rotate: [0, -8, 0, 5, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.62 },
                        y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="hidden md:block absolute top-[10%] right-[8%] w-[100px] md:w-[150px] object-contain opacity-80 z-20"
                    onError={(e) => { e.target.style.display = 'none' }}
                />
                <motion.img
                    ref={item3Ref}
                    src={ui.ingredients[2]}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0],
                        rotate: [0, 4, 0, -4, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.74 },
                        y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="hidden lg:block absolute bottom-[18%] left-[4%] w-[90px] md:w-[130px] object-contain opacity-80 z-20"
                    onError={(e) => { e.target.style.display = 'none' }}
                />
                <motion.img
                    ref={item4Ref}
                    src={ui.ingredients[3]}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -14, 0],
                        rotate: [0, -5, 0, 7, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.86 },
                        y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 5.9, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="hidden lg:block absolute bottom-[14%] right-[6%] w-[110px] md:w-[160px] object-contain opacity-80 z-20"
                    onError={(e) => { e.target.style.display = 'none' }}
                />
            </motion.section>

            {/*  SECTION DIVIDER: cake.bg → white  */}
            <SectionDivider fromColor={ui.bg} color="#FFFFFF" />

            {/*  PRODUCT DETAILS SECTION  */}
            <section ref={detailsSectionRef} className="bg-white py-[80px] md:py-[120px] px-6 md:px-[135px]">
                <div className="max-w-[1170px] mx-auto flex flex-col md:flex-row gap-[50px] md:gap-[80px]">

                    {/* LEFT COLUMN - IMAGES */}
                    <div ref={detailsLeftRef} className="w-full md:w-1/2 flex flex-col">
                        {/* Main Image */}
                        <div className="w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center bg-sn-cream/30 rounded-[2px] shadow-[0_30px_80px_rgba(64,28,19,0.10)] mb-4 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeThumb}
                                    src={cake.image.replace(/\.(png|jpe?g)$/i, `-thumb-${activeThumb}.png`)}
                                    alt={`${cake.name} view ${activeThumb}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-contain p-8"
                                    onError={(e) => { e.target.src = cake.image }}
                                />
                            </AnimatePresence>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-2 relative z-10">
                            {[1, 2, 3, 4].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setActiveThumb(num)}
                                    className={`relative w-[80px] h-[80px] rounded-[2px] overflow-hidden border ${activeThumb === num ? 'border-[2px] border-sn-primary' : 'border border-sn-light/60 opacity-80 hover:opacity-100'
                                        } transition-all duration-200 cursor-pointer bg-sn-cream/10`}
                                >
                                    <img
                                        src={cake.image.replace(/\.(png|jpe?g)$/i, `-thumb-${num}.png`)}
                                        alt={`${cake.name} thumbnail ${num}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = cake.image }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - INFO */}
                    <div ref={detailsRightRef} className="w-full md:w-1/2 flex flex-col">
                        <div className="inline-block bg-sn-cream text-sn-primary font-body font-bold text-[11px] tracking-[3px] uppercase px-3 py-1 rounded-full w-fit mb-4">
                            {cake.category}
                        </div>

                        <h2 className="font-display text-[36px] md:text-[50px] text-sn-darkest mb-4 leading-[1.05]">
                            {cake.name}
                        </h2>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-sn-primary text-sn-primary" />
                                ))}
                            </div>
                            <span className="font-body text-[14px] text-sn-muted">4.9 (128 reviews)</span>
                        </div>

                        <div className="w-full h-px bg-sn-light mb-6" />

                        <p className="font-body text-[16px] md:text-[18px] text-sn-grey leading-[1.8] max-w-[460px] mb-8">
                            {cake.description} Every layer is meticulously crafted to perfection to deliver an unforgettable taste experience. Made fresh daily in our patisserie.
                        </p>

                        {/* Flavor Tags */}
                        <div className="mb-8">
                            <p className="font-body font-bold text-[13px] text-sn-darkest mb-2.5">Flavour Notes</p>
                            <div className="flex flex-wrap gap-2">
                                {['Dark Chocolate', 'Wild Berry', 'Vanilla Cream'].map(tag => (
                                    <span key={tag} className="font-body text-[13px] text-sn-grey border border-sn-light rounded-full px-3.5 py-1.5 bg-white">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8 overflow-x-auto scrollbar-hide">
                            <p className="font-body font-bold text-[13px] text-sn-darkest mb-3 whitespace-nowrap">Select Size</p>
                            <div className="flex gap-3 min-w-max pb-2 md:pb-0 md:min-w-0 md:flex-wrap">
                                {['Slice', '6 inch', '8 inch'].map(sz => (
                                    <button
                                        key={sz}
                                        onClick={() => setSize(sz)}
                                        className={`font-body font-medium text-[14px] px-6 py-2 rounded-full border transition-colors ${size === sz
                                            ? 'bg-sn-primary text-white border-sn-primary'
                                            : 'bg-transparent text-sn-grey border-sn-light hover:border-sn-primary hover:text-sn-primary'
                                            }`}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="font-body font-bold text-[36px] text-sn-darkest mt-4 mb-6">
                            ${(cake.price * (size === 'Slice' ? 1 : size === '6 inch' ? 3 : 5) * quantity).toFixed(2)}
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex items-center justify-between border border-sn-light rounded-[2px] p-2 w-[140px] shrink-0">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-sn-cream transition-colors text-sn-darkest font-body font-bold text-[20px]"
                                >
                                    −
                                </button>
                                <span className="font-body font-bold text-[16px] text-sn-darkest w-4 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-sn-cream transition-colors text-sn-darkest font-body font-bold text-[20px]"
                                >
                                    +
                                </button>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-[56px] bg-sn-darkest text-white font-display text-[20px] rounded-[2px] hover:bg-sn-primary transition-colors flex items-center justify-center"
                                onClick={() => { }}
                            >
                                Add to Cart
                            </motion.button>
                        </div>

                        {/* Wishlist */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
                            <button className="font-body text-[14px] text-sn-muted hover:text-sn-primary transition-colors mb-4 sm:mb-0">
                                ♡ Save to Wishlist
                            </button>
                        </div>

                        {/* Delivery Note */}
                        <div className="flex items-center gap-3 mt-6 p-4 bg-sn-cream/30 border border-sn-light rounded-[2px]">
                            <Truck size={18} className="text-sn-primary shrink-0" />
                            <p className="font-body text-[13px] text-sn-grey">
                                Same-day delivery available for orders before 2PM
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/*  SECTION DIVIDER: white → cream  */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  WHAT'S INSIDE: BRAND STORYTELLING  */}
            <section ref={storySectionRef} className="bg-sn-cream py-[80px] md:py-[120px] px-6 md:px-[135px] overflow-hidden">
                <div className="max-w-[1170px] mx-auto flex flex-col md:flex-row gap-[50px] md:gap-[80px] items-center">

                    {/* LEFT COLUMN - TEXT */}
                    <div ref={storyLeftRef} className="w-full md:w-[55%] flex flex-col">
                        <p className="font-body font-bold text-[11px] text-sn-primary tracking-[4px] uppercase mb-3">
                            WHAT'S INSIDE
                        </p>
                        <h2 className="font-display text-[32px] md:text-[40px] text-sn-darkest mb-6 leading-tight">
                            Made With Intention
                        </h2>

                        <div className="font-body text-[16px] md:text-[18px] text-sn-grey leading-[1.8] mb-8 space-y-4">
                            <p>
                                Every layer of our {cake.name} begins with a slow-baked sponge, sourced from single-origin ingredients. We fold in premium fillings - never from concentrate - and finish with hand-whipped frosting that takes our bakers over two hours to perfect.
                            </p>
                            <p>
                                No preservatives. No shortcuts. Just ingredients you can actually pronounce, crafted by hands that genuinely care.
                            </p>
                        </div>

                        {/* Ingredients Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                            {[
                                'Belgian Dark Chocolate',
                                'Wild Berry Compote',
                                'Free-Range Eggs',
                                'Madagascar Vanilla',
                                'Fresh Cream',
                                'Sea Salt'
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5">
                                    <CheckCircle size={14} className="text-sn-primary shrink-0" />
                                    <span className="font-body font-medium text-[15px] text-sn-darkest">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - IMAGE */}
                    <div ref={storyRightRef} className="w-full md:w-[45%]">
                        <div className="w-full aspect-[4/5] rounded-[2px] shadow-[12px_12px_0px_#E0E0E0] rotate-[1.5deg] overflow-hidden ml-0 md:ml-4">
                            <img
                                src={`/images/cakes/${cake.slug}-ingredients.png`}
                                alt={`${cake.name} ingredients`}
                                className="w-full h-full object-cover scale-105"
                                onError={(e) => { e.target.src = cake.image }}
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/*  SECTION DIVIDER: cream → white  */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*  YOU MIGHT ALSO LIKE  */}
            <section className="bg-white py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <h2 className="font-display text-[32px] md:text-[40px] text-sn-darkest mb-8 md:mb-12">
                    You Might Also Like
                </h2>

                <div ref={crossSellRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x">
                    {relatedCakes.map((cakeConfig, i) => (
                        <div key={cakeConfig.id} className="min-w-[280px] md:min-w-0 snap-start shrink-0">
                            <CakeCard cake={cakeConfig} index={i} />
                        </div>
                    ))}
                </div>
            </section>

            {/*  SECTION DIVIDER: white → deep dark  */}
            <SectionDivider fromColor="#FFFFFF" color="#281612" />

            {/*  REVIEWS  */}
            <section className="bg-sn-deep py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <h2 className="font-display text-[32px] md:text-[40px] text-white">
                        What People Say
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="font-body font-bold text-[48px] text-white leading-none">4.9</span>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-sn-primary text-sn-primary" />
                                ))}
                            </div>
                            <span className="font-body text-[14px] text-sn-muted">128 reviews</span>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div ref={reviewsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {[
                        {
                            text: "Ordered the Velvet Berry Dream for my anniversary dinner. The layers were impossibly moist and the berry compote hit exactly the right balance.",
                            author: "Meera K.", time: "2 weeks ago"
                        },
                        {
                            text: "Sweet Noir is on another level. The presentation alone made my guests gasp before anyone had even tasted it.",
                            author: "Rohan D.", time: "1 month ago"
                        },
                        {
                            text: "I've been ordering this cake on repeat. It genuinely ruins all other chocolate cake for you. Consider yourself warned.",
                            author: "Anjali S.", time: "3 weeks ago"
                        }
                    ].map((review, i) => (
                        <div key={i} className="bg-[#1E0E0A] border border-sn-darkest rounded-[2px] p-6 lg:p-8 flex flex-col">
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={14} className="fill-sn-primary text-sn-primary" />
                                ))}
                            </div>
                            <p className="font-body text-[16px] text-sn-light leading-[1.7] flex-grow">
                                "{review.text}"
                            </p>
                            <div className="mt-5">
                                <span className="font-body font-bold text-[14px] text-white block">{review.author}</span>
                                <span className="font-body text-[12px] text-sn-grey">{review.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
