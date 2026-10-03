export default function Logo({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <linearGradient id="mBlue" x1="18" y1="18" x2="132" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#20c8ff" />
          <stop offset="100%" stopColor="#0b78ff" />
        </linearGradient>
      </defs>

      <path
        d="M18 84V28L48 62L78 26L108 84"
        stroke="#ffffff"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M21 82C37 28 72 14 102 42C117 58 130 69 144 72"
        stroke="url(#mBlue)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      <path
        d="M36 52C52 30 81 24 103 41C114 50 126 62 137 72"
        stroke="url(#mBlue)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}
