import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Receipt, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ReceptionistPendingPaymentsCard } from '../../components/receptionist/ReceptionistPendingPaymentsCard';
import { CollectPaymentModal } from '../../components/receptionist/CollectPaymentModal';
import { receptionistDashboardService, PENDING_PAYMENTS_DATA } from '../../services/receptionistDashboardService';
import type { PendingPayment } from '../../types/receptionist';

interface ReceptionistPaymentPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistPaymentPage: React.FC<ReceptionistPaymentPageProps> = ({
  onNavigate,
}) => {
  const [payments, setPayments] = useState<PendingPayment[]>(PENDING_PAYMENTS_DATA);
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCollect = (pay: PendingPayment) => {
    setSelectedPayment(pay);
    setIsModalOpen(true);
  };

  const handleConfirmCollect = async (paymentId: string) => {
    await receptionistDashboardService.collectPayment(paymentId);
    const updated = await receptionistDashboardService.getPendingPayments();
    setPayments(updated);
  };

  const totalPending = payments
    .filter((p) => p.paymentStatus !== 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = payments
    .filter((p) => p.paymentStatus === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Front Desk Cashier & Payment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Collect co-pays, admission deposits, consultation receipts, and diagnostic fees
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/receptionist/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Cashier Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Unsettled Outstanding</p>
          <p className="text-2xl font-bold text-rose-600 mt-2">
            ETB {totalPending.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {payments.filter((p) => p.paymentStatus !== 'Paid').length} invoices pending
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Settled Today</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            ETB {totalPaid.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Collected via cash, Telebirr & card
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Terminal Station</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">Desk #1 Active</p>
          <p className="text-xs text-slate-400 mt-1">Cash drawer verified & synced</p>
        </div>
      </div>

      {/* Payments Table */}
      <ReceptionistPendingPaymentsCard
        payments={payments}
        onCollectPayment={handleOpenCollect}
        onPrintReceipt={handleOpenCollect}
      />

      <CollectPaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayment(null);
        }}
        payment={selectedPayment}
        onConfirmCollect={handleConfirmCollect}
      />
    </div>
  );
};
