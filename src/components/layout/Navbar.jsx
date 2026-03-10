import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Custom Orders', path: '/custom-orders' },
    { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    const isContactRoute = location.pathname === '/contact'
    const isCustomOrdersRoute = location.pathname === '/custom-orders'

    const useLightText = isContactRoute && !scrolled && !mobileOpen
    const useSplitText = isCustomOrdersRoute && !scrolled && !mobileOpen

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(64,28,19,0.06)]'
                    : 'bg-transparent'
                    }`}
            >
                <div className="h-[80px] md:h-[80px] h-[64px] flex items-center justify-between px-6 md:px-gutter-sm lg:px-gutter">
                    {/* Logo */}
                    <Link to="/">
                        <motion.span
                            className={`font-display text-[22px] select-none ${useSplitText ? 'nav-text-split-logo' : (useLightText ? 'text-white' : 'text-sn-deep')
                                }`}
                            whileHover={{ letterSpacing: '2px' }}
                            transition={{ duration: 0.3 }}
                        >
                            Sweet Noir
                        </motion.span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link font-body font-medium text-[14px] uppercase tracking-[2px] transition-colors duration-300 ${useSplitText
                                            ? `nav-text-split ${isActive ? 'active' : ''}`
                                            : useLightText
                                                ? `nav-link-light ${isActive ? 'text-white active' : 'text-sn-cream hover:text-white'}`
                                                : `${isActive ? 'text-sn-darkest active' : 'text-sn-grey hover:text-sn-primary'}`
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Order Now Button */}
                    <div className="hidden lg:block">
                        <Link to="/custom-orders">
                            <motion.button
                                className="bg-sn-primary text-white font-body font-bold text-[13px] px-7 py-3 rounded-pill hover:bg-sn-darkest transition-colors duration-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Order Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className={`lg:hidden z-[60] transition-colors duration-300 ${useSplitText ? 'max-md:text-white text-sn-darkest' : (useLightText ? 'text-white' : 'text-sn-darkest')
                            }`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-sn-deep flex flex-col items-center justify-center gap-8"
                    >
                        <button
                            className="absolute top-5 right-6 text-white z-[60]"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X size={28} />
                        </button>
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    to={link.path}
                                    className="font-display text-[36px] text-white hover:text-sn-light transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
                        >
                            <Link
                                to="/custom-orders"
                                onClick={() => setMobileOpen(false)}
                            >
                                <button className="mt-4 bg-sn-primary text-white font-body font-bold text-[16px] px-10 py-4 rounded-pill">
                                    Order Now
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
