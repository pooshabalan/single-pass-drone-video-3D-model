interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ progress, label, showValue = true, className = '' }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-[12px]">
          {label && <span className="font-medium text-secondary-text">{label}</span>}
          {showValue && <span className="text-primary font-medium">{clampedProgress}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
