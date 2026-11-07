import { useExportStore } from '../../store/useExportStore';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Download, Trash2, HardDrive, FileArchive } from 'lucide-react';
import { IconButton, Button } from '../common/Button';

export default function ExportHistory() {
  const { history } = useExportStore();

  if (history.length === 0) {
    return (
      <Card className="flex-1 flex flex-col min-h-[200px]">
        <CardHeader title="Export History" />
        <CardContent className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-text">
            <FileArchive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-primary">No export history</p>
            <p className="text-[12px] text-secondary-text mt-1 max-w-[200px]">
              Completed simulated exports will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader title="Export History" />
      <CardContent className="p-0 overflow-y-auto min-h-0">
        <ul className="divide-y divide-border">
          {history.map((record) => (
            <li key={record.id} className="p-3 hover:bg-secondary/20 transition-colors flex items-center justify-between group">
              <div className="min-w-0 flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[13px] font-bold text-primary">{record.format}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 font-medium">
                    {record.status}
                  </span>
                </div>
                <div className="text-[11px] text-secondary-text truncate flex items-center space-x-1.5">
                  <span>{record.date}</span>
                  <span>&middot;</span>
                  <span className="flex items-center"><HardDrive className="w-3 h-3 mr-1" /> {record.size}</span>
                </div>
                <div className="text-[10px] text-secondary-text/70 mt-0.5 truncate">
                  {record.settingsSummary}
                </div>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" icon={<Download className="w-3.5 h-3.5" />} className="h-8 text-[11px]">
                  Demo
                </Button>
                <IconButton icon={<Trash2 className="w-3.5 h-3.5" />} size="sm" variant="ghost" className="text-error hover:bg-error/10" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
