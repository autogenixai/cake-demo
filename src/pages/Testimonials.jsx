import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../components/layout/SectionDivider'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

const marqueeItems = [
    "Best cake I've ever had",
    'Ordered 6 times already',
    'My guests were obsessed',
    'Worth every single rupee',
    'Stopped me mid-bite',
    'Nothing else comes close',
    'The packaging alone is stunning',
    'I cried. The cake made me cry.',
]

/*  Reviews Data  */
const reviews = [
    { id: 1, stars: 5, category: 'Cakes', type: 'standard', quote: "The Noir Chocolate Tower was ordered for my husband's 40th birthday. He said it was the best thing he'd eaten in his life. High praise from a man who spent three years in Belgium.", name: 'Ananya R.', detail: 'Mumbai · March 2025' },
    { id: 2, stars: 5, category: 'Weddings', type: 'standard', quote: "Our wedding cake was a dream I'd been describing for two years. Sofia and her team listened to every detail, sketched it back to us, and then delivered something that exceeded every version I had imagined. Our guests are still talking about it six months later.", name: 'Ishaan & Kavya S.', detail: 'Delhi · January 2025' },
    { id: 3, stars: 5, category: 'Cupcakes', type: 'standard', quote: 'Ordered 48 cupcakes for our office party. Not a single one made it past the first hour. Reordering monthly now.', name: 'Rahul M.', detail: 'Bangalore · February 2025' },
    { id: 4, stars: 5, category: 'Custom', type: 'standard', quote: "I sent a reference image and a vague description. What arrived was better than the reference. That doesn't happen often.", name: 'Sneha P.', detail: 'Pune · March 2025' },
    { id: 5, stars: 5, category: 'Cakes', type: 'standard', quote: 'The Pistachio Reverie converted me. I was a chocolate-only person my entire life. Not anymore.', name: 'Arjun K.', detail: 'Hyderabad · February 2025' },
    { id: 6, stars: 5, category: 'Weddings', type: 'standard', quote: 'Every vendor at our wedding was good. Sweet Noir was extraordinary. There is a meaningful difference.', name: 'Nisha & Dev T.', detail: 'Mumbai · December 2024' },
    { id: 7, stars: 5, category: 'Cakes', type: 'standard', quote: 'I work in food. I know what good ingredients taste like and I know when someone has cut corners. Sweet Noir has never cut a single corner in anything I have ordered. The consistency across six orders over two years is frankly remarkable.', name: 'Chef Varun L.', detail: 'Mumbai · Ongoing customer' },
    { id: 8, stars: 5, category: 'Custom', type: 'standard', quote: "My mother's 60th birthday cake had her favourite flowers sculpted in sugar on top. She kept the decoration for three weeks before letting us throw it away.", name: 'Priya D.', detail: 'Chennai · January 2025' },
    { id: 9, stars: 4, category: 'Cupcakes', type: 'standard', quote: 'The Berry Vanilla cupcakes are dangerously good. I ordered a dozen telling myself they were for the office. Reader, I ate four in the car.', name: 'Tanya V.', detail: 'Bangalore · March 2025' },
    { id: 10, stars: 5, category: 'Cakes', type: 'standard', quote: "Salted Caramel Noir is a permanent fixture at every family gathering now. We don't negotiate on this.", name: 'Suresh N.', detail: 'Ahmedabad · February 2025' },
    { id: 11, stars: 5, category: 'Custom', type: 'standard', quote: 'The consultation process alone made me feel like a valued client. The cake was the icing on the cake - literally.', name: 'Meera J.', detail: 'Mumbai · March 2025' },
    { id: 12, stars: 5, category: 'Weddings', type: 'standard', quote: "Three weddings in our family in two years. Sweet Noir did all three. We wouldn't consider anyone else.", name: 'The Sharma Family', detail: 'Delhi · 2023–2025' },
]

const filterCategories = ['All', 'Cakes', 'Cupcakes', 'Weddings', 'Custom']

const ratingBars = [
    { label: '5 ★', pct: 82 },
    { label: '4 ★', pct: 12 },
    { label: '3 ★', pct: 4 },
    { label: '2 ★', pct: 1 },
    { label: '1 ★', pct: 1 },
]

/*  Grid position for masonry  */
function getGridPos(index) {
    const map = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
    }
    return map[index % 12] || {}
}

/*  Initials helper  */
const getInitials = (name) => name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()

/*  REVIEW CARD  */
function ReviewCard({ r, index }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: index * 0.06, ease }}
            whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(64,28,19,0.08)' }}
            className="relative overflow-hidden rounded-[2px] p-8 transition-all duration-300 bg-white border border-sn-light border-l-[3px] border-l-sn-primary hover:border-l-sn-darkest"
        >
            {/* Decorative quote mark */}
            <span className="absolute top-4 right-6 font-display text-[60px] leading-none pointer-events-none select-none text-[#F0E8DF]">❝</span>

            {/* Top row: stars + category */}
            <div className="flex items-center justify-between relative z-[1]">
                <div className="flex gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className={i < r.stars ? 'text-sn-primary fill-sn-primary' : 'text-sn-light'} />
                    ))}
                </div>
                <span className="px-2 py-[3px] rounded-[2px] font-body font-bold text-[10px] tracking-[2px] uppercase bg-sn-cream border border-sn-light text-sn-primary">{r.category}</span>
            </div>

            {/* Quote */}
            <p className="relative z-[1] mt-3 font-body text-[16px] text-sn-grey leading-[1.75]">"{r.quote}"</p>

            {/* Divider */}
            <div className="my-6 h-px bg-[#F0E8DF]" />

            {/* Author */}
            <div className="flex items-center gap-3 relative z-[1]">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-[#F0E8DF]">
                    <span className="font-display text-[16px] text-sn-primary">{getInitials(r.name)}</span>
                </div>
                <div>
                    <p className="font-body font-bold text-[14px] text-sn-darkest">{r.name}</p>
                    <p className="font-body text-[12px] text-sn-muted">{r.detail}</p>
                </div>
            </div>
        </motion.div>
    )
}

/*  MAIN COMPONENT  */
export default function Testimonials() {
    const [activeFilter, setActiveFilter] = useState('All')
    const heroContentRef = useRef(null)
    const quoteRef = useRef(null)
    const barsRef = useRef(null)
    const barFillRefs = useRef([])

    const filtered = activeFilter === 'All' ? reviews : reviews.filter(r => r.category === activeFilter)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero stagger
            if (heroContentRef.current) {
                const els = heroContentRef.current.children
                gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.4 })
            }

            // Featured quote clip-path reveal
            if (quoteRef.current) {
                gsap.fromTo(quoteRef.current,
                    { clipPath: 'inset(0 0 100% 0)' },
                    { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: quoteRef.current, start: 'top 75%', once: true } }
                )
            }

            // Rating bars
            if (barsRef.current) {
                barFillRefs.current.forEach((el, i) => {
                    if (!el) return
                    gsap.fromTo(el, { width: '0%' }, {
                        width: ratingBars[i].pct + '%',
                        duration: 1,
                        delay: i * 0.1,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: barsRef.current, start: 'top 80%', once: true },
                    })
                })
            }
        })
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [])

    const marqueeRow = marqueeItems.map((q, i) => (
        <span key={i} className="flex items-center gap-6 shrink-0 px-3">
            <span className="font-body font-medium text-[14px] md:text-[16px] text-sn-darkest whitespace-nowrap">{q}</span>
            <span className="text-sn-primary text-[10px]">◆</span>
        </span>
    ))

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            {/*  1. HERO  */}
            <section className="bg-white pt-[120px] md:pt-[160px] pb-[50px] md:pb-[80px] px-5 md:px-[40px] lg:px-[135px] relative overflow-hidden">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                    className="absolute top-[60px] md:top-[80px] left-1/2 -translate-x-1/2 font-display text-[200px] md:text-[280px] text-[#F0E8DF] z-0 pointer-events-none select-none leading-none" aria-hidden="true">❝</motion.span>

                <div ref={heroContentRef} className="relative z-[1] text-center">
                    <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-5">SWEET WORDS</p>
                    <h1 className="font-display text-sn-darkest leading-[1.05]" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>People who tasted</h1>
                    <h1 className="font-display text-sn-darkest leading-[1.05]" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>the difference.</h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 mt-10 md:mt-12">
                        {[['4.9 ★', 'Average Rating'], ['500+', 'Happy Customers'], ['98%', 'Repeat Orders']].map(([val, label], i) => (
                            <div key={label} className="flex items-center">
                                {i > 0 && <div className="hidden md:block w-px h-10 bg-sn-light mx-8 lg:mx-[60px]" />}
                                <div className="text-center">
                                    <p className="font-display text-[28px] md:text-[32px] text-sn-darkest">{val}</p>
                                    <p className="font-body text-[13px] text-sn-muted mt-1">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  2. FEATURED QUOTE  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="max-w-[900px] mx-auto text-center">
                    <span className="block font-display text-[80px] md:text-[120px] text-sn-primary leading-none -mb-6 md:-mb-10 select-none">❝</span>
                    <div ref={quoteRef}>
                        <p className="font-display text-sn-darkest leading-[1.5]" style={{ fontSize: 'clamp(20px, 2.8vw, 36px)' }}>
                            I've celebrated every major milestone of the last three years with a Sweet Noir cake. My mother's 70th birthday. My daughter's first. My own wedding anniversary. Each one was more beautiful than the last. There is no other bakery I would trust with moments that matter this much.
                        </p>
                    </div>
                    <div className="flex flex-col items-center mt-8 md:mt-10 gap-1">
                        <div className="w-14 h-14 rounded-full bg-sn-light flex items-center justify-center mb-2">
                            <span className="font-display text-[20px] text-sn-primary">PM</span>
                        </div>
                        <p className="font-body font-bold text-[16px] text-sn-darkest">Priyanka Mehra</p>
                        <p className="font-body text-[14px] text-sn-muted">Mumbai · Customer since 2022</p>
                        <div className="flex gap-[2px] mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-sn-primary fill-sn-primary" />)}
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*  3. MARQUEE  */}
            <div className="bg-white border-y border-sn-light h-[80px] flex items-center overflow-hidden">
                <div className="marquee-track flex">
                    <div className="flex shrink-0 marquee-content">{marqueeRow}</div>
                    <div className="flex shrink-0 marquee-content">{marqueeRow}</div>
                </div>
            </div>

            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  4. REVIEW CARDS GRID  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
                    <h2 className="font-display text-[32px] md:text-[40px] text-sn-darkest">More Sweet Words</h2>
                    <div className="flex flex-wrap gap-[10px]">
                        {filterCategories.map(cat => (
                            <button key={cat} onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-[10px] rounded-[2px] font-body font-medium text-[13px] border transition-all duration-200
                                    ${activeFilter === cat ? 'bg-sn-primary text-white border-sn-primary' : 'bg-transparent text-sn-grey border-sn-light hover:border-sn-primary hover:text-sn-primary'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop grid: 3-col masonry with dense packing */}
                <div className="hidden lg:grid grid-cols-3 gap-5" style={{ gridAutoFlow: 'dense' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-3 gap-5 col-span-3"
                            style={{ gridAutoFlow: 'dense' }}
                        >
                            {filtered.map((r, i) => (
                                <ReviewCard key={r.id} r={r} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tablet grid: 2-col */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-2 gap-5 col-span-2"
                        >
                            {filtered.map((r, i) => (
                                <ReviewCard key={r.id} r={r} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile: 1-col */}
                <div className="grid md:hidden grid-cols-1 gap-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 gap-5"
                        >
                            {filtered.map((r, i) => (
                                <ReviewCard key={r.id} r={r} index={i} isTall={false} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <SectionDivider fromColor="#FDF6F0" color="#281612" />

            {/*  5. RATING BREAKDOWN  */}
            <section className="bg-sn-deep py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left - overall score */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        className="lg:w-[40%] text-center lg:text-left"
                    >
                        <p className="font-romul text-white leading-none" style={{ fontSize: 'clamp(80px, 10vw, 120px)' }}>4.9</p>
                        <div className="flex gap-[3px] justify-center lg:justify-start mt-3">
                            {[...Array(5)].map((_, i) => <Star key={i} size={24} className="text-sn-primary fill-sn-primary" />)}
                        </div>
                        <p className="font-body text-[16px] text-sn-muted mt-4">(512 reviews)</p>
                    </motion.div>

                    {/* Right - breakdown bars */}
                    <div ref={barsRef} className="lg:w-[60%] space-y-4">
                        {ratingBars.map((bar, i) => (
                            <div key={bar.label} className="flex items-center gap-4">
                                <span className="font-body font-bold text-[14px] text-white w-10 shrink-0">{bar.label}</span>
                                <div className="flex-grow h-2 bg-sn-darkest rounded-full overflow-hidden">
                                    <div ref={el => (barFillRefs.current[i] = el)} className="h-full bg-sn-primary rounded-full" style={{ width: 0 }} />
                                </div>
                                <span className="font-body text-[13px] text-sn-muted w-10 text-right shrink-0">{bar.pct}%</span>
                            </div>
                        ))}

                        {/* Platform logos */}
                        <div className="pt-8 mt-6 border-t border-sn-darkest">
                            <p className="font-body text-[13px] text-sn-muted mb-3">Also reviewed on:</p>
                            <div className="flex flex-wrap items-center gap-4 md:gap-0">
                                {['Google', 'Zomato', 'Instagram'].map((p, i) => (
                                    <div key={p} className="flex items-center">
                                        {i > 0 && <div className="hidden md:block w-px h-5 bg-sn-darkest mx-4 lg:mx-8" />}
                                        <span className="font-body font-bold text-[15px] text-white">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider fromColor="#281612" color="#FDF6F0" flip />

            {/*  6. LEAVE A REVIEW CTA  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
                    className="text-center"
                >
                    <motion.h2 variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-display text-[36px] md:text-[44px] text-sn-darkest">
                        Had a Sweet Noir moment?
                    </motion.h2>

                    <motion.p variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-body text-[17px] text-sn-grey leading-[1.7] max-w-[460px] mx-auto mt-4">
                        We'd love to hear about it. Your words help other dessert lovers find us - and mean the world to our team.
                    </motion.p>

                    <motion.div variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center rounded-full bg-sn-primary text-white font-body font-bold text-[15px] px-9 py-4 hover:bg-sn-darkest transition-colors duration-300">
                            Write a Review
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center rounded-full border-2 border-sn-primary text-sn-primary font-body font-bold text-[15px] px-9 py-4 hover:bg-sn-primary hover:text-white transition-all duration-300">
                            Share on Instagram
                        </a>
                    </motion.div>

                    <motion.p variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-body text-[12px] text-sn-muted mt-4">
                        Reviews are shared on Google and our website with your permission.
                    </motion.p>
                </motion.div>
            </section>
        </motion.div>
    )
}
