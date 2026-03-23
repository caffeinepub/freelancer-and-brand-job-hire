import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Vetted Professionals Only",
    desc: "Every freelancer goes through a rigorous screening process. We check portfolios, conduct interviews, and run test projects before anyone joins our roster.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning-Fast Turnaround",
    desc: "Get matched with the right talent in hours, not weeks. Our streamlined process means your project starts immediately.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Dedicated Account Manager",
    desc: "You'll never feel lost. A real human is assigned to your project to ensure smooth communication and on-time delivery.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Results-Driven Approach",
    desc: "We don't just deliver work — we deliver growth. Our freelancers are chosen for their ability to create measurable impact.",
  },
];

const stats = [
  { label: "Years in Business", value: "5+" },
  { label: "Satisfied Clients", value: "10K+" },
  { label: "Expert Freelancers", value: "500+" },
  { label: "Countries Served", value: "40+" },
];

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-muted py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            About F&B JOB Hire
          </h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make hiring great freelancers as easy as
            ordering your morning coffee.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Our Mission
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              F&B JOB Hire was founded with a simple but powerful mission:
              eliminate the friction between businesses and the skilled
              freelancers they need to grow. We believe every business — whether
              a solo creator or a growing startup — deserves access to
              world-class talent without the complexity, high costs, and
              uncertainty of traditional hiring.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We operate as a drop-servicing agency, which means we take care of
              everything: finding the right professional, managing the project,
              and delivering polished results — so you can focus entirely on
              running your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              It started in 2020 when our founders — frustrated by the endless
              scroll of freelance marketplaces and unreliable talent — decided
              to build a better way. By curating a tight-knit network of vetted
              experts and acting as a trusted middleman, they helped their first
              10 clients achieve outstanding results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Word spread quickly. Today, F&B JOB Hire has served over 10,000
              businesses across 40+ countries, delivering video edits, logos,
              websites, and social strategies that drive real growth. Our team
              has grown to 500+ freelancers — all hand-picked and consistently
              delivering 5-star results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-extrabold text-primary">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Why Us
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              Why Choose F&B JOB Hire?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl shadow-card"
                data-ocid={`about.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-white/80 mb-8">
              Join thousands of businesses that trust F&B JOB Hire for their
              creative and digital needs.
            </p>
            <Link to="/hire">
              <Button
                size="lg"
                className="bg-white text-primary font-bold hover:bg-white/90 px-10"
                data-ocid="about_cta.primary_button"
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
