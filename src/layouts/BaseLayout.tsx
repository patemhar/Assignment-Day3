import { LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
    {to: "/home", label: "Home"},
    {to: "/notification", label: "Notifications"},
    {to: "/dashboard", label: "Dashboard"}
]

export const BaseLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b backdrop-blur">
                <div className="flex h-14 justify-between gap-3 items-center w-full px-6">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu/>
                        </button>
                        <div className="font-semibold">E Commerce</div>
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
                    <div className="flex items-center">
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