import React from 'react';
import { useTheme, THEME_MODES } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isFuturistic } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case THEME_MODES.LIGHT:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        );
      case THEME_MODES.DARK:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        );
      case THEME_MODES.FUTURISTIC:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7l7 5 7-5-7-5zM3 13l7 5 7-5M3 9l7 5 7-5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case THEME_MODES.LIGHT:
        return 'Light';
      case THEME_MODES.DARK:
        return 'Dark';
      case THEME_MODES.FUTURISTIC:
        return 'DNA';
      default:
        return 'Theme';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${className}
        group relative flex items-center gap-2 px-4 py-2 rounded-lg
        transition-all duration-300 transform hover:scale-105
        ${isFuturistic 
          ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]' 
          : theme === THEME_MODES.DARK
            ? 'bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
        }
      `}
      title={`Switch to ${theme === THEME_MODES.LIGHT ? 'Dark' : theme === THEME_MODES.DARK ? 'Futuristic' : 'Light'} mode`}
    >
      <div className={`
        transition-all duration-300
        ${isFuturistic ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]' : ''}
      `}>
        {getThemeIcon()}
      </div>
      
      <span className={`
        text-sm font-medium transition-all duration-300
        ${isFuturistic ? 'text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text' : ''}
      `}>
        {getThemeLabel()}
      </span>
      
      {/* Futuristic glow effect */}
      {isFuturistic && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-green-500/10 animate-pulse pointer-events-none" />
      )}
    </button>
  );
};

export default ThemeToggle;