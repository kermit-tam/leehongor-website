/**
 * 進度條組件
 */

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  color?: string;
}

export function ProgressBar({ label, current, total, color = 'bg-indigo-500' }: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500">{current} / {total}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
