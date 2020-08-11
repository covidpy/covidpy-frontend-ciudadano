export function flattenFields(fields) {
  let filas = fields.map(f => Array.isArray(f) ? f : [f]);
  return  [].concat.apply([], filas);
}
