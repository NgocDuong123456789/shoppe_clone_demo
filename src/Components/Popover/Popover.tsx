import { useState, useRef, useId } from 'react'
import { useFloating, arrow } from '@floating-ui/react'
import { FloatingPortal, shift, offset } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children?: React.ReactNode
  renderPopover: React.ReactNode
  className: string
}

export const Popover = ({ children, renderPopover, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [
      offset(-20),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const id = useId()
  const showPoper = () => {
    setIsOpen(true)
  }
  const hidePoper = () => {
    setIsOpen(false)
  }
  return (
    <div className='flex justify-end'>
      <div
        // className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        className={className}
        onMouseEnter={showPoper}
        onMouseLeave={hidePoper}
        ref={refs.setReference}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
              >
                <span
                  ref={arrowRef}
                  className='border-b-500 --translate-y-full absolute -translate-y-full border-[11px] border-x-transparent  border-t-transparent border-b-white '
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                ></span>

                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </div>
  )
}
