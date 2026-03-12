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

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const isContactRoute = location.pathname === '/contact'
    const isCustomOrdersRoute = location.pathname === '/custom-orders'

    const useLightText = isContactRoute && !scrolled && !mobileOpen
    const useSplitBg = isCustomOrdersRoute && !scrolled && !mobileOpen

    const navBg = scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(64,28,19,0.06)]'
        : 'bg-transparent'

    const logoClass = scrolled
        ? 'text-sn-deep'
        : useLightText
            ? 'text-white'
            : 'text-sn-deep'

    const getLinkClass = (isActive) => {
        if (scrolled) {
            return isActive
                ? 'text-sn-darkest after:w-full'
                : 'text-sn-grey hover:text-sn-primary after:w-0 hover:after:w-full'
        }
        if (useLightText) {
            return isActive
                ? 'text-white after:w-full'
                : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
        }
        return isActive
            ? 'text-sn-darkest after:w-full'
            : 'text-sn-grey hover:text-sn-primary after:w-0 hover:after:w-full'
    }

    const hamburgerColor = scrolled
        ? 'text-sn-darkest'
        : useLightText
            ? 'text-white'
            : 'text-sn-darkest'

    return (
        <>
            {/*  NAVBAR  */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`
                    fixed top-0 left-0 right-0 w-full z-50
                    transition-all duration-500
                    ${navBg}
                `}
            >
                <div className="
                    h-16 md:h-20
                    flex items-center justify-between
                    px-5 sm:px-8 md:px-10 lg:px-[135px]
                    overflow-visible
                ">
                    {/*  LOGO  */}
                    <Link
                        to="/"
                        className="flex-shrink-0 relative z-10"
                    >
                        <motion.span
                            className={`
                                font-display text-[20px] md:text-[22px]
                                select-none transition-colors duration-300
                                ${logoClass}
                            `}
                            whileHover={{ letterSpacing: '2px' }}
                            transition={{ duration: 0.3 }}
                        >
                            Sweet Noir
                        </motion.span>
                    </Link>

                    {/*  DESKTOP NAV LINKS  */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        relative font-body font-medium text-[13px]
                                        uppercase tracking-[2px]
                                        transition-colors duration-300
                                        after:absolute after:bottom-[-4px] after:left-0
                                        after:h-[1px] after:bg-current
                                        after:transition-all after:duration-300
                                        ${getLinkClass(isActive)}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/*  RIGHT SIDE  */}
                    <div className="flex items-center flex-shrink-0">

                        {/* Order Now — desktop only */}
                        <div className="hidden lg:block">
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

                        {/*  HAMBURGER — mobile/tablet only  */}
                        <button
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label="Toggle navigation menu"
                            className={`
                                lg:hidden
                                relative z-[60]
                                flex items-center justify-center
                                w-10 h-10 -mr-1
                                transition-colors duration-300
                                ${hamburgerColor}
                            `}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileOpen ? (
                                    <motion.span
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center justify-center"
                                    >
                                        <X size={24} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center justify-center"
                                    >
                                        <Menu size={24} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                    </div>
                </div>
            </motion.nav>

            {/*  MOBILE FULLSCREEN OVERLAY  */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="
                            fixed inset-0 z-[55]
                            bg-sn-deep
                            flex flex-col items-center justify-center
                            lg:hidden
                        "
                    >
                        {/* Nav Links */}
                        <nav className="flex flex-col items-center gap-6 w-full px-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 16 }}
                                    transition={{
                                        delay: i * 0.06,
                                        duration: 0.45,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`
                                            font-display text-[30px] sm:text-[36px]
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

                        {/* Order Now CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                delay: navLinks.length * 0.06 + 0.05,
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="mt-10"
                        >
                            <Link
                                to="/custom-orders"
                                onClick={() => setMobileOpen(false)}
                            >
                                <button className="
                                    bg-sn-primary text-white
                                    font-body font-bold text-[15px]
                                    px-10 py-4 rounded-full
                                    hover:bg-sn-darkest
                                    transition-colors duration-300
                                ">
                                    Order Now
                                </button>
                            </Link>
                        </motion.div>

                        {/* Bottom handle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.4 }}
                            className="
                                absolute bottom-8
                                font-body text-[12px] text-sn-muted
                                tracking-[3px] uppercase
                            "
                        >
                            @sweetnoir.cakes
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
