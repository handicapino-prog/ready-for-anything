import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, TrendingUp } from "lucide-react";
import { formatCurrency, formatNumber, getInitials } from "@/lib/format";

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
});

function Leaderboard() {
  const leaderboard = useQuery({
    queryKey: ["leaderboard-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaderboard_stats")
        .select("*, profiles(username, display_name, avatar_url, country)")
        .order("total_earnings", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
  });

  if (leaderboard.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <Skeleton className="mt-6 h-96" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top competitors by earnings and wins.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" /> Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.data?.map((entry, index) => {
              const profile = entry.profiles as any;
              const rank = index + 1;
              return (
                <div
                  key={entry.user_id}
                  className={`flex items-center justify-between rounded-lg border border-border p-4 ${rank <= 3 ? "bg-amber-500/5" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {rank === 1 ? <Medal className="h-4 w-4 text-amber-500" /> : rank === 2 ? <Medal className="h-4 w-4 text-slate-400" /> : rank === 3 ? <Medal className="h-4 w-4 text-amber-700" /> : rank}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(profile?.display_name || profile?.username || "?")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{profile?.display_name || profile?.username || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(entry.matches_played)} matches · {formatNumber(entry.wins)} wins
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatCurrency(Number(entry.total_earnings))}</p>
                    <p className="text-xs text-muted-foreground">{entry.tournaments_won} tournaments won</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
