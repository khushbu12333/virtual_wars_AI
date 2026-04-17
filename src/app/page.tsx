"use client";

import { MapPin, Utensils, Bell, Activity, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-12">
         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
           Welcome to the Stadium
         </h1>
         <p className="text-muted-foreground text-lg sm:text-xl font-medium">Your real-time guide to events, food, and navigation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
         {/* Live Crowd Status Card */}
         <div className="lg:col-span-2 bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[24px] border border-gray-800 p-8 sm:p-10 shadow-xl hover:scale-105 transition duration-300 relative overflow-hidden group">
            {/* Soft background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700"></div>
            
            <div className="flex justify-between items-start relative z-10">
               <div>
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-green-500" />
                    Live Crowd Status
                 </p>
                 <h2 className="text-3xl font-bold text-foreground mb-4">Moderate Traffic</h2>
                 <p className="text-muted-foreground leading-relaxed max-w-md">The stadium is currently operating at 60% capacity. Wait times at most concessions are under 10 minutes.</p>
               </div>
               <div className="hidden sm:flex bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                 <span className="text-green-500 font-bold text-lg">60%</span>
               </div>
            </div>
         </div>

         {/* Gate Suggestion Card */}
         <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[24px] border border-gray-800 p-8 sm:p-10 shadow-xl hover:scale-105 transition duration-300">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Gate Suggestion</p>
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center">
               Gate D <span className="ml-3 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-md">Fastest</span>
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">Estimated wait: 2 mins</p>
            <button 
               onClick={() => router.push("/entry-exit")}
               className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg text-white font-semibold flex justify-center items-center cursor-pointer shadow-md"
            >
               View All Gates <ChevronRight className="w-4 h-4 ml-1" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {/* Map Link */}
         <button 
            onClick={() => router.push("/map")}
            className="text-left bg-gradient-to-br from-[#111827] to-[#1f2937] border border-gray-800 rounded-[20px] p-6 shadow-xl hover:scale-105 transition duration-300 group cursor-pointer"
         >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
               <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Stadium Map</h3>
            <p className="text-sm text-muted-foreground">Find your seat and view section crowd levels.</p>
         </button>

         {/* Food Link */}
         <button 
            onClick={() => router.push("/food")}
            className="text-left bg-gradient-to-br from-[#111827] to-[#1f2937] border border-gray-800 rounded-[20px] p-6 shadow-xl hover:scale-105 transition duration-300 group cursor-pointer"
         >
            <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
               <Utensils className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Order Food</h3>
            <p className="text-sm text-muted-foreground">Skip the lines. Order drinks and snacks to your seat.</p>
         </button>

         {/* Alerts Link */}
         <button 
            onClick={() => router.push("/alerts")}
            className="text-left bg-gradient-to-br from-[#111827] to-[#1f2937] border border-gray-800 rounded-[20px] p-6 shadow-xl hover:scale-105 transition duration-300 group cursor-pointer"
         >
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
               <Bell className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Live Alerts</h3>
            <p className="text-sm text-muted-foreground">Stay updated on halftime shows and crucial alerts.</p>
         </button>
      </div>
    </div>
  );
}
