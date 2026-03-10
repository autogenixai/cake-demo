import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import React from 'react'

const footerLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Custom Orders', path: '/custom-orders' },
]

export default function Footer() {
    return (
        <footer className="bg-sn-black">
            <div className="px-6 md:px-gutter-sm lg:px-gutter pt-section-sm pb-10">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="font-display text-[28px] text-white">
                            Sweet Noir
                        </Link>
                        <p className="font-body text-[15px] text-sn-muted mt-4 max-w-[220px] leading-relaxed">
                            Handcrafted indulgence for life's sweetest moments.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sn-muted hover:text-white transition-colors duration-300"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sn-muted hover:text-white transition-colors duration-300"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-body font-bold text-[11px] text-sn-primary tracking-[3px] uppercase mb-6">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="font-body text-[15px] text-sn-muted hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visit Us */}
                    <div>
                        <h4 className="font-body font-bold text-[11px] text-sn-primary tracking-[3px] uppercase mb-6">
                            Visit Us
                        </h4>
                        <p className="font-body text-[15px] text-sn-muted leading-relaxed">
                            42 Baker Street, Bandra West<br />
                            Mumbai, Maharashtra 400050
                        </p>
                        <p className="font-body text-[15px] text-sn-muted mt-4 leading-relaxed">
                            Mon – Sat: 9am – 8pm<br />
                            Sun: 10am – 6pm
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-body font-bold text-[11px] text-sn-primary tracking-[3px] uppercase mb-6">
                            Stay Sweet
                        </h4>
                        <p className="font-body text-[15px] text-sn-muted mb-4 leading-relaxed">
                            New flavours, events, and offers straight to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-[#1E0E0A] border border-sn-darkest text-white font-body text-[14px] px-4 py-3 rounded-card focus:outline-none focus:border-sn-primary transition-colors"
                            />
                            <button className="bg-sn-primary text-white font-body font-bold text-[13px] px-6 py-3 rounded-pill hover:bg-sn-darkest transition-colors duration-300 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="border-t border-sn-deep mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-body text-[12px] text-sn-grey">
                        © 2025 Sweet Noir. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="font-body text-[12px] text-sn-grey hover:text-sn-muted transition-colors">
                            Privacy Policy
                        </a>
                        <span className="text-sn-grey text-[12px]">|</span>
                        <a href="#" className="font-body text-[12px] text-sn-grey hover:text-sn-muted transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
