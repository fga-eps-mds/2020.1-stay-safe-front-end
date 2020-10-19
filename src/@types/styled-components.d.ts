import staySafeTheme from '../styles/staySafeTheme';

type ThemeInterface = typeof staySafeTheme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}