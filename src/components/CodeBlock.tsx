"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  command: string;
  label?: string;
}

export function CodeBlock({ command, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="terminal-block group">
      {label && (
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <span className="terminal-dot bg-red-500" />
            <span className="terminal-dot bg-yellow-500" />
            <span className="terminal-dot bg-green-500" />
          </div>
          <span className="text-xs text-white/40 ml-2 font-mono">{label}</span>
        </div>
      )}
      <div className="terminal-body flex items-center justify-between gap-3 min-w-0">
        <code className="text-xs sm:text-sm break-all whitespace-pre-wrap">
          <span className="terminal-prompt">$ </span>
          <span className="terminal-command">{command}</span>
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors group/btn"
          title="Copiar comando"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-4 h-4 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="w-4 h-4 text-white/30 group-hover/btn:text-white/60 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
