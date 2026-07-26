export default {
  id: 'concrete',
  label: 'Concrete',
  defaultWasteFactor: 10,
  inputs: [
    {
      id: 'calc-type', label: 'Calculation type', type: 'select',
      options: [
        { value: 'slab',    label: 'Slab' },
        { value: 'footing', label: 'Footing / rectangular pier' },
        { value: 'pier',    label: 'Round pier' },
      ],
    },
    { id: 'length',    label: 'Length',    unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'width',     label: 'Width',     unit: { metric: 'm',  imperial: 'ft' }, min: 0 },
    { id: 'thickness', label: 'Thickness / Depth', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    {
      id: 'bag-size', label: 'Bag size', type: 'select',
      options: [
        { value: '25', label: '25 kg  (yield 0.010 m³)' },
        { value: '30', label: '30 kg  (yield 0.012 m³)' },
      ],
    },
  ],

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
