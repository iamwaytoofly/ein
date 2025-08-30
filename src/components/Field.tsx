import { ReactNode } from 'react';

export function Field({
  label, example, children
}: { label: string; example?: string; children: ReactNode; }) {
  return (
    <div className="card">
      <label><strong>{label}</strong></label>
      <div className="helper">Example: {example}</div>
      <div className="row" style={{marginTop:8}}>{children}</div>
    </div>
  );
}
