import { useSearchParams, Link } from "react-router-dom";
import { useGetSessionStatusQuery } from "../../lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, ArrowLeft, DollarSign } from "lucide-react";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  const amount = data?.amountTotal ? (data.amountTotal / 100).toFixed(2) : null;
  const isSuccess = data?.paymentStatus === "paid";
  const isFailed = data && data.paymentStatus && data.paymentStatus !== "paid";

  return (
    <div className="min-h-screen relative overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-gray-900">Payment Confirmation</CardTitle>
              {isLoading ? (
                <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Verifying...</Badge>
              ) : isSuccess ? (
                <Badge className="bg-green-50 text-green-700 border border-green-200">Paid</Badge>
              ) : (
                <Badge className="bg-red-50 text-red-700 border border-red-200">Failed</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">Session ID: {sessionId || "Not provided"}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex items-center gap-3 text-gray-700">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Verifying your payment...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {isSuccess ? (
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                    <XCircle className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {isSuccess ? "Payment Successful!" : "Payment Failed"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isSuccess
                      ? "Your payment has been processed."
                      : "We couldn't process your payment. Please try again."}
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-xl bg-white/80 border border-white/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-semibold">Amount</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {amount ? `$${Number(amount).toLocaleString()}` : "—"}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                If the amount looks wrong, please contact support before retrying payment.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" asChild>
                <Link to="/dashboard/invoices">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Invoices
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
