import { useExportStore } from '../../store/useExportStore';
import { Card, CardHeader, CardContent } from '../common/Card';

export default function ExportSettingsPanel() {
  const { format, settings, updateSettings, status } = useExportStore();
  const isDisabled = status !== 'idle';
  const isMeshFormat = ['OBJ', 'FBX', 'GLTF', 'GLB'].includes(format);

  return (
    <Card>
      <CardHeader title="Export Settings" />
      <CardContent className="p-4 space-y-5">
        
        {isMeshFormat ? (
          <>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-secondary-text uppercase tracking-wider block">
                Texture Resolution
              </label>
              <div className="flex bg-secondary/30 p-1 rounded-md border border-border">
                {['2K', '4K', '8K'].map((res) => (
                  <button
                    key={res}
                    disabled={isDisabled}
                    onClick={() => updateSettings({ textureResolution: res as any })}
                    className={`flex-1 py-1.5 text-[13px] font-medium rounded transition-colors ${
                      settings.textureResolution === res
                        ? 'bg-card shadow-sm border border-border text-primary'
                        : 'text-secondary-text hover:text-primary border border-transparent'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-bold text-secondary-text uppercase tracking-wider block">
                Mesh Detail
              </label>
              <div className="flex bg-secondary/30 p-1 rounded-md border border-border">
                {['High', 'Medium', 'Low'].map((detail) => (
                  <button
                    key={detail}
                    disabled={isDisabled}
                    onClick={() => updateSettings({ meshDetail: detail as any })}
                    className={`flex-1 py-1.5 text-[13px] font-medium rounded transition-colors ${
                      settings.meshDetail === detail
                        ? 'bg-card shadow-sm border border-border text-primary'
                        : 'text-secondary-text hover:text-primary border border-transparent'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {detail}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[13px] font-medium text-primary">Include Materials</span>
              <button
                disabled={isDisabled}
                onClick={() => updateSettings({ includeMaterials: !settings.includeMaterials })}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  settings.includeMaterials ? 'bg-accent' : 'bg-border'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.includeMaterials ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-secondary-text uppercase tracking-wider block">
                Point Density
              </label>
              <div className="flex bg-secondary/30 p-1 rounded-md border border-border">
                {['High', 'Medium', 'Low'].map((density) => (
                  <button
                    key={density}
                    disabled={isDisabled}
                    onClick={() => updateSettings({ pointDensity: density as any })}
                    className={`flex-1 py-1.5 text-[13px] font-medium rounded transition-colors ${
                      settings.pointDensity === density
                        ? 'bg-card shadow-sm border border-border text-primary'
                        : 'text-secondary-text hover:text-primary border border-transparent'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[13px] font-medium text-primary">Include RGB Color</span>
              <button
                disabled={isDisabled}
                onClick={() => updateSettings({ includeRGB: !settings.includeRGB })}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  settings.includeRGB ? 'bg-accent' : 'bg-border'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.includeRGB ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[13px] font-medium text-primary">Include Classification</span>
              <button
                disabled={isDisabled}
                onClick={() => updateSettings({ includeClassification: !settings.includeClassification })}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  settings.includeClassification ? 'bg-accent' : 'bg-border'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.includeClassification ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        )}

        <div className="pt-4 border-t border-border space-y-2">
          <label className="text-[12px] font-bold text-secondary-text uppercase tracking-wider block">
            Coordinate Reference
          </label>
          <div className="w-full bg-secondary/30 p-2.5 rounded-md border border-border text-[13px] text-primary flex items-center justify-between">
            <span>{settings.coordinateReference}</span>
            <span className="text-[10px] text-secondary-text uppercase px-1.5 py-0.5 bg-card border border-border rounded">Demo</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
