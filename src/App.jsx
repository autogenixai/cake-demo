import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import CakeDetails from './pages/CakeDetails'
import CustomOrders from './pages/CustomOrders'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import { useLenis } from './hooks/useLenis'

// Stub pages
const StubPage = ({ title }) => (
    <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="text-center">
            <h1 className="font-display text-h1 text-sn-darkest mb-4">{title}</h1>
            <p className="font-body text-body-m text-sn-grey">Coming soon</p>
        </div>
    </div>
)

// Custom cursor component
function CustomCursor() {
    const cursorRef = useRef(null)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        // Check if device has fine pointer (mouse)
        if (!window.matchMedia('(pointer: fine)').matches) return

        const move = (e) => {
            cursor.style.left = e.clientX - 6 + 'px'
            cursor.style.top = e.clientY - 6 + 'px'
        }

        const handleOver = (e) => {
            const tag = e.target.tagName.toLowerCase()
            if (tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) {
                setExpanded(true)
            }
        }

        const handleOut = () => setExpanded(false)

        window.addEventListener('mousemove', move)
        document.addEventListener('mouseover', handleOver)
        document.addEventListener('mouseout', handleOut)

        return () => {
            window.removeEventListener('mousemove', move)
            document.removeEventListener('mouseover', handleOver)
            document.removeEventListener('mouseout', handleOut)
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${expanded ? 'expanded' : ''}`}
            style={{ display: window.matchMedia('(pointer: fine)').matches ? 'block' : 'none' }}
        />
    )
}

export default function App() {
    useLenis()

    return (
        <BrowserRouter>
            <CustomCursor />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:slug" element={<CakeDetails />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/custom-orders" element={<CustomOrders />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/faq" element={<StubPage title="FAQ" />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
