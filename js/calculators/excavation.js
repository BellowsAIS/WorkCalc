import { fmt } from '../units.js';

const SWELL_LABELS = { '1.10': 'sand', '1.15': 'topsoil', '1.25': 'clay', '1.50': 'rock' };

export default {
  id: 'excavation',
  label: 'Excavation',
  defaultWasteFactor: 0,
  inputs: [
    { id: 'length',         label: 'Length',          hint: 'Length of the excavation cut, measured at grade.',                                                                          unit: { metric: 'm',  imperial: 'ft'  }, min: 0 },
    { id: 'width',          label: 'Width',           hint: 'Width of the excavation cut, measured at grade.',                                                                           unit: { metric: 'm',  imperial: 'ft'  }, min: 0 },
    { id: 'depth',          label: 'Depth',           hint: 'Maximum depth of cut below existing grade.',                                                                               unit: { metric: 'm',  imperial: 'ft'  }, min: 0 },
    {
      id: 'soil-type', label: 'Soil type (swell factor)', type: 'select',
      hint: 'Determines how much material expands (swells) when excavated. Swell increases the haul volume above the in-place bank volume.',
      options: [
        { value: '1.10', label: 'Sand  (10% swell)' },
        { value: '1.15', label: 'Topsoil  (15% swell)' },
        { value: '1.25', label: 'Clay  (25% swell)' },
        { value: '1.50', label: 'Rock  (50% swell)' },
      ],
    },
    { id: 'truck-capacity', label: 'Truck capacity',  hint: 'Heaped capacity of haul trucks. Leave at 0 to calculate volume only, without truck load count.',                          unit: { metric: 'm³', imperial: 'yd³' }, min: 0 },
  ],

  calculate(inputs, unitSystem) {
    const L        = inputs.length || 0;
    const W        = inputs.width  || 0;
    const D        = inputs.depth  || 0;
    const swell    = parseFloat(inputs['soil-type']) || 1.10;
    const truckCap = inputs['truck-capacity'] || 0;

    if (L <= 0 || W <= 0 || D <= 0) return null;

    let bankVol, looseVol, volUnit, formula;

    if (unitSystem === 'metric') {
      bankVol  = L * W * D;
      looseVol = bankVol * swell;
      volUnit  = 'm³';
      formula  = `${fmt(L)} × ${fmt(W)} × ${fmt(D)} m = ${fmt(bankVol)} m³ bank × ${swell} swell = ${fmt(looseVol)} m³ loose`;
    } else {
      const ft3 = L * W * D;
      bankVol   = ft3 / 27;
      looseVol  = bankVol * swell;
      volUnit   = 'yd³';
      formula   = `${fmt(L)} × ${fmt(W)} × ${fmt(D)} ft = ${fmt(ft3)} ft³ (${fmt(bankVol)} yd³ bank) × ${swell} swell = ${fmt(looseVol)} yd³ loose`;
    }

    const soilLabel = SWELL_LABELS[String(swell)] ?? '';
    let display = `${fmt(looseVol)} ${volUnit} loose (${soilLabel})`;

    if (truckCap > 0) {
      const loads = Math.ceil(looseVol / truckCap);
      display += `  ·  ${loads} truck loads`;
      formula += `;  ${fmt(looseVol)} ÷ ${truckCap} ${volUnit}/truck = ${loads} loads`;
    }

    return { display, formula, wasteAdjusted: null };
  },
};
