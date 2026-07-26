export default {
  id: 'paint',
  label: 'Paint',
  defaultWasteFactor: 10,
  inputs: [
    { id: 'length',      label: 'Room length',    unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'width',       label: 'Room width',     unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'height',      label: 'Wall height',    unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'doors',       label: 'Doors',          unit: {}, min: 0 },
    { id: 'windows',     label: 'Windows',        unit: {}, min: 0 },
    { id: 'spread-rate', label: 'Spread rate',    unit: { metric: 'm²/L', imperial: 'ft²/gal' }, min: 1 },
    { id: 'coats',       label: 'Number of coats', unit: {}, min: 1 },
  ],

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
