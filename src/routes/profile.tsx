import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User, MapPin, Edit, Gamepad2 } from "lucide-react";
import { formatCurrency, formatNumber, getInitials } from "@/lib/format";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  // TODO: replace with authenticated user id
  const userId = "00000000-0000-0000-0000-000000000000";

  const profile = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const stats = useQuery({
    queryKey: ["profile-stats", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("leaderboard_stats").select("*").eq("user_id", userId).single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const gameAccounts = useQuery({
    queryKey: ["game-accounts", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("game_accounts").select("*, games(name)").eq("user_id", userId);
      if (error) throw error;
      return data || [];
    },
  });

  if (profile.isLoading || stats.isLoading || gameAccounts.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <Skeleton className="mt-6 h-48" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Your arena identity and stats.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{getInitials(profile.data?.display_name || profile.data?.username || "?")}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{profile.data?.display_name || profile.data?.username || "Player"}</h2>
                <p className="text-muted-foreground">@{profile.data?.username || "unknown"}</p>
                {profile.data?.country && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground sm:justify-start">
                    <MapPin className="h-3 w-3" /> {profile.data.country}
                  </p>
                )}
                {profile.data?.bio && <p className="mt-3 text-sm">{profile.data.bio}</p>}
                <Button className="mt-4" variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Earnings</span>
              <span className="font-bold">{formatCurrency(Number(stats.data?.total_earnings || 0))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wins</span>
              <span className="font-medium">{formatNumber(stats.data?.wins || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Losses</span>
              <span className="font-medium">{formatNumber(stats.data?.losses || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tournaments Won</span>
              <span className="font-medium">{formatNumber(stats.data?.tournaments_won || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Matches Played</span>
              <span className="font-medium">{formatNumber(stats.data?.matches_played || 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" /> Game Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gameAccounts.data?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No game accounts linked yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gameAccounts.data?.map((account) => (
                <div key={account.id} className="rounded-lg border border-border p-4">
                  <p className="font-medium">{(account.games as any)?.name || account.game_id}</p>
                  <p className="text-sm text-muted-foreground">In-game ID: {account.in_game_id}</p>
                  {account.in_game_name && <p className="text-sm text-muted-foreground">Name: {account.in_game_name}</p>}
                  {account.rank && <p className="text-sm text-muted-foreground">Rank: {account.rank}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">{account.is_verified ? "Verified" : "Unverified"}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
