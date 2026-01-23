// =====================================
// CREATIVO DESIGN SYSTEM (SPLIT VERSION)
// Single Source of Truth
// =====================================

// ==================================================
// FILE: /styles/design-tokens.ts
// ==================================================
export const colors = {
  brand: {
    primary: '#3B82F6',
    secondary: '#22C55E',
    text: '#1F2937',
    muted: '#6B7280',
    background: '#FFFFFF',
  },

  programType: {
    monthly: {
      bg: '#EAF2FF',
      text: '#2B5FC0',
    },
    foundation: {
      bg: '#EAF7EE',
      text: '#2E7D32',
    },
    customPrivate: {
      bg: '#FFF1E6',
      text: '#C25A1A',
    },
  },

  audience: {
    kids: {
      bg: '#FCE4EC',
      text: '#AD1457',
    },
    junior: {
      bg: '#FFF9C4',
      text: '#9E7700',
    },
    teen: {
      bg: '#EDE7F6',
      text: '#512DA8',
    },
    adult: {
      bg: '#ECEFF1',
      text: '#37474F',
    },
  },
}

// ==================================================
// FILE: /styles/typography.ts
// ==================================================
import { colors } from './design-tokens'

export const typography = {
  heading: {
    fontFamily: `'Inter', sans-serif`,
    weight: 600,
    color: colors.brand.text,
  },
  body: {
    fontFamily: `'Inter', sans-serif`,
    weight: 400,
    color: colors.brand.text,
  },
  small: {
    fontFamily: `'Inter', sans-serif`,
    weight: 400,
    color: colors.brand.muted,
  },
  badge: {
    fontFamily: `'Inter', sans-serif`,
    weight: 500,
    size: '12px',
  },
}

// ==================================================
// FILE: /styles/badge.ts
// ==================================================
import { colors } from './design-tokens'

export const badgeBaseStyle = {
  borderRadius: '999px',
  padding: '4px 10px',
  fontSize: '12px',
  lineHeight: '1',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
}

export const badgeVariants = {
  programType: {
    monthly: colors.programType.monthly,
    foundation: colors.programType.foundation,
    customPrivate: colors.programType.customPrivate,
  },
  audience: {
    kids: colors.audience.kids,
    junior: colors.audience.junior,
    teen: colors.audience.teen,
    adult: colors.audience.adult,
  },
}

// ==================================================
// FILE: /styles/index.ts
// ==================================================
export * from './design-tokens'
export * from './typography'
export * from './badge'
