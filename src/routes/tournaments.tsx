import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Calendar, Users, Wallet } from "lucide-react";
import { formatCurrency, formatDate, formatNumber, getStatusColor } from "@/lib/format";

export const Route = createFileRoute("/tournaments")({
  component: Tournaments,
});

function Tournaments() {
  const tournaments = useQuery({
    queryKey: ["tournaments-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*, games(name, short_name, cover_url), tournament_participants(count)")
        .order("starts_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  if (tournaments.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground">Enter tournaments and compete for the prize pool.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {tournaments.data?.map((t) => (
          <Card key={t.id} className="overflow-hidden border-border/50 transition-shadow hover:shadow-lg">
            <div
              className="h-24 bg-cover bg-center"
              style={{
                backgroundImage: (t.games as any)?.cover_url ? `url(${(t.games as any).cover_url})` : "linear-gradient(135deg, #334155, #1e293b)",
              }}
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{t.title}</CardTitle>
                  <CardDescription>{(t.games as any)?.name || t.game_id}</CardDescription>
                </div>
                <Badge className={getStatusColor(t.status)}>{t.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{t.description || "No description provided."}</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-md bg-muted p-2 text-center">
                  <Wallet className="mx-auto h-4 w-4 text-primary" />
                  <p className="mt-1 font-medium">{formatCurrency(Number(t.prize_pool))}</p>
                  <p className="text-xs text-muted-foreground">Prize</p>
                </div>
                <div className="rounded-md bg-muted p-2 text-center">
                  <Users className="mx-auto h-4 w-4 text-primary" />
                  <p className="mt-1 font-medium">{formatNumber((t.tournament_participants as any)?.[0]?.count || 0)}/{t.max_slots}</p>
                  <p className="text-xs text-muted-foreground">Slots</p>
                </div>
                <div className="rounded-md bg-muted p-2 text-center">
                  <Calendar className="mx-auto h-4 w-4 text-primary" />
                  <p className="mt-1 font-medium">{formatDate(t.starts_at)}</p>
                  <p className="text-xs text-muted-foreground">Starts</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Entry: {formatCurrency(Number(t.entry_fee))}</p>
                <Button size="sm">Register</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
