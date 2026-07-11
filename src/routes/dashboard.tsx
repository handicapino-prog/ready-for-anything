import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Trophy, Swords, Wallet, TrendingUp, Gamepad2, ArrowRight } from "lucide-react";
import { formatCurrency, formatNumber, relativeTime, getStatusColor } from "@/lib/format";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const games = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const { data, error } = await supabase.from("games").select("*").eq("is_active", true).order("name");
      if (error) throw error;
      return data || [];
    },
  });

  const tournaments = useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tournaments").select("*, games(name, short_name)").order("starts_at", { ascending: true }).limit(5);
      if (error) throw error;
      return data || [];
    },
  });

  const challenges = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await supabase.from("challenges").select("*, games(name, short_name), profiles!challenges_creator_id_fkey(username, display_name)").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data || [];
    },
  });

  const leaderboard = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leaderboard_stats").select("*, profiles(username, display_name, avatar_url)").order("total_earnings", { ascending: false }).limit(5);
      if (error) throw error;
      return data || [];
    },
  });

  const isLoading = games.isLoading || tournaments.isLoading || challenges.isLoading || leaderboard.isLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="mt-6 h-64" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to the arena.</p>
        </div>
        <Button asChild>
          <Link to="/tournaments">Find Tournament</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Trophy} label="Active Tournaments" value={tournaments.data?.length || 0} />
        <StatCard icon={Swords} label="Open Challenges" value={challenges.data?.filter((c) => c.status === "open").length || 0} />
        <StatCard icon={Gamepad2} label="Games" value={games.data?.length || 0} />
        <StatCard icon={Wallet} label="Wallet Balance" value={formatCurrency(0)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Tournaments</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/tournaments">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {tournaments.data?.length === 0 && <p className="text-sm text-muted-foreground">No upcoming tournaments.</p>}
            {tournaments.data?.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{(t.games as any)?.name || t.game_id}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(t.status)}>{t.status}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{relativeTime(t.starts_at)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Latest Challenges</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/games">View games <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {challenges.data?.length === 0 && <p className="text-sm text-muted-foreground">No open challenges.</p>}
            {challenges.data?.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">{(c.games as any)?.name || c.game_id}</p>
                  <p className="text-xs text-muted-foreground">Stake: {formatCurrency(Number(c.stake))}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(c.status)}>{c.status}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{relativeTime(c.created_at)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Top Earners
          </CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/leaderboard">Full leaderboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.data?.map((entry, index) => (
              <div key={entry.user_id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                  <p className="font-medium">{(entry.profiles as any)?.display_name || (entry.profiles as any)?.username || "Unknown"}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(Number(entry.total_earnings))}</p>
                  <p className="text-xs text-muted-foreground">{formatNumber(entry.wins)}W / {formatNumber(entry.losses)}L</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
