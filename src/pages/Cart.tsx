import React, { useContext, useRef, useState } from "react";
import { CartContext } from "../store/CartContext";
import CartCard from "../components/CartCard";
import clsx from "clsx";

const Cart = () => {
  const { cartItems, clearCart, totalCount } = useContext(CartContext);
 
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponInput, setCouponInput] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [originalPrice, setOriginalPrice] = useState<number>(0);
    const [discountApplied, setDiscountApplied] = useState(false);


    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0 );

    const applyCoupon = () => {
    if (!discountApplied) {
        setOriginalPrice(totalPrice);
        const appliedDiscount = Math.min(couponInput, totalPrice);
        setDiscount(appliedDiscount);
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
