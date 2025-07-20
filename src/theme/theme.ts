export interface Theme {
  background: string
  text: string
  link: string
  accent: string
  card: string
}


export const lightTheme: Theme = {
  background: '#f0f0f0',
  text: '#111',
  link: '#0055ff',
  accent: '#ffc400',
  card: '#ffffff',
}

export const darkTheme: Theme = {
  background: '#111',
  text: '#f0f0f0',
  link: '#4fa3ff',
  accent: '#ff6b00',
  card: '#1f1f1f',
}

export type ThemeType = Theme;