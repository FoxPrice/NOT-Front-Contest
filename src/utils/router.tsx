import { createBrowserRouter } from "react-router-dom";
import Item from "@/pages/Item";
import Home from "@/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, element: <Home /> },
            { path: "item", element: <Item /> },
        ],
        errorElement: <div>Error</div>
    }
]);