// =============================================================================
// COLORS.TS - Theme Configuration
// =============================================================================

export type ThemeType = 'dark' | 'cream';

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
    // Backgrounds
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#252525',
    
    // Borders
    border: '#2a2a2a',
    
    // Text
    textPrimary: '#ffffff',
    textSecondary: '#d4d4d4',
    textTertiary: '#a3a3a3',
    
    // Accents
    accentLight: '#525252',
    accentDark: '#404040',
  },
  
  cream: {
    // Backgrounds
    background: '#faf8f5',
    surface: '#f5f1eb',
    surfaceHover: '#ebe7e0',
    
    // Borders
    border: '#e0dbd3',
    
    // Text
    textPrimary: '#2c2420',
    textSecondary: '#4a443f',
    textTertiary: '#6b6560',
    
    // Accents
    accentLight: '#c9c3bb',
    accentDark: '#b5afa7',
  },
};
