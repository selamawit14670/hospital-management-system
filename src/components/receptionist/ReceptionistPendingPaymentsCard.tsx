import React, { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Receipt, ArrowUpRight, DollarSign } from 'lucide-react';
import type { PendingPayment } from '../../types/receptionist';

interface ReceptionistPendingPaymentsCardProps {
  payments: PendingPayment[];
  onCollectPayment: (payment: PendingPayment) => void;
  onPrintReceipt?: (payment: PendingPayment) => void;
}

export const ReceptionistPendingPaymentsCard: React.FC<ReceptionistPendingPaymentsCardProps> = ({
  payments,
  onCollectPayment,
  onPrintReceipt,
}) => {
  const [filter, setFilter] = useState<'All' | 'Unpaid' | 'Pending' | 'Paid'>('All');

  const filtered = payments.filter((p) => {
    if (filter === 'All') return true;
    return p.paymentStatus === filter;
  });

  const getStatusBadge = (status: PendingPayment['paymentStatus']) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </span>
        );
      case 'Partial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Partial
          </span>
        );
      case 'Unpaid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            Unpaid
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Pending Payments
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                {payments.filter((p) => p.paymentStatus !== 'Paid').length} Unsettled
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Front desk cashier co-pays, admission deposits, and diagnostic billing
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl text-xs overflow-x-auto self-start sm:self-auto">
          {(['All', 'Pending', 'Unpaid', 'Paid'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-white text-rose-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Patient</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Payment Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No payment records found matching this filter.
                </td>
              </tr>
            ) : (
              filtered.map((pay) => (
                <tr
                  key={pay.id}
                  className="hover:bg-rose-50/15 transition-colors group"
                >
                  {/* Patient */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={pay.patientAvatar}
                        alt={pay.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {pay.patientName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {pay.patientId} • <span className="font-mono">{pay.invoiceNumber}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="py-3.5 px-4">
                    <div className="max-w-[220px]">
                      <p className="font-medium text-slate-800 text-xs truncate">
                        {pay.service}
                      </p>
                      <p className="text-[11px] text-slate-400">{pay.department}</p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-baseline gap-1 font-bold text-slate-900 text-sm">
                      <span className="text-xs font-semibold text-slate-500">
                        {pay.currency}
                      </span>
                      <span>{pay.amount.toLocaleString()}</span>
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="py-3.5 px-4">{getStatusBadge(pay.paymentStatus)}</td>

                  {/* Action */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      {pay.paymentStatus !== 'Paid' ? (
                        <button
                          type="button"
                          onClick={() => onCollectPayment(pay)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Collect</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onPrintReceipt?.(pay)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Receipt className="w-3 h-3 text-slate-500" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
