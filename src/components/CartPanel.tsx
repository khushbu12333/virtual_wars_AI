import { X, Plus, Minus, Trash2 } from "lucide-react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartPanelProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  onCheckout?: () => void;
}

export function CartPanel({ cart, isOpen, onClose, updateQuantity, removeItem, onCheckout }: CartPanelProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 sm:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Cart Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-[#1f2937] border-l border-gray-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-[#111827]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Your Cart
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm mt-2">Add some delicious food to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-[#111827] p-3 rounded-xl border border-gray-800/80 shadow-md hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-lg w-20 h-20">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-primary font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm shadow-primary/20"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-gray-500 hover:text-red-400 transition-colors duration-300 p-2 rounded-full hover:bg-red-400/10 cursor-pointer hover:rotate-12 hover:scale-110 active:scale-95"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-800 bg-[#111827] shadow-inner">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 font-medium text-lg">Total</span>
            <span className="text-3xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex justify-center items-center cursor-pointer relative overflow-hidden group"
            disabled={cart.length === 0}
          >
            <span className="relative z-10 flex items-center gap-2">
               Checkout Now
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </div>
      </div>
    </>
  );
}
