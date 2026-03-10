import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Star, Truck, Check, Calendar, Upload, Store, ShieldCheck, MessageCircle, RefreshCw, CheckCircle, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../components/layout/SectionDivider'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
}

const processSteps = [
    { num: 1, title: 'Fill the Form', text: 'Tell us your occasion, serving size, flavour preferences, and any design inspiration you have.' },
    { num: 2, title: 'We Consult', text: 'Our baker reaches out within 24 hours to discuss your vision and finalise every detail.' },
    { num: 3, title: 'We Create', text: 'Your cake is handcrafted fresh using only the finest ingredients - no shortcuts, ever.' },
    { num: 4, title: 'We Deliver', text: 'Your order arrives in luxury packaging, perfectly on time, ready to be the centrepiece of your moment.' },
]

const stepLabels = ['Occasion', 'Cake Details', 'Delivery', 'Confirm']
const occasionOptions = ['Birthday', 'Wedding', 'Anniversary', 'Corporate', 'Graduation', 'Other']
const flavourOptions = ['Chocolate', 'Vanilla', 'Pistachio', 'Berry', 'Caramel', 'Lemon', 'Custom']
const sizeOptions = ['6 inch', '8 inch', '10 inch', '12 inch', 'Multi-tier']
const timeOptions = ['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–8)']

const initialForm = {
    name: '', email: '', phone: '', occasion: '', date: '',
    flavour: '', servings: 20, cakeSize: '', inspiration: '', referenceFile: null,
    address: '', city: '', deliveryTime: '', deliveryInstructions: '', deliveryType: '',
    message: '', agreed: false,
}

/* ─ Pill Select ─ */
function PillSelect({ options, value, onChange, columns }) {
    return (
        <div className={`flex flex-wrap gap-2 ${columns === 2 ? 'grid grid-cols-2 md:flex md:flex-wrap' : ''}`}>
            {options.map(opt => (
                <button
                    key={opt} type="button"
                    onClick={() => onChange(opt)}
                    className={`px-4 py-[10px] rounded-[2px] font-body font-medium text-[14px] transition-all duration-200 border
                        ${value === opt
                            ? 'bg-sn-primary text-white border-sn-primary'
                            : 'bg-white text-sn-grey border-sn-light hover:border-sn-primary hover:text-sn-primary'}`}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}

/* ─ Form Field Wrapper ─ */
function Field({ label, children, error }) {
    return (
        <div className="mb-6">
            <label className="block font-body font-bold text-[13px] text-sn-darkest tracking-[0.5px] mb-2">{label}</label>
            {children}
            {error && <p className="font-body text-[12px] text-[#C0392B] mt-[6px]">{error}</p>}
        </div>
    )
}

/* ─ Shared Input Classes ─ */
const inputCls = 'w-full bg-white border border-sn-light rounded-[2px] px-4 py-[14px] font-body text-[15px] text-sn-black placeholder:text-sn-muted focus:outline-none focus:border-sn-primary focus:shadow-[0_0_0_3px_rgba(103,62,52,0.08)] transition-all duration-200'

/* ─ Progress Bar ─ */
function ProgressBar({ current, onJump, completed }) {
    return (
        <div className="flex items-center justify-center mb-14 px-2">
            {stepLabels.map((label, i) => {
                const step = i + 1
                const isDone = completed.includes(step)
                const isActive = current === step
                const isPast = step < current
                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center min-w-[40px] md:min-w-[80px]">
                            <button
                                type="button"
                                onClick={() => (isDone || isPast) && onJump(step)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-body font-bold transition-all duration-300 shrink-0
                                    ${isDone ? 'bg-sn-darkest text-white cursor-pointer' :
                                        isActive ? 'bg-sn-primary text-white' :
                                            'bg-transparent border border-sn-light text-sn-muted'}`}
                            >
                                {isDone ? <Check size={14} /> : step}
                            </button>
                            <span className="hidden md:block font-body font-medium text-[12px] text-sn-muted uppercase tracking-[2px] mt-2 text-center whitespace-nowrap">
                                {label}
                            </span>
                        </div>
                        {i < 3 && (
                            <div className={`flex-grow h-px mx-1 md:mx-3 transition-colors duration-300 ${isPast || isDone ? 'bg-sn-primary' : 'bg-sn-light'}`} />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

/* ─ Stepper ─ */
function Stepper({ value, onChange, min = 6, max = 200, step = 2 }) {
    return (
        <div>
            <div className="inline-flex items-center border border-sn-light rounded-[2px]">
                <button type="button" onClick={() => onChange(Math.max(min, value - step))}
                    className="w-12 h-12 flex items-center justify-center text-sn-grey hover:text-sn-darkest transition-colors">
                    <Minus size={16} />
                </button>
                <span className="w-16 text-center font-body font-bold text-[18px] text-sn-darkest">{value}</span>
                <button type="button" onClick={() => onChange(Math.min(max, value + step))}
                    className="w-12 h-12 flex items-center justify-center text-sn-grey hover:text-sn-darkest transition-colors">
                    <Plus size={16} />
                </button>
            </div>
            <p className="font-body text-[13px] text-sn-muted mt-2">Not sure? Our team can advise based on your guest count.</p>
        </div>
    )
}

/*   MAIN COMPONENT   */
export default function CustomOrders() {
    const [formStep, setFormStep] = useState(1)
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [completed, setCompleted] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [dragOver, setDragOver] = useState(false)

    const stepsRef = useRef(null)
    const lineRef = useRef(null)
    const circleRefs = useRef([])

    const set = (key, val) => {
        setForm(prev => ({ ...prev, [key]: val }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
    }

    /*  Validation  */
    const validate = (step) => {
        const e = {}
        if (step === 1) {
            if (!form.name.trim()) e.name = 'Name is required'
            if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
            if (!form.phone.trim()) e.phone = 'Phone number is required'
            if (!form.occasion) e.occasion = 'Please select an occasion'
            if (!form.date) e.date = 'Event date is required'
        }
        if (step === 2) {
            if (!form.flavour) e.flavour = 'Please choose a flavour'
            if (!form.cakeSize) e.cakeSize = 'Please select a size'
        }
        if (step === 3) {
            if (!form.address.trim()) e.address = 'Delivery address is required'
            if (!form.city.trim()) e.city = 'City is required'
            if (!form.deliveryType) e.deliveryType = 'Please choose delivery type'
        }
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const next = () => {
        if (!validate(formStep)) return
        setCompleted(prev => [...new Set([...prev, formStep])])
        setFormStep(prev => Math.min(4, prev + 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const back = () => {
        setFormStep(prev => Math.max(1, prev - 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const jumpTo = (step) => {
        setFormStep(step)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = () => {
        if (!form.agreed) return
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    /*  File upload  */
    const handleFile = (file) => {
        if (file && file.size <= 10 * 1024 * 1024) set('referenceFile', file)
    }

    /*  GSAP for How‑it‑works  */
    useEffect(() => {
        if (lineRef.current) {
            const el = lineRef.current
            const len = el.getTotalLength()
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
            gsap.to(el, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' } })
        }
        circleRefs.current.forEach((el, i) => {
            if (!el) return
            gsap.fromTo(el, { '--fill': '0%' }, {
                '--fill': '100%', duration: 0.5, delay: i * 0.2, ease: 'power2.out',
                scrollTrigger: { trigger: stepsRef.current, start: 'top 70%' },
                onComplete: () => el.classList.add('filled'),
            })
        })
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    /*   RENDER   */
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            {/*  HERO  */}
            <section className="relative w-full h-auto md:h-[85vh] flex flex-col md:flex-row overflow-hidden">
                <motion.div
                    initial={{ x: '-100%' }} animate={{ x: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="w-full md:w-1/2 min-h-[50vh] md:min-h-0 md:h-full bg-sn-deep flex flex-col justify-center px-6 py-16 md:py-0 md:pl-[135px] md:pr-[80px] relative z-10"
                >
                    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[480px]">
                        <motion.p variants={fadeUp} className="font-body font-bold text-[11px] tracking-[4px] uppercase text-sn-primary mb-5">BESPOKE CREATIONS</motion.p>
                        <motion.h1 variants={fadeUp}>
                            <span className="font-display text-white leading-[1.0] block" style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}>Your Vision.</span>
                            <span className="font-display text-white leading-[1.0] block mb-7" style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}>Our Craft.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="font-body text-[18px] text-sn-light leading-[1.8] max-w-[420px] mb-10">
                            Every custom Sweet Noir cake begins with a conversation.
                            Tell us your occasion, your flavour, your dream - and we'll
                            craft something that belongs entirely to you.
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
                            {[['48hr Notice', Clock], ['500+ Custom Cakes', Star], ['Citywide Delivery', Truck]].map(([txt, Icon]) => (
                                <div key={txt} className="flex items-center gap-2">
                                    <Icon size={16} className="text-sn-primary" />
                                    <span className="font-body font-medium text-[13px] text-sn-muted">{txt}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ x: '100%' }} animate={{ x: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="w-full md:w-1/2 min-h-[40vh] md:min-h-0 md:h-full bg-sn-cream flex items-center justify-center overflow-hidden relative z-10"
                >
                    <motion.img
                        src="/images/custom-orders-hero.png" alt="Custom cake"
                        initial={{ scale: 0.9, opacity: 0, rotate: -4 }}
                        animate={{ scale: 1, opacity: 1, rotate: -2 }}
                        transition={{ duration: 1.2, delay: 0.4, ease }}
                        className="w-[60%] max-w-[420px] h-auto object-contain mix-blend-multiply"
                        style={{ filter: 'drop-shadow(0 40px 80px rgba(64,28,19,0.15))' }}
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                </motion.div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#281612" color="#FDF6F0" />

            {/*  HOW IT WORKS  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="text-center mb-16">
                    <h2 className="font-display text-[32px] md:text-[40px] text-sn-darkest">Simple as 1, 2, 3, 4</h2>
                    <p className="font-body text-[18px] text-sn-grey mt-3">Here's how your dream cake comes to life.</p>
                </div>
                <div ref={stepsRef} className="relative">
                    <svg className="hidden lg:block absolute top-[32px] left-[11%] z-0" style={{ width: '78%' }} height="2" viewBox="0 0 1000 2" preserveAspectRatio="none">
                        <line ref={lineRef} x1="0" y1="1" x2="1000" y2="1" stroke="#E0E0E0" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
                        {processSteps.map((s, i) => (
                            <motion.div key={s.num} initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.15, ease }} className="flex flex-col items-center text-center">
                                <div ref={el => (circleRefs.current[i] = el)} className="step-circle w-[64px] h-[64px] rounded-full border-2 border-sn-primary flex items-center justify-center mb-5 transition-colors duration-500">
                                    <span className="step-number font-display text-[24px] text-sn-primary transition-colors duration-500">{s.num}</span>
                                </div>
                                <h3 className="font-display text-[20px] text-sn-darkest mb-2">{s.title}</h3>
                                <p className="font-body text-[14px] text-sn-grey leading-[1.6] max-w-[260px]">{s.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FDF6F0" color="#FFFFFF" />

            {/*   FORM SECTION   */}
            <section className="bg-white py-[60px] md:py-[80px] lg:py-[100px] px-5 md:px-[40px] lg:px-[135px]">

                <AnimatePresence mode="wait">
                    {submitted ? (
                        /* ─ SUCCESS STATE ─ */
                        <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="max-w-[720px] mx-auto text-center py-16">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}>
                                <CheckCircle size={64} className="text-sn-primary mx-auto mb-6" />
                            </motion.div>
                            <h2 className="font-display text-[36px] text-sn-darkest mb-4">Your Order is In!</h2>
                            <p className="font-body text-[16px] text-sn-grey leading-[1.7] max-w-[400px] mx-auto mb-10">
                                We'll reach out within 24 hours to confirm your details and walk you through the next steps.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/" className="rounded-full bg-sn-primary text-white font-body font-bold text-[15px] px-8 py-[14px] hover:bg-sn-darkest transition-colors duration-300">Back to Home</Link>
                                <Link to="/menu" className="rounded-full border-2 border-sn-primary text-sn-primary font-body font-bold text-[15px] px-8 py-[14px] hover:bg-sn-primary hover:text-white transition-all duration-300">Explore Menu</Link>
                            </div>
                        </motion.div>
                    ) : (
                        /* ─ FORM ─ */
                        <motion.div key="form" className="max-w-[720px] mx-auto">
                            <ProgressBar current={formStep} onJump={jumpTo} completed={completed} />

                            <div className="border border-sn-light rounded-[2px] p-5 sm:p-8 lg:p-14">
                                <AnimatePresence mode="wait">

                                    {/* ─ STEP 1: OCCASION ─ */}
                                    {formStep === 1 && (
                                        <motion.div key="s1" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                                            <h3 className="font-display text-[24px] md:text-[28px] text-sn-darkest mb-8">Tell us about your occasion</h3>

                                            <Field label="Full Name" error={errors.name}>
                                                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={inputCls} />
                                            </Field>

                                            <Field label="Email Address" error={errors.email}>
                                                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={inputCls} />
                                            </Field>

                                            <Field label="Phone Number" error={errors.phone}>
                                                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                                            </Field>

                                            <Field label="Occasion Type" error={errors.occasion}>
                                                <PillSelect options={occasionOptions} value={form.occasion} onChange={v => set('occasion', v)} columns={2} />
                                            </Field>

                                            <Field label="Event Date" error={errors.date}>
                                                <div className="relative">
                                                    <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={`${inputCls} pr-12`} />
                                                    <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sn-darkest pointer-events-none" />
                                                </div>
                                            </Field>
                                        </motion.div>
                                    )}

                                    {/* ─ STEP 2: CAKE DETAILS ─ */}
                                    {formStep === 2 && (
                                        <motion.div key="s2" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                                            <h3 className="font-display text-[24px] md:text-[28px] text-sn-darkest mb-8">Design your cake</h3>

                                            <Field label="Flavour Preference" error={errors.flavour}>
                                                <PillSelect options={flavourOptions} value={form.flavour} onChange={v => set('flavour', v)} />
                                            </Field>

                                            <Field label="Number of Servings">
                                                <Stepper value={form.servings} onChange={v => set('servings', v)} />
                                            </Field>

                                            <Field label="Cake Size" error={errors.cakeSize}>
                                                <PillSelect options={sizeOptions} value={form.cakeSize} onChange={v => set('cakeSize', v)} />
                                            </Field>

                                            <Field label="Design Inspiration">
                                                <textarea value={form.inspiration} onChange={e => set('inspiration', e.target.value)} placeholder="Describe your vision - colours, themes, any references. The more detail, the better." className={`${inputCls} min-h-[120px] resize-y`} />
                                            </Field>

                                            <Field label="Upload Reference Image (optional)">
                                                <div
                                                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                                                    onDragLeave={() => setDragOver(false)}
                                                    onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
                                                    onClick={() => document.getElementById('refUpload').click()}
                                                    className={`border border-dashed rounded-[2px] p-8 text-center cursor-pointer transition-all duration-200
                                                        ${dragOver ? 'border-sn-primary bg-[#F5EDE8]' : 'border-sn-muted bg-sn-cream hover:border-sn-primary hover:bg-[#F5EDE8]'}`}
                                                >
                                                    <Upload size={24} className="text-sn-muted mx-auto mb-2" />
                                                    <p className="font-body text-[14px] text-sn-grey">{form.referenceFile ? form.referenceFile.name : 'Drag & drop or click to upload'}</p>
                                                    <p className="font-body text-[12px] text-sn-muted mt-1">PNG, JPG up to 10MB</p>
                                                    <input id="refUpload" type="file" accept="image/png,image/jpeg" className="hidden" onChange={e => handleFile(e.target.files[0])} />
                                                </div>
                                            </Field>
                                        </motion.div>
                                    )}

                                    {/* ─ STEP 3: DELIVERY ─ */}
                                    {formStep === 3 && (
                                        <motion.div key="s3" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                                            <h3 className="font-display text-[24px] md:text-[28px] text-sn-darkest mb-8">Where should we deliver?</h3>

                                            <Field label="Delivery Address" error={errors.address}>
                                                <textarea rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Full delivery address including landmark" className={`${inputCls} resize-none`} />
                                            </Field>

                                            <Field label="City" error={errors.city}>
                                                <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" className={inputCls} />
                                            </Field>

                                            <Field label="Delivery Time Preference">
                                                <PillSelect options={timeOptions} value={form.deliveryTime} onChange={v => set('deliveryTime', v)} />
                                            </Field>

                                            <Field label="Special Delivery Instructions">
                                                <textarea value={form.deliveryInstructions} onChange={e => set('deliveryInstructions', e.target.value)} placeholder="Gate code, floor number, recipient name, etc." className={`${inputCls} min-h-[100px] resize-y`} />
                                            </Field>

                                            <Field label="Delivery Type" error={errors.deliveryType}>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {[
                                                        { val: 'standard', icon: Truck, title: 'Standard Delivery', sub: 'Delivered within city - ₹150 flat' },
                                                        { val: 'pickup', icon: Store, title: 'Pickup In Store', sub: 'Ready by selected time - Free' },
                                                    ].map(opt => (
                                                        <button key={opt.val} type="button" onClick={() => set('deliveryType', opt.val)}
                                                            className={`border rounded-[2px] p-5 text-left transition-all duration-200
                                                                ${form.deliveryType === opt.val ? 'border-2 border-sn-primary bg-sn-cream' : 'border-sn-light hover:border-sn-primary'}`}
                                                        >
                                                            <opt.icon size={24} className="text-sn-primary mb-2" />
                                                            <p className="font-body font-bold text-[16px] text-sn-darkest">{opt.title}</p>
                                                            <p className="font-body text-[13px] text-sn-muted mt-1">{opt.sub}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </Field>
                                        </motion.div>
                                    )}

                                    {/* ─ STEP 4: CONFIRM ─ */}
                                    {formStep === 4 && (
                                        <motion.div key="s4" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                                            <h3 className="font-display text-[24px] md:text-[28px] text-sn-darkest mb-8">Review your order</h3>

                                            {/* Summary Card */}
                                            <div className="bg-sn-cream border border-sn-light rounded-[2px] p-5 sm:p-8 mb-8">
                                                {/* Section: Occasion */}
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-body font-bold text-[12px] text-sn-primary uppercase tracking-[2px]">Occasion</span>
                                                    <button type="button" onClick={() => jumpTo(1)} className="font-body font-medium text-[13px] text-sn-primary hover:text-sn-darkest transition-colors">Edit</button>
                                                </div>
                                                {[['Name', form.name], ['Email', form.email], ['Phone', form.phone], ['Occasion', form.occasion], ['Event Date', form.date]].map(([label, val]) => (
                                                    <div key={label} className="flex justify-between py-3 border-b border-sn-light last:border-b-0">
                                                        <span className="font-body font-bold text-[13px] text-sn-darkest">{label}</span>
                                                        <span className="font-body text-[15px] text-sn-grey text-right">{val || '-'}</span>
                                                    </div>
                                                ))}

                                                {/* Section: Cake */}
                                                <div className="flex items-center justify-between mt-6 mb-2">
                                                    <span className="font-body font-bold text-[12px] text-sn-primary uppercase tracking-[2px]">Cake Details</span>
                                                    <button type="button" onClick={() => jumpTo(2)} className="font-body font-medium text-[13px] text-sn-primary hover:text-sn-darkest transition-colors">Edit</button>
                                                </div>
                                                {[['Flavour', form.flavour], ['Servings', form.servings], ['Size', form.cakeSize]].map(([label, val]) => (
                                                    <div key={label} className="flex justify-between py-3 border-b border-sn-light last:border-b-0">
                                                        <span className="font-body font-bold text-[13px] text-sn-darkest">{label}</span>
                                                        <span className="font-body text-[15px] text-sn-grey text-right">{val || '-'}</span>
                                                    </div>
                                                ))}

                                                {/* Section: Delivery */}
                                                <div className="flex items-center justify-between mt-6 mb-2">
                                                    <span className="font-body font-bold text-[12px] text-sn-primary uppercase tracking-[2px]">Delivery</span>
                                                    <button type="button" onClick={() => jumpTo(3)} className="font-body font-medium text-[13px] text-sn-primary hover:text-sn-darkest transition-colors">Edit</button>
                                                </div>
                                                {[['Delivery Type', form.deliveryType === 'standard' ? 'Standard Delivery' : form.deliveryType === 'pickup' ? 'Pickup In Store' : '-'], ['Address', form.address], ['City', form.city]].map(([label, val]) => (
                                                    <div key={label} className="flex justify-between py-3 border-b border-sn-light last:border-b-0">
                                                        <span className="font-body font-bold text-[13px] text-sn-darkest">{label}</span>
                                                        <span className="font-body text-[15px] text-sn-grey text-right max-w-[60%]">{val || '-'}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Message to Baker */}
                                            <Field label="Anything else we should know?">
                                                <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Any allergies, special messages for the cake, or last-minute details" className={`${inputCls} min-h-[100px] resize-y`} />
                                            </Field>

                                            {/* Terms Checkbox */}
                                            <label className="flex items-start gap-3 cursor-pointer mb-8 group">
                                                <div
                                                    onClick={() => set('agreed', !form.agreed)}
                                                    className={`w-[18px] h-[18px] mt-[2px] shrink-0 rounded-[2px] border flex items-center justify-center transition-all duration-200
                                                        ${form.agreed ? 'bg-sn-primary border-sn-primary' : 'bg-white border-sn-light group-hover:border-sn-primary'}`}
                                                >
                                                    {form.agreed && <Check size={12} className="text-white" />}
                                                </div>
                                                <span className="font-body text-[13px] text-sn-grey leading-[1.6]">
                                                    I understand that custom orders require 48 hours notice and a 50% deposit to confirm.
                                                </span>
                                            </label>

                                            {/* Submit Button */}
                                            <motion.button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={!form.agreed}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full h-[60px] rounded-[2px] font-display text-[22px] text-white transition-all duration-300
                                                    ${form.agreed ? 'bg-sn-darkest hover:bg-sn-primary cursor-pointer' : 'bg-sn-darkest opacity-40 cursor-not-allowed'}`}
                                            >
                                                Submit My Order
                                            </motion.button>
                                        </motion.div>
                                    )}

                                </AnimatePresence>

                                {/* ─ BACK / NEXT BUTTONS (Steps 1-3) ─ */}
                                {formStep < 4 && (
                                    <div className={`flex mt-10 ${formStep > 1 ? 'justify-between' : 'justify-end'}`}>
                                        {formStep > 1 && (
                                            <button type="button" onClick={back} className="font-body font-medium text-[15px] text-sn-muted hover:text-sn-darkest transition-colors">
                                                ← Back
                                            </button>
                                        )}
                                        <motion.button
                                            type="button" onClick={next}
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            className="rounded-full bg-sn-primary text-white font-body font-bold text-[15px] px-9 py-[14px] hover:bg-sn-darkest transition-colors duration-300"
                                        >
                                            Continue →
                                        </motion.button>
                                    </div>
                                )}
                                {formStep === 4 && !submitted && (
                                    <div className="flex mt-6 justify-start">
                                        <button type="button" onClick={back} className="font-body font-medium text-[15px] text-sn-muted hover:text-sn-darkest transition-colors">
                                            ← Back
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/*  DIVIDER  */}
            <SectionDivider fromColor="#FFFFFF" color="#FDF6F0" />

            {/*  REASSURANCE  */}
            <section className="bg-sn-cream py-[60px] md:py-[80px] px-5 md:px-[40px] lg:px-[135px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {[
                        { icon: ShieldCheck, title: '100% Fresh', text: 'Every cake baked to order. Never pre-made, never frozen.' },
                        { icon: MessageCircle, title: 'Personal Consultation', text: 'Our baker personally reviews every custom request.' },
                        { icon: RefreshCw, title: 'Revision Friendly', text: "Not quite right? We'll make it perfect before delivery." },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease }}
                            className="text-center"
                        >
                            <item.icon size={32} className="text-sn-primary mx-auto mb-4" />
                            <h4 className="font-display text-[22px] text-sn-darkest mb-2">{item.title}</h4>
                            <p className="font-body text-[15px] text-sn-grey leading-[1.6] max-w-[300px] mx-auto">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    )
}
