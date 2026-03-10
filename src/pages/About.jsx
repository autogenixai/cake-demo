import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../components/layout/SectionDivider'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

const values = [
    {
        num: '01', title: 'No Shortcuts. Ever.', img: '/images/about-value-1.png',
        body: 'We use Belgian chocolate, French butter, and locally sourced fresh produce. If we can\'t find the right ingredient, we delay the order - not lower our standard.',
    },
    {
        num: '02', title: 'Every Cake is a First.', img: '/images/about-value-2.png',
        body: 'We treat every order - whether it\'s a birthday cupcake or a 5-tier wedding centrepiece - with the same level of obsessive attention. No cake is routine at Sweet Noir.',
    },
    {
        num: '03', title: 'Made for Your Moment.', img: '/images/about-value-3.png',
        body: 'We understand that cakes mark milestones. A first birthday. A last anniversary. A quiet Tuesday that someone wanted to make special. We never forget that.',
    },
]

const publications = ['Vogue India', 'Condé Nast Traveller', 'Forbes Life', 'Architectural Digest', 'The Hindu']

const stats = [
    { value: 500, suffix: '+', label: 'Custom Cakes Delivered' },
    { value: 6, suffix: '', label: 'Years of Craft' },
    { value: 4.9, suffix: '★', label: 'Average Rating', isDecimal: true },
    { value: 12, suffix: '', label: 'Signature Flavours' },
]

export default function About() {
    const lineRef = useRef(null)
    const heroContentRef = useRef(null)
    const underlineRef = useRef(null)
    const founderLeftRef = useRef(null)
    const founderRightRef = useRef(null)
    const founderMainImgRef = useRef(null)
    const statsRef = useRef(null)
    const statNumberRefs = useRef([])
    const valueRowRefs = useRef([])
    const kitchenHeaderRef = useRef(null)
    const kitchenStripRef = useRef(null)
    const pressRef = useRef(null)
    const quoteRef = useRef(null)
    const stripContainerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            //  Hero line draw 
            if (lineRef.current) {
                gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' })
            }

            //  Hero content stagger 
            if (heroContentRef.current) {
                const children = heroContentRef.current.children
                gsap.fromTo(children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 })
            }

            //  Underline draw 
            if (underlineRef.current) {
                gsap.fromTo(underlineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 1.2 })
            }

            //  Founder section 
            if (founderLeftRef.current) {
                gsap.fromTo(founderLeftRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: founderLeftRef.current, start: 'top 75%' } })
            }
            if (founderRightRef.current) {
                gsap.fromTo(founderRightRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: founderRightRef.current, start: 'top 75%' } })
            }
            if (founderMainImgRef.current) {
                gsap.to(founderMainImgRef.current, { y: -30, ease: 'none', scrollTrigger: { trigger: founderMainImgRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
            }

            //  Stats counter 
            if (statsRef.current) {
                statNumberRefs.current.forEach((el, i) => {
                    if (!el) return
                    const stat = stats[i]
                    gsap.fromTo(el, { innerText: 0 }, {
                        innerText: stat.value,
                        duration: 2,
                        ease: 'power2.out',
                        snap: stat.isDecimal ? { innerText: 0.1 } : { innerText: 1 },
                        scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
                        onUpdate() {
                            const v = stat.isDecimal ? parseFloat(el.innerText).toFixed(1) : Math.round(parseFloat(el.innerText))
                            el.innerText = v
                        },
                    })
                })
            }

            //  Value rows 
            valueRowRefs.current.forEach((row) => {
                if (!row) return
                const img = row.querySelector('.value-img')
                const text = row.querySelector('.value-text')
                const isReversed = row.dataset.reverse === 'true'
                if (img) gsap.fromTo(img, { x: isReversed ? 60 : -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 75%' } })
                if (text) gsap.fromTo(text, { x: isReversed ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 75%' } })
            })

            //  Kitchen strip 
            if (kitchenHeaderRef.current) {
                gsap.fromTo(kitchenHeaderRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: kitchenHeaderRef.current, start: 'top 85%' } })
            }
            if (kitchenStripRef.current) {
                gsap.fromTo(kitchenStripRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: kitchenStripRef.current, start: 'top 85%' } })
            }

            //  Press quote 
            if (quoteRef.current) {
                gsap.fromTo(quoteRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' } })
            }
        })

        //  Drag-to-scroll for kitchen strip 
        const strip = stripContainerRef.current
        if (strip) {
            let isDown = false, startX, scrollLeft
            const onDown = (e) => { isDown = true; strip.style.cursor = 'grabbing'; startX = (e.pageX || e.touches?.[0]?.pageX) - strip.offsetLeft; scrollLeft = strip.scrollLeft }
            const onUp = () => { isDown = false; strip.style.cursor = 'grab' }
            const onMove = (e) => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches?.[0]?.pageX) - strip.offsetLeft; strip.scrollLeft = scrollLeft - (x - startX) * 1.5 }
            strip.addEventListener('mousedown', onDown)
            strip.addEventListener('touchstart', onDown, { passive: true })
            strip.addEventListener('mouseup', onUp)
            strip.addEventListener('mouseleave', onUp)
            strip.addEventListener('touchend', onUp)
            strip.addEventListener('mousemove', onMove)
            strip.addEventListener('touchmove', onMove, { passive: false })
        }

        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/*  1. MANIFESTO HERO  */}
            <section className="bg-white pt-[120px] md:pt-[160px] pb-[60px] md:pb-[100px] px-5 md:px-[40px] lg:px-[135px]">
                {/* Curtain line */}
                <div ref={lineRef} className="h-[2px] bg-sn-primary mb-12 origin-left" style={{ transform: 'scaleX(0)' }} />

                <div ref={heroContentRef}>
                    {/* Eyebrow */}
                    <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-6">OUR STORY</p>

                    {/* Statement */}
                    <div className="mb-10">
                        <h1 className="font-display text-sn-darkest leading-[1.0]" style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}>We don't just</h1>
                        <h1 className="font-display text-sn-darkest leading-[1.0]" style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}>bake cakes.</h1>
                        <div className="relative inline-block">
                            <h1 className="font-display text-sn-darkest leading-[1.0]" style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}>We craft moments.</h1>
                            <svg ref={underlineRef} className="absolute -bottom-2 left-0 w-full h-[6px] origin-left" style={{ transform: 'scaleX(0)' }} viewBox="0 0 400 6" preserveAspectRatio="none">
                                <path d="M0,4 C50,1 100,6 150,3 C200,0 250,5 300,2 C350,0 380,4 400,3" fill="none" stroke="#673E34" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Body */}
                    <p className="font-body text-[18px] md:text-[20px] text-sn-grey leading-[1.8] max-w-[560px]">
                        Sweet Noir was born from a single obsession - that a truly great cake should stop you mid-bite. Not because it's decorated. Because it's alive with flavour, memory, and intention.
                    </p>
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  2. MEET THE BAKER  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[120px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left - Image Stack */}
                    <div ref={founderLeftRef} className="w-full lg:w-[55%] relative">
                        <img ref={founderMainImgRef} src="/images/about-founder-main.png" alt="Sofia Mehra" className="w-full aspect-[3/4] object-cover rounded-[2px]" />
                        <img src="/images/about-founder-detail.png" alt="Cake detail" className="hidden md:block absolute -bottom-10 -right-10 w-[45%] aspect-square object-cover rounded-[2px] border-[6px] border-sn-cream shadow-[0_20px_60px_rgba(64,28,19,0.15)]" />
                    </div>

                    {/* Right - Text */}
                    <div ref={founderRightRef} className="w-full lg:w-[45%] pt-0 lg:pt-10">
                        <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-5">MEET THE BAKER</p>
                        <h2 className="font-display text-[36px] md:text-[40px] text-sn-darkest mb-[6px]">Sofia Mehra</h2>
                        <p className="font-body font-medium text-[16px] text-sn-muted mb-8">Founder & Head Pastry Chef</p>
                        <div className="w-[40px] h-[2px] bg-sn-primary mb-8" />

                        <div className="space-y-6">
                            <p className="font-body text-[17px] text-sn-grey leading-[1.85]">
                                I grew up in my grandmother's kitchen in Pune, watching her turn the most ordinary ingredients into something extraordinary. She never used a recipe. She used instinct, patience, and love.
                            </p>
                            <p className="font-body text-[17px] text-sn-grey leading-[1.85]">
                                After training at Le Cordon Bleu in Paris and working in Michelin-starred kitchens across Europe, I came home with one purpose - to bring that same obsessive standard to Indian celebrations.
                            </p>
                            <p className="font-body text-[17px] text-sn-grey leading-[1.85]">
                                Sweet Noir is everything I learned, everything I remember, and everything I believe a great cake can be. Every single order is personal to me.
                            </p>
                        </div>

                        <p className="font-display italic text-[32px] text-sn-primary mt-8">Sofia</p>
                    </div>
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*  3. STATS  */}
            <SectionDivider fromColor="#FFFFFF" color="#281612" />
            <section ref={statsRef} className="bg-sn-deep py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
                    {stats.map((s, i) => (
                        <React.Fragment key={s.label}>
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                                className="text-center relative"
                            >
                                <div className="flex items-baseline justify-center">
                                    <span ref={el => (statNumberRefs.current[i] = el)} className="font-display text-white" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>0</span>
                                    {s.suffix && <span className="font-display text-sn-primary" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>{s.suffix}</span>}
                                </div>
                                <p className="font-body text-[14px] md:text-[15px] text-sn-muted uppercase tracking-[2px] mt-3">{s.label}</p>

                                {/* Vertical divider (desktop only, not on last) */}
                                {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[60px] bg-sn-darkest" />}
                            </motion.div>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#281612" color="#FDF6F0" flip />

            {/*  4. CORE VALUES  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[120px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="space-y-16 lg:space-y-[100px]">
                    {values.map((v, i) => {
                        const isReversed = i === 1
                        return (
                            <div
                                key={v.num}
                                ref={el => (valueRowRefs.current[i] = el)}
                                data-reverse={isReversed}
                                className={`flex flex-col gap-10 lg:gap-20 ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                            >
                                {/* Image */}
                                <div className="value-img w-full lg:w-1/2">
                                    <img src={v.img} alt={v.title} className="w-full aspect-[4/3] object-cover rounded-[2px]" />
                                </div>

                                {/* Text */}
                                <div className="value-text w-full lg:w-1/2 flex flex-col justify-center">
                                    <span className="font-romul text-[48px] lg:text-[64px] text-sn-light leading-none -mb-3 lg:-mb-5">{v.num}</span>
                                    <h3 className="font-display text-[28px] md:text-[36px] text-sn-darkest mb-5">{v.title}</h3>
                                    <p className="font-body text-[17px] text-sn-grey leading-[1.8] max-w-[420px]">{v.body}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*  5. BEHIND THE SCENES  */}
            <section className="bg-white py-[60px] md:py-[80px] lg:py-[100px]">
                <h2 ref={kitchenHeaderRef} className="font-display text-[32px] md:text-[40px] text-sn-darkest px-5 md:px-[40px] lg:px-[135px] mb-10 md:mb-12">Behind the Scenes</h2>
                <div
                    ref={(el) => { kitchenStripRef.current = el; stripContainerRef.current = el }}
                    className="flex gap-4 overflow-x-auto px-5 md:px-[40px] lg:px-[135px] scrollbar-hide select-none"
                    style={{ cursor: 'grab' }}
                >
                    {[1, 2, 3, 4, 5].map(n => (
                        <img
                            key={n}
                            src={`/images/kitchen-${n}.png`}
                            alt={`Kitchen ${n}`}
                            className="h-[220px] w-[220px] md:h-[260px] md:w-[260px] lg:h-[340px] lg:w-[280px] flex-shrink-0 object-cover rounded-[2px] hover:scale-[1.03] hover:brightness-105 transition-all duration-400 pointer-events-none"
                            draggable={false}
                        />
                    ))}
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FFFFFF" color="#281612" />

            {/*  6. AS SEEN IN  */}
            <section className="bg-sn-deep py-[50px] md:py-[60px] lg:py-[80px] px-5 md:px-[40px] lg:px-[135px]">
                <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary text-center mb-10 md:mb-12">AS SEEN IN</p>

                {/* Logos row */}
                <div ref={pressRef} className="flex flex-wrap justify-center items-center gap-y-6">
                    {publications.map((pub, i) => (
                        <React.Fragment key={pub}>
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                                className="font-romul text-[18px] md:text-[22px] text-sn-muted hover:text-white transition-colors duration-300 cursor-default px-4 md:px-6"
                            >
                                {pub}
                            </motion.span>
                            {i < publications.length - 1 && (
                                <div className="hidden md:block w-px h-5 bg-sn-darkest" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Quote */}
                <div ref={quoteRef} className="mt-10 md:mt-12">
                    <p className="font-display text-[22px] md:text-[28px] text-white text-center max-w-[560px] mx-auto leading-[1.3]">
                        "The most refined cake experience in the city."
                    </p>
                    <p className="font-body text-[14px] text-sn-muted text-center mt-4">- Vogue India, 2024</p>
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#281612" color="#FDF6F0" flip />

            {/*  7. CTA  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[120px] px-5 md:px-[40px] lg:px-[135px]">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
                    className="text-center"
                >
                    <motion.h2
                        variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-display text-[36px] md:text-[50px] text-sn-darkest leading-[1.1]"
                    >
                        Ready to be part of
                    </motion.h2>
                    <motion.h2
                        variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-display text-[36px] md:text-[50px] text-sn-primary leading-[1.1]"
                    >
                        a Sweet Noir moment?
                    </motion.h2>

                    <motion.p
                        variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="font-body text-[18px] text-sn-grey leading-[1.7] max-w-[480px] mx-auto mt-6"
                    >
                        Whether it's your first order or your fiftieth, every cake we make carries the same promise - it will be worth it.
                    </motion.p>

                    <motion.div
                        variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } } }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                    >
                        <Link to="/menu" className="w-full sm:w-auto text-center rounded-full bg-sn-primary text-white font-body font-bold text-[15px] px-9 py-4 hover:bg-sn-darkest transition-colors duration-300">
                            Explore the Menu
                        </Link>
                        <Link to="/custom-orders" className="w-full sm:w-auto text-center rounded-full border-2 border-sn-primary text-sn-primary font-body font-bold text-[15px] px-9 py-4 hover:bg-sn-primary hover:text-white transition-all duration-300">
                            Order Something Custom
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </motion.div>
    )
}
