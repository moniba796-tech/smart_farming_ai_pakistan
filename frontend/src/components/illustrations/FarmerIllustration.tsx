/**
 * FarmerIllustration.tsx
 * -------------------------
 * Original, hand-built SVG illustration of a farmer in a field — used on
 * the hero section. Kept as inline SVG (not a photo) so there are no
 * licensing concerns, and so it can be animated with Framer Motion /
 * CSS easily (the sun, leaves, and clouds gently move).
 */

import { motion } from "framer-motion";

export default function FarmerIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sky */}
      <rect x="0" y="0" width="500" height="280" fill="#eaf6ff" />

      {/* Sun */}
      <motion.circle
        cx="420"
        cy="70"
        r="38"
        fill="#ffd66b"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Clouds */}
      <motion.g
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="90" cy="70" rx="40" ry="18" fill="#ffffff" opacity="0.9" />
        <ellipse cx="120" cy="60" rx="30" ry="16" fill="#ffffff" opacity="0.9" />
      </motion.g>
      <motion.g
        animate={{ x: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="250" cy="45" rx="34" ry="14" fill="#ffffff" opacity="0.8" />
      </motion.g>

      {/* Distant hills */}
      <path d="M0 250 Q 90 210 200 245 T 500 235 V 280 H 0 Z" fill="#c8e6c9" />

      {/* Ground / field */}
      <rect x="0" y="270" width="500" height="130" fill="#8bc76e" />
      <path d="M0 270 Q 250 250 500 270 V 400 H 0 Z" fill="#7ab85f" />

      {/* Crop rows */}
      {[60, 130, 200, 270, 340, 400, 450].map((x, i) => (
        <motion.g
          key={x}
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          style={{ transformOrigin: `${x}px 340px` }}
        >
          <line x1={x} y1="340" x2={x} y2="310" stroke="#4a7c33" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx={x - 6} cy="308" rx="8" ry="4" fill="#f4c542" transform={`rotate(-20 ${x - 6} 308)`} />
          <ellipse cx={x + 6} cy="308" rx="8" ry="4" fill="#f4c542" transform={`rotate(20 ${x + 6} 308)`} />
          <ellipse cx={x} cy="303" rx="7" ry="9" fill="#e0ac2f" />
        </motion.g>
      ))}

      {/* Farmer body */}
      <g transform="translate(190,190)">
        {/* Shadow */}
        <ellipse cx="45" cy="185" rx="46" ry="9" fill="#5f9a48" opacity="0.5" />

        {/* Legs */}
        <rect x="20" y="120" width="16" height="60" rx="6" fill="#3b3b56" />
        <rect x="52" y="120" width="16" height="60" rx="6" fill="#3b3b56" />
        {/* Shoes */}
        <ellipse cx="28" cy="182" rx="13" ry="7" fill="#2c2c2c" />
        <ellipse cx="60" cy="182" rx="13" ry="7" fill="#2c2c2c" />

        {/* Shirt / torso */}
        <path d="M8 70 Q45 50 82 70 L78 130 Q45 145 12 130 Z" fill="#2e7d32" />
        {/* Shirt shading */}
        <path d="M45 70 L45 140" stroke="#256428" strokeWidth="2" opacity="0.4" />

        {/* Arms */}
        <motion.g
          animate={{ rotate: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "12px 78px" }}
        >
          <rect x="-6" y="72" width="16" height="55" rx="8" fill="#2e7d32" />
          <circle cx="2" cy="130" r="9" fill="#d8a56b" />
        </motion.g>
        <rect x="78" y="72" width="16" height="55" rx="8" fill="#256428" />
        <circle cx="86" cy="130" r="9" fill="#d8a56b" />

        {/* Neck + Head */}
        <rect x="38" y="45" width="14" height="18" fill="#d8a56b" />
        <circle cx="45" cy="35" r="24" fill="#e6b884" />

        {/* Hat */}
        <ellipse cx="45" cy="20" rx="30" ry="8" fill="#c88a3d" />
        <path d="M25 20 Q45 -2 65 20 Q45 8 25 20 Z" fill="#dba24f" />

        {/* Simple face */}
        <circle cx="37" cy="36" r="2.2" fill="#3b2a1a" />
        <circle cx="53" cy="36" r="2.2" fill="#3b2a1a" />
        <path d="M36 46 Q45 51 54 46" stroke="#3b2a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Held crop / wheat bundle */}
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "202px 268px" }}
      >
        <line x1="202" y1="268" x2="202" y2="220" stroke="#8a6a2f" strokeWidth="3" />
        <ellipse cx="196" cy="222" rx="6" ry="10" fill="#f2c14e" transform="rotate(-15 196 222)" />
        <ellipse cx="208" cy="222" rx="6" ry="10" fill="#f2c14e" transform="rotate(15 208 222)" />
        <ellipse cx="202" cy="216" rx="6" ry="12" fill="#e3aa2e" />
      </motion.g>
    </svg>
  );
}
