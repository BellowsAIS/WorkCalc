import { fmt } from '../units.js';

const UNIT_SPECS = {
  brick: { L: 190, H: 57,  D: 90,  mortarPerUnit: 0.00025, label: 'bricks' },
  block: { L: 390, H: 190, D: 190, mortarPerUnit: 0.002,   label: 'blocks' },
};

export default {
  id: 'masonry',
  label: 'Masonry',
  defaultWasteFactor: 10,
  inputs: [
    {
      id: 'unit-type', label: 'Masonry unit', type: 'select',
      options: [
        { value: 'brick', label: 'Brick  (190 × 90 × 57 mm)' },
        { value: 'block', label: 'Concrete block  (390 × 190 × 190 mm)' },
      ],
    },
    { id: 'wall-length', label: 'Wall length',          unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'wall-height', label: 'Wall height',          unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'joint-width', label: 'Mortar joint',         unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    { id: 'openings',    label: 'Opening deductions',   unit: { metric: 'm²', imperial: 'ft²' }, min: 0 },
  ],

  calculate(inputs, unitSystem) {
    const type  = inputs['unit-type'] || 'brick';
    const waste = inputs.waste || 0;
    const spec  = UNIT_SPECS[type];

    const toM      = unitSystem === 'metric' ? 1 : 0.3048;
    const L        = (inputs['wall-length'] || 0) * toM;
    const H        = (inputs['wall-height'] || 0) * toM;
    const jointMm  = unitSystem === 'metric'
      ? (inputs['joint-width'] || 10)
      : (inputs['joint-width'] || 0.394) * 25.4;
    const openM2   = unitSystem === 'metric'
      ? (inputs.openings || 0)
      : (inputs.openings || 0) * 0.0929;

    if (L <= 0 || H <= 0) return null;

    const wallArea = Math.max(0, L * H - openM2);
    if (wallArea <= 0) return null;

    const faceM2 = ((spec.L + jointMm) * (spec.H + jointMm)) / 1_000_000;
    const count  = Math.ceil(wallArea / faceM2);
    const mortar = count * spec.mortarPerUnit;

    let areaStr, formula;
    if (unitSystem === 'metric') {
      areaStr = `${fmt(wallArea)} m²`;
      formula = `Wall ${areaStr} ÷ ${fmt(faceM2 * 10_000, 2)} cm²/${type} = ${count.toLocaleString('en-CA')} ${spec.label}; mortar: ${count.toLocaleString('en-CA')} × ${spec.mortarPerUnit} m³ = ${fmt(mortar, 3)} m³`;
    } else {
      const areaFt2 = wallArea * 10.7639;
      areaStr = `${fmt(areaFt2)} ft²`;
      formula = `Wall ${areaStr} ÷ ${fmt(faceM2 * 10.7639, 4)} ft²/${type} = ${count.toLocaleString('en-CA')} ${spec.label}; mortar: ${count.toLocaleString('en-CA')} × ${spec.mortarPerUnit} m³ = ${fmt(mortar, 3)} m³`;
    }

    const display = `${count.toLocaleString('en-CA')} ${spec.label}  ·  ${fmt(mortar, 3)} m³ mortar`;

    let wasteAdjusted = null;
    if (waste > 0) {
      const countW  = Math.ceil(count * (1 + waste / 100));
      const mortarW = mortar * (1 + waste / 100);
      wasteAdjusted = `With ${waste}% waste: ${countW.toLocaleString('en-CA')} ${spec.label}  ·  ${fmt(mortarW, 3)} m³ mortar`;
    }

    return { display, formula, wasteAdjusted };
  },
};
