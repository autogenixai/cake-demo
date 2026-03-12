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
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const isContactRoute = location.pathname === '/contact'
    const isCustomOrdersRoute = location.pathname === '/custom-orders'

    // Only apply special text treatment on desktop 
    // when not scrolled and menu not open
    const useLightText = isContactRoute && !scrolled && !mobileOpen
    const useSplitBg = isCustomOrdersRoute && !scrolled && !mobileOpen

    //  Navbar background 
    const navBg = scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(64,28,19,0.06)]'
        : useLightText
            ? 'bg-transparent'
            : useSplitBg
                ? 'bg-transparent'
                : 'bg-transparent'

    //  Logo color logic 
    // On mobile: always dark (visible against any bg)
    // On desktop: follow route-specific logic
    const logoClass = scrolled
        ? 'text-sn-deep'
        : useLightText
            ? 'text-white lg:text-white'
            : useSplitBg
                ? 'text-sn-deep lg:text-sn-deep'
                : 'text-sn-deep'

    //  Nav link color logic 
    const getLinkClass = (isActive) => {
        if (scrolled) {
            return isActive
                ? 'text-sn-darkest underline-active'
                : 'text-sn-grey hover:text-sn-primary'
        }
        if (useLightText) {
            return isActive
                ? 'text-white underline-active'
                : 'text-white/80 hover:text-white'
        }
        if (useSplitBg) {
            // Custom orders page hero is split dark/cream
            // Left half dark, right half cream - use dark text
            return isActive
                ? 'text-sn-darkest underline-active'
                : 'text-sn-grey hover:text-sn-primary'
        }
        return isActive
            ? 'text-sn-darkest underline-active'
            : 'text-sn-grey hover:text-sn-primary'
    }

    //  Hamburger icon color 
    // Always visible: dark on light backgrounds, white on dark
    const hamburgerClass = scrolled
        ? 'text-sn-darkest'
        : useLightText
            ? 'text-white'
            : 'text-sn-darkest'

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBg}`}
            >
                {/*  FIX: Single clean height, no conflicts  */}
                <div className="h-16 md:h-20 flex items-center justify-between px-5 md:px-10 lg:px-[135px]">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <motion.span
                            className={`font-display text-[20px] md:text-[22px] select-none transition-colors duration-300 ${logoClass}`}
                            whileHover={{ letterSpacing: '2px' }}
                            transition={{ duration: 0.3 }}
                        >
                            Sweet Noir
                        </motion.span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        relative font-body font-medium text-[13px] uppercase 
                                        tracking-[2px] transition-colors duration-300
                                        after:absolute after:bottom-[-4px] after:left-0 
                                        after:h-[1px] after:bg-current
                                        after:transition-all after:duration-300
                                        ${isActive 
                                            ? 'after:w-full' 
                                            : 'after:w-0 hover:after:w-full'
                                        }
                                        ${getLinkClass(isActive)}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Order Now - desktop only */}
                    <div className="hidden lg:block flex-shrink-0">
                        <Link to="/custom-orders">
                            <motion.button
                                className="bg-sn-primary text-white font-body font-bold text-[13px] px-7 py-3 rounded-full hover:bg-sn-darkest transition-colors duration-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Order Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    {/*  FIX: Clean single condition, no max-md conflicts  */}
                    <button
                        className={`lg:hidden z-[60] p-1 transition-colors duration-300 ${hamburgerClass}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileOpen
                                ? (
                                    <motion.span
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={26} />
                                    </motion.span>
                                )
                                : (
                                    <motion.span
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={26} />
                                    </motion.span>
                                )
                            }
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/*  Mobile Full Screen Overlay  */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 bg-sn-deep flex flex-col items-center justify-center"
                    >
                        {/* Nav Links */}
                        <nav className="flex flex-col items-center gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{
                                        delay: i * 0.07,
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`
                                            font-display text-[32px] sm:text-[36px] 
                                            transition-colors duration-300
                                            ${location.pathname === link.path
                                                ? 'text-sn-primary'
                                                : 'text-white hover:text-sn-light'
                                            }
                                        `}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Order Now - in mobile menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                delay: navLinks.length * 0.07,
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="mt-8"
                        >
                            <Link
                                to="/custom-orders"
                                onClick={() => setMobileOpen(false)}
                            >
                                <button className="bg-sn-primary text-white font-body font-bold text-[15px] px-10 py-4 rounded-full hover:bg-sn-darkest transition-colors duration-300">
                                    Order Now
                                </button>
                            </Link>
                        </motion.div>

                        {/* Social row at bottom */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute bottom-8 font-body text-[13px] text-sn-muted tracking-[2px] uppercase"
                        >
                            @sweetnoir.cakes
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
