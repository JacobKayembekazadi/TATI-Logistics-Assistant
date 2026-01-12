
import React from 'react';
import { Truck, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#03202F] text-white border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#A71930] p-2 rounded-lg shadow-sm">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none text-white">TATI</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Logistics Planning Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <Globe className="w-4 h-4" />
            <span>US & Mexico Operations</span>
          </div>
          <div className="bg-[#A71930]/20 px-3 py-1 rounded-full text-xs font-bold text-[#A71930] border border-[#A71930]/30 uppercase tracking-tighter">
            Houston Hub
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
