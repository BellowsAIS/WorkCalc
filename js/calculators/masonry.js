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
    { id: 'wall-length',  label: 'Wall length',  unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'wall-height',  label: 'Wall height',  unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'joint-width',  label: 'Mortar joint', unit: { metric: 'mm', imperial: 'in' }, min: 0 },
    { id: 'openings',     label: 'Opening deductions', unit: { metric: 'm²', imperial: 'ft²' }, min: 0 },
  ],

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
