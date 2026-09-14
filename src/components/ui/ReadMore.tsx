import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ReadMoreProps {
  children: React.ReactNode;
  label?: string;
  collapsedLabel?: string;
}

const ReadMore = ({ children, label = "Lees meer", collapsedLabel = "Lees minder" }: ReadMoreProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {isOpen ? collapsedLabel : label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

export default ReadMore;
