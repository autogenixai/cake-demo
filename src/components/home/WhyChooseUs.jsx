import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Truck, ChefHat, Gift } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: Truck,
        title: 'Same-Day Delivery',
        text: 'Fresh to your door within hours',
    },
    {
        icon: ChefHat,
        title: 'Baked Fresh Daily',
        text: 'No preservatives. Ever.',
    },
    {
        icon: Gift,
        title: 'Luxury Gifting',
        text: 'Elegant packaging for every occasion',
    },
]

const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: i * 0.2,
        },
    }),
}

export default function WhyChooseUs() {
    const lineRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const line = lineRef.current
        if (!line) return

        const length = line.getTotalLength()
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

        gsap.to(line, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <section ref={sectionRef} className="bg-white py-section px-6 md:px-gutter-sm lg:px-gutter">
            <div className="flex flex-col lg:flex-row items-start gap-16">
                {/* Left - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:w-[40%]"
                >
                    <h2 className="font-display text-h2 text-sn-darkest mb-4">
                        Handcrafted with Purpose
                    </h2>
                    <p className="font-body text-body-m text-sn-grey max-w-[420px] leading-relaxed">
                        We use only the finest Belgian chocolate and fresh, natural ingredients to create desserts that melt in your mouth.
                    </p>
                </motion.div>

                {/* Right - Features */}
                <div className="lg:w-[60%] relative">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                custom={i}
                                variants={iconVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-center flex flex-col items-center"
                            >
                                <motion.div
                                    className="w-[96px] h-[96px] rounded-full bg-sn-primary flex items-center justify-center mb-5"
                                    whileHover={{ scale: 1.08, backgroundColor: '#401C13' }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                >
                                    <feature.icon size={36} className="text-white" strokeWidth={1.5} />
                                </motion.div>
                                <h4 className="font-body font-bold text-[16px] text-sn-darkest mb-1">
                                    {feature.title}
                                </h4>
                                <p className="font-body text-[14px] text-sn-grey">
                                    {feature.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dashed Connecting Line */}
                    <svg
                        className="absolute top-[48px] left-0 w-full h-[20px] hidden md:block pointer-events-none"
                        viewBox="0 0 800 20"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={lineRef}
                            d="M80,10 C200,25 250,-5 400,10 C550,25 600,-5 720,10"
                            fill="none"
                            stroke="#E0E0E0"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                        />
                    </svg>
                </div>
            </div>
        </section>
    )
}
