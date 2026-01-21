import { LogOut, Menu, ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../store/ThemeContext";
import { CartContext } from "../store/CartContext";

const navItems = [
    {to: "/home", label: "Home"},
    {to: "/notification", label: "Notifications"},
    {to: "/dashboard", label: "Dashboard"}
]

export const BaseLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {theme, toggleTheme} = useContext(ThemeContext)
    const { totalCount } = useContext(CartContext)

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-emerald-400 border-b backdrop-blur">
                <div className="flex h-14 justify-between gap-3 items-center w-full px-6">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu/>
                        </button>
                        <div className="font-semibold dark:text-amber-800">E Commerce</div>
                    </div>
                    <nav className="hidden md:flex gap-3">
                        {navItems.map((item) => {
                            return(
                                <NavLink 
                                    key={item.label}
                                    to={item.to}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        })}
                    </nav>

                    <div className="flex justify-evenly w-40">
                        <div className="relative inline-block">
                            <ShoppingCart/>
                            <span className="absolute -top-2 -right-2 text-white bg-red-600 rounded-full h-4 w-4 text-xs flex items-center justify-center shandow-md">
                                {totalCount}
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleTheme()}
                            >
                                {theme === "light" ? <Moon/> : <Sun/>}
                            </button>
                        </div>
                        <button>
                            <LogOut/>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="border-t bg-white/95 md:hidden">
                        <div className="flex flex-col p-4 gap-2">
                            {navItems.map((item) => {
                                return(
                                    <NavLink 
                                        key={item.label}
                                        to={item.to}
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                )}
            </header>

            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
}