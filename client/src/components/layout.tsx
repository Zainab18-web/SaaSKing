import { useAuth } from "@/lib/mock-auth";
import { Link, useLocation } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const isAuthPage = location === "/login" || location === "/signup";

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 mx-auto">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-heading font-bold text-xl tracking-tight text-primary cursor-pointer hover:opacity-80 transition-opacity">
            <Zap className="h-6 w-6 fill-primary/20" />
            <span>SEO & Backlinks Extractor</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden md:flex")}>
              Pricing
            </Link>
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/50">
                  <span className="font-medium text-foreground">{user.credits}</span> Credits
                </div>
                <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                  Login
                </Link>
                <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
