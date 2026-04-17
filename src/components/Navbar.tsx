import Link from "next/link";
import { Home, Map, Utensils, Bell, DoorOpen } from "lucide-react";

export function Navbar() {
  const navItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Map", href: "/map", icon: Map },
    { label: "Food", href: "/food", icon: Utensils },
    { label: "Alerts", href: "/alerts", icon: Bell },
    { label: "Entry/Exit", href: "/entry-exit", icon: DoorOpen },
  ];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight text-primary">Smart Stadium</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <span className="text-primary font-bold">Smart Stadium</span>
          </div>
        </div>
      </div>
      
      {/* Mobile nav - simplified for now */}
      <div className="sm:hidden border-t border-border bg-card">
        <div className="flex justify-around items-center h-14">
           {navItems.map((item) => {
             const Icon = item.icon;
             return (
               <Link
                 key={item.href}
                 href={item.href}
                 className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground text-[10px]"
               >
                 <Icon className="w-5 h-5 mb-1" />
                 {item.label}
               </Link>
             );
           })}
        </div>
      </div>
    </nav>
  );
}
