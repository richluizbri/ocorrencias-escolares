import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

export default function AnimatedNumber({ value, className = '' }) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, v => Math.round(v))

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [mv, value])

  return <motion.span className={className}>{rounded}</motion.span>
}
