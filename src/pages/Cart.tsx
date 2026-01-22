import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../store/CartContext";
import CartCard from "../components/CartCard";
import clsx from "clsx";

const Cart = () => {
  const { cartItems, clearCart, totalCount } = useContext(CartContext);
 
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponInput, setCouponInput] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [ogPrice, setOgprice] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null);
    
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [discountedPrice, setDiscountedPrice] = useState(totalPrice);

    useEffect(() => {
      setDiscountedPrice(totalPrice - discount);
    }, [totalPrice, discount])

    useEffect(() => {
      setDiscountApplied(false);
    }, [couponInput])

    const applyCoupon = () => {
      if (!discountApplied) {
          setOgprice(totalPrice);
          const appliedDiscount = Math.min(couponInput, totalPrice);
          setDiscount(appliedDiscount);
          setDiscountedPrice(ogPrice - appliedDiscount);
          setDiscountApplied(true);
      }
    };

  return (
    <div className="p-4 flex flex-col w-full">
      <div className="font-semibold text-xl flex justify-center mb-4">
        Your Cart
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="gap-4 flex md:w-300 flex-col">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartCard key={item.id} {...item} />)
          ) : (
            <div>Your Cart is Empty!</div>
          )}
        </div>
        <div className="flex flex-col items-center border-2 p-4">
          <div className="text-md font-semibold mt-2">Billing</div>

          <button 
            className={clsx("rounded-lg px-2 py-1 border-green-600 bg-green-300 border-dashed", showCoupon && "hidden")}
            onClick={() => {
              setShowCoupon(true);
              inputRef?.current?.focus();
            }}
          >
            Show Coupon
          </button>

          {showCoupon && (
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <input 
                  type="number"
                  value={couponInput}
                  ref={inputRef}
                  min={0}
                  max={totalPrice}
                  placeholder="enter coupon number"
                  onChange={(e) => setCouponInput(Number(e.target.value))}
                  className="p-1 rounded-md border-2"
                />
              </div>

              <button className={clsx("py-1 px-2 rounded-lg bg-green-400 border-2 border-green-600")}
                onClick={() => applyCoupon()}
              >
                Apply Coupun
              </button>

              {discountApplied && (
                <p>"you saved <span className="font-semibold text-green-500">{discount.toFixed(2)}</span> was {ogPrice.toFixed(2)}!"</p>
              )}
            </div>
          )}

          <div className="text-md mt-1">
            Total: {discountedPrice.toFixed(2)}
          </div>

          <button
            className={clsx(
              "border-2 rounded-lg bg-green-500 py-1 px-2 mt-4",
              totalCount > 0 ? "" : "hidden",
            )}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
