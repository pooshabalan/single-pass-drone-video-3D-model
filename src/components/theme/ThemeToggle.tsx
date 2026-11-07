import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // If system preference is being used, we should probably toggle between explicit light/dark.
  // For simplicity, this toggles between explicit light and explicit dark.
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="p-2 rounded-md hover:bg-secondary text-secondary-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
