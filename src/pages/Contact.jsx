import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle, ShoppingBag, Pencil, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../components/layout/SectionDivider'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

const subjectOptions = ['General Enquiry', 'Order Question', 'Custom Cake', 'Feedback', 'Something Else']

const storeHours = [
    { day: 'Monday', time: '9:00 AM – 8:00 PM' },
    { day: 'Tuesday', time: '9:00 AM – 8:00 PM' },
    { day: 'Wednesday', time: '9:00 AM – 8:00 PM' },
    { day: 'Thursday', time: '9:00 AM – 8:00 PM' },
    { day: 'Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 6:00 PM' },
]

function getTodayName() {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const heroLeftRef = useRef(null)
    const formRef = useRef(null)
    const mapRef = useRef(null)
    const storefrontRef = useRef(null)
    const storefrontContentRef = useRef(null)

    const today = getTodayName()

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroLeftRef.current) gsap.fromTo(heroLeftRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 })
            if (formRef.current) gsap.fromTo(formRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true } })
            if (mapRef.current) gsap.fromTo(mapRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: mapRef.current, start: 'top 80%', once: true } })
            if (storefrontRef.current) gsap.to(storefrontRef.current.querySelector('img'), { y: -60, ease: 'none', scrollTrigger: { trigger: storefrontRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
            if (storefrontContentRef.current) gsap.fromTo(storefrontContentRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: storefrontContentRef.current, start: 'top 80%', once: true } })
        })
        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [])

    const contactCards = [
        { icon: Phone, label: 'CALL US', value: '+91 00000 00000' },
        { icon: Mail, label: 'EMAIL US', value: 'hello@sweetnoir.in' },
        { icon: MapPin, label: 'VISIT US', value: '14 Patisserie Lane, Bandra West, Mumbai' },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            {/*  1. HERO - DARK  */}
            <section className="bg-sn-deep pt-[120px] md:pt-[160px] pb-[60px] md:pb-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                    {/* Left */}
                    <div ref={heroLeftRef} className="lg:w-[55%]">
                        <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-5">GET IN TOUCH</p>
                        <h1 className="font-display text-white leading-[1.0] mb-7" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
                            We'd love to<br />hear from you.
                        </h1>
                        <p className="font-body text-[17px] text-sn-light leading-[1.8] max-w-[400px]">
                            Whether you have a question about an order, want to discuss a custom creation, or simply want to say hello - our team is here and we genuinely love hearing from our guests.
                        </p>
                        <div className="flex items-center gap-[10px] mt-8">
                            <Clock size={16} className="text-sn-primary shrink-0" />
                            <span className="font-body font-medium text-[14px] text-sn-muted">We respond to every message within 24 hours.</span>
                        </div>
                    </div>

                    {/* Right - Contact Cards */}
                    <div className="lg:w-[45%] flex flex-col gap-4">
                        {contactCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease }}
                                whileHover={{ borderColor: '#673E34' }}
                                className="bg-[#1E0E0A] border border-sn-darkest rounded-[2px] px-7 py-6 flex items-center gap-4 transition-colors duration-300"
                            >
                                <div className="w-11 h-11 rounded-full bg-sn-darkest flex items-center justify-center shrink-0">
                                    <card.icon size={18} className="text-sn-primary" />
                                </div>
                                <div>
                                    <p className="font-body font-bold text-[11px] tracking-[2px] text-sn-primary uppercase mb-1">{card.label}</p>
                                    <p className="font-body font-medium text-[15px] text-white">{card.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider fromColor="#281612" color="#FDF6F0" />

            {/*  2. FORM + MAP  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                    {/* Left - Form */}
                    <div ref={formRef} className="lg:w-1/2">
                        <h2 className="font-display text-[30px] md:text-[36px] text-sn-darkest mb-2">Send us a message</h2>
                        <p className="font-body text-[15px] text-sn-muted mb-10">Not urgent? Drop us a note and we'll get back to you personally.</p>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-body font-bold text-[13px] text-sn-darkest mb-2">Full Name</label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required
                                                className="w-full bg-white border border-sn-light rounded-[2px] px-4 py-[14px] font-body text-[15px] text-[#101010] placeholder:text-sn-muted focus:border-sn-primary focus:ring-[3px] focus:ring-sn-primary/[0.08] outline-none transition-all duration-200" />
                                        </div>
                                        <div>
                                            <label className="block font-body font-bold text-[13px] text-sn-darkest mb-2">Email</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required
                                                className="w-full bg-white border border-sn-light rounded-[2px] px-4 py-[14px] font-body text-[15px] text-[#101010] placeholder:text-sn-muted focus:border-sn-primary focus:ring-[3px] focus:ring-sn-primary/[0.08] outline-none transition-all duration-200" />
                                        </div>
                                    </div>

                                    {/* Subject pills */}
                                    <div>
                                        <label className="block font-body font-bold text-[13px] text-sn-darkest mb-2">Subject</label>
                                        <div className="flex flex-wrap gap-[10px]">
                                            {subjectOptions.map(opt => (
                                                <button key={opt} type="button" onClick={() => setForm(prev => ({ ...prev, subject: opt }))}
                                                    className={`px-4 py-[10px] rounded-[2px] font-body font-medium text-[13px] border transition-all duration-200
                                                        ${form.subject === opt ? 'bg-sn-primary text-white border-sn-primary' : 'bg-white text-sn-grey border-sn-light hover:border-sn-primary hover:text-sn-primary'}`}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block font-body font-bold text-[13px] text-sn-darkest mb-2">Message</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what's on your mind..." required rows={6}
                                            className="w-full bg-white border border-sn-light rounded-[2px] px-4 py-[14px] font-body text-[15px] text-[#101010] placeholder:text-sn-muted focus:border-sn-primary focus:ring-[3px] focus:ring-sn-primary/[0.08] outline-none transition-all duration-200 resize-none min-h-[160px]" />
                                    </div>

                                    {/* Submit */}
                                    <motion.button type="submit" whileTap={{ scale: 0.98 }}
                                        className="w-full h-[54px] bg-sn-darkest text-white font-display text-[20px] rounded-[2px] hover:bg-sn-primary transition-colors duration-300 mt-2">
                                        Send Message
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }}
                                    className="bg-white border border-sn-light rounded-[2px] p-12 text-center">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}>
                                        <CheckCircle size={48} className="text-sn-primary mx-auto" />
                                    </motion.div>
                                    <h3 className="font-display text-[28px] text-sn-darkest mt-5">Message Received!</h3>
                                    <p className="font-body text-[16px] text-sn-grey mt-3">We'll be in touch within 24 hours.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right - Map + Hours */}
                    <div ref={mapRef} className="lg:w-1/2">
                        {/* Map */}
                        <div className="rounded-[2px] overflow-hidden border border-sn-light" style={{ height: 320 }}>
                            <iframe
                                title="Sweet Noir Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2!2d72.836!3d19.054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzE0LjQiTiA3MsKwNTAnMDkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(40%) sepia(20%)' }}
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Store Hours */}
                        <div className="bg-white border border-sn-light rounded-[2px] p-7 md:p-8 mt-5">
                            <div className="flex items-center gap-2 mb-5">
                                <Clock size={16} className="text-sn-primary" />
                                <h3 className="font-body font-bold text-[15px] text-sn-darkest">Store Hours</h3>
                            </div>
                            <div className="divide-y divide-[#F0E8DF]">
                                {storeHours.map(h => {
                                    const isToday = h.day === today
                                    return (
                                        <div key={h.day} className={`flex items-center justify-between py-[10px] px-2 rounded-[2px] ${isToday ? 'bg-sn-cream' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-body text-[14px] ${isToday ? 'font-bold text-sn-primary' : 'font-medium text-sn-darkest'}`}>{h.day}</span>
                                                {isToday && <span className="bg-sn-primary text-white font-body font-bold text-[10px] px-2 py-[2px] rounded-full">Today</span>}
                                            </div>
                                            <span className="font-body text-[14px] text-sn-grey">{h.time}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*  3. STOREFRONT BANNER  */}
            <section ref={storefrontRef} className="bg-white relative overflow-hidden" style={{ height: 480 }}>
                <img src="/images/kitchen-1.png" alt="Sweet Noir Storefront" className="absolute inset-0 w-full h-[140%] object-cover" />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(40,22,18,0.85) 0%, rgba(40,22,18,0.4) 60%, rgba(40,22,18,0.1) 100%)' }} />

                {/* Content */}
                <div ref={storefrontContentRef} className="absolute left-5 md:left-[40px] lg:left-[135px] top-1/2 -translate-y-1/2 z-[1]">
                    <p className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-4">FIND US</p>
                    <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>Come say hello.</h2>
                    <p className="font-body text-[16px] text-sn-light leading-[1.6]">14 Patisserie Lane, Bandra West</p>
                    <p className="font-body text-[16px] text-sn-light leading-[1.6]">Mumbai, Maharashtra 400050</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-7 rounded-full border-2 border-white text-white font-body font-bold text-[14px] px-7 py-3 hover:bg-white hover:text-sn-deep transition-all duration-300">
                        Get Directions →
                    </a>
                </div>
            </section>

            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  4. QUICK LINKS  */}
            <section className="bg-sn-cream py-[50px] md:py-[60px] lg:py-[80px] px-5 md:px-[40px] lg:px-[135px]">
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {[
                        { icon: ShoppingBag, title: 'Browse the Menu', text: 'Explore our full range of signature cakes, cupcakes and seasonal specials.', link: '/menu', label: 'View Menu →' },
                        { icon: Pencil, title: 'Custom Orders', text: 'Have something specific in mind? Start your bespoke cake consultation.', link: '/custom-orders', label: 'Start Order →' },
                        { icon: Star, title: 'Read Reviews', text: 'See what our guests have to say about their Sweet Noir experience.', link: '/testimonials', label: 'Read Reviews →' },
                    ].map(card => (
                        <motion.div
                            key={card.title}
                            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
                            whileHover={{ y: -6, borderColor: '#673E34', boxShadow: '0 16px 40px rgba(64,28,19,0.08)' }}
                            className="bg-white border border-sn-light rounded-[2px] p-8 text-center transition-all duration-300"
                        >
                            <card.icon size={32} className="text-sn-primary mx-auto mb-4" />
                            <h3 className="font-display text-[22px] text-sn-darkest mb-2">{card.title}</h3>
                            <p className="font-body text-[14px] text-sn-grey leading-[1.6] mb-5">{card.text}</p>
                            <Link to={card.link} className="font-body font-bold text-[14px] text-sn-primary hover:translate-x-1 inline-block transition-transform duration-200">
                                {card.label}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </motion.div>
    )
}
