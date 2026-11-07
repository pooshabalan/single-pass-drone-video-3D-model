import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Upload, 
  Activity, 
  Box, 
  Map as MapIcon, 
  Ruler, 
  Download, 
  Settings,
  X
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Project', path: '/project', icon: FolderOpen },
  { name: 'Upload', path: '/upload', icon: Upload },
  { name: 'Reconstruction', path: '/reconstruction', icon: Activity },
  { name: '3D Model', path: '/model', icon: Box },
  { name: 'Map', path: '/map', icon: MapIcon },
  { name: 'Measurements', path: '/measurements', icon: Ruler },
  { name: 'Export', path: '/export', icon: Download },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-surface border-r border-border
          flex flex-col transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${!sidebarOpen && 'md:w-0 md:overflow-hidden md:border-none'}
        `}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border md:hidden shrink-0">
          <span className="font-semibold text-primary">Menu</span>
          <button 
            onClick={toggleSidebar}
            className="p-1 text-secondary-text hover:text-primary rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                // On mobile, close sidebar after navigation
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
              className={({ isActive }) => `
                flex items-center px-3 py-2 text-[14px] font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-secondary-text hover:bg-secondary hover:text-primary'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3 shrink-0" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
