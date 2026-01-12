
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ShipmentForm from './components/ShipmentForm';
import LogisticsPlan from './components/LogisticsPlan';
import CostBreakdownChart from './components/CostBreakdownChart';
import { generateLogisticsPlan } from './services/openaiService';
import { ShipmentDetails, LogisticsResult } from './types';
import { Info, AlertCircle, Clock, Truck } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LogisticsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleShipmentSubmit = useCallback(async (details: ShipmentDetails) => {
    setLoading(true);
    setError(null);
    try {
      const planText = await generateLogisticsPlan(details);
      if (planText) {
        setResult({
          rawText: planText,
          timestamp: new Date().toLocaleString()
        });
      }
    } catch (err: any) {
      setError(err.message || 'Operational failure. Check system logs and API connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between border-b-2 border-[#03202F]/10 pb-6">
          <div>
            <h2 className="text-4xl font-black text-[#03202F] tracking-tighter uppercase italic">Mission Control</h2>
            <p className="text-slate-500 mt-1 font-medium">Texas American Trade Inc. Operational Logistics Center</p>
          </div>
          {result && (
            <div className="mt-4 md:mt-0">
               <span className="text-[10px] font-black text-[#A71930] bg-[#A71930]/10 px-3 py-1.5 rounded-full border border-[#A71930]/20 uppercase tracking-widest">
                Manifest Verified: {result.timestamp}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ShipmentForm onSubmit={handleShipmentSubmit} isLoading={loading} />
            
            <div className="bg-[#03202F] border border-white/10 rounded-xl p-5 flex gap-4 text-white shadow-lg">
              <div className="bg-[#A71930] p-2 rounded-lg h-fit shadow-md">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-tight">Standard Operating Procedure</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  All freight originates from the Greater Houston Area. Laredo border processing is the prioritized bottleneck for Mexico-bound chemical assets.
                </p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-l-[#A71930] rounded-xl p-5 flex gap-4 shadow-md">
              <div className="bg-slate-100 p-2 rounded-lg h-fit">
                <Clock className="w-5 h-5 text-[#03202F]" />
              </div>
              <div>
                <h4 className="font-bold text-[#03202F] text-sm uppercase tracking-tight">Security & Compliance</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  PEMEX delivery protocols require gate passes 48 hours prior to arrival. Hazmat endorsements are mandatory for all acid and chemical carriers.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {loading && (
              <div className="bg-white rounded-xl shadow-xl border-t-4 border-t-[#A71930] p-12 flex flex-col items-center justify-center text-center space-y-6 animate-pulse">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#03202F] border-t-[#A71930] rounded-full animate-spin"></div>
                  <Truck className="absolute inset-0 m-auto w-6 h-6 text-[#03202F]" />
                </div>
                <div>
                  <h3 className="font-black text-[#03202F] text-xl uppercase tracking-tighter">Analyzing Route Data</h3>
                  <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">Cross-referencing transit windows, border delays, and current diesel pricing indexes...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-white border-2 border-red-200 border-l-[12px] border-l-[#A71930] rounded-xl p-8 flex gap-5 shadow-xl">
                <AlertCircle className="w-8 h-8 text-[#A71930] shrink-0" />
                <div>
                  <h4 className="font-black text-[#03202F] text-lg uppercase tracking-tighter">System Alert</h4>
                  <p className="text-md font-medium text-slate-700 mt-1">{error}</p>
                  <button onClick={() => window.location.reload()} className="mt-4 text-xs font-bold text-[#A71930] uppercase border-b border-[#A71930]">Retry Connection</button>
                </div>
              </div>
            )}

            {!loading && !result && !error && (
              <div className="bg-[#03202F] rounded-xl shadow-2xl p-16 flex flex-col items-center justify-center text-center space-y-6 border border-white/10 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A71930] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="bg-[#A71930] p-8 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                  <Truck className="w-16 h-16 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-black text-white text-2xl uppercase tracking-tighter italic">Ready for Planning</h3>
                  <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mt-2">Input the payload details to generate a comprehensive TATI logistics directive.</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <CostBreakdownChart rawText={result.rawText} />
                <LogisticsPlan rawText={result.rawText} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#03202F] text-white border-t border-white/10 py-16 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-[#A71930] p-2 rounded shadow-lg">
              <Truck className="w-6 h-6" />
            </div>
            <span className="font-black tracking-tighter text-2xl uppercase italic">Texas American Trade Inc.</span>
          </div>
          <p className="text-slate-400 text-sm max-w-lg mx-auto font-medium leading-relaxed">
            Premier logistics integration for the global energy sector. From the Port of Houston to the furthest rigs in the Permian and Mexican Gulf.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-black uppercase tracking-widest text-slate-500 border-t border-white/5 pt-12">
            <div className="flex flex-col gap-1">
              <span className="text-[#A71930]">HQ Location</span>
              <span className="text-white">5075 Westheimer, Houston, TX</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A71930]">Direct Line</span>
              <span className="text-white">+1 (832) 238 1103</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A71930]">Official Hub</span>
              <a href="https://www.texasamericantrade.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#A71930] transition-colors underline decoration-[#A71930]">texasamericantrade.com</a>
            </div>
          </div>
          <div className="mt-16 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} TATI Operational Intelligence Division
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
