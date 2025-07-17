import { motion, AnimatePresence } from "motion/react";

export default function AnimateStartupDiv({children, visible, ...otherDivProps}) {
    return (
        <AnimatePresence>
            {visible && 
            (<motion.div 
                initial={{
                    y: -20,
                    // scale: 0.9,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    // scale: 1,
                    opacity: 1,
                }}
                exit={{
                    y: -20,
                    // scale: 0.9,
                    opacity: 0,
                }}
                transition={{
                    type: "spring",
                    duration: 0.25,
                    bounce: 0.05,
                }}
                {...otherDivProps}
            >
                {children}
            </motion.div>)}
        </AnimatePresence>
        
    )
}