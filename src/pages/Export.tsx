import { ShieldAlert, Download } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import ExportFormatSelector from '../components/export/ExportFormatSelector';
import ExportSettingsPanel from '../components/export/ExportSettingsPanel';
import ExportSummaryPanel from '../components/export/ExportSummaryPanel';
import ExportHistory from '../components/export/ExportHistory';
import ExportProgress from '../components/export/ExportProgress';
import { useExportStore } from '../store/useExportStore';

export default function Export() {
  const { status, startExport, format } = useExportStore();
  const isIdle = status === 'idle';

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden max-w-7xl mx-auto w-full">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center">
            Export Model
          </h1>
          <p className="text-secondary-text text-sm mt-1">
            Prepare and simulate delivery of the reconstructed model in standard 3D and survey formats.
          </p>
        </div>
        <Badge variant="warning" className="px-3 py-1 font-medium tracking-wide">
          <ShieldAlert className="w-4 h-4 mr-2" />
          DEMO / SIMULATION DATA
        </Badge>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          
          {/* Left Column - Configuration or Progress */}
          <div className="lg:col-span-2 flex flex-col space-y-6 overflow-y-auto pr-2 pb-2">
            {!isIdle ? (
              <ExportProgress />
            ) : (
              <>
                <ExportFormatSelector />
                <ExportSettingsPanel />
              </>
            )}
          </div>

          {/* Right Column - Summary & History */}
          <div className="flex flex-col space-y-6 min-h-0">
            <ExportSummaryPanel />
            <ExportHistory />
          </div>

        </div>

        {/* Bottom Action Area */}
        {isIdle && (
          <div className="pt-6 mt-2 border-t border-border flex justify-center flex-shrink-0">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-w-[240px]" 
              icon={<Download className="w-5 h-5" />}
              onClick={startExport}
            >
              Export {format} Model
            </Button>
          </div>
        )}
      </div>
      
    </div>
  );
}
