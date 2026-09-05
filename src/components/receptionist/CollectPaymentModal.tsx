import React, { useState } from 'react';
import { X, Receipt, CheckCircle, CreditCard, DollarSign, Smartphone, Printer } from 'lucide-react';
import type { PendingPayment } from '../../types/receptionist';

interface CollectPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PendingPayment | null;
  onConfirmCollect: (paymentId: string) => void;
}

export const CollectPaymentModal: React.FC<CollectPaymentModalProps> = ({
  isOpen,
  onClose,
  payment,
  onConfirmCollect,
}) => {
  const [method, setMethod] = useState<'Cash' | 'Telebirr' | 'Card'>('Cash');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !payment) return null;

  const handleProcess = () => {
    onConfirmCollect(payment.id);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Process Front Desk Payment
              </h3>
              <p className="text-xs text-slate-500">
                Invoice: <span className="font-mono font-semibold">{payment.invoiceNumber}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Payment Confirmed!
            </h4>
            <p className="text-xs text-slate-500">
              Receipt generated for {payment.patientName}. Hospital accounting ledger updated.
            </p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Payment Summary Box */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Patient:</span>
                <span className="text-xs font-bold text-slate-900">
                  {payment.patientName} ({payment.patientId})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Service:</span>
                <span className="text-xs font-semibold text-slate-800 text-right max-w-[200px] truncate">
                  {payment.service}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Department:</span>
                <span className="text-xs font-medium text-slate-700">
                  {payment.department}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  Total Payable:
                </span>
                <span className="text-xl font-extrabold text-emerald-600">
                  {payment.currency} {payment.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Cash', label: 'Cash', icon: DollarSign },
                  { id: 'Telebirr', label: 'Mobile / Telebirr', icon: Smartphone },
                  { id: 'Card', label: 'Debit Card', icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = method === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/60 text-emerald-800 font-semibold shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Receipt Notice */}
            <p className="text-[11px] text-slate-400 text-center">
              Upon confirmation, an official hospital transaction slip will be marked as Paid.
            </p>

            {/* Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcess}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Confirm & Print Receipt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
