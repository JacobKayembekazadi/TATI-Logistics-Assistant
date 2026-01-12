
import React from 'react';
import { 
  ClipboardCheck, 
  Map as MapIcon, 
  CalendarCheck, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  Lightbulb, 
  Printer,
  ChevronRight
} from 'lucide-react';

interface Props {
  rawText: string;
}

const LogisticsPlan: React.FC<Props> = ({ rawText }) => {
  const sections = rawText.split('---').filter(s => s.trim().length > 0);

  const getIcon = (title: string) => {
    const iconClass = "w-5 h-5";
    if (title.includes('SUMMARY')) return <ClipboardCheck className={`${iconClass} text-[#A71930]`} />;
    if (title.includes('ROUTE')) return <MapIcon className={`${iconClass} text-[#03202F]`} />;
    if (title.includes('SHIP-BY')) return <CalendarCheck className={`${iconClass} text-[#03202F]`} />;
    if (title.includes('COST')) return <DollarSign className={`${iconClass} text-[#A71930]`} />;
    if (title.includes('RISK')) return <AlertTriangle className={`${iconClass} text-[#A71930]`} />;
    if (title.includes('DOCUMENTATION')) return <FileText className={`${iconClass} text-[#03202F]`} />;
    if (title.includes('CHECKLIST')) return <ClipboardCheck className={`${iconClass} text-[#03202F]`} />;
    if (title.includes('RECOMMENDATIONS')) return <Lightbulb className={`${iconClass} text-[#A71930]`} />;
    return <ChevronRight className={`${iconClass}`} />;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#03202F] uppercase tracking-tight">Deployment Strategy</h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#03202F] hover:text-[#A71930] border-2 border-[#03202F] rounded-lg hover:border-[#A71930] transition-all bg-white shadow-sm"
        >
          <Printer className="w-4 h-4" />
          Print Manifest
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-12 print:block">
        {sections.map((section, idx) => {
          const lines = section.trim().split('\n');
          const title = lines[0];
          const content = lines.slice(1);

          return (
            <div key={idx} className="bg-white border-l-4 border-l-[#A71930] border-y border-r border-slate-200 rounded-r-xl overflow-hidden shadow-sm print:shadow-none print:mb-6">
              <div className="px-6 py-3 bg-[#03202F] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded">
                    {getIcon(title)}
                  </div>
                  <h3 className="font-bold text-white tracking-widest uppercase text-xs">
                    {title.replace(/📦|🛣️|📅|💰|⚠️|📋|✅|💡/g, '').trim()}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {content.map((line, lIdx) => (
                    <p key={lIdx} className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap font-medium">
                      {line.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogisticsPlan;
