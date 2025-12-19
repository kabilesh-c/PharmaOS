"use client";

import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  dosage: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function BillingPanel() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: "1", name: "Paracetamol 500mg", dosage: "500mg", quantity: 2, unitPrice: 25, total: 50 },
    { id: "2", name: "Amoxicillin 250mg", dosage: "250mg", quantity: 1, unitPrice: 120, total: 120 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [received, setReceived] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "CODE">("CASH");

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const receivable = subtotal - discount;
  const due = Math.max(0, receivable - received);

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta), total: item.unitPrice * Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="bg-dark-card rounded-card shadow-card p-6 text-white h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Bill</h3>
        <div className="w-8 h-8 bg-primary-yellow rounded-full flex items-center justify-center text-neutral-900 font-bold text-sm">
          {cart.length}
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-4 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="bg-dark-card-light rounded-button p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-neutral-400">{item.dosage}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-status-danger hover:text-status-danger-light">
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-dark-card rounded-button p-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-neutral-700 rounded"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-neutral-700 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm font-bold">₹{item.total}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-neutral-700 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Subtotal</span>
          <span className="font-semibold">₹{subtotal}</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="flex-1 px-3 py-2 bg-dark-card-light border border-neutral-700 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-yellow text-sm"
            placeholder="Discount"
          />
          <button className="px-3 py-2 bg-dark-card-light border border-neutral-700 rounded-button text-sm hover:bg-neutral-700">
            %
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Receivable</span>
          <span className="font-bold text-primary-yellow">₹{receivable}</span>
        </div>

        <input
          type="number"
          value={received}
          onChange={(e) => setReceived(Number(e.target.value))}
          className="w-full px-3 py-2 bg-dark-card-light border border-neutral-700 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-yellow text-sm"
          placeholder="Received"
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Total Due</span>
          <span className="font-bold text-lg">₹{due}</span>
        </div>

        <div className="flex gap-2">
          {(["CASH", "CARD", "CODE"] as const).map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`flex-1 py-2 rounded-button text-sm font-medium transition-colors ${
                paymentMethod === method
                  ? "bg-primary-yellow text-neutral-900"
                  : "bg-dark-card-light text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        <button
          disabled={cart.length === 0}
          className="w-full py-4 bg-primary-yellow hover:bg-primary-yellow-dark text-neutral-900 font-bold rounded-button transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
