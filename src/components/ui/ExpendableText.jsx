import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ExpandableText({
                                           text = "",
                                           limit = 150,
                                       }) {
    const [expanded, setExpanded] = useState(false);

    if (!text) return null;

    const isLong = text.length > limit;

    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [text, expanded]);

    return (
        <div className="relative w-full">

            {/* TEXT */}
            <AnimatePresence initial={false}>
                <motion.div
                    animate={{
                        height: expanded ? contentHeight : 72,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden relative"
                >
                    <div ref={contentRef}>
                        <p
                            className="
                                text-sm text-white/70
                                leading-relaxed
                                whitespace-pre-line
                                break-words
                            "
                        >
                            {text}
                        </p>
                    </div>

                    {!expanded && isLong && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="
                                absolute bottom-0 left-0 right-0
                                h-12
                                bg-gradient-to-t
                                from-[#141B36]
                                to-transparent
                                pointer-events-none
                             "
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* BUTTON */}
            {isLong && (
                <div className="flex justify-end mt-3">
                    <button
                        type="button"
                        onClick={() => setExpanded(v => !v)}
                        className="
                            group
                            flex items-center gap-2
                            text-[11px]
                            uppercase
                            tracking-[0.25em]
                            text-white/70
                            hover:text-[#CDA268]
                            transition-all duration-300
                            cursor-pointer
                        "
                    >
                        <span
                            className="
                                border-b border-white/30
                                group-hover:border-[#CDA268]
                                transition-color
                            "
                        >
                            {expanded ? "Réduire" : "En savoir plus"}
                        </span>

                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`
                                text-[10px]
                                transition-transform duration-300
                                ${expanded ? "rotate-180" : ""}
                            `}
                        />
                    </button>
                </div>
            )}
        </div>
    );
}