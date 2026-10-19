import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'

const stack = []

export default function Modal({ open, onClose, eyebrow, title, size = 'md', footer, children, hideHeader = false }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const token = {}
    stack.push(token)
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    const onKey = e => {
      if (e.key === 'Escape' && stack[stack.length - 1] === token) closeRef.current()
    }
    document.addEventListener('keydown', onKey)
    requestAnimationFrame(() => {
      const target = panelRef.current?.querySelector('[data-autofocus]') ?? panelRef.current
      target?.focus()
    })
    return () => {
      document.removeEventListener('keydown', onKey)
      stack.splice(stack.indexOf(token), 1)
      if (stack.length === 0) document.body.style.overflow = ''
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          <div className="modal-backdrop" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={`modal-panel modal-${size}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          >
            {!hideHeader && (
              <div className="modal-head">
                <div className="min-w-0">
                  {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                  <h2 id={titleId} className="display text-[22px] mt-0.5">{title}</h2>
                </div>
                <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar">
                  <Icon name="close" />
                </button>
              </div>
            )}
            <div className="modal-body">
              {hideHeader && <h2 id={titleId} className="display text-[20px] mb-2">{title}</h2>}
              {children}
            </div>
            {footer && <div className="modal-foot">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
