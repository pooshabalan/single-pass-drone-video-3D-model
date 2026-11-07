import { Box, CheckCircle, Menu } from 'lucide-react';
import ThemeToggle from '../theme/ThemeToggle';
import { useAppStore } from '../../store/appStore';

export default function TopBar() {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center space-x-4 md:space-x-6">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-1 text-secondary-text hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="text-accent">
            <Box className="w-6 h-6" />
          </div>
          <span className="font-semibold text-[16px] text-primary tracking-tight">Drone2D-3D</span>
        </div>
        
        <div className="h-4 w-px bg-border" aria-hidden="true" />
        
        <div className="text-[14px] text-secondary-text">
          Campus Survey — Site Alpha
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-[13px] text-success bg-success/10 px-2.5 py-1 rounded-sm">
          <CheckCircle className="w-4 h-4" />
          <span className="font-medium">System Ready</span>
        </div>
        
        <div className="h-4 w-px bg-border" aria-hidden="true" />
        
        <ThemeToggle />
      </div>
    </header>
  );
}
