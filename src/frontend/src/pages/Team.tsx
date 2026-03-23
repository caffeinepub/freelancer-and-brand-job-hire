import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "motion/react";

const freelancers = [
  {
    name: "Alex Rivera",
    role: "Senior Video Editor",
    avatar: "/assets/generated/avatar-alex.dim_200x200.jpg",
    skills: [
      "Premiere Pro",
      "After Effects",
      "Color Grading",
      "Motion Graphics",
    ],
    rating: 4.9,
    reviews: 127,
    hourlyRate: "$35/hr",
    bio: "10+ years editing for YouTube creators and brands. Specializes in fast-paced reels and brand storytelling.",
  },
  {
    name: "Maya Johnson",
    role: "Brand & Logo Designer",
    avatar: "/assets/generated/avatar-maya.dim_200x200.jpg",
    skills: ["Illustrator", "Brand Identity", "Typography", "Figma"],
    rating: 4.9,
    reviews: 89,
    hourlyRate: "$30/hr",
    bio: "Creative director turned freelancer. Has designed identities for 200+ businesses across 30 countries.",
  },
  {
    name: "James Okafor",
    role: "Full-Stack Developer",
    avatar: "/assets/generated/avatar-james.dim_200x200.jpg",
    skills: ["React", "Node.js", "TypeScript", "Shopify"],
    rating: 5.0,
    reviews: 64,
    hourlyRate: "$55/hr",
    bio: "Builds blazing-fast websites and web apps. From landing pages to full e-commerce platforms.",
  },
  {
    name: "Sara Williams",
    role: "Social Media Manager",
    avatar: "/assets/generated/avatar-sara.dim_200x200.jpg",
    skills: ["Instagram", "TikTok", "Content Strategy", "Analytics"],
    rating: 4.8,
    reviews: 143,
    hourlyRate: "$28/hr",
    bio: "Grew multiple accounts from 0 to 50K+ followers. Expert in viral content and community engagement.",
  },
  {
    name: "Kevin Nguyen",
    role: "WordPress & Webflow Dev",
    avatar: "/assets/generated/avatar-kevin.dim_200x200.jpg",
    skills: ["WordPress", "Webflow", "SEO", "WooCommerce"],
    rating: 4.9,
    reviews: 98,
    hourlyRate: "$40/hr",
    bio: "Specialized in no-code and WordPress solutions. Delivers clean, SEO-optimized websites on tight deadlines.",
  },
  {
    name: "Lisa Chen",
    role: "Content Creator & Editor",
    avatar: "/assets/generated/avatar-lisa.dim_200x200.jpg",
    skills: ["Canva", "Copywriting", "Reels Editing", "Brand Voice"],
    rating: 4.8,
    reviews: 112,
    hourlyRate: "$25/hr",
    bio: "Crafts scroll-stopping content for Instagram and TikTok. Brings brands to life through authentic storytelling.",
  },
];

export default function Team() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-muted py-14 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Our Talent
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Meet Our Top Freelancers
          </h1>
          <p className="text-lg text-muted-foreground">
            Hand-picked, vetted professionals ready to elevate your brand and
            deliver results.
          </p>
        </div>
      </section>

      {/* Freelancer Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
              data-ocid={`team.item.${i + 1}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">
                    {f.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {f.role}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= Math.floor(f.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {f.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({f.reviews})
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {f.hourlyRate}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {f.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {f.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-accent text-accent-foreground border-0 text-xs px-2.5 py-0.5 font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <Link to="/hire">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-colors"
                  data-ocid={`team.item.${i + 1}.primary_button`}
                >
                  View Profile
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
            Ready to Hire Top Talent?
          </h2>
          <p className="text-white/80 mb-8">
            Post your project and get matched with the perfect freelancer within
            hours.
          </p>
          <Link to="/hire">
            <Button
              size="lg"
              className="bg-white text-primary font-bold hover:bg-white/90 px-10"
              data-ocid="team_cta.primary_button"
            >
              Hire Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
