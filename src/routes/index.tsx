import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Swords, Zap, Shield, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20">
            <Zap className="mr-1 h-3 w-3" /> Competitive Gaming Arena
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Prove your skill. <span className="text-amber-400">Win real prizes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Join 1v1 challenges, enter tournaments, and climb the leaderboard in the ultimate
            Strikers Arena.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300">
              <Link to="/tournaments">Enter Arena</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/games">Explore Games</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Swords}
            title="1v1 Challenges"
            description="Challenge other players head-to-head. Set the stake, play the match, and claim your win."
          />
          <FeatureCard
            icon={Trophy}
            title="Tournaments"
            description="Enter bracket tournaments with real prize pools. Compete across multiple rounds."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Leaderboard"
            description="Track your wins, earnings, and rank against the best players in the arena."
          />
          <FeatureCard
            icon={Shield}
            title="Secure Wallet"
            description="Manage deposits, stakes, and winnings with transparent transaction history."
          />
          <FeatureCard
            icon={Users}
            title="Verified Profiles"
            description="Link your game accounts, build your reputation, and show off your stats."
          />
          <FeatureCard
            icon={Zap}
            title="Live Matches"
            description="Room IDs and passwords are handled securely. Results submitted with evidence."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to compete?</h2>
          <p className="mt-3 text-muted-foreground">
            Create your profile, add a game account, and join your first challenge or tournament.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/50 bg-card transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
