import { Activity, ServerOff, Database } from 'lucide-react';

export default function StatusBar() {
  return (
    <footer className="h-8 bg-surface border-t border-border flex items-center justify-between px-4 text-[12px] text-muted shrink-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5" title="Application is ready">
          <Activity className="w-3.5 h-3.5 text-success" />
          <span>System Ready</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5 text-warning" title="Running in frontend-only simulation mode">
          <ServerOff className="w-3.5 h-3.5" />
          <span>Frontend Mode</span>
        </div>
        
        <div className="h-3 w-px bg-border" aria-hidden="true" />
        
        <div className="flex items-center space-x-1.5 text-info" title="Using simulated mock data">
          <Database className="w-3.5 h-3.5" />
          <span>Mock Data</span>
        </div>
      </div>
    </footer>
  );
}
