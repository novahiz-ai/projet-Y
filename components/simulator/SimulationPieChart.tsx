import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SimulationPieChartProps {
  amount: number;
  totalInterest: number;
  primaryColor: string;
  rate: number;
}

const SimulationPieChart: React.FC<SimulationPieChartProps> = ({ 
  amount, totalInterest, primaryColor, rate 
}) => {
  const chartData = [
    { name: 'Capital', value: amount, color: primaryColor },
    { name: 'Intérêts', value: Math.max(1, totalInterest), color: '#f97316' }
  ];

  return (
    <div className="w-full flex-1 min-h-0 relative flex items-center justify-center">
      <div className="w-full h-full max-h-[300px] lg:max-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={chartData} cx="50%" cy="50%" 
              innerRadius="84%" outerRadius="100%" paddingAngle={3} 
              dataKey="value" stroke="none" animationDuration={1000}
            >
              {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">TAEG Fixe</p>
        <p className="text-3xl lg:text-4xl font-black text-brand-primary italic leading-none transition-colors duration-500">{rate}%</p>
      </div>
    </div>
  );
};

export default SimulationPieChart;