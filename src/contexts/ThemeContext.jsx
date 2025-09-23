import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark', 
  FUTURISTIC: 'futuristic'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('auditdna-theme');
    return saved || THEME_MODES.LIGHT;
  });

  useEffect(() => {
    localStorage.setItem('auditdna-theme', theme);
    
    // Apply theme classes to document
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-futuristic');
    root.classList.add(`theme-${theme}`);
    
    // Update CSS variables based on theme
    switch (theme) {
      case THEME_MODES.DARK:
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--text-primary', '#f8fafc');
        root.style.setProperty('--text-secondary', '#cbd5e1');
        root.style.setProperty('--accent-primary', '#3b82f6');
        root.style.setProperty('--accent-secondary', '#10b981');
        break;
      case THEME_MODES.FUTURISTIC:
        root.style.setProperty('--bg-primary', '#000011');
        root.style.setProperty('--bg-secondary', 'rgba(15, 23, 42, 0.8)');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#a1a1aa');
        root.style.setProperty('--accent-primary', '#00d4ff');
        root.style.setProperty('--accent-secondary', '#8bc34a');
        root.style.setProperty('--neon-blue', '#00d4ff');
        root.style.setProperty('--neon-green', '#8bc34a');
        root.style.setProperty('--neon-purple', '#a855f7');
        break;
      default: // LIGHT
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--text-primary', '#1e293b');
        root.style.setProperty('--text-secondary', '#64748b');
        root.style.setProperty('--accent-primary', '#1e88e5');
        root.style.setProperty('--accent-secondary', '#8bc34a');
        break;
    }
  }, [theme]);

  const toggleTheme = () => {
    const modes = Object.values(THEME_MODES);
    const currentIndex = modes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex]);
  };

  const setSpecificTheme = (newTheme) => {
    if (Object.values(THEME_MODES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    setTheme: setSpecificTheme,
    toggleTheme,
    isLight: theme === THEME_MODES.LIGHT,
    isDark: theme === THEME_MODES.DARK,
    isFuturistic: theme === THEME_MODES.FUTURISTIC
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};