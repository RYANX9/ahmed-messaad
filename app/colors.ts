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
    // Daring Two-Tone Palette: Deep Teal & Burnt Orange
    background: '#0e3b43',     // dark teal base
    surface: '#14565f',        // medium teal for surfaces
    surfaceHover: '#1b6b74',   // brighter teal hover
    border: '#f28f3b',         // warm burnt orange accent border

    textPrimary: '#fdf3e7',    // warm cream text
    textSecondary: '#e8d9c9',  // softer cream
    textTertiary: '#cdb8a4',   // muted warm beige

    accentLight: '#f7b267',    // lighter orange accent
    accentDark: '#f4845f',     // strong burnt orange highlight
  },
};
