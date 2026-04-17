"use client";

import { useState, useEffect } from "react";
import { Map as MapIcon, Navigation, Info, Users, Activity } from "lucide-react";

type CrowdLevel = "low" | "medium" | "high";

interface Section {
  id: string;
  name: string;
  labelX: number;
  labelY: number;
  x: number;
  y: number;
  w: number;
  h: number;
  crowd: CrowdLevel;
  path: string;
}

const STADIUM_SECTIONS: Section[] = [
  { id: 'A', name: 'North Stand', labelX: 400, labelY: 90, x: 250, y: 50, w: 300, h: 80, crowd: 'low', path: 'M 400 480 L 400 470 L 680 470 L 680 30 L 400 30 L 400 40' },
  { id: 'B', name: 'East Stand', labelX: 610, labelY: 250, x: 570, y: 150, w: 80, h: 200, crowd: 'medium', path: 'M 400 480 L 400 470 L 680 470 L 680 250 L 660 250' },
  { id: 'C', name: 'South Stand', labelX: 400, labelY: 410, x: 250, y: 370, w: 300, h: 80, crowd: 'high', path: 'M 400 480 L 400 460' },
  { id: 'D', name: 'West Stand', labelX: 190, labelY: 250, x: 150, y: 150, w: 80, h: 200, crowd: 'low', path: 'M 400 480 L 400 470 L 120 470 L 120 250 L 140 250' },
  { id: 'E', name: 'NE Corner', labelX: 610, labelY: 90, x: 570, y: 50, w: 80, h: 80, crowd: 'medium', path: 'M 400 480 L 400 470 L 680 470 L 680 30 L 610 30 L 610 40' },
  { id: 'F', name: 'SE Corner', labelX: 610, labelY: 410, x: 570, y: 370, w: 80, h: 80, crowd: 'high', path: 'M 400 480 L 400 470 L 610 470 L 610 460' },
  { id: 'G', name: 'SW Corner', labelX: 190, labelY: 410, x: 150, y: 370, w: 80, h: 80, crowd: 'low', path: 'M 400 480 L 400 470 L 190 470 L 190 460' },
  { id: 'H', name: 'NW Corner', labelX: 190, labelY: 90, x: 150, y: 50, w: 80, h: 80, crowd: 'medium', path: 'M 400 480 L 400 470 L 120 470 L 120 30 L 190 30 L 190 40' },
];

const crowdColors = {
  low: { fill: "fill-green-500/20", stroke: "stroke-green-500", text: "text-green-500", bg: "bg-green-500" },
  medium: { fill: "fill-yellow-500/20", stroke: "stroke-yellow-500", text: "text-yellow-500", bg: "bg-yellow-500" },
  high: { fill: "fill-red-500/20", stroke: "stroke-red-500", text: "text-red-500", bg: "bg-red-500" },
};

export default function MapPage() {
  const [sections, setSections] = useState<Section[]>(STADIUM_SECTIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPath, setShowPath] = useState(false);
  
  // Interaction bindings
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Simulate real-time crowd updates
  useEffect(() => {
    const updateInterval = 3500; // 3.5 seconds
    const interval = setInterval(() => {
      setSections(prevSections => prevSections.map(section => {
        // To make it visually realistic, don't change every section simultaneously
        if (Math.random() > 0.4) {
          const levels: CrowdLevel[] = ["low", "medium", "high"];
          // Optional: bias towards current condition to avoid jumping direct from low to high too often
          const randomLevel = levels[Math.floor(Math.random() * levels.length)];
          return { ...section, crowd: randomLevel };
        }
        return section;
      }));
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const handleSectionClick = (id: string) => {
    setSelectedId(id);
    setShowPath(false); // Reset path when selecting a new section
  };

  const activeSection = sections.find(s => s.id === selectedId);

  // Derived state to find best area dynamically
  const bestSection = [...sections].sort((a, b) => {
    const order = { low: 1, medium: 2, high: 3 };
    return order[a.crowd] - order[b.crowd];
  })[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center">
            <MapIcon className="w-8 h-8 mr-3 text-primary" />
            Stadium Map
         </h1>
         <p className="text-muted-foreground">Tap a section to view crowd density and navigate to your seat.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Interactive Map Area */}
        <div 
          className="lg:col-span-2 bg-gradient-to-br from-[#0f1420] to-[#161d2a] rounded-[2rem] border border-white/5 shadow-2xl shadow-black/60 flex items-center justify-center p-8 relative overflow-hidden min-h-[600px] ring-1 ring-white/10 group"
          onMouseMove={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          onMouseLeave={() => setHoveredSection(null)}
        >
           {/* Premium Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
           {/* Custom Interactive Tooltip */}
           {hoveredSection && (
             <div 
               className="absolute z-50 pointer-events-none bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-3 transform -translate-x-1/2 -translate-y-[130%] min-w-[140px] animate-in fade-in zoom-in-95 duration-200"
               style={{ left: mousePos.x, top: mousePos.y }}
             >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${crowdColors[hoveredSection.crowd].bg} shadow-sm`} />
                  <span className="font-bold text-sm tracking-wide text-foreground">Section {hoveredSection.id}</span>
                </div>
                <span className={`text-xs capitalize font-medium ${crowdColors[hoveredSection.crowd].text}`}>{hoveredSection.crowd} Volume</span>
             </div>
           )}

           <svg viewBox="0 0 800 550" className="w-full h-full max-w-2xl drop-shadow-lg">
              
              {/* Main Pitch */}
              <rect x="250" y="150" width="300" height="200" rx="12" className="fill-green-900/30 stroke-green-800/50 stroke-2" />
              <circle cx="400" cy="250" r="40" className="fill-none stroke-green-800/50 stroke-2" />
              <line x1="400" y1="150" x2="400" y2="350" className="stroke-green-800/50 stroke-2" />
              <text x="400" y="250" textAnchor="middle" dominantBaseline="middle" className="fill-green-900/50 text-2xl font-bold tracking-[0.2em] opacity-40">PITCH</text>

              {/* Path Highlight (Draw behind sections so it slides 'under' them) */}
              {showPath && activeSection && (
                 <path 
                   d={activeSection.path} 
                   className="fill-none stroke-primary stroke-[4] animate-pulse" 
                   strokeDasharray="8 4"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 />
              )}

              {/* Sections */}
              {sections.map((section) => {
                 const isSelected = selectedId === section.id;
                 const colors = crowdColors[section.crowd];
                 
                 return (
                   <g 
                      key={section.id} 
                      onClick={() => handleSectionClick(section.id)} 
                      onMouseEnter={() => setHoveredSection(section)}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer group transition-transform duration-300 active:scale-[0.97]"
                      style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                   >
                      <rect 
                        x={section.x} y={section.y} 
                        width={section.w} height={section.h} 
                        rx="16"
                        className={`transition-all duration-1000 ease-in-out stroke-[3px] ${section.crowd === 'high' ? 'animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]' : ''} ${isSelected ? 'stroke-primary fill-primary/20 brightness-110 drop-shadow-[0_0_15px_rgba(var(--primary),0.4)]' : `${colors.fill} ${colors.stroke} opacity-70 group-hover:opacity-100 group-hover:brightness-125 group-hover:drop-shadow-lg`}`}
                      />
                      <text 
                        x={section.labelX} y={section.labelY} 
                        textAnchor="middle" dominantBaseline="middle"
                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                        className={`font-bold text-xl transition-all duration-300 ${isSelected ? 'fill-primary scale-125' : 'fill-muted-foreground group-hover:fill-foreground group-hover:scale-125'}`}
                      >
                        {section.id}
                      </text>
                   </g>
                 )
              })}

              {/* Entry Gate Indicator */}
              <g transform="translate(400, 500)">
                 <rect x="-40" y="-15" width="80" height="30" rx="8" className="fill-muted stroke-border stroke-2" />
                 <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xs font-bold">GATE S</text>
                 <circle cx="0" cy="-15" r="4" className="fill-primary animate-ping" />
                 <circle cx="0" cy="-15" r="4" className="fill-primary" />
              </g>
           </svg>
           
           {/* Legend overlay */}
           <div className="absolute top-6 right-6 bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-2xl ring-1 ring-white/5 pointer-events-none">
              <div className="flex items-center justify-between gap-6 overflow-visible">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Density</span>
                 <div className="flex items-center gap-2 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]"></div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Live Data</span>
                 </div>
              </div>
              <div className="h-px w-full bg-border/50 rounded-full" />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-sm font-medium text-foreground">Low</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                  <span className="text-sm font-medium text-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                  <span className="text-sm font-medium text-foreground">High</span>
                </div>
              </div>
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6 flex flex-col">
          
          {/* Smart Recommendation Card */}
          {bestSection && (
            <div 
               className="bg-green-500/10 border border-green-500/20 rounded-[2rem] p-6 shadow-2xl shadow-green-500/5 relative overflow-hidden group hover:border-green-500/40 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] hover:-translate-y-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-top-4 ring-1 ring-white/5" 
               onClick={() => handleSectionClick(bestSection.id)}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500 pointer-events-none"></div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-green-500/30 group-hover:scale-110 transition-transform duration-500">
                   <Activity className="w-6 h-6 text-green-400" />
                 </div>
                 <div>
                    <h3 className="font-bold text-xs tracking-widest text-green-400 uppercase mb-0.5">Smart Suggestion</h3>
                    <p className="text-foreground font-medium text-sm">Best area right now: <span className="font-bold text-green-400">Section {bestSection.id}</span></p>
                    <p className="text-xs text-green-500/80 mt-0.5 capitalize">({bestSection.crowd} Crowd Activity)</p>
                 </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-[#0f1420] to-[#161d2a] shadow-2xl shadow-black/40 border border-white/5 rounded-[2rem] p-8 min-h-[300px] flex flex-col transition-all duration-500 flex-1 ring-1 ring-white/10 group">
             <h2 className="text-xl font-semibold mb-6 text-foreground tracking-tight">Section Details</h2>
             
             {activeSection ? (
               <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-3xl font-bold text-foreground">Section {activeSection.id}</h3>
                        <p className="text-lg text-muted-foreground">{activeSection.name}</p>
                     </div>
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${crowdColors[activeSection.crowd].text} bg-muted`}>
                        <Activity className="w-4 h-4" />
                        {activeSection.crowd.charAt(0).toUpperCase() + activeSection.crowd.slice(1)} Traffic
                     </span>
                  </div>

                 {/* Dynamic Wait Time & Suggestion */}
                 <div className={`mt-4 border p-4 rounded-xl shadow-md flex items-start mb-auto transition-all duration-500
                    ${activeSection.crowd === 'low' ? 'bg-green-500/10 border-green-500/30' : 
                      activeSection.crowd === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                      'bg-red-500/10 border-red-500/30'}`}>
                    <Info className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 transition-colors duration-500
                        ${activeSection.crowd === 'low' ? 'text-green-500' : 
                          activeSection.crowd === 'medium' ? 'text-yellow-500' : 
                          'text-red-500'}`} />
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-center mb-2 gap-2">
                          <p className={`font-bold tracking-wide uppercase text-[10px] transition-colors duration-500
                            ${activeSection.crowd === 'low' ? 'text-green-500' : 
                              activeSection.crowd === 'medium' ? 'text-yellow-500' : 
                              'text-red-500'}`}>Recommended Action</p>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm ${
                                activeSection.crowd === 'low' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 
                                activeSection.crowd === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' : 
                                'bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse'}`}>
                             Wait: {activeSection.crowd === 'low' ? '< 2 mins' : activeSection.crowd === 'medium' ? '5-10 mins' : '> 15 mins'}
                          </span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-foreground">
                          {activeSection.crowd === 'low' ? "Smooth sailing! Direct route available via Gate " + (activeSection.id === 'C' ? 'S' : activeSection.id === 'A' ? 'N' : 'E') + "." : 
                           activeSection.crowd === 'medium' ? "Expect minor delays. Moderate congestion around the main concourse." : 
                           "Avoid this section! High congestion detected. Best to grab a snack first."}
                        </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                        if (!showPath) {
                           // simulate loading before drawing path map rendering
                           const btn = document.getElementById('nav-btn');
                           if(btn) btn.innerHTML = 'Loading Route...';
                           setTimeout(() => {
                              setShowPath(true);
                           }, 800);
                        } else {
                           setShowPath(false);
                        }
                    }}
                    id="nav-btn"
                    className={`w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 px-6 py-4 rounded-xl text-primary-foreground font-bold tracking-wide flex items-center justify-center cursor-pointer shadow-xl shadow-primary/20 mt-8`}
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    {showPath ? 'Hide Navigation Path' : 'Navigate to Seat'}
                  </button>
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <MapIcon className="w-12 h-12 mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground max-w-[200px]">Select a section on the map to view details and navigation.</p>
               </div>
             )}
          </div>
          
          <div className="bg-[#0f1420]/80 backdrop-blur-xl rounded-[2rem] border border-white/5 p-8 shadow-2xl shadow-black/30 ring-1 ring-white/10">
             <h2 className="text-xl font-semibold mb-6 text-foreground tracking-tight">Amenities Nearby</h2>
             <ul className="space-y-3">
               {[
                 { name: "Nearest Restroom", time: "2 min walk", icon: Users },
                 { name: "First Aid", time: "1 min walk", icon: Activity },
               ].map((item, i) => {
                 const Icon = item.icon;
                 return (
                   <li key={i} className="flex justify-between items-center p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg bg-secondary text-secondary-foreground mr-3`}>
                           <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                   </li>
                 )
               })}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
