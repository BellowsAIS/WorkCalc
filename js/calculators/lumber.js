export default {
  id: 'lumber',
  label: 'Lumber',
  defaultWasteFactor: 10,
  inputs: [
    {
      id: 'calc-type', label: 'Calculation type', type: 'select',
      options: [
        { value: 'board-feet', label: 'Board feet' },
        { value: 'studs',      label: 'Stud count' },
      ],
    },
    { id: 'length',    label: 'Length',          unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'thickness', label: 'Thickness (nominal)', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    { id: 'width',     label: 'Width (nominal)',  unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    {
      id: 'spacing', label: 'Stud spacing', type: 'select',
      options: [
        { value: '300',  label: '300 mm  (12" o/c)' },
        { value: '400',  label: '400 mm  (16" o/c)' },
        { value: '600',  label: '600 mm  (24" o/c)' },
      ],
    },
  ],

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
