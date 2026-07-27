import { fmt } from '../units.js';

export default {
  id: 'roofing',
  label: 'Roofing',
  defaultWasteFactor: 10,
  inputs: [
    { id: 'length', label: 'Building length', unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'width',  label: 'Building width',  unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    {
      id: 'pitch', label: 'Roof pitch (rise/12)', type: 'select',
      options: [
        { value: '2',  label: '2/12' },
        { value: '3',  label: '3/12' },
        { value: '4',  label: '4/12' },
        { value: '5',  label: '5/12' },
        { value: '6',  label: '6/12' },
        { value: '7',  label: '7/12' },
        { value: '8',  label: '8/12' },
        { value: '9',  label: '9/12' },
        { value: '10', label: '10/12' },
        { value: '12', label: '12/12' },
      ],
    },
  ],

  calculate(inputs, unitSystem) {
    const L     = inputs.length || 0;
    const W     = inputs.width  || 0;
    const pitch = parseFloat(inputs.pitch) || 4;
    const waste = inputs.waste || 0;

    if (L <= 0 || W <= 0) return null;

    const pitchFactor = Math.sqrt(1 + (pitch / 12) ** 2);
    const planArea    = L * W;
    const slopedArea  = planArea * pitchFactor;
    const rafterLen   = (W / 2) * pitchFactor;
    const ridgeLen    = L;

    let squares, formula, lenUnit;

    if (unitSystem === 'metric') {
      squares = slopedArea / 9.29;
      lenUnit = 'm';
      formula = `Plan ${fmt(planArea)} m² × pitch factor ${fmt(pitchFactor, 3)} ÷ 9.29 m²/sq = ${fmt(squares)} squares; rafter ${fmt(rafterLen)} m, ridge ${fmt(ridgeLen)} m`;
    } else {
      squares = slopedArea / 100;
      lenUnit = 'ft';
      formula = `Plan ${fmt(planArea)} ft² × pitch factor ${fmt(pitchFactor, 3)} ÷ 100 ft²/sq = ${fmt(squares)} squares; rafter ${fmt(rafterLen)} ft, ridge ${fmt(ridgeLen)} ft`;
    }

    const bundles = Math.ceil(squares * 3);
    const display = `${fmt(squares)} squares  ·  ${bundles} bundles`;

    let wasteAdjusted = null;
    if (waste > 0) {
      const squaresW = squares * (1 + waste / 100);
      const bundlesW = Math.ceil(squaresW * 3);
      wasteAdjusted = `With ${waste}% waste: ${fmt(squaresW)} squares  ·  ${bundlesW} bundles`;
    }

    return { display, formula, wasteAdjusted };
  },
};
