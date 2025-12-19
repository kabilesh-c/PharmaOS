"use client";

import { Pill, TrendingUp, Clock, Sparkles } from "lucide-react";

interface MedicineCardProps {
  medicine: {
    id: string;
    name: string;
    dosage: string;
    price: number;
    rack: string;
    stock: number;
    demandHint?: "high" | "trending" | "seasonal" | null;
    demandReason?: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const demandBadges = {
  high: { label: "High Demand", icon: TrendingUp, bg: "bg-status-success/10", text: "text-status-success" },
  trending: { label: "Trending", icon: TrendingUp, bg: "bg-blue-500/10", text: "text-blue-500" },
  seasonal: { label: "Seasonal", icon: Clock, bg: "bg-status-warning/10", text: "text-status-warning" },
};

export default function MedicineCard({ medicine, isSelected, onSelect }: MedicineCardProps) {
  const demandBadge = medicine.demandHint ? demandBadges[medicine.demandHint] : null;
  const DemandIcon = demandBadge?.icon;

  return (
    <div
      onClick={onSelect}
      className={`
        w-36 flex-shrink-0 bg-white rounded-card shadow-card p-4 cursor-pointer transition-all relative
        ${isSelected ? "ring-4 ring-primary-yellow" : "hover:shadow-card-hover"}
      `}
    >
      {/* Demand Hint Badge */}
      {demandBadge && DemandIcon && (
        <div className="absolute -top-2 -right-2 group">
          <span className={`flex items-center gap-1 px-2 py-0.5 ${demandBadge.bg} ${demandBadge.text} rounded-full text-[10px] font-bold shadow-sm cursor-help`}>
            <DemandIcon size={10} />
            {demandBadge.label}
          </span>
          {medicine.demandReason && (
            <span className="absolute right-0 top-full mt-1 px-2 py-1.5 text-xs bg-neutral-800 text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
              <Sparkles size={10} className="inline mr-1 text-primary-yellow" />
              {medicine.demandReason}
            </span>
          )}
        </div>
      )}

      <div className="w-full h-20 bg-neutral-100 rounded-button flex items-center justify-center mb-3">
        <Pill size={32} className="text-neutral-400" />
      </div>
      
      <h4 className="text-sm font-semibold text-neutral-900 mb-1 line-clamp-2">{medicine.name}</h4>
      <p className="text-xs text-neutral-600 mb-2">{medicine.dosage}</p>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold text-neutral-900">₹{medicine.price}</span>
        <span className="text-xs text-neutral-500">Rack {medicine.rack}</span>
      </div>

      <span className={`px-2 py-1 rounded-pill text-xs font-medium ${
        medicine.stock > 10 
          ? "bg-status-success/20 text-status-success" 
          : "bg-status-warning/20 text-status-warning"
      }`}>
        {medicine.stock} in stock
      </span>

      {isSelected && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-medium rounded-button transition-colors">
            Change
          </button>
          <button className="flex-1 py-1.5 bg-primary-yellow/20 hover:bg-primary-yellow/30 text-xs font-medium rounded-button transition-colors text-primary-yellow-dark">
            AI Alt
          </button>
        </div>
      )}
    </div>
  );
}
