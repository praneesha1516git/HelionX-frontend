import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Zap, DollarSign, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetInvoiceByInvoiceIdQuery } from "@/lib/redux/query";





const PRICE_PER_KWH = Number(import.meta.env.VITE_PRICE_PER_KWH || 0.05);

export default function PaymentPage() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, isLoading, isError, error } = useGetInvoiceByInvoiceIdQuery({ invoiceId });


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl px-6 py-4 rounded-2xl">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-gray-700 font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (isError || !invoice) {
    console.error("getInvoiceById error:", error);
    const status = error?.status || error?.originalStatus || "unknown";
    const data = error?.data || error?.error || null;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
        <div className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
          <div className="text-red-600 text-lg font-semibold mb-4">
            Error loading invoice (status: {String(status)})
          </div>
          <pre className="bg-white/50 p-4 rounded-lg text-sm text-gray-700 overflow-auto border border-white/20">
            {JSON.stringify(data, null, 2)}
          </pre>
         
        </div>
      </div>
    );
  }

  if (invoice.paymentStatus === "PAID") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Receipt className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invoice Already Paid</h2>
          <p className="text-gray-600 mb-6">This invoice has already been paid.</p>
         
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden ">
      
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoice Details</h1>
                <p className="text-gray-600 mt-1">View User's Invoice Details</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Status:{" "}
            <span className={invoice.paymentStatus === "PAID" ? "text-green-600 font-semibold" : "text-orange-600 font-semibold"}>
              {invoice.paymentStatus}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-[5%]">
          <div className="w-full max-w-lg">
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/60 overflow-hidden">
              <div className="bg-white text-blue-700 px-5 py-3 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                <span className="font-semibold">Invoice Summary</span>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-semibold">Billing Period</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {format(new Date(invoice.billingPeriodStart), "MMM d, yyyy")} - {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-semibold">Energy Generated</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {invoice.totalEnergyGenerated?.toFixed(2)} kWh
                  </p>
                </div>

                <Separator />

                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-sm font-semibold">Estimated Amount</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">
                    ${Number((invoice.totalEnergyGenerated * PRICE_PER_KWH).toFixed(2)).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Final charge is calculated by Stripe during checkout.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Invoice ID</span>
                      <span className="font-mono text-gray-900 text-xs break-all">{invoice._id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         

      </main>
    </div>
  );
}
