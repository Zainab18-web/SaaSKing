import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="py-24 px-4 md:px-6 bg-muted/30 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Start for free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <PricingCard 
            title="Starter" 
            price="$0" 
            description="Perfect for testing the waters."
            features={[
              "100 credits / month",
              "Basic Backlink metrics",
              "Standard support",
              "1 User"
            ]}
            cta="Get Started"
            href="/signup"
            variant="outline"
          />

          {/* Pro Tier */}
          <PricingCard 
            title="Pro" 
            price="$49" 
            period="/mo"
            description="For serious SEO professionals."
            features={[
              "5,000 credits / month",
              "Advanced DA/PA metrics",
              "Priority support",
              "Export to CSV",
              "Competitor tracking",
              "3 Users"
            ]}
            cta="Start Free Trial"
            href="/signup"
            variant="default"
            popular
          />

          {/* Agency Tier */}
          <PricingCard 
            title="Agency" 
            price="$199" 
            period="/mo"
            description="Scale your agency operations."
            features={[
              "Unlimited credits",
              "White-label reports",
              "API Access",
              "Dedicated account manager",
              "Unlimited Users",
              "SSO & Advanced Security"
            ]}
            cta="Contact Sales"
            href="#"
            variant="outline"
          />
        </div>

        <div className="text-center space-y-4 pt-12 border-t border-border/50">
          <h3 className="text-2xl font-heading font-semibold">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mt-8">
            <div className="space-y-2">
              <h4 className="font-semibold">How do credits work?</h4>
              <p className="text-muted-foreground text-sm">One credit equals one domain or URL analyzed. Credits reset every month.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I cancel anytime?</h4>
              <p className="text-muted-foreground text-sm">Yes, you can downgrade or cancel your subscription at any time from your dashboard.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is the data accurate?</h4>
              <p className="text-muted-foreground text-sm">We use real-time data from DataForSEO, ensuring you get the most up-to-date backlink metrics available.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Do you offer API access?</h4>
              <p className="text-muted-foreground text-sm">Yes, API access is available on the Agency plan for integrating with your own tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ 
  title, 
  price, 
  period = "", 
  description, 
  features, 
  cta, 
  href, 
  variant = "default",
  popular = false
}: { 
  title: string, 
  price: string, 
  period?: string, 
  description: string, 
  features: string[], 
  cta: string, 
  href: string, 
  variant?: "default" | "outline",
  popular?: boolean
}) {
  return (
    <div className={cn(
      "relative flex flex-col p-8 bg-card rounded-xl border transition-all duration-200", 
      popular ? "border-primary shadow-lg scale-105 z-10" : "border-border/50 hover:border-border shadow-sm hover:shadow-md"
    )}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="mb-6 space-y-2">
        <h3 className="text-2xl font-heading font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>
      <ul className="mb-8 space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Check className="h-3 w-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>
      <Link href={href} className={cn(buttonVariants({ variant, size: "lg" }), "w-full")}>
        {cta}
      </Link>
    </div>
  );
}
