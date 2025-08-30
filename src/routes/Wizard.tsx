import { useStore } from '../store';
import { Field } from '../components/Field';

export default function Wizard() {
  const { answers, set } = useStore();

  return (
    <div className="container">
      <h2>Tell us about the business</h2>

      <Field label="What kind of business is this legally?" example="Single‑member LLC">
        <select value={answers.entityType} onChange={e=>set({entityType: e.target.value as any})}>
          <option value="">Select...</option>
          <option value="sole_prop">Sole proprietor</option>
          <option value="llc_single">LLC (single‑member)</option>
          <option value="llc_multi">LLC (multi‑member)</option>
          <option value="partnership">Partnership</option>
          <option value="corporation">Corporation</option>
          <option value="s_corporation">S‑Corporation</option>
          <option value="nonprofit">Nonprofit</option>
          <option value="trust">Trust</option>
          <option value="estate">Estate</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <Field label="Why do you need an EIN right now?" example="Starting a new business and opening a bank account">
        <select value={answers.reason} onChange={e=>set({reason: e.target.value as any})}>
          <option value="">Select...</option>
          <option value="started_new_business">Starting a new business</option>
          <option value="hired_employees">Hired employees</option>
          <option value="banking">Opening a bank account</option>
          <option value="compliance">Compliance (e.g., IRS/state)</option>
          <option value="changed_structure">Changed ownership/structure</option>
        </select>
      </Field>

      <Field label="Who runs the show and controls the money?" example="Alex Kim, SSN ending 1234">
        <input placeholder="Responsible party full name"
               value={answers.responsibleName}
               onChange={e=>set({responsibleName: e.target.value})}/>
        <input placeholder="SSN/ITIN (not stored on server)"
               value={answers.responsibleSSN_ITIN}
               onChange={e=>set({responsibleSSN_ITIN: e.target.value})}/>
      </Field>

      <Field label="What’s the legal name? Any trade name (DBA)?" example="Legal: Steel City Goods LLC; DBA: Steel City Goods">
        <input placeholder="Legal name" value={answers.legalName} onChange={e=>set({legalName: e.target.value})}/>
        <input placeholder="DBA (optional)" value={answers.dbaName} onChange={e=>set({dbaName: e.target.value})}/>
      </Field>

      <Field label="Where should official mail go?" example="123 Penn Ave, Pittsburgh, PA 15222; 412‑555‑0199">
        <input placeholder="Street address" value={answers.address} onChange={e=>set({address: e.target.value})}/>
        <input placeholder="City" value={answers.city} onChange={e=>set({city: e.target.value})}/>
        <input placeholder="State" value={answers.state} onChange={e=>set({state: e.target.value})}/>
        <input placeholder="ZIP" value={answers.zip} onChange={e=>set({zip: e.target.value})}/>
        <input placeholder="Phone" value={answers.phone} onChange={e=>set({phone: e.target.value})}/>
        <input placeholder="Email for PDF delivery" value={answers.email} onChange={e=>set({email: e.target.value})}/>
      </Field>

      <Field label="Which state did you form in and when does the business start?" example="Formed in Pennsylvania; starting August 2025">
        <input placeholder="Formation state" value={answers.formationState} onChange={e=>set({formationState: e.target.value})}/>
        <input type="month" placeholder="Start month" value={answers.startDate} onChange={e=>set({startDate: e.target.value})}/>
      </Field>

      <Field label="What do you mostly do?" example="Retail—selling branded merchandise online">
        <input placeholder="Industry / principal activity" value={answers.industry} onChange={e=>set({industry: e.target.value})}/>
      </Field>

      <Field label="Will you pay any employees this year? If yes, when does payroll start?" example="Yes; first wages in October 2025">
        <select value={answers.employeesThisYear} onChange={e=>set({employeesThisYear: e.target.value as any})}>
          <option value="">Select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input placeholder="First payroll month (e.g., 2025-10)" value={answers.firstPayrollMonth} onChange={e=>set({firstPayrollMonth: e.target.value})}/>
      </Field>

      <Field label="Any of these special taxes apply?" example="No to all">
        <label><input type="checkbox" checked={answers.exciseSpecial.heavyVehicle} onChange={e=>set({exciseSpecial:{...answers.exciseSpecial, heavyVehicle:e.target.checked}})} /> Heavy highway vehicles</label>
        <label><input type="checkbox" checked={answers.exciseSpecial.gambling} onChange={e=>set({exciseSpecial:{...answers.exciseSpecial, gambling:e.target.checked}})} /> Gambling / wagering</label>
        <label><input type="checkbox" checked={answers.exciseSpecial.atf} onChange={e=>set({exciseSpecial:{...answers.exciseSpecial, atf:e.target.checked}})} /> Alcohol / Tobacco / Firearms</label>
        <label><input type="checkbox" checked={answers.exciseSpecial.quarterlyExcise} onChange={e=>set({exciseSpecial:{...answers.exciseSpecial, quarterlyExcise:e.target.checked}})} /> Quarterly excise taxes</label>
      </Field>

      <div className="container" style={{display:'flex', gap:12}}>
        <a className="btn secondary" href="/">Back</a>
        <a className="btn" href="/review">Review answers</a>
      </div>
    </div>
  );
}
