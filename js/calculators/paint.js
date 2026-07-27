import { fmt } from '../units.js';

const DOOR_M2   = 1.9;
const WINDOW_M2 = 1.4;

export default {
  id: 'paint',
  label: 'Paint',
  defaultWasteFactor: 10,
  inputs: [
    { id: 'length',      label: 'Room length',      unit: { metric: 'm',     imperial: 'ft'     }, min: 0 },
    { id: 'width',       label: 'Room width',       unit: { metric: 'm',     imperial: 'ft'     }, min: 0 },
    { id: 'height',      label: 'Wall height',      unit: { metric: 'm',     imperial: 'ft'     }, min: 0 },
    { id: 'doors',       label: 'Doors',            unit: {},                                      min: 0 },
    { id: 'windows',     label: 'Windows',          unit: {},                                      min: 0 },
    { id: 'spread-rate', label: 'Spread rate',      unit: { metric: 'm²/L', imperial: 'ft²/gal' }, min: 1 },
    { id: 'coats',       label: 'Number of coats',  unit: {},                                      min: 1 },
  ],

  calculate(inputs, unitSystem) {
    const L       = inputs.length  || 0;
    const W       = inputs.width   || 0;
    const H       = inputs.height  || 0;
    const doors   = inputs.doors   || 0;
    const windows = inputs.windows || 0;
    const coats   = inputs.coats   || 1;
    const waste   = inputs.waste   || 0;

    if (L <= 0 || W <= 0 || H <= 0) return null;

    let grossArea, deductions, netArea, spread, totalVol, volUnit, areaUnit, formula;

    if (unitSystem === 'metric') {
      grossArea  = 2 * (L + W) * H;
      deductions = doors * DOOR_M2 + windows * WINDOW_M2;
      netArea    = Math.max(0, grossArea - deductions);
      spread     = inputs['spread-rate'] > 0 ? inputs['spread-rate'] : 10;
      totalVol   = (netArea / spread) * coats;
      volUnit    = 'L';
      areaUnit   = 'm²';
      formula    = `2 × (${fmt(L)} + ${fmt(W)}) × ${fmt(H)} m = ${fmt(grossArea)} m² − ${fmt(deductions, 1)} m² openings = ${fmt(netArea)} m² ÷ ${spread} m²/L × ${coats} coat${coats !== 1 ? 's' : ''} = ${fmt(totalVol)} L`;
    } else {
      grossArea  = 2 * (L + W) * H;
      deductions = doors * (DOOR_M2 * 10.7639) + windows * (WINDOW_M2 * 10.7639);
      netArea    = Math.max(0, grossArea - deductions);
      spread     = inputs['spread-rate'] > 0 ? inputs['spread-rate'] : 400;
      totalVol   = (netArea / spread) * coats;
      volUnit    = 'gal';
      areaUnit   = 'ft²';
      formula    = `2 × (${fmt(L)} + ${fmt(W)}) × ${fmt(H)} ft = ${fmt(grossArea)} ft² − ${fmt(deductions, 1)} ft² openings = ${fmt(netArea)} ft² ÷ ${spread} ft²/gal × ${coats} coat${coats !== 1 ? 's' : ''} = ${fmt(totalVol)} gal`;
    }

    const display = `${fmt(totalVol)} ${volUnit}  ·  ${fmt(netArea)} ${areaUnit} net`;

    let wasteAdjusted = null;
    if (waste > 0) {
      const totalVolW = totalVol * (1 + waste / 100);
      wasteAdjusted = `With ${waste}% waste: ${fmt(totalVolW)} ${volUnit}`;
    }

    return { display, formula, wasteAdjusted };
  },
};
