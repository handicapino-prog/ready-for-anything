import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gamepad2, Swords, Trophy, Users } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/games")({
  component: Games,
});

function Games() {
  const games = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const { data, error } = await supabase.from("games").select("*").eq("is_active", true).order("name");
      if (error) throw error;
      return data || [];
    },
  });

  if (games.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Games</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Games</h1>
        <p className="text-muted-foreground">Pick a game to challenge or enter a tournament.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.data?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: any }) {
  return (
    <Card className="overflow-hidden border-border/50 transition-shadow hover:shadow-lg">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: game.cover_url ? `url(${game.cover_url})` : "linear-gradient(135deg, #334155, #1e293b)",
          backgroundColor: game.accent_color || "#334155",
        }}
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{game.name}</CardTitle>
          <Badge variant="outline">{game.short_name || game.slug}</Badge>
        </div>
        <CardDescription className="line-clamp-2">Compete in {game.name} matches and tournaments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-md bg-muted p-2">
            <Swords className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1 text-xs text-muted-foreground">Challenges</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <Trophy className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1 text-xs text-muted-foreground">Tournaments</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <Users className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1 text-xs text-muted-foreground">Players</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" variant="outline">
          <Gamepad2 className="mr-2 h-4 w-4" /> Challenge
        </Button>
        <Button className="flex-1">Tournaments</Button>
      </CardFooter>
    </Card>
  );
}
