/**
 * MantleGuard Design System
 * Centralized design tokens for consistency across the platform
 */

// ============================================
// COLORS - Status System
// ============================================
export const STATUS_COLORS = {
    success: {
        text: "text-[#00FFB2]",
        bg: "bg-[#00FFB2]/10",
        border: "border-[#00FFB2]/20",
        hex: "#00FFB2",
    },
    warning: {
        text: "text-[#FFD300]",
        bg: "bg-[#FFD300]/10",
        border: "border-[#FFD300]/20",
        hex: "#FFD300",
    },
    danger: {
        text: "text-[#FF5D5D]",
        bg: "bg-[#FF5D5D]/10",
        border: "border-[#FF5D5D]/20",
        hex: "#FF5D5D",
    },
    info: {
        text: "text-[#00C2FF]",
        bg: "bg-[#00C2FF]/10",
        border: "border-[#00C2FF]/20",
        hex: "#00C2FF",
    },
    purple: {
        text: "text-[#A855F7]",
        bg: "bg-[#A855F7]/10",
        border: "border-[#A855F7]/20",
        hex: "#A855F7",
    },
} as const

// ============================================
// SEVERITY - Security/Gas Severity
// ============================================
export const SEVERITY_COLORS = {
    critical: STATUS_COLORS.danger,
    high: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", hex: "#FB923C" },
    medium: STATUS_COLORS.warning,
    low: STATUS_COLORS.info,
    safe: STATUS_COLORS.success,
} as const

// ============================================
// TYPOGRAPHY - Strict Hierarchy
// ============================================
export const TYPOGRAPHY = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    h3: "text-2xl md:text-3xl font-bold tracking-tight",
    h4: "text-xl md:text-2xl font-bold tracking-tight",
    h5: "text-lg md:text-xl font-semibold",
    h6: "text-base md:text-lg font-semibold",
    body: "text-sm md:text-base",
    bodySmall: "text-xs md:text-sm",
    caption: "text-xs",
    overline: "text-[10px] font-semibold uppercase tracking-wider",
} as const

// ============================================
// SPACING - Consistent Gaps
// ============================================
export const SPACING = {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
    section: "py-12 md:py-16 lg:py-24",
} as const

// ============================================
// ANIMATIONS - Framer Motion Variants
// ============================================
export const ANIMATION_VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    },
    slideInRight: {
        hidden: { x: "100%" },
        visible: { x: 0 },
    },
    staggerChildren: {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
} as const

export const ANIMATION_TRANSITIONS = {
    default: { duration: 0.5, ease: "easeOut" },
    fast: { duration: 0.3, ease: "easeOut" },
    slow: { duration: 0.8, ease: "easeOut" },
    spring: { type: "spring", stiffness: 300, damping: 30 },
    springBounce: { type: "spring", stiffness: 400, damping: 20 },
} as const

// ============================================
// CARD STYLES - Consistent Card Design
// ============================================
export const CARD_STYLES = {
    base: "rounded-2xl border bg-black/40 backdrop-blur-sm transition-all duration-300",
    hover: "hover:bg-black/60 hover:shadow-2xl hover:border-primary/20",
    glass: "bg-[#111111]/40 border-white/[0.03] backdrop-blur-xl",
    gradient: "bg-gradient-to-br from-white/[0.02] to-transparent",
} as const

// ============================================
// BUTTON HOVER - Consistent Interactions
// ============================================
export const HOVER_EFFECTS = {
    scale: "hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200",
    glow: "hover:shadow-[0_0_20px_rgba(0,255,178,0.3)] transition-shadow duration-300",
    lift: "hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
    subtle: "hover:bg-white/5 transition-colors duration-200",
} as const

// ============================================
// LOADING STATES - Consistent Loading UI
// ============================================
export const LOADING_MESSAGES = {
    contract: [
        { message: "Parsing contract structure", duration: 800 },
        { message: "Analyzing functions", duration: 600 },
        { message: "Building syntax tree", duration: 500 },
    ],
    gas: [
        { message: "Simulating gas execution", duration: 1000 },
        { message: "Calculating Mantle DA fees", duration: 800 },
        { message: "Running optimization analysis", duration: 700 },
        { message: "Identifying hotspots", duration: 500 },
    ],
    audit: [
        { message: "Running security checks", duration: 900 },
        { message: "Analyzing function patterns", duration: 800 },
        { message: "Detecting vulnerabilities", duration: 1000 },
        { message: "Generating recommendations", duration: 600 },
    ],
    ai: [
        { message: "Processing your question", duration: 500 },
        { message: "Analyzing contract context", duration: 700 },
        { message: "Generating AI response", duration: 800 },
    ],
} as const

// ============================================
// EMPTY STATES - Consistent Empty UI
// ============================================
export const EMPTY_STATES = {
    noContract: {
        title: "No Contract Uploaded",
        description: "Upload a Solidity contract to begin analysis",
        icon: "FileCode",
        action: "Upload Contract",
    },
    noResults: {
        title: "No Results Yet",
        description: "Run an analysis to see results here",
        icon: "Search",
        action: "Start Analysis",
    },
    noIssues: {
        title: "No Issues Found",
        description: "Your contract passed all security checks",
        icon: "ShieldCheck",
        action: "View Report",
    },
    noData: {
        title: "No Data Available",
        description: "Analysis data will appear here once available",
        icon: "Database",
        action: "Refresh",
    },
} as const

// ============================================
// ICON SIZE - Consistent Icon Sizing
// ============================================
export const ICON_SIZES = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
    "3xl": "w-12 h-12",
} as const

// ============================================
// BADGE VARIANTS - Consistent Badge Styles
// ============================================
export const getBadgeVariant = (severity: keyof typeof SEVERITY_COLORS) => {
    const colors = SEVERITY_COLORS[severity]
    return {
        className: `${colors.bg} ${colors.text} ${colors.border} border font-semibold`,
        color: colors.hex,
    }
}

// ============================================
// MANTLE BRANDING - Consistent Brand Colors
// ============================================
export const MANTLE_COLORS = {
    primary: "#00FFB2", // Mantle Green
    secondary: "#00C2FF", // Mantle Blue
    background: "#0a0a0a",
    surface: "#111111",
    text: "#f8fafc",
} as const

// ============================================
// CHART COLORS - Consistent Data Viz
// ============================================
export const CHART_COLORS = {
    primary: MANTLE_COLORS.primary,
    secondary: MANTLE_COLORS.secondary,
    success: STATUS_COLORS.success.hex,
    warning: STATUS_COLORS.warning.hex,
    danger: STATUS_COLORS.danger.hex,
    info: STATUS_COLORS.info.hex,
    purple: STATUS_COLORS.purple.hex,
} as const
