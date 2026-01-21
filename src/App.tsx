import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeContext } from './store/ThemeContext'
import { CartContext } from './store/CartContext'
import type { productInt } from './constants/products'
import { router } from './router'
import './App.css'

function App() {

  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  const [cartItems, setCartItems] = useState<productInt[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const addItem = (product: productInt) => {
    setCartItems(prevItems => [...prevItems, product]);
    setTotalCount(prevCount => prevCount+1);
  }

  const removeItem = (id: number) => {

    const itemExists = cartItems.some(item => item.id === id);
    
    if (!itemExists || totalCount < 1) {
      return;
    }

    setCartItems(cartItems.filter((c) => c.id !== id));
    setTotalCount(prevCount => prevCount - 1);
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
      <CartContext.Provider value={{addItem, removeItem, totalCount, cartItems}}>
        <RouterProvider router={router}/>
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
