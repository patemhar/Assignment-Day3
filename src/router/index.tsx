import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Notification from "../pages/Notification";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            }, 
            {
                path: "notification",
                element: <Notification />
            },
            {
                path: "cart",
                element: <Cart/>
            }
        ]
    }
])