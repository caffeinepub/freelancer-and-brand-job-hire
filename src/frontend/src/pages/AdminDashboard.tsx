import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ExternalLink,
  Info,
  Lock,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { FreelancerApplication, HireSubmission } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatWhatsApp(number: string): string {
  return number.replace(/\D/g, "");
}

function LoadingCards() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-5 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function InfoBox() {
  return (
    <div
      className="mb-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-5 flex gap-4"
      data-ocid="admin.panel"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Info className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h2 className="font-bold text-blue-900 text-base mb-1">
          📋 Where is your form data stored?
        </h2>
        <p className="text-blue-800 text-sm leading-relaxed">
          Every time someone fills your <strong>Hire Us</strong> form or applies
          for a job via <strong>Get Job</strong>, their details are{" "}
          <strong>automatically saved here</strong>. To view them, log in below
          using <strong>Internet Identity</strong> (your secure website login).
          No data is lost — everything is stored safely and shown in the
          dashboard below.
        </p>
      </div>
    </div>
  );
}

function HireSubmissionCard({
  sub,
  index,
}: { sub: HireSubmission; index: number }) {
  return (
    <Card
      className="border-2 border-border hover:border-primary/30 hover:shadow-md transition-all"
      data-ocid={`hire.item.${index + 1}`}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
            Hire Request #{index + 1}
          </span>
          <Badge
            variant="outline"
            className="text-xs shrink-0 border-primary/30 text-primary"
          >
            {formatTimestamp(sub.timestamp)}
          </Badge>
        </div>

        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Name
            </span>
            <span className="font-semibold text-foreground text-sm">
              {sub.name}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Service Needed
            </span>
            <span className="text-sm text-foreground font-medium">
              {sub.serviceNeeded}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Budget
            </span>
            <span className="text-sm text-foreground font-medium">
              {sub.budget}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              WhatsApp
            </span>
            <a
              href={`https://wa.me/${formatWhatsApp(sub.whatsappNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-semibold text-sm underline underline-offset-2"
              data-ocid={`hire.item.${index + 1}`}
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              {sub.whatsappNumber}
            </a>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Date
            </span>
            <span className="text-sm text-muted-foreground">
              {formatTimestamp(sub.timestamp)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FreelancerCard({
  app,
  index,
}: { app: FreelancerApplication; index: number }) {
  return (
    <Card
      className="border-2 border-border hover:border-primary/30 hover:shadow-md transition-all"
      data-ocid={`freelancer.item.${index + 1}`}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Freelancer Application #{index + 1}
          </span>
          <Badge
            variant="outline"
            className="text-xs shrink-0 border-primary/30 text-primary"
          >
            {formatTimestamp(app.timestamp)}
          </Badge>
        </div>

        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Name
            </span>
            <span className="font-semibold text-foreground text-sm">
              {app.name}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Role
            </span>
            <span className="text-sm text-foreground font-medium">
              {app.role}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Experience
            </span>
            <span className="text-sm text-foreground font-medium">
              {app.experience}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Rate
            </span>
            <span className="text-sm text-foreground font-medium">
              {app.hourlyRate}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              WhatsApp
            </span>
            <a
              href={`https://wa.me/${formatWhatsApp(app.whatsappNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-semibold text-sm underline underline-offset-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              {app.whatsappNumber}
            </a>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide w-28 shrink-0 pt-0.5">
              Date
            </span>
            <span className="text-sm text-muted-foreground">
              {formatTimestamp(app.timestamp)}
            </span>
          </div>
        </div>

        {app.bio && (
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Bio
            </span>
            <p className="mt-1 text-sm text-muted-foreground">{app.bio}</p>
          </div>
        )}
        {app.portfolioLink && (
          <a
            href={app.portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-1 text-sm text-primary hover:underline font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Portfolio
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  const [isClaiming, setIsClaiming] = useState(false);
  const [claimMessage, setClaimMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Use isCallerAdminSafe (safe for unregistered users) via cast since
  // backend.ts auto-generated file may lag behind backend.d.ts declarations.
  const actorAny = actor as any;

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actorAny) return false;
      return actorAny.isCallerAdminSafe
        ? actorAny.isCallerAdminSafe()
        : actorAny.isCallerAdmin();
    },
    enabled: !!actor && !isActorFetching,
  });

  const { data: hireSubmissions = [], isLoading: loadingHire } = useQuery({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      const data = await actor.getAllSubmissions();
      return [...data].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: isAdmin === true && !!actor,
  });

  const { data: freelancerApps = [], isLoading: loadingFreelancer } = useQuery({
    queryKey: ["freelancerApplications"],
    queryFn: async () => {
      if (!actor) return [];
      const data = await actor.getFreelancerApplications();
      return [...data].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: isAdmin === true && !!actor,
  });

  async function handleClaimAdmin() {
    if (!actorAny) return;
    setIsClaiming(true);
    setClaimMessage(null);
    try {
      const success: boolean = await actorAny.claimAdminIfNone();
      if (success) {
        setClaimMessage({
          type: "success",
          text: "✅ Admin access claimed successfully! Refreshing...",
        });
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
        }, 1200);
      } else {
        setClaimMessage({
          type: "error",
          text: "An admin account already exists. Contact the site owner.",
        });
      }
    } catch {
      setClaimMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsClaiming(false);
    }
  }

  // Not logged in
  if (!identity) {
    return (
      <section
        className="min-h-[70vh] flex items-center justify-center px-4 py-10"
        data-ocid="admin.section"
      >
        <div className="w-full max-w-lg">
          <InfoBox />
          <Card className="w-full border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Log in to view all form submissions and freelancer applications.
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <Button
                className="w-full bg-primary text-primary-foreground font-semibold"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                data-ocid="admin.primary_button"
              >
                {isLoggingIn ? "Logging in..." : "🔐 Login to View Submissions"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Uses Internet Identity — your secure, password-free login.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Checking admin status
  if (isCheckingAdmin || isActorFetching) {
    return (
      <section
        className="min-h-[70vh] flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Checking access...</p>
        </div>
      </section>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <section
        className="min-h-[70vh] flex items-center justify-center px-4"
        data-ocid="admin.error_state"
      >
        <Card className="w-full max-w-md border-2 border-destructive/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
              <Lock className="w-7 h-7 text-destructive" />
            </div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your account does not have admin privileges.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Claim Admin Section */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-semibold text-amber-900 text-sm">
                  First time setup?
                </span>
              </div>
              <p className="text-amber-800 text-xs mb-3">
                If no admin has been assigned yet, you can claim admin access
                now.
              </p>

              {claimMessage && (
                <div
                  className={`rounded-lg px-3 py-2 text-sm font-medium mb-3 ${
                    claimMessage.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                  data-ocid={
                    claimMessage.type === "success"
                      ? "admin.success_state"
                      : "admin.error_state"
                  }
                >
                  {claimMessage.text}
                </div>
              )}

              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                onClick={handleClaimAdmin}
                disabled={isClaiming || claimMessage?.type === "success"}
                data-ocid="admin.primary_button"
              >
                {isClaiming ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2 inline-block" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Claim Admin Access
                  </>
                )}
              </Button>

              <p className="text-xs text-amber-700 mt-2 text-center">
                ⚠️ This button only works once — the first person to claim
                becomes the permanent admin.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={clear}
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="admin.section"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View all customer and freelancer submissions below.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clear}
          data-ocid="admin.secondary_button"
        >
          <LogOut className="w-4 h-4 mr-1.5" />
          Log out
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Total Hire Requests
              </p>
              <p className="text-3xl font-bold text-primary">
                {hireSubmissions.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Freelancer Applications
              </p>
              <p className="text-3xl font-bold text-green-600">
                {freelancerApps.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Title */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground">
          📂 All Submitted Data
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Newest entries appear at the top. Click any WhatsApp number to open a
          chat.
        </p>
      </div>

      <Tabs defaultValue="hire" data-ocid="admin.tab">
        <TabsList className="mb-6">
          <TabsTrigger value="hire" className="gap-2" data-ocid="admin.tab">
            <MessageCircle className="w-4 h-4" />
            Hire Submissions
            <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 h-5">
              {hireSubmissions.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="freelancer"
            className="gap-2"
            data-ocid="admin.tab"
          >
            <Users className="w-4 h-4" />
            Freelancer Applications
            <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 h-5">
              {freelancerApps.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hire">
          {loadingHire ? (
            <LoadingCards />
          ) : hireSubmissions.length === 0 ? (
            <Card className="border-dashed" data-ocid="hire.empty_state">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <MessageCircle className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="font-medium text-muted-foreground">
                  No hire submissions yet
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  When someone fills the Hire Us form, their details (Name,
                  Service, Budget, WhatsApp) will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {hireSubmissions.map((sub, i) => (
                <HireSubmissionCard
                  key={`hire-${sub.name}-${String(sub.timestamp)}`}
                  sub={sub}
                  index={i}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="freelancer">
          {loadingFreelancer ? (
            <LoadingCards />
          ) : freelancerApps.length === 0 ? (
            <Card className="border-dashed" data-ocid="freelancer.empty_state">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="font-medium text-muted-foreground">
                  No freelancer applications yet
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Applications from the Get Job page will appear here with full
                  details.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {freelancerApps.map((app, i) => (
                <FreelancerCard
                  key={`freelancer-${app.name}-${String(app.timestamp)}`}
                  app={app}
                  index={i}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
