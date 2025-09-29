import agriculture from "./agriculture.json";
import compliance from "./compliance.json";
import eco from "./eco.json";
import finance from "./finance.json";
import legal from "./legal.json";
import consumer from "./consumer.json";

const services = [
  ...agriculture,
  ...compliance,
  ...eco,
  ...finance,
  ...legal,
  ...consumer
];

export default services;
