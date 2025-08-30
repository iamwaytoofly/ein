import { useStore } from '../store';
import { Link } from 'react-router-dom';

export default function Review() {
  const { answers } = useStore();
  const onlineHours = 'IRS Online EIN Assistant typically available 7:00 a.m.–10:00 p.m. ET, Mon–Fri.';

  return (
    <div className="container">
      <h2>Paste Sheet</h2>
      <div className="card">
        <p>Copy these into the IRS online assistant when ready. Save progress and be mindful of session timeouts.</p>
        <pre style={{whiteSpace:'pre-wrap'}}>
Entity type: {answers.entityType}
Reason: {answers.reason}
Responsible party: {answers.responsibleName} ({answers.responsibleSSN_ITIN && 'SSN/ITIN on hand'})
Legal name: {answers.legalName}
DBA: {answers.dbaName}
Address: {answers.address}, {answers.city}, {answers.state} {answers.zip}
Phone: {answers.phone}
Email: {answers.email}
Formation state: {answers.formationState}
Start date: {answers.startDate}
Industry: {answers.industry}
Employees this year: {answers.employeesThisYear}
First payroll month: {answers.firstPayrollMonth}
Special taxes: {Object.entries(answers.exciseSpecial).filter(([,v])=>v).map(([k])=>k).join(', ') || 'None'}
        </pre>
        <div className="helper">{onlineHours}</div>
      </div>

      <div className="row">
        <Link className="btn secondary" to="/wizard">Edit</Link>
        <Link className="btn" to="/export">Export SS‑4 PDF</Link>
      </div>
    </div>
  );
}
