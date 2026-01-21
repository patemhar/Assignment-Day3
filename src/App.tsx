import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeContext } from './store/ThemeContext'
import { CartContext, type cartItems } from './store/CartContext'
import type { productInt } from './constants/products'
import { router } from './router'
import './App.css'

function App() {

  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  const [cartItems, setCartItems] = useState<cartItems[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const addItem = (product: productInt) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some(item => item.id === product.id)
        if(itemExists) {
          return prevItems.map(item => 
            item.id === product.id ? {...item, quantity: item.quantity + 1} : item
          )
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      }
    )
    setTotalCount((prevCount) => prevCount + 1);
  }

  const removeItem = (id: number) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if(item.id === id) {
          if(item.quantity > 1) {
            acc.push({...item, quantity: item.quantity-1})
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as cartItems[])
    })

    setTotalCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    )
  }, [theme])

  return (
    <ThemeContext.Provider value={{toggleTheme, theme}}>
      <CartContext.Provider value={{addItem, removeItem, clearCart, totalCount, cartItems}}>
        <RouterProvider router={router}/>
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
