export type EntityType = 'sole_prop' | 'llc_single' | 'llc_multi' | 'corporation' | 's_corporation' | 'partnership' | 'nonprofit' | 'trust' | 'estate' | 'other';

export interface Answers {
  entityType: EntityType | '';
  reason: 'started_new_business' | 'hired_employees' | 'banking' | 'compliance' | 'changed_structure' | '';
  responsibleName: string;
  responsibleSSN_ITIN: string; // mask in UI
  legalName: string;
  dbaName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  formationState: string;
  startDate: string; // ISO
  industry: string;
  employeesThisYear: 'yes' | 'no' | '';
  firstPayrollMonth: string;
  exciseSpecial: {
    heavyVehicle: boolean;
    gambling: boolean;
    atf: boolean;
    quarterlyExcise: boolean;
  };
  email: string;
}
