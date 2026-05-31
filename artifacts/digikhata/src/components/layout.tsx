import { Link, useLocation } from "wouter";
import { Home, Search, History, User } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/check", label: "Check", icon: Search },
    { href: "/history", label: "History", icon: History },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground max-w-md mx-auto relative shadow-xl overflow-hidden sm:border-x border-border">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-card/80 backdrop-blur-xl border-t border-border px-6 py-3 z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex flex-col items-center gap-1.5 min-w-[64px] py-1 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-1.5 rounded-full transition-colors ${isActive ? "bg-primary/10" : "bg-transparent"}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
