export default {
  id: 'excavation',
  label: 'Excavation',
  defaultWasteFactor: 0,
  inputs: [
    { id: 'length', label: 'Length', unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'width',  label: 'Width',  unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    { id: 'depth',  label: 'Depth',  unit: { metric: 'm', imperial: 'ft' }, min: 0 },
    {
      id: 'soil-type', label: 'Soil type (swell factor)', type: 'select',
      options: [
        { value: '1.10', label: 'Sand  (10% swell)' },
        { value: '1.15', label: 'Topsoil  (15% swell)' },
        { value: '1.25', label: 'Clay  (25% swell)' },
        { value: '1.50', label: 'Rock  (50% swell)' },
      ],
    },
    { id: 'truck-capacity', label: 'Truck capacity', unit: { metric: 'm³', imperial: 'yd³' }, min: 0 },
  ],

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
