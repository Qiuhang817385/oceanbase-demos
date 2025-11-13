import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from 'recharts';

interface ResultChartProps {
  data: Array<{ name: string; value: number }>;
}

export function ResultChart({ data }: ResultChartProps) {
  return (
    <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'center' }}>
      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 12, fill: '#595959' }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <Bar dataKey="value" fill="#1890ff" maxBarSize={100}>
          <LabelList 
            dataKey="value" 
            position="top" 
            formatter={(value: number) => `${value}ms`}
            style={{ fill: '#000', fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </div>
  );
}
