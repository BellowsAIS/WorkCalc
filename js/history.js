const KEY = 'workcalc-history';
const MAX = 20;

export const history = {
  add(entry) {
    const all = this.getAll();
    all.unshift({ ...entry, timestamp: Date.now() });
    if (all.length > MAX) all.length = MAX;
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage full */ }
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
  },

  clear() {
    localStorage.removeItem(KEY);
  },
};
