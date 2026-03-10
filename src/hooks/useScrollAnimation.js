import React,{ useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      ease = 'power3.out',
      trigger,
      start = 'top 80%',
      stagger = 0,
      children = false,
    } = options

    const targets = children ? el.children : el

    const tween = gsap.fromTo(targets, from, {
      ...to,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: trigger || el,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === (trigger || el)) t.kill()
      })
    }
  }, [])

  return ref
}
