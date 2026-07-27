import { fmt } from '../units.js';

const SPACING_LABEL = { '300': '12"', '400': '16"', '600': '24"' };

function calcBoardFeet(inputs, unitSystem, waste) {
  // Board feet always computed in nominal inches + feet
  const T_in = unitSystem === 'metric' ? inputs.thickness * 0.0393701 : inputs.thickness;
  const W_in = unitSystem === 'metric' ? inputs.width     * 0.0393701 : inputs.width;
  const L_ft = unitSystem === 'metric' ? inputs.length    * 3.28084   : inputs.length;

  if (T_in <= 0 || W_in <= 0 || L_ft <= 0) return null;

  const bf = (T_in * W_in * L_ft) / 12;
  const formula = `(${fmt(T_in, 2)}" nom × ${fmt(W_in, 2)}" nom × ${fmt(L_ft, 2)}') ÷ 12 = ${fmt(bf)} board feet`;
  const display = `${fmt(bf)} board feet`;

  let wasteAdjusted = null;
  if (waste > 0) {
    wasteAdjusted = `With ${waste}% waste: ${fmt(bf * (1 + waste / 100))} board feet`;
  }

  return { display, formula, wasteAdjusted };
}

function calcStuds(inputs, unitSystem, waste) {
  const spacingMm = parseFloat(inputs.spacing) || 400;
  const spacingM  = spacingMm / 1000;
  const lengthM   = unitSystem === 'metric' ? inputs.length : inputs.length * 0.3048;

  if (lengthM <= 0) return null;

  const count = Math.floor(lengthM / spacingM) + 1;

  let formula;
  if (unitSystem === 'metric') {
    formula = `${fmt(inputs.length)} m ÷ ${spacingMm} mm + 1 = ${count} studs`;
  } else {
    formula = `${fmt(inputs.length)} ft ÷ ${SPACING_LABEL[inputs.spacing] ?? spacingMm + 'mm'} + 1 = ${count} studs`;
  }

  const display = `${count.toLocaleString('en-CA')} studs`;

  let wasteAdjusted = null;
  if (waste > 0) {
    wasteAdjusted = `With ${waste}% waste: ${Math.ceil(count * (1 + waste / 100)).toLocaleString('en-CA')} studs`;
  }

  return { display, formula, wasteAdjusted };
}

export default {
  id: 'lumber',
  label: 'Lumber',
  defaultWasteFactor: 10,
  inputs: [
    {
      id: 'calc-type', label: 'Calculation type', type: 'select',
      hint: 'Board feet measures lumber volume for ordering material. Stud count estimates the number of vertical framing members for a wall.',
      options: [
        { value: 'board-feet', label: 'Board feet' },
        { value: 'studs',      label: 'Stud count' },
      ],
    },
    { id: 'length',    label: 'Length / Wall length',  hint: 'For board feet: the length of one piece. For stud count: the total wall length to be framed.', unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'thickness', label: 'Thickness — nominal',   hint: 'Nominal (stated) thickness — enter 2 for a 2×4, not the actual 1½". Nominal dimensions are used in the board-foot formula.', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    { id: 'width',     label: 'Width — nominal',       hint: 'Nominal (stated) width — enter 4 for a 2×4, not the actual 3½". Nominal dimensions are used in the board-foot formula.', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    {
      id: 'spacing', label: 'Stud spacing', type: 'select',
      hint: 'On-centre spacing between studs. 400 mm (16") is most common for exterior and load-bearing walls; 600 mm (24") suits non-load-bearing partitions.',
      options: [
        { value: '300', label: '300 mm  (12" o/c)' },
        { value: '400', label: '400 mm  (16" o/c)' },
        { value: '600', label: '600 mm  (24" o/c)' },
      ],
    },
  ],

  calculate(inputs, unitSystem) {
    const calcType = inputs['calc-type'] || 'board-feet';
    const waste    = inputs.waste        || 0;
    return calcType === 'board-feet'
      ? calcBoardFeet(inputs, unitSystem, waste)
      : calcStuds(inputs, unitSystem, waste);
  },
};
