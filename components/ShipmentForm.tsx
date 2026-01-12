
import React, { useState } from 'react';
import { ShipmentDetails } from '../types';
import { DESTINATIONS } from '../constants';
import { Package, MapPin, Calendar, Boxes, Send, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (details: ShipmentDetails) => void;
  isLoading: boolean;
}

const ShipmentForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ShipmentDetails>({
    product: '',
    quantity: '',
    destination: '',
    deliveryWindow: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#03202F] flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-400" />
            Product Name
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Corrosion Inhibitor 500L"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#A71930] focus:border-transparent transition-all outline-none"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#03202F] flex items-center gap-2">
            <Boxes className="w-4 h-4 text-slate-400" />
            Quantity / Weight
          </label>
          <input
            required
            type="text"
            placeholder="e.g. 48 drums / 22,000 lbs"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#A71930] focus:border-transparent transition-all outline-none"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#03202F] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            Destination
          </label>
          <select
            required
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#A71930] focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          >
            <option value="">Select Destination</option>
            {DESTINATIONS.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#03202F] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            Requested Delivery Window
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Next Tuesday or Oct 15-18"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#A71930] focus:border-transparent transition-all outline-none"
            value={formData.deliveryWindow}
            onChange={(e) => setFormData({ ...formData, deliveryWindow: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full py-4 bg-[#03202F] hover:bg-[#0c2c3e] active:bg-[#03202F] text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Calculating Logistics...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Plan Deployment
          </>
        )}
      </button>
    </form>
  );
};

export default ShipmentForm;
