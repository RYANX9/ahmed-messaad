// =============================================================================
// COLORS.TS - Theme Configuration
// =============================================================================

export type ThemeType = 'dark' | 'cream' | 'retro';

export interface Theme {
  // Background Colors
  background: string;
  surface: string;
  surfaceHover: string;

  // Border Colors
  border: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  // Accent Colors
  accentLight: string;
  accentDark: string;
}

export const themes: Record<ThemeType, Theme> = {
  dark: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#252525',
    border: '#2a2a2a',
    textPrimary: '#ffffff',
    textSecondary: '#d4d4d4',
    textTertiary: '#a3a3a3',
    accentLight: '#525252',
    accentDark: '#404040',
  },

  cream: {
    background: '#faf8f5',
    surface: '#f5f1eb',
    surfaceHover: '#ebe7e0',
    border: '#e0dbd3',
    textPrimary: '#2c2420',
    textSecondary: '#4a443f',
    textTertiary: '#6b6560',
    accentLight: '#c9c3bb',
    accentDark: '#b5afa7',
  },

  retro: {
    // Two-Tone Palette: Sage Green & Dusty Rose
    background: '#f1edea',     // warm soft base
    surface: '#e6dfdc',        // lighter blend
    surfaceHover: '#d9d1ce',   // slightly deeper tone
    border: '#c8b9b3',         // muted rose-beige

    textPrimary: '#3a3431',    // deep brown-gray
    textSecondary: '#5b534f',  // muted warm gray
    textTertiary: '#7a716d',   // faded mid-tone

    accentLight: '#a8b6a3',    // soft sage green
    accentDark: '#c79a9a',     // dusty rose
  },
};
