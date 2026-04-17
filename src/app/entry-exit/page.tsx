"use client";

import { useState } from "react";
import { DoorOpen, LogOut, LogIn, Activity, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EntryExitPage() {
  const router = useRouter();
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [loadingExit, setLoadingExit] = useState(false);

  const handleNavigate = (type: 'entry' | 'exit') => {
    if (type === 'entry') setLoadingEntry(true);
    else setLoadingExit(true);

    setTimeout(() => {
       if (type === 'entry') setLoadingEntry(false);
       else setLoadingExit(false);
       router.push("/map");
    }, 1000);
  };

  const gates = [
    { number: "1", type: "Main", waitTime: "18 min", status: "crowded", trend: "up" },
    { number: "2", type: "East", waitTime: "8 min", status: "moderate", trend: "down" },
    { number: "3", type: "South", waitTime: "2 min", status: "fast", trend: "down" },
    { number: "4", type: "West", waitTime: "22 min", status: "crowded", trend: "up" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'fast': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'crowded': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'fast': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'crowded': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10 text-center sm:text-left">
         <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 flex items-center justify-center sm:justify-start">
            <Activity className="w-8 h-8 mr-3 text-primary" />
            Gate Intelligence
         </h1>
         <p className="text-muted-foreground text-lg">Live conditions to help you avoid the crowds.</p>
      </div>

      {/* Suggested Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
         {/* Best Entry Container */}
         <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] shadow-xl border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:scale-105 transition duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center">
               <LogIn className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10 transition duration-300">
               <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Suggested Entry</span>
               <div className="flex items-end gap-4 mb-4">
                 <h2 className="text-5xl font-extrabold text-foreground tracking-tighter">Gate 3</h2>
               </div>
               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-green-500 bg-green-500/10 border border-green-500/20 mb-6 shadow-md">
                 <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                 Fast Flow • 2 min wait
               </div>
               <p className="text-muted-foreground text-sm max-w-sm mb-6">
                 Currently the least crowded access point. Located on the South side.
               </p>
               <button 
                  onClick={() => handleNavigate('entry')}
                  disabled={loadingEntry}
                  className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg text-white font-semibold flex items-center justify-center w-max cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
               >
                 {loadingEntry ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</> : <>Get Directions <ChevronRight className="w-4 h-4 ml-1" /></>}
               </button>
            </div>
         </div>

         {/* Best Exit Container */}
         <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] shadow-xl border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:scale-105 transition duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <LogOut className="w-24 h-24 text-foreground" />
            </div>
            <div className="relative z-10 transition duration-300">
               <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Suggested Exit</span>
               <div className="flex items-end gap-4 mb-4">
                 <h2 className="text-5xl font-extrabold text-foreground tracking-tighter">Gate 2</h2>
               </div>
               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 mb-6 shadow-md">
                 <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                 Moderate Flow • 8 min wait
               </div>
               <p className="text-muted-foreground text-sm max-w-sm mb-6">
                 Best exit strategy post-event based on typical crowd dispersal patterns.
               </p>
               <button 
                  onClick={() => handleNavigate('exit')}
                  disabled={loadingExit}
                  className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg text-white font-semibold flex items-center justify-center w-max border border-blue-500 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
               >
                 {loadingExit ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</> : <>Plan Exit <ChevronRight className="w-4 h-4 ml-1" /></>}
               </button>
            </div>
         </div>
      </div>

      {/* All Gates List */}
      <div>
         <h3 className="text-xl font-bold text-foreground mb-6">All Gate Conditions</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gates.map((gate) => (
              <div key={gate.number} className="bg-card border border-border rounded-xl p-5 hover:bg-muted/30 transition-colors">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <span className="text-xs font-semibold text-muted-foreground uppercase">{gate.type}</span>
                     <h4 className="text-xl font-bold text-foreground">Gate {gate.number}</h4>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                     <DoorOpen className="w-5 h-5 text-muted-foreground" />
                   </div>
                 </div>
                 
                 <div className={`mt-auto px-3 py-2 rounded-lg border flex items-center justify-between ${getStatusColor(gate.status)}`}>
                    <div className="flex items-center font-semibold text-sm capitalize">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(gate.status)}`}></div>
                      {gate.status}
                    </div>
                    <span className="font-bold">{gate.waitTime}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
