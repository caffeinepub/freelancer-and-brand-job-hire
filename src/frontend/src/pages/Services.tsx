import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Palette,
  Share2,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: <Video className="w-7 h-7" />,
    title: "Video Editing",
    startingAt: "$49",
    description:
      "From YouTube videos to Instagram Reels and brand commercials — we deliver polished, professional video content that captivates your audience.",
    features: [
      "Color grading & correction",
      "Motion graphics & titles",
      "Sound design & music sync",
      "Subtitles & captions",
      "Up to 4K resolution output",
    ],
    badge: "Most Popular",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Logo Design",
    startingAt: "$39",
    description:
      "Get a memorable, versatile logo that represents your brand perfectly. We deliver multiple concepts and unlimited revisions until you're 100% satisfied.",
    features: [
      "3 initial concepts",
      "Unlimited revisions",
      "Full vector files (SVG, AI)",
      "Brand color palette",
      "Social media kit included",
    ],
    badge: null,
  },
  {
    icon: <Share2 className="w-7 h-7" />,
    title: "Social Media Management",
    startingAt: "$79/mo",
    description:
      "Grow your online presence with data-driven strategy, consistent posting, and community engagement across all major platforms.",
    features: [
      "Content calendar & planning",
      "Custom graphics & captions",
      "Posting & scheduling",
      "Audience engagement",
      "Monthly analytics report",
    ],
    badge: "Best Value",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Website Development",
    startingAt: "$199",
    description:
      "Beautiful, fast, and mobile-responsive websites built with modern technologies. From landing pages to full e-commerce solutions.",
    features: [
      "Responsive design",
      "SEO optimization",
      "CMS integration",
      "E-commerce ready",
      "1 month free support",
    ],
    badge: null,
  },
];

export default function Services() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-muted py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional digital services designed for small businesses,
            creators, and startups. Transparent pricing, expert talent,
            guaranteed results.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-7 shadow-card hover:shadow-card-hover transition-shadow"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-primary">
                  {svc.icon}
                </div>
                {svc.badge && (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold px-3">
                    {svc.badge}
                  </Badge>
                )}
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                {svc.title}
              </h2>
              <div className="text-2xl font-extrabold text-primary mb-3">
                Starting at {svc.startingAt}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {svc.description}
              </p>
              <ul className="space-y-2 mb-6">
                {svc.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/hire">
                <Button
                  className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                  data-ocid={`services.item.${i + 1}.primary_button`}
                >
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/80 mb-8">
            Tell us about your project and we'll recommend the best solution.
          </p>
          <Link to="/hire">
            <Button
              size="lg"
              className="bg-white text-primary font-bold hover:bg-white/90 px-10"
              data-ocid="services_cta.primary_button"
            >
              Talk to Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
