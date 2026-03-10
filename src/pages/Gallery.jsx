import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Instagram, Loader } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../components/layout/SectionDivider'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

/* ─ Gallery Data ─ */
const allImages = [
    { id: 1, src: '/images/gallery-1.png', title: 'Velvet Berry Dream', category: 'Cakes', type: 'wide' },
    { id: 2, src: '/images/gallery-2.png', title: 'The Midnight Tower', category: 'Custom', type: 'tall' },
    { id: 3, src: '/images/gallery-3.png', title: 'Pistachio & Honey', category: 'Cakes', type: 'square' },
    { id: 4, src: '/images/gallery-4.png', title: 'Rose Gold Cupcakes', category: 'Cupcakes', type: 'square' },
    { id: 5, src: '/images/gallery-5.png', title: 'Ganache in Progress', category: 'Behind the Scenes', type: 'tall' },
    { id: 6, src: '/images/cakes/velvet-berry-dream.png', title: 'The Whitmore Wedding', category: 'Weddings', type: 'wide' },
    { id: 7, src: '/images/cakes/salted-caramel-noir.png', title: 'Salted Caramel Drip', category: 'Cakes', type: 'square' },
    { id: 8, src: '/images/kitchen-2.png', title: 'Piping Session', category: 'Behind the Scenes', type: 'square' },
    { id: 9, src: '/images/cakes/noir-chocolate-tower.png', title: 'Black Forest Noir', category: 'Cakes', type: 'square' },
    { id: 10, src: '/images/cakes/pistachio-reverie.png', title: 'Mehra Anniversary Cake', category: 'Custom', type: 'wide' },
    { id: 11, src: '/images/cakes/coconut-almond-cupcake.png', title: 'Coconut Cloud Cupcakes', category: 'Cupcakes', type: 'square' },
    { id: 12, src: '/images/kitchen-3.png', title: 'Berry Swirl Detail', category: 'Behind the Scenes', type: 'square' },
    { id: 13, src: '/images/about-value-3.png', title: 'The Sharma Wedding', category: 'Weddings', type: 'square' },
    { id: 14, src: '/images/cakes/choco-peanut-cupcake.png', title: 'Choco Peanut Stack', category: 'Cupcakes', type: 'square' },
    { id: 15, src: '/images/cakes/double-choc-cupcake.png', title: 'Gold Leaf Ceremony', category: 'Custom', type: 'square' },
    /*  Extra images for Load More  */
    { id: 16, src: '/images/cakes/berry-vanilla-cupcake.png', title: 'Spring Berry Blush', category: 'Cupcakes', type: 'square' },
    { id: 17, src: '/images/kitchen-4.png', title: 'Frosting Station', category: 'Behind the Scenes', type: 'square' },
    { id: 18, src: '/images/cakes/salted-caramel-noir-hero.png', title: 'Caramel Cascade', category: 'Cakes', type: 'wide' },
    { id: 19, src: '/images/kitchen-5.png', title: 'Boxing Perfection', category: 'Behind the Scenes', type: 'square' },
    { id: 20, src: '/images/about-value-2.png', title: 'Rosette Elegance', category: 'Custom', type: 'square' },
    { id: 21, src: '/images/cakes/pistachio-reverie-hero.png', title: 'Pistachio Tower', category: 'Cakes', type: 'tall' },
]

const categories = ['All', 'Cakes', 'Cupcakes', 'Weddings', 'Custom', 'Behind the Scenes']

/* ─ Grid Position Map ─ */
function getGridStyle(index) {
    const pattern = index % 15
    const styles = {
        0: { gridColumn: '1 / 3', gridRow: 'auto / span 1' },    // wide
        1: { gridColumn: '3 / 4', gridRow: 'auto / span 2' },    // tall
        2: { gridColumn: '1 / 2', gridRow: 'auto / span 1' },    // square
        3: { gridColumn: '2 / 3', gridRow: 'auto / span 1' },    // square
        4: { gridColumn: '1 / 2', gridRow: 'auto / span 2' },    // tall
        5: { gridColumn: '2 / 4', gridRow: 'auto / span 1' },    // wide
        6: { gridColumn: '2 / 3', gridRow: 'auto / span 1' },    // square
        7: { gridColumn: '3 / 4', gridRow: 'auto / span 1' },    // square
        8: { gridColumn: '1 / 2', gridRow: 'auto / span 1' },    // square
        9: { gridColumn: '2 / 3', gridRow: 'auto / span 1' },    // square
        10: { gridColumn: '3 / 4', gridRow: 'auto / span 1' },   // square
        11: { gridColumn: '1 / 3', gridRow: 'auto / span 1' },   // wide
        12: { gridColumn: '3 / 4', gridRow: 'auto / span 1' },   // square
        13: { gridColumn: '1 / 2', gridRow: 'auto / span 1' },   // square
        14: { gridColumn: '2 / 4', gridRow: 'auto / span 1' },   // wide
    }
    return styles[pattern] || {}
}

/*   MAIN COMPONENT   */
export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [visibleCount, setVisibleCount] = useState(15)
    const [loading, setLoading] = useState(false)
    const [lightboxIdx, setLightboxIdx] = useState(null)
    const [hovered, setHovered] = useState(null)

    const headerLeftRef = useRef(null)
    const headerRightRef = useRef(null)
    const nudgeLeftRef = useRef(null)
    const nudgeRightRef = useRef(null)

    /*  Filtered images  */
    const filtered = activeCategory === 'All'
        ? allImages
        : allImages.filter(img => img.category === activeCategory)

    const visible = filtered.slice(0, visibleCount)
    const hasMore = visibleCount < filtered.length

    /*  Load More  */
    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setVisibleCount(prev => prev + 6)
            setLoading(false)
        }, 800)
    }

    /*  Lightbox navigation  */
    const openLightbox = (idx) => setLightboxIdx(idx)
    const closeLightbox = () => setLightboxIdx(null)

    const navigateLightbox = useCallback((dir) => {
        if (lightboxIdx === null) return
        setLightboxIdx(prev => {
            const next = prev + dir
            if (next < 0) return visible.length - 1
            if (next >= visible.length) return 0
            return next
        })
    }, [lightboxIdx, visible.length])

    /*  Keyboard nav  */
    useEffect(() => {
        const handleKey = (e) => {
            if (lightboxIdx === null) return
            if (e.key === 'ArrowLeft') navigateLightbox(-1)
            if (e.key === 'ArrowRight') navigateLightbox(1)
            if (e.key === 'Escape') closeLightbox()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [lightboxIdx, navigateLightbox])

    /*  GSAP  */
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerLeftRef.current) gsap.fromTo(headerLeftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
            if (headerRightRef.current) gsap.fromTo(headerRightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
            if (nudgeLeftRef.current) gsap.fromTo(nudgeLeftRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: nudgeLeftRef.current, start: 'top 80%' } })
            if (nudgeRightRef.current) gsap.fromTo(nudgeRightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: nudgeRightRef.current, start: 'top 80%' } })
        })
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [])

    /*  Category change  */
    const changeCategory = (cat) => {
        setActiveCategory(cat)
        setVisibleCount(15)
    }

    /*  Touch swipe for lightbox  */
    const touchStart = useRef(null)
    const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
        if (touchStart.current === null) return
        const diff = touchStart.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1)
        touchStart.current = null
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            {/*  HEADER  */}
            <section className="bg-white pt-[120px] md:pt-[160px] pb-[40px] md:pb-[60px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    {/* Left */}
                    <div ref={headerLeftRef}>
                        <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-4">OUR WORK</p>
                        <h1 className="font-display text-[36px] md:text-[50px] text-sn-darkest leading-[1.1]">Every Cake, a Canvas.</h1>
                        <p className="font-body text-[17px] text-sn-grey leading-[1.7] max-w-[400px] mt-4">
                            A collection of our most loved creations - custom orders, signature cakes, and moments we're proud to have been part of.
                        </p>
                    </div>

                    {/* Right - Filters */}
                    <div ref={headerRightRef} className="flex flex-wrap lg:justify-end gap-[10px] lg:max-w-[340px]">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => changeCategory(cat)}
                                className={`px-4 py-[10px] rounded-[2px] font-body font-medium text-[13px] border transition-all duration-200
                                    ${activeCategory === cat
                                        ? 'bg-sn-primary text-white border-sn-primary'
                                        : 'bg-transparent text-sn-grey border-sn-light hover:border-sn-primary hover:text-sn-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider line */}
                <div className="h-px bg-sn-light mt-10" />
            </section>

            {/*  MASONRY GRID  */}
            <section className="bg-white px-5 md:px-[40px] lg:px-[135px] pb-[60px] md:pb-[80px] lg:pb-[120px] pt-[40px] md:pt-[60px]">
                {/* Desktop masonry grid */}
                <div className="hidden lg:grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '260px' }}>
                    <AnimatePresence mode="popLayout">
                        {visible.map((img, i) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.9, delay: i * 0.08, ease }}
                                style={getGridStyle(i)}
                                className="relative overflow-hidden rounded-[2px] group"
                                onMouseEnter={() => setHovered(img.id)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => openLightbox(i)}
                            >
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" draggable={false} />

                                {/* Hover Overlay */}
                                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ${hovered === img.id ? 'bg-[rgba(40,22,18,0.5)]' : 'bg-[rgba(40,22,18,0)]'}`}>
                                    <AnimatePresence>
                                        {hovered === img.id && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center">
                                                <span className="bg-sn-primary px-3 py-1 rounded-[2px] font-body font-bold text-[11px] text-white tracking-[2px] uppercase">{img.category}</span>
                                                <span className="font-body font-medium text-[14px] text-white mt-2">View →</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Tablet grid: 2 col uniform */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-3">
                    <AnimatePresence mode="popLayout">
                        {visible.map((img, i) => (
                            <motion.div key={img.id} layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, delay: i * 0.06, ease }} className="relative overflow-hidden rounded-[2px] h-[280px] group" onClick={() => openLightbox(i)}>
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]" draggable={false} />
                                <div className="absolute inset-0 bg-[rgba(40,22,18,0)] group-hover:bg-[rgba(40,22,18,0.5)] transition-all duration-400 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                                        <span className="bg-sn-primary px-3 py-1 rounded-[2px] font-body font-bold text-[11px] text-white tracking-[2px] uppercase">{img.category}</span>
                                        <span className="font-body font-medium text-[14px] text-white mt-2">View →</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Mobile grid: 1 col */}
                <div className="grid md:hidden grid-cols-1 gap-3">
                    <AnimatePresence mode="popLayout">
                        {visible.map((img, i) => (
                            <motion.div key={img.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.7, delay: i * 0.05, ease }} className="relative overflow-hidden rounded-[2px] h-[260px]" onClick={() => openLightbox(i)}>
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover" draggable={false} />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(16,16,16,0.7)] to-transparent">
                                    <span className="font-body font-bold text-[11px] text-sn-primary tracking-[2px] uppercase">{img.category}</span>
                                    <p className="font-display text-[18px] text-white mt-1">{img.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Load More */}
                {hasMore && (
                    <div className="flex justify-center mt-12 md:mt-16">
                        <motion.button
                            onClick={loadMore}
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-full border-2 border-sn-primary font-body font-bold text-[15px] text-sn-primary px-10 py-[14px] hover:bg-sn-primary hover:text-white transition-all duration-300 flex items-center gap-2"
                        >
                            {loading ? <><Loader size={16} className="animate-spin" /> Loading...</> : 'Load More'}
                        </motion.button>
                    </div>
                )}
            </section>

            {/*  LIGHTBOX  */}
            <AnimatePresence>
                {lightboxIdx !== null && visible[lightboxIdx] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-[rgba(16,16,16,0.96)] flex items-center justify-center"
                        onClick={closeLightbox}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Close */}
                        <motion.button
                            onClick={closeLightbox}
                            whileHover={{ rotate: 90 }}
                            className="fixed top-8 right-8 text-white hover:text-sn-primary transition-colors z-[101]"
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Prev */}
                        <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
                            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-sn-primary hover:bg-sn-primary transition-all duration-300 z-[101]">
                            <ChevronLeft size={20} />
                        </button>

                        {/* Next */}
                        <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
                            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-sn-primary hover:bg-sn-primary transition-all duration-300 z-[101]">
                            <ChevronRight size={20} />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={visible[lightboxIdx].id}
                            src={visible[lightboxIdx].src}
                            alt={visible[lightboxIdx].title}
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="max-h-[85vh] max-w-[80vw] md:max-w-[80vw] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Caption Bar */}
                        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 md:pb-8 pt-10 bg-gradient-to-t from-[#101010] to-transparent">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="font-body font-bold text-[11px] text-sn-primary tracking-[3px] uppercase">{visible[lightboxIdx].category}</p>
                                    <p className="font-display text-[20px] md:text-[22px] text-white mt-1">{visible[lightboxIdx].title}</p>
                                </div>
                                <p className="font-body text-[13px] text-sn-muted">{lightboxIdx + 1} / {visible.length}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  INSTAGRAM CTA  */}
            <section className="bg-sn-cream py-[50px] md:py-[60px] lg:py-[80px] px-5 md:px-[40px] lg:px-[135px]">
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
                    className="text-center"
                >
                    <motion.div variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}>
                        <Instagram size={32} className="text-sn-primary mx-auto mb-4" />
                    </motion.div>
                    <motion.h2 variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }} className="font-display text-[30px] md:text-[36px] text-sn-darkest">
                        @sweetnoir.cakes
                    </motion.h2>
                    <motion.p variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }} className="font-body text-[17px] text-sn-grey leading-[1.7] max-w-[460px] mx-auto mt-4">
                        Follow our journey - new flavours, behind-the-scenes moments, and limited drops announced first on Instagram.
                    </motion.p>
                    <motion.div variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="inline-block mt-8 rounded-full bg-sn-primary text-white font-body font-bold text-[15px] px-9 py-4 hover:bg-sn-darkest hover:scale-[1.03] transition-all duration-300">
                            Follow on Instagram
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FDF6F0" color="#281612" />

            {/*  CUSTOM ORDER NUDGE  */}
            <section className="bg-sn-deep py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div ref={nudgeLeftRef}>
                        <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary">INSPIRED BY WHAT YOU SEE?</p>
                        <h2 className="font-display text-[32px] md:text-[40px] text-white mt-3 leading-[1.1] max-w-[520px]">
                            Let's make something just for you.
                        </h2>
                    </div>
                    <div ref={nudgeRightRef}>
                        <Link to="/custom-orders">
                            <motion.span
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-block rounded-full bg-sn-primary text-white font-display text-[18px] md:text-[20px] px-8 md:px-11 py-4 md:py-[18px] hover:bg-white hover:text-sn-deep transition-all duration-300"
                            >
                                Start a Custom Order
                            </motion.span>
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
