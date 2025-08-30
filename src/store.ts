import { create } from 'zustand';
import type { Answers } from './types';

const defaultAnswers: Answers = {
  entityType: '',
  reason: '',
  responsibleName: '',
  responsibleSSN_ITIN: '',
  legalName: '',
  dbaName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  formationState: '',
  startDate: '',
  industry: '',
  employeesThisYear: '',
  firstPayrollMonth: '',
  exciseSpecial: { heavyVehicle:false, gambling:false, atf:false, quarterlyExcise:false },
  email: ''
};

type Store = {
  answers: Answers;
  set: (upd: Partial<Answers>) => void;
  reset: () => void;
  progress: number;
  computeProgress: () => void;
};

export const useStore = create<Store>((set, get) => ({
  answers: JSON.parse(localStorage.getItem('answers') || 'null') || defaultAnswers,
  set: (upd) => {
    const merged = { ...get().answers, ...upd };
    set({ answers: merged });
    localStorage.setItem('answers', JSON.stringify(merged));
    get().computeProgress();
  },
  reset: () => {
    set({ answers: defaultAnswers, progress: 0 });
    localStorage.removeItem('answers');
  },
  progress: 0,
  computeProgress: () => {
    const a = get().answers;
    const fields = [
      a.entityType, a.reason, a.responsibleName, a.legalName, a.address, a.city, a.state, a.zip,
      a.formationState, a.startDate, a.industry, a.employeesThisYear
    ];
    const filled = fields.filter(Boolean).length;
    set({ progress: Math.round((filled / fields.length) * 100) });
  }
}));
