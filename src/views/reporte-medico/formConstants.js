export const siNoOptions = [
  {id: true, descripcion: 'Sí', },
  {id: false, descripcion: 'No', },
];

export const fieldTypes = {
  Radio: 'Radio',
  String: 'String',
  CheckList: 'Checklist',
  Int: 'Int',
  Date: 'Date',
  Bool: 'Bool',
  Select: 'Select',
  Password: 'Password',
};

export const renderSiNo = (label, name) => ({
  fieldName: name,
  fieldType: fieldTypes.Radio,
  optionsSource: siNoOptions,
  label: label,
  horizontal: true,
  isRequired: true,
});
