import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, ArrowDownLeft, ArrowUpRight, Lock, RefreshCw } from "lucide-react";
import { formatCurrency, formatDate, relativeTime, getStatusColor } from "@/lib/format";

export const Route = createFileRoute("/wallet")({
  component: WalletPage,
});

function WalletPage() {
  // TODO: replace with authenticated user id
  const userId = "00000000-0000-0000-0000-000000000000";

  const wallet = useQuery({
    queryKey: ["wallet", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("wallets").select("*").eq("user_id", userId).single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const transactions = useQuery({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data || [];
    },
  });

  if (wallet.isLoading || transactions.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <Skeleton className="mt-6 h-40" />
        <Skeleton className="mt-6 h-64" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">Manage your balance and view transactions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{formatCurrency(Number(wallet.data?.balance || 0))}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button><ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit</Button>
              <Button variant="outline"><ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="h-4 w-4" /> Locked in Play
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(Number(wallet.data?.locked || 0))}</p>
            <p className="text-xs text-muted-foreground">Stake locked in active challenges or tournaments.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.data?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.data?.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      ["deposit", "winnings", "refund"].includes(tx.type) ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                    }`}>
                      {["deposit", "winnings", "refund"].includes(tx.type) ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{tx.type.replace("_", " ")}</p>
                      <p className="text-xs text-muted-foreground">{tx.reference || relativeTime(tx.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${["deposit", "winnings", "refund"].includes(tx.type) ? "text-emerald-600" : "text-red-600"}`}>
                      {["deposit", "winnings", "refund"].includes(tx.type) ? "+" : "-"}{formatCurrency(Math.abs(Number(tx.amount)))}
                    </p>
                    <Badge className={getStatusColor(tx.status)} variant="outline">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
