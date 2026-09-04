/**
 * IconIllustrations.tsx
 * -------------------------
 * Small, original SVG icon-illustrations (not photos, no licensing
 * concerns) used across stat cards, feature cards, and section headers
 * for a warm, dynamic, non-generic look.
 */

import { motion } from "framer-motion";

export function LeafIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className={className}
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M8 40C8 20 20 8 40 8c0 20-12 32-32 32Z" fill="#66bb6a" />
      <path d="M10 38C14 24 22 14 38 10" stroke="#2e7d32" strokeWidth="2" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function SunCloudIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <circle cx="18" cy="18" r="10" fill="#f4c542" />
      <ellipse cx="28" cy="30" rx="16" ry="10" fill="#ffffff" stroke="#cfe8f5" strokeWidth="1" />
    </svg>
  );
}

export function TractorIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect x="6" y="20" width="16" height="10" rx="2" fill="#2e7d32" />
      <rect x="20" y="14" width="8" height="16" rx="2" fill="#43a047" />
      <circle cx="14" cy="34" r="6" fill="#3b3b56" />
      <circle cx="34" cy="34" r="9" fill="#3b3b56" />
      <circle cx="14" cy="34" r="2.4" fill="#c2e5c4" />
      <circle cx="34" cy="34" r="3.6" fill="#c2e5c4" />
    </svg>
  );
}

export function SproutIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className={className}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M24 40V22" stroke="#4a7c33" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 24C24 14 14 12 8 12c0 10 8 14 16 12Z" fill="#66bb6a" />
      <path d="M24 24c0-8 8-10 14-10 0 9-6 12-14 10Z" fill="#95d199" />
    </motion.svg>
  );
}

export function WeedIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path d="M24 42V20" stroke="#8a6a2f" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 24c-6-2-10-8-10-14 8 0 14 6 10 14Z" fill="#b64d3f" />
      <path d="M24 24c6-2 10-8 10-14-8 0-14 6-10 14Z" fill="#d97a63" />
      <path d="M24 30c-5-1-9-5-9-10 6 0 11 4 9 10Z" fill="#e6a08e" />
    </svg>
  );
}

export function ChatIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect x="6" y="8" width="36" height="24" rx="8" fill="#43a047" />
      <path d="M14 32l4 8 6-8" fill="#43a047" />
      <circle cx="17" cy="20" r="2.4" fill="white" />
      <circle cx="24" cy="20" r="2.4" fill="white" />
      <circle cx="31" cy="20" r="2.4" fill="white" />
    </svg>
  );
}

export function MicIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
