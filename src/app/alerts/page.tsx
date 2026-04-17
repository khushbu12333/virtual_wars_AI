"use client";

import { useState, useEffect } from "react";
import { Bell, AlertCircle, Utensils, Clock, Check, MoreVertical, X, Map } from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Gate 3 is crowded",
      message: "Experiencing heavy traffic. We recommend using Gates 1 or 4 for faster entry.",
      time: "2 mins ago",
      icon: AlertCircle,
      iconColor: "text-red-500",
      bgClass: "bg-red-500/10 border-red-500/20",
      unread: true
    },
    {
       id: 2,
       type: "success",
       title: "Food ready at counter 2",
       message: "Your order (#892) from Burger Smash is hot and ready for pickup.",
       time: "12 mins ago",
       icon: Utensils,
       iconColor: "text-green-500",
       bgClass: "bg-green-500/10 border-green-500/20",
       unread: true
    },
    {
       id: 3,
       type: "info",
       title: "Match starting in 5 minutes",
       message: "Players are entering the field. Please take your seats.",
       time: "1 hour ago",
       icon: Clock,
       iconColor: "text-blue-500",
       bgClass: "bg-blue-500/10 border-blue-500/20",
       unread: false
    }
  ]);

  const handleMarkAllRead = () => {
    setAlerts([]);
  };

  const handleDismissAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  // Simulate stadium map integrating real-time high density alerts
  useEffect(() => {
    const updateInterval = 5000; // Every 5 seconds check
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance to generate an active crowd alert
        const sections = [
           { id: 'A', name: 'North Stand', alt: 'Gate 4' },
           { id: 'B', name: 'East Stand', alt: 'Gate 1' },
           { id: 'C', name: 'South Stand', alt: 'Gate 2' },
           { id: 'D', name: 'West Stand', alt: 'Gate 3' },
           { id: 'E', name: 'NE Corner', alt: 'Gate 1' },
           { id: 'F', name: 'SE Corner', alt: 'Gate 2' },
           { id: 'G', name: 'SW Corner', alt: 'Gate 3' },
           { id: 'H', name: 'NW Corner', alt: 'Gate 4' }
        ];
        const sec = sections[Math.floor(Math.random() * sections.length)];
        
        const newAlert = {
           id: Date.now(),
           type: "warning",
           title: `Section ${sec.id} is crowded`,
           message: `High volume of traffic detected in the ${sec.name}. We recommend using ${sec.alt} instead.`,
           time: "Just now",
           icon: Map,
           iconColor: "text-red-500",
           bgClass: "bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-[pulse_2s_ease-in-out_infinite]",
           unread: true
        };
        
        setAlerts(prev => {
          // Prevent exact duplicate spam
          if (prev.length > 0 && prev[0].title === newAlert.title) return prev;
          
          return [newAlert, ...prev].map(a => {
             // Fake age up of older dynamically added ones
             if (a.time === "Just now" && a.id !== newAlert.id) return { ...a, time: "A few moments ago" };
             return a;
          });
        });
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
         <div>
           <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
              Notifications
           </h1>
           <p className="text-muted-foreground text-sm">
             {alerts.length > 0 ? `You have ${alerts.filter(a => a.unread).length} unread alerts` : "You're all caught up!"}
           </p>
         </div>
         {alerts.length > 0 && (
           <button 
             onClick={handleMarkAllRead}
             className="flex items-center justify-center p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
           >
              <Check className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Mark all read</span>
           </button>
         )}
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div 
                key={alert.id} 
                className={`p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1f2937] shadow-xl border border-gray-800 hover:scale-[1.02] transition duration-300 flex items-start gap-4 relative overflow-hidden group`}
              >
                 {/* Unread indicator */}
                 {alert.unread && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                 )}
  
                 <div className={`p-3 rounded-full flex-shrink-0 mt-0.5 ${alert.bgClass} border`}>
                   <Icon className={`w-5 h-5 ${alert.iconColor}`} />
                 </div>
                 
                 <div className="flex-1 min-w-0 pr-4">
                   <div className="flex items-baseline justify-between gap-2 mb-1">
                     <h3 className={`font-semibold text-base truncate ${alert.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                       {alert.title}
                     </h3>
                     <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                       {alert.time}
                     </span>
                   </div>
                   <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                     {alert.message}
                   </p>
                 </div>
  
                 <button 
                    onClick={() => handleDismissAlert(alert.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 -mr-2 text-muted-foreground hover:text-red-500 transition-opacity rounded-full hover:bg-red-500/10 cursor-pointer"
                    title="Dismiss alert"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-4 border border-gray-800 border-dashed rounded-2xl bg-[#111827]">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No notifications</h3>
            <p className="text-muted-foreground text-sm">We'll alert you when there's an update.</p>
          </div>
        )}
      </div>
    </div>
  );
}
