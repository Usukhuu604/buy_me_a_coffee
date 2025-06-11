import { XCircle } from "lucide-react";

export function ZodErrors({ error }: { error?: string[] }) {
  if (!error || error.length === 0) return null;

  return (
    <div className="space-y-1">
      {error.map((msg, idx) => (
        <div key={idx} className="text-red-500 text-sm flex gap-1 items-center">
          <XCircle className="w-3 h-3" />
          {msg}
        </div>
      ))}
    </div>
  );
}
