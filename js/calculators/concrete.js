import { fmt } from '../units.js';

const BAG_YIELD = { '25': 0.010, '30': 0.012 };

function buildResult(volM3, calcType, inputs, unitSystem, waste, bagSize) {
  const yieldPerBag = BAG_YIELD[bagSize] ?? 0.010;
  const bags = Math.ceil(volM3 / yieldPerBag);

  let volDisplay, formula;

  if (unitSystem === 'metric') {
    const L = inputs.length;
    const W = inputs.width;
    const T = inputs.thickness;
    volDisplay = `${fmt(volM3)} m³`;

    if (calcType === 'pier') {
      formula = `π × (${fmt(L / 2)} m)² × ${fmt(T / 1000)} m = ${fmt(volM3)} m³`;
    } else {
      const label = calcType === 'footing' ? 'Depth' : 'Thickness';
      formula = `${fmt(L)} m × ${fmt(W)} m × ${fmt(T)} mm ÷ 1,000 = ${fmt(volM3)} m³`;
      formula = `Length × Width × ${label}: ${fmt(L)} m × ${fmt(W)} m × ${fmt(T)} mm ÷ 1,000 = ${fmt(volM3)} m³`;
    }
  } else {
    const volFt3 = volM3 * 35.3147;
    const L = inputs.length;
    const W = inputs.width;
    const T = inputs.thickness;
    volDisplay = `${fmt(volFt3)} ft³`;

    if (calcType === 'pier') {
      formula = `π × (${fmt(L / 2)} ft)² × ${fmt(T / 12, 3)} ft = ${fmt(volFt3)} ft³`;
    } else {
      const label = calcType === 'footing' ? 'Depth' : 'Thickness';
      formula = `Length × Width × ${label}: ${fmt(L)} ft × ${fmt(W)} ft × ${fmt(T)} in ÷ 12 = ${fmt(volFt3)} ft³`;
    }
  }

  const display = `${volDisplay}  ·  ${bags.toLocaleString('en-CA')} bags (${bagSize} kg)`;

  let wasteAdjusted = null;
  if (waste > 0) {
    const volWaste = volM3 * (1 + waste / 100);
    const bagsWaste = Math.ceil(volWaste / yieldPerBag);
    if (unitSystem === 'metric') {
      wasteAdjusted = `With ${waste}% waste: ${fmt(volWaste)} m³  ·  ${bagsWaste.toLocaleString('en-CA')} bags`;
    } else {
      wasteAdjusted = `With ${waste}% waste: ${fmt(volWaste * 35.3147)} ft³  ·  ${bagsWaste.toLocaleString('en-CA')} bags`;
    }
  }

  return { display, formula, wasteAdjusted };
}

export default {
  id: 'concrete',
  label: 'Concrete',
  defaultWasteFactor: 10,
  inputs: [
    {
      id: 'calc-type', label: 'Calculation type', type: 'select',
      hint: 'Choose the type of pour: a flat slab, a rectangular footing or pier, or a round (cylindrical) pier.',
      options: [
        { value: 'slab',    label: 'Slab' },
        { value: 'footing', label: 'Footing / rectangular pier' },
        { value: 'pier',    label: 'Round pier' },
      ],
    },
    { id: 'length',    label: 'Length / Diameter', hint: 'For slabs and footings: the long dimension. For round piers: the outside diameter of the column.', unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'width',     label: 'Width',             hint: 'The shorter dimension of the pour. Not used for round piers.', visibleWhen: { 'calc-type': ['slab', 'footing'] }, unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'thickness', label: 'Thickness / Depth', hint: 'Slab thickness or footing/pier depth. Enter in mm (metric) or inches (imperial).', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    {
      id: 'bag-size', label: 'Bag size', type: 'select',
      hint: '25 kg bags yield ~0.010 m³ (0.353 ft³); 30 kg bags yield ~0.012 m³ (0.424 ft³). Check the bag label for the exact yield.',
      options: {
        metric:   [
          { value: '25', label: '25 kg  (yield 0.010 m³)' },
          { value: '30', label: '30 kg  (yield 0.012 m³)' },
        ],
        imperial: [
          { value: '25', label: '25 kg  (yield 0.353 ft³)' },
          { value: '30', label: '30 kg  (yield 0.424 ft³)' },
        ],
      },
    },
  ],

  calculate(inputs, unitSystem) {
    const calcType = inputs['calc-type'] || 'slab';
    const bagSize  = inputs['bag-size']  || '25';
    const waste    = inputs.waste        || 0;

    const mPerLen   = unitSystem === 'metric' ? 1      : 0.3048;  // ft → m
    const mPerThick = unitSystem === 'metric' ? 0.001  : 0.0254;  // mm or in → m

    const L = inputs.length    * mPerLen;
    const W = inputs.width     * mPerLen;
    const T = inputs.thickness * mPerThick;

    if (calcType === 'pier') {
      if (L <= 0 || T <= 0) return null;
      const volM3 = Math.PI * (L / 2) ** 2 * T;
      return buildResult(volM3, calcType, inputs, unitSystem, waste, bagSize);
    }

    if (L <= 0 || W <= 0 || T <= 0) return null;
    const volM3 = L * W * T;
    return buildResult(volM3, calcType, inputs, unitSystem, waste, bagSize);
  },
};
