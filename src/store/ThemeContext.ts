import { createContext } from 'react'

type ThemeContextType = {
	toggleTheme: () => void;
	theme: string;
};

export const ThemeContext = createContext<ThemeContextType>({
	toggleTheme: () => {},
	theme: 'light',
});