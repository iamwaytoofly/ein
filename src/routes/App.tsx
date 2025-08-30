import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function App() {
  const { progress } = useStore();
  return (
    <div className="container">
      <div className="header">
        <h1>EIN Helper</h1>
        <div style={{minWidth:220}}>
          <div className="progress"><div style={{width: `${progress}%`}}/></div>
          <div className="helper">{progress}% ready</div>
        </div>
      </div>

      <div className="card">
        <p>This assistant translates the IRS EIN questions into plain English with quick examples and prepares a paste‑sheet for the IRS online tool. The IRS online assistant is generally available 7:00 a.m.–10:00 p.m. ET, Monday–Friday; save progress before starting. [Tip based on IRS hours guidance]</p>
        <p className="helper">Note: EINs are free at IRS.gov. Beware of third‑party fee sites.</p>
        <Link className="btn" to="/wizard">Start</Link>
      </div>

      <div className="card">
        <h3>What you’ll need</h3>
        <ul>
          <li>Legal business name and any DBA</li>
          <li>Responsible party name and SSN/ITIN</li>
          <li>Business address and phone</li>
          <li>Entity type, reason for applying, start date</li>
          <li>Employees this year and first payroll month (if any)</li>
        </ul>
        <a className="btn secondary" href="/review">Review answers</a>
      </div>
    </div>
  );
}
