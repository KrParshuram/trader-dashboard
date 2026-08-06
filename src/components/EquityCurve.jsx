import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function EquityCurve({ data }) {
  return (
    <div className="equity-curve">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={['dataMin - 500', 'dataMax + 500']}
            tickFormatter={(v) => `$${v.toLocaleString()}`}
          />
          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2e7d32"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EquityCurve;