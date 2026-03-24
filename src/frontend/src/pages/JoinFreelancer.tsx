import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitFreelancerApplication } from "@/hooks/useQueries";
import {
  Briefcase,
  CheckCircle,
  Globe,
  IndianRupee,
  Loader2,
  MessageCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const perks = [
  {
    icon: <Star className="w-5 h-5" />,
    title: "Top-Rated Platform",
    desc: "Join India's growing freelance marketplace with serious clients.",
  },
  {
    icon: <IndianRupee className="w-5 h-5" />,
    title: "Earn in Rupees",
    desc: "Get paid directly to your UPI or bank account — no conversion fees.",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Quality Projects",
    desc: "Work with vetted businesses, YouTubers, and startups across India.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Grow Your Profile",
    desc: "Build your reputation with reviews, ratings, and repeat clients.",
  },
];

export default function JoinFreelancer() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    experience: "",
    hourlyRate: "",
    whatsappNumber: "",
    portfolioLink: "",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isActorLoading } =
    useSubmitFreelancerApplication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.role ||
      !form.experience ||
      !form.hourlyRate ||
      !form.whatsappNumber ||
      !form.bio
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Not connected") {
        toast.error("Still loading, please try again in a moment.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-muted py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Work With Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Get a Job — Join as Freelancer
          </h1>
          <p className="text-lg text-muted-foreground">
            Apply to join our talent network and start getting hired by top
            brands, creators, and businesses across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card border border-border rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Apply Now
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                  data-ocid="freelancer_form.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Application Received!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thanks <strong>{form.name}</strong>! We'll review your
                    profile and reach out on WhatsApp within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="freelancer_form.panel"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="freelancer_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role / Skills *</Label>
                    <Input
                      id="role"
                      placeholder="e.g. Video Editor, Motion Graphics"
                      value={form.role}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, role: e.target.value }))
                      }
                      required
                      data-ocid="freelancer_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience *</Label>
                    <Select
                      value={form.experience}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, experience: v }))
                      }
                    >
                      <SelectTrigger
                        id="experience"
                        data-ocid="freelancer_form.select"
                      >
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 years">1–2 years</SelectItem>
                        <SelectItem value="3-5 years">3–5 years</SelectItem>
                        <SelectItem value="5-10 years">5–10 years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate *</Label>
                    <Input
                      id="hourlyRate"
                      placeholder="e.g. ₹2500/hr"
                      value={form.hourlyRate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, hourlyRate: e.target.value }))
                      }
                      required
                      data-ocid="freelancer_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp"
                      placeholder="e.g. +91 9699858423"
                      type="tel"
                      value={form.whatsappNumber}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          whatsappNumber: e.target.value,
                        }))
                      }
                      required
                      data-ocid="freelancer_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">
                      Portfolio Link{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="portfolio"
                        placeholder="https://yourportfolio.com"
                        className="pl-9"
                        value={form.portfolioLink}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            portfolioLink: e.target.value,
                          }))
                        }
                        data-ocid="freelancer_form.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself, your experience, and what makes you stand out..."
                      rows={4}
                      value={form.bio}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, bio: e.target.value }))
                      }
                      required
                      data-ocid="freelancer_form.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 h-11"
                    disabled={isPending || isActorLoading}
                    data-ocid="freelancer_form.submit_button"
                  >
                    {isPending || isActorLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        {isActorLoading ? "Loading..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="mr-2 w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Why Join Our Platform?
              </h2>
              <p className="text-muted-foreground">
                Get access to real clients and grow your freelance career in
                India.
              </p>
            </div>
            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4 p-4 bg-accent rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {perk.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { label: "Freelancers", value: "500+" },
                { label: "Projects Done", value: "1,200+" },
                { label: "Happy Clients", value: "800+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
