import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../../data/cakes'

const wordVariants = {
    enter: (direction) => ({
        y: direction === 'top' ? -120 : 120,
        opacity: 0,
    }),
    center: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (direction) => ({
        y: direction === 'top' ? -120 : 120,
        opacity: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
}

const imageVariants = {
    enter: { scale: 0.92, opacity: 0 },
    center: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
    },
    exit: {
        scale: 0.92,
        opacity: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
}

const ingredientPositions = [
    { className: 'top-[12%] left-[5%] w-[100px] md:w-[140px] float-anim-1' },
    { className: 'top-[8%] right-[5%] w-[70px] md:w-[100px] float-anim-2' },
    { className: 'bottom-[18%] left-[3%] w-[90px] md:w-[120px] float-anim-3 hidden md:block' },
    { className: 'bottom-[15%] right-[4%] w-[80px] md:w-[110px] float-anim-4 hidden md:block' },
]

export default function HeroSlider() {
    const [current, setCurrent] = useState(0)

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, [])

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }, [])

    useEffect(() => {
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [next])

    const slide = heroSlides[current]

    return (
        <section
            className="relative w-full h-screen overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: slide.bgColor }}
        >
            {/* Background color transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${current}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                    style={{ backgroundColor: slide.bgColor }}
                />
            </AnimatePresence>

            {/* Floating Ingredients */}
            <AnimatePresence mode="wait">
                {ingredientPositions.map((pos, i) => (
                    <motion.img
                        key={`ingredient-${current}-${i}`}
                        src={`/images/ingredients/slide${current + 1}_${i + 1}.png`}
                        alt=""
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 0.85, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute pointer-events-none z-[1] ${pos.className}`}
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                ))}
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-[4] flex flex-col items-center justify-center w-full pt-[80px] px-6">
                {/* Top Word */}
                <AnimatePresence mode="wait" custom="top">
                    <motion.h1
                        key={`top-${current}`}
                        custom="top"
                        variants={wordVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="font-romul text-hero text-center tracking-[-2px] select-none z-[2]"
                        style={{ color: slide.textColor }}
                    >
                        {slide.topWord}
                    </motion.h1>
                </AnimatePresence>

                {/* Product Image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`img-${current}`}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative z-[3] -my-8 md:-my-16"
                    >
                        <img
                            src={`/images/hero/slide${current + 1}.png`}
                            alt={`${slide.topWord} ${slide.bottomWord}`}
                            className="w-[280px] md:w-[400px] lg:w-[480px] h-auto object-contain drop-shadow-2xl"
                            onError={(e) => {
                                e.target.style.display = 'none'
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Bottom Word */}
                <AnimatePresence mode="wait" custom="bottom">
                    <motion.h1
                        key={`bottom-${current}`}
                        custom="bottom"
                        variants={wordVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="font-romul text-hero text-center tracking-[-2px] select-none z-[1]"
                        style={{ color: slide.textColor }}
                    >
                        {slide.bottomWord}
                    </motion.h1>
                </AnimatePresence>

                {/* Subtitle */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`sub-${current}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="font-body font-bold text-[13px] tracking-[4px] uppercase text-center mt-4"
                        style={{ color: slide.textColor }}
                    >
                        {slide.subtitle}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Bottom Bar: Indicators + Navigation Arrows */}
            <div className="absolute left-0 right-0 z-10 flex items-center justify-between px-6 lg:px-gutter">
                {/* Prev Arrow */}
                <button
                    onClick={prev}
                    className="w-[44px] h-[44px] rounded-full border border-sn-darkest text-sn-darkest flex items-center justify-center hover:bg-sn-primary hover:border-sn-primary hover:text-white transition-all duration-300"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Next Arrow */}
                <button
                    onClick={next}
                    className="w-[44px] h-[44px] rounded-full border border-sn-darkest text-sn-darkest flex items-center justify-center hover:bg-sn-primary hover:border-sn-primary hover:text-white transition-all duration-300"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    )
}
