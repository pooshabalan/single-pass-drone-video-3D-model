import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';

export default function AppShell() {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-primary">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-background focus:outline-none" tabIndex={-1}>
          {/* Outlet renders the matched child route's component */}
          <Outlet />
        </main>
      </div>

      <StatusBar />
    </div>
  );
}
