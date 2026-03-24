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
import { Separator } from "@/components/ui/separator";
import { useSubmitHireForm } from "@/hooks/useQueries";
import {
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  MessageCircle,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const UPI_ID = "parthparrma1584@fam";
const UPI_LINK = `upi://pay?pa=${UPI_ID}&pn=FB+JOB+Hire`;
const QR_IMAGE =
  "/assets/uploads/img_20260324_014812-019d1c5a-22ab-75dc-8f43-a5595db2f79d-2.jpg";

const services = [
  "Video Editing",
  "Logo Design",
  "Social Media Management",
  "Website Development",
  "Content Writing",
  "Other",
];

const perks = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Fast Response",
    desc: "We reply within 2 hours on business days.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "100% Satisfaction",
    desc: "Not happy? We'll revise until you are.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Dedicated Team",
    desc: "Your project gets a dedicated account manager.",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "WhatsApp Support",
    desc: "Direct communication via WhatsApp for fast updates.",
  },
];

export default function HireUs() {
  const [form, setForm] = useState({
    name: "",
    serviceNeeded: "",
    budget: "",
    whatsappNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { mutateAsync, isPending, isActorLoading } = useSubmitHireForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.serviceNeeded ||
      !form.budget ||
      !form.whatsappNumber
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Your request was submitted successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Not connected") {
        toast.error("Still loading, please try again in a moment.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied to clipboard!");
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-muted py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Let's Work Together
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Hire Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your project and we'll match you with the perfect
            freelancer.
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
                Get Started
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                  data-ocid="hire_form.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Request Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thanks <strong>{form.name}</strong>! We'll reach out on
                    WhatsApp within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="hire_form.panel"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="hire_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed</Label>
                    <Select
                      value={form.serviceNeeded}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, serviceNeeded: v }))
                      }
                    >
                      <SelectTrigger id="service" data-ocid="hire_form.select">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((svc) => (
                          <SelectItem key={svc} value={svc}>
                            {svc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Your Budget (₹)</Label>
                    <Input
                      id="budget"
                      placeholder="e.g. ₹5,000–₹20,000"
                      value={form.budget}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, budget: e.target.value }))
                      }
                      required
                      data-ocid="hire_form.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
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
                      data-ocid="hire_form.input"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 h-11"
                    disabled={isPending || isActorLoading}
                    data-ocid="hire_form.submit_button"
                  >
                    {isPending || isActorLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                        {isActorLoading ? "Loading..." : "Submitting..."}
                      </>
                    ) : (
                      "Get Started →"
                    )}
                  </Button>

                  {/* UPI Payment Section */}
                  <div className="pt-1">
                    <div className="flex items-center gap-3 my-4">
                      <Separator className="flex-1" />
                      <span className="text-xs text-muted-foreground font-medium px-1 whitespace-nowrap">
                        Or Pay via UPI
                      </span>
                      <Separator className="flex-1" />
                    </div>

                    <a href={UPI_LINK} data-ocid="hire_form.primary_button">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary font-semibold gap-2"
                      >
                        <Wallet className="w-4 h-4" />
                        Pay via UPI
                      </Button>
                    </a>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <span>UPI ID:</span>
                      <code className="bg-muted px-2 py-0.5 rounded font-mono text-foreground">
                        {UPI_ID}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="text-primary hover:text-primary/80 transition-colors"
                        aria-label="Copy UPI ID"
                        data-ocid="hire_form.secondary_button"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* QR Code Toggle */}
                    <div className="mt-3 text-center">
                      <button
                        type="button"
                        onClick={() => setShowQR((v) => !v)}
                        className="text-xs text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                      >
                        {showQR ? "Hide QR Code" : "Show QR Code"}
                      </button>
                      {showQR && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 flex justify-center"
                        >
                          <img
                            src={QR_IMAGE}
                            alt="UPI QR Code - parthparrma1584@fam"
                            className="w-52 h-auto rounded-xl border border-border shadow-md"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
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
                Why Choose Us?
              </h2>
              <p className="text-muted-foreground">
                We make hiring freelancers easy, transparent, and stress-free.
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
