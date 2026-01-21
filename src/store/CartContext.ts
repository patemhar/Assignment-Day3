import { createContext } from "react";
import type { productInt } from "../constants/products";

type CartContextType = {
    addItem: (product: productInt) => void;
    removeItem: (id: number) => void;
    totalCount: number
    cartItems: productInt[]
}

export const CartContext = createContext<CartContextType>({
    addItem: () => {},
    removeItem: () => {},
    totalCount: 0,
    cartItems: []
})