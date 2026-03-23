import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Palette,
  Share2,
  Star,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Editing",
    desc: "Professional cuts, color grading, motion graphics, and more for your brand.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Logo Design",
    desc: "Memorable logos that capture your brand identity and stand out.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media Management",
    desc: "Grow your audience with consistent, engaging content and strategy.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Website Development",
    desc: "Fast, responsive, and beautiful websites tailored to your business.",
  },
];

const testimonials = [
  {
    name: "Jessica Brown",
    role: "Instagram Creator, 250K followers",
    stars: 5,
    text: "F&B JOB Hire completely transformed my content game. The video editor they matched me with is incredible — my reels now regularly hit 100K views!",
    initials: "JB",
  },
  {
    name: "Marcus Thompson",
    role: "Founder, TechStart Labs",
    stars: 5,
    text: "We hired a developer and designer through F&B and launched our MVP in just 3 weeks. The quality was top-notch and communication was seamless.",
    initials: "MT",
  },
  {
    name: "Priya Sharma",
    role: "YouTuber, 80K subscribers",
    stars: 5,
    text: "The logo designer created a brand identity that perfectly captured my style. The whole process was smooth, affordable, and super fast.",
    initials: "PS",
  },
];

const trustItems = [
  "No hidden fees",
  "Vetted professionals",
  "Fast turnaround",
  "Money-back guarantee",
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-muted py-20 md:py-28 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5 bg-accent text-accent-foreground border-0 px-3 py-1 text-sm font-medium">
              ✦ Trusted by 10,000+ businesses
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-5">
              Hire Skilled Freelancers
              <br />
              <span className="text-primary">Without the Hassle</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with vetted professionals for video editing, logo design,
              social media management, and web development — fast and
              affordable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/hire">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground font-semibold px-8 hover:bg-primary/90"
                  data-ocid="hero.primary_button"
                >
                  Hire Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border font-semibold px-8"
                  data-ocid="hero.secondary_button"
                >
                  Browse Services
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                What We Offer
              </p>
              <h2 className="text-3xl font-bold text-foreground">
                Explore Popular Services
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {svc.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link to="/services">
              <Button variant="outline" className="font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <section className="bg-accent py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Businesses Served", value: "10,000+" },
              { label: "Freelancers", value: "500+" },
              { label: "Projects Completed", value: "25,000+" },
              { label: "Avg. Rating", value: "4.9 ★" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Happy Clients
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Post your project and receive proposals from expert freelancers
              within 24 hours.
            </p>
            <Link to="/hire">
              <Button
                size="lg"
                className="bg-white text-primary font-bold hover:bg-white/90 px-10"
                data-ocid="cta.primary_button"
              >
                Hire a Freelancer Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
