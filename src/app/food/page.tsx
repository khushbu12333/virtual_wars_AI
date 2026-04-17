"use client";

import { useState } from "react";
import { Utensils, Plus, Minus, Search, ShoppingBag, Flame, Leaf, Coffee, Pizza, CheckCircle2 } from "lucide-react";
import { CartPanel, type CartItem } from "@/components/CartPanel";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  // Cart state storing added items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmedData, setOrderConfirmedData] = useState<{orderId: string, deliveryTime: string} | null>(null);

  const categories = [
    { name: "All", icon: null },
    { name: "Burgers", icon: Flame },
    { name: "Pizza", icon: Pizza },
    { name: "Hot Dogs", icon: Flame },
    { name: "Snacks", icon: Utensils },
    { name: "Vegan", icon: Leaf },
    { name: "Drinks", icon: Coffee },
  ];

  const items = [
    { id: 1, name: "Double Smash Burger", description: "Two smashed beef patties, cheddar, pickles, and house sauce on a brioche bun.", price: 12.00, category: "Burgers", popular: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Classic Stadium Dog", description: "100% beef hot dog served warm with classic yellow mustard.", price: 6.50, category: "Hot Dogs", popular: true, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Pepperoni Slice", description: "Large NYC style slice loaded with crispy pepperoni cups.", price: 5.50, category: "Pizza", popular: false, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Loaded Nachos", description: "Crispy tortilla chips, warm queso, jalapeños, and fresh salsa.", price: 9.00, category: "Snacks", popular: true, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Draft Beer (IPA)", description: "Locally brewed IPA on tap, 16oz pour.", price: 11.00, category: "Drinks", popular: false, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Vegan Beyond Burger", description: "Plant-based patty with vegan mayo on a toasted bun.", price: 14.00, category: "Vegan", popular: false, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Jumbo Soft Pretzel", description: "Warm salted pretzel served with a side of nacho cheese dip.", price: 6.00, category: "Snacks", popular: false, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Bottled Water", description: "20oz ice-cold refreshing spring water.", price: 4.00, category: "Drinks", popular: false, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80" },
  ];

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (orderConfirmedData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-pulse">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">Your culinary experience is being prepared with care. We'll bring it right to your seat!</p>
        
        <div className="bg-[#1f2937] border border-gray-800 rounded-3xl p-8 md:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col gap-6">
          {/* Decorative background lighting */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 bg-primary/20 rounded-full blur-[60px]"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-green-500/10 rounded-full blur-[60px]"></div>
          
          <div className="bg-[#111827]/80 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center border border-gray-800 shadow-inner relative z-10">
            <span className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-bold">Order ID</span>
            <span className="text-3xl md:text-4xl font-mono font-bold text-white tracking-widest">{orderConfirmedData.orderId}</span>
          </div>

          <div className="flex bg-[#111827]/80 backdrop-blur-md rounded-2xl p-6 items-center flex-col border border-gray-800 shadow-inner relative z-10">
            <span className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-bold">Estimated Delivery</span>
            <span className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
              <Flame className="w-7 h-7 text-primary/80" />
              {orderConfirmedData.deliveryTime}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
           <button 
             onClick={() => window.location.href = '/'} 
             className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg shadow-primary/25 cursor-pointer"
           >
             Back to Dashboard
           </button>
           <button 
             onClick={() => setOrderConfirmedData(null)} 
             className="w-full sm:w-auto bg-[#1f2937] hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-sm cursor-pointer"
           >
             Order More Food
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header section similar to delivery apps */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
         <div>
           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Order to Seat
           </h1>
           <p className="text-muted-foreground text-lg">Skip the lines. We'll bring it right to you.</p>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search food..." 
                 className="pl-10 pr-4 py-2.5 bg-card border border-border rounded-full text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full md:w-64 transition-all shadow-sm"
               />
            </div>
            <button 
               onClick={() => setIsCartOpen(true)}
               className="relative bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
            >
               <ShoppingBag className="w-5 h-5" />
               {/* Show dynamic cart length */}
               {totalItems > 0 && (
                 <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary animate-in zoom-in duration-300">
                   {totalItems}
                 </span>
               )}
            </button>
         </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide snap-x">
         {categories.map((cat, i) => {
           const Icon = cat.icon;
           const isActive = activeCategory === cat.name;
           return (
             <button 
               key={i} 
               onClick={() => setActiveCategory(cat.name)}
               className={`snap-start flex items-center px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all cursor-pointer ${
                 isActive 
                   ? "bg-foreground text-background shadow-md transform scale-105" 
                   : "bg-card text-foreground border border-border hover:bg-muted hover:border-muted-foreground/30"
               }`}
             >
               {Icon && <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-background' : 'text-muted-foreground'}`} />}
               {cat.name}
             </button>
           );
         })}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const cartItem = cart.find(i => i.id === item.id);
          const itemQuantity = cartItem ? cartItem.quantity : 0;
          
          return (
            <div key={item.id} className={`bg-gradient-to-br from-[#111827] to-[#1f2937] border border-gray-800 hover:scale-105 transition duration-300 shadow-xl rounded-[20px] overflow-hidden group flex flex-col ${itemQuantity > 0 ? 'border-primary/50 shadow-glow' : 'hover:shadow-lg'}`}>
              {/* Image Placeholder area */}
              <div className="h-48 bg-muted relative overflow-hidden">
                 <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                 {/* Dark overlay for badge readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-[#111827]/30"></div>
                 {item.popular && (
                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
                     <Flame className="w-3 h-3 mr-1" /> Popular
                   </div>
                 )}
                 {/* Selection Badge */}
                 {itemQuantity > 0 && (
                   <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center animate-in fade-in zoom-in duration-300">
                     <CheckCircle2 className="w-3 h-3 mr-1" /> {itemQuantity} in cart
                   </div>
                 )}
              </div>
              
              {/* Content area */}
              <div className="p-5 flex-1 flex flex-col relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-foreground line-clamp-1">{item.name}</h3>
                 </div>
                 
                 <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                   {item.description}
                 </p>
                 
                 <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-800">
                   <span className="font-bold text-xl text-foreground">
                     ${item.price.toFixed(2)}
                   </span>
                   {itemQuantity > 0 ? (
                     <div className="flex items-center gap-2 bg-[#1f2937] rounded-full p-1 shadow-inner border border-gray-700 animate-in fade-in zoom-in duration-300">
                       <button 
                         onClick={() => updateQuantity(item.id, -1)}
                         className="w-8 h-8 rounded-full bg-[#111827] hover:bg-gray-800 flex items-center justify-center text-white transition cursor-pointer shadow-sm"
                       >
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="text-white text-sm font-bold w-4 text-center">{itemQuantity}</span>
                       <button 
                         onClick={() => updateQuantity(item.id, 1)}
                         className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition cursor-pointer shadow-sm"
                       >
                         <Plus className="w-4 h-4" />
                       </button>
                     </div>
                   ) : (
                     <button 
                       onClick={() => handleAddToCart(item)}
                       className="bg-primary hover:bg-primary/90 transition w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground shadow-sm duration-300 cursor-pointer relative overflow-hidden"
                     >
                        <Plus className="w-5 h-5 relative z-10" />
                     </button>
                   )}
                 </div>
              </div>
            </div>
          )
        })}
      </div>

      <CartPanel 
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        cart={cart}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => {
          setCart([]); // Empty cart on successful payment
          setOrderConfirmedData({
            orderId: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            deliveryTime: "15-20 Mins"
          });
        }}
      />
    </div>
  );
}
