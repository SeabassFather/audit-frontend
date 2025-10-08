import agriculture from "./agriculture.json";
import compliance from "./compliance.json";
// add eco, finance, legal, consumer
const services = [
  ...agriculture,
  ...compliance
  // ...eco, finance, legal, consumer
];
export default services;



