import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sampleData = [
  { week: "W1", price: null },
  { week: "W2", price: null },
  { week: "W3", price: null }
];

export default function USDA() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">USDA Produce Pricing</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#0077c7" />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4">No Data Available</p>
    </div>
  );
}
