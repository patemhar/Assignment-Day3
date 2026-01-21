import { createContext } from "react";
import type { productInt } from "../constants/products";

export type cartItems = {
    id: number
    images?: string[],
    title: string,
    description: string,
    price: number
    stock: number
    category: string,
    quantity: number
}

type CartContextType = {
    addItem: (product: productInt) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    totalCount: number
    cartItems: cartItems[]
}

export const CartContext = createContext<CartContextType>({
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    totalCount: 0,
    cartItems: []
})