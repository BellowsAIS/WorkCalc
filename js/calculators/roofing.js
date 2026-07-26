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

  calculate(inputs, unitSystem, wasteFactor) {
    return null; // implementation coming
  },
};
