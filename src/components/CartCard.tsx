import { useContext } from "react";
import { CartContext, type cartItems } from "../store/CartContext";


export default function CartCard({ id, images, title, description, price, stock, category, quantity} : cartItems) {
    
    const { addItem, removeItem } = useContext(CartContext);

    return (
        <div className="grid md:grid-cols-2">
            <div className="flex gap-4 border-2 rounded-2xl p-4">
                <div>
                    <div className="text-xl font-bold mb-2 line-clamp-1 text-cyan-900 dark:text-cyan-500">{title}</div>
                    <div className="text-gray-600 mb-2 text-sm line-clamp-3">{description}</div>
                    <div className="font-semibold mb-1">{price}</div>
                </div>
                <div className="flex flex-col gap-2">
                    <button onClick={() => addItem({id, images, title, description, price, stock, category})} className="border px-1.5 rounded-lg flex justify-center items-center">+</button>
                    <div>{quantity}</div>
                    <button onClick={() => removeItem(id)} className="border flex justify-center items-center rounded-lg px-2">-</button>
                </div>
            </div>
            
        </div>
    )
}