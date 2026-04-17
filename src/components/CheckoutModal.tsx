import { useState } from "react";
import { X, CreditCard, Wallet, CheckCircle2, ChevronRight } from "lucide-react";
import type { CartItem } from "./CartPanel";

interface CheckoutModalProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CheckoutModal({ cart, isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "paytm" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);

  if (!isOpen && !isSuccess && !showRazorpayMock) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.05; // Dummy 5% tax
  const grandTotal = total + tax;

  const handlePayment = () => {
    if (!paymentMethod) return;

    if (paymentMethod === "razorpay") {
      setShowRazorpayMock(true);
      return;
    }

    setIsProcessing(true);
    // Simulate payment process for Paytm
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    }, 2000); // 2 seconds processing
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen || isSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#111827] rounded-[2rem] shadow-[0_0_50px_rgba(37,99,235,0.15)] border border-gray-800/80 overflow-hidden flex flex-col max-h-[90vh] transform transition-all duration-500 animate-in zoom-in-95 fade-in ease-[cubic-bezier(0.32,0.72,0,1)]">
        
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center h-80 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400">Your order has been placed securely.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between bg-[#1f2937]/50 rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all hover:rotate-90 hover:scale-110 duration-300 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              
              {/* Order Summary */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm bg-[#1f2937]/30 p-3 rounded-xl border border-gray-800/50">
                      <span className="text-gray-300 flex items-center gap-3">
                        <span className="bg-gray-800 text-white w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shadow-inner">{item.quantity}</span>
                        <span className="font-medium line-clamp-1">{item.name}</span>
                      </span>
                      <span className="text-white font-medium pl-4">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400 px-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 px-2">
                    <span>Taxes & Fees (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white mt-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800">
                    <span>Total Amount</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5' : 'border-gray-800 bg-[#1f2937] hover:border-gray-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'razorpay' ? 'bg-primary text-white shadow-md' : 'bg-gray-800 text-gray-400'}`}>
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">Razorpay</div>
                        <div className="text-xs text-gray-400 mt-0.5">Credit, Debit, Netbanking, UPI</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-gray-600'}`}>
                      {paymentMethod === 'razorpay' && <div className="w-3 h-3 rounded-full bg-primary animate-in zoom-in" />}
                    </div>
                    <input type="radio" className="hidden" name="payment" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'paytm' ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/5' : 'border-gray-800 bg-[#1f2937] hover:border-gray-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'paytm' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-800 text-gray-400'}`}>
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">Paytm</div>
                        <div className="text-xs text-gray-400 mt-0.5">Wallet, Paytm Postpaid, UPI</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'paytm' ? 'border-blue-500' : 'border-gray-600'}`}>
                      {paymentMethod === 'paytm' && <div className="w-3 h-3 rounded-full bg-blue-500 animate-in zoom-in" />}
                    </div>
                    <input type="radio" className="hidden" name="payment" checked={paymentMethod === 'paytm'} onChange={() => setPaymentMethod('paytm')} />
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 bg-[#1f2937]/30 backdrop-blur-sm">
              <button 
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-wait shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex justify-center items-center gap-2 group relative overflow-hidden cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-3 relative z-10">
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Secure Payment...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">Proceed to Pay ${grandTotal.toFixed(2)}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Razorpay Mock Modal */}
      {showRazorpayMock && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRazorpayMock(false)} />
          <div className="relative bg-white w-full max-w-[380px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
            {/* Razorpay Header */}
            <div className="bg-[#02042b] p-5 flex justify-between items-start">
              <div className="text-white">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                   <div className="bg-white text-[#02042b] w-6 h-6 rounded-sm flex justify-center items-center font-bold text-xs">₹</div> Razorpay
                </h3>
                <p className="text-xs opacity-80 mb-2">Smart Stadium</p>
                <div className="px-2 py-0.5 border border-white/30 rounded inline-block text-[10px] uppercase font-bold tracking-wider text-white/90">Test Mode</div>
              </div>
              <p className="text-white font-bold text-xl">₹{(grandTotal * 80).toFixed(2)}</p>
            </div>
            
            {/* Payment Methods */}
            <div className="p-5 bg-white flex-1 flex flex-col gap-3">
               <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Simulate Payment</h4>
               
               <button 
                 onClick={() => {
                   setShowRazorpayMock(false);
                   setIsSuccess(true);
                   setTimeout(() => {
                     setIsSuccess(false);
                     onClose();
                     if (onSuccess) onSuccess();
                   }, 2000);
                 }} 
                 className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl shadow-sm hover:border-green-500 focus:ring-2 focus:ring-green-500/20 group transition-all text-left flex items-center gap-4 cursor-pointer"
               >
                 <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 text-green-600 rounded-full flex items-center justify-center transition-colors"><CheckCircle2 className="w-5 h-5"/></div>
                 <div className="flex-1">
                   <div className="font-bold text-gray-800">Success</div>
                   <div className="text-xs text-gray-500 mt-0.5">Simulate successful payment</div>
                 </div>
                 <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
               </button>

               <button 
                 onClick={() => setShowRazorpayMock(false)} 
                 className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl shadow-sm hover:border-red-500 focus:ring-2 focus:ring-red-500/20 group transition-all text-left flex items-center gap-4 cursor-pointer"
               >
                 <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-colors"><X className="w-5 h-5"/></div>
                 <div className="flex-1">
                   <div className="font-bold text-gray-800">Failure</div>
                   <div className="text-xs text-gray-500 mt-0.5">Cancel and close modal</div>
                 </div>
                 <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
               </button>
            </div>
            
            <div className="bg-gray-50 p-3 text-center border-t border-gray-200 flex justify-center items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400 font-medium tracking-wide">Secured by Razorpay Test</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
