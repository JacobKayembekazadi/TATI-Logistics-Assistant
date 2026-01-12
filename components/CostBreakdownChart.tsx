
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface Props {
  rawText: string;
}

const CostBreakdownChart: React.FC<Props> = ({ rawText }) => {
  const costSection = rawText.split('---').find(s => s.includes('COST ESTIMATE'));
  if (!costSection) return null;

  const fuelMatch = costSection.match(/Fuel:\s*\$?([\d,]+)/);
  const tollsMatch = costSection.match(/Tolls:\s*\$?([\d,]+)/);
  const freightMatch = costSection.match(/Freight.*:\s*\$?([\d,]+)-?\$?([\d,]+)?/);

  const fuel = parseInt(fuelMatch?.[1].replace(/,/g, '') || '0');
  const tolls = parseInt(tollsMatch?.[1].replace(/,/g, '') || '0');
  const freightLow = parseInt(freightMatch?.[1].replace(/,/g, '') || '0');
  const freightHigh = parseInt(freightMatch?.[2]?.replace(/,/g, '') || '0');
  const freightAvg = freightHigh ? (freightLow + freightHigh) / 2 : freightLow;

  const data = [
    { name: 'Fuel', value: fuel, color: '#A71930' },
    { name: 'Tolls', value: tolls, color: '#5b7f95' },
    { name: 'Freight', value: freightAvg, color: '#03202F' }
  ].filter(d => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="bg-[#03202F] rounded-xl p-6 shadow-2xl border border-[#A71930]/20 text-white mt-8 mb-8">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tighter">Cost Analytics</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Financial Projection (USD)</p>
        </div>
        <div className="bg-[#A71930] px-2 py-1 rounded text-[10px] font-black uppercase">Estimates</div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -10, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
            <XAxis type="number" stroke="#94a3b8" fontSize={10} tickFormatter={(val) => `$${val}`} />
            <YAxis dataKey="name" type="category" stroke="#fff" fontSize={10} width={60} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#03202F', borderColor: '#A71930', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostBreakdownChart;
