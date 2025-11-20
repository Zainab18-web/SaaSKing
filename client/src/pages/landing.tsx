import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Globe, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-24 md:py-32 lg:py-40 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
            ✨ New: DataForSEO Integration
          </div>
          <h1 className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Extract Real Backlinks <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Instantly</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Analyze competitors, uncover high DA/PA opportunities, and supercharge your SEO strategy with our powerful extraction engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base cursor-pointer")}>
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#features" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-base cursor-pointer")}>
              View Demo
            </Link>
          </div>
        </motion.div>

        {/* Mock UI */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 mx-auto max-w-5xl border rounded-xl shadow-2xl bg-card/50 backdrop-blur overflow-hidden"
        >
          <div className="bg-muted/50 border-b p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="mx-auto bg-background/50 h-6 w-96 rounded text-[10px] flex items-center justify-center text-muted-foreground font-mono">seo-extractor.app/dashboard</div>
          </div>
          <div className="p-8 grid gap-8">
            <div className="flex gap-4">
              <div className="h-10 flex-1 bg-muted/30 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-primary/20 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
               {[1,2,3].map(i => (
                 <div key={i} className="h-12 w-full bg-muted/20 rounded border border-border/40"></div>
               ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <FeatureCard 
               icon={<Globe className="h-8 w-8 text-primary" />}
               title="Global Data"
               description="Access backlink data from millions of domains worldwide using DataForSEO API."
             />
             <FeatureCard 
               icon={<ShieldCheck className="h-8 w-8 text-primary" />}
               title="Verified Metrics"
               description="Get accurate Domain Authority (DA) and Page Authority (PA) scores instantly."
             />
             <FeatureCard 
               icon={<BarChart3 className="h-8 w-8 text-primary" />}
               title="Competitor Analysis"
               description="Spy on your competitors' backlink profiles and steal their ranking strategies."
             />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="mb-4 p-3 bg-primary/10 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
