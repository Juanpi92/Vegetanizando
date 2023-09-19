import React from 'react'
import { Route, Routes } from 'react-router'

import About from '../pages/About'
import Servicos from '../pages/Servicos'
import Cart from '../pages/Cart'
import Error404 from '../pages/Error'
import Home from '../pages/Home'
import LoginAdmin from '../pages/Admin/LoginAdmin'
import AdminCompras from '../pages/Admin/AdminCompras'
import AdminProducts from '../pages/Admin/AdminProducts'
import AdminPlans from '../pages/Admin/AdminPlans'
import Statistics from '../pages/Admin/Statistics'
import { useSelector } from 'react-redux'

export default function AppRoutes({ variant }) {
    const state = useSelector((state) => state);
    const { user } = state.user;

    return (
        <Routes>
            {!user &&
                DATA_ROUTES.map((route) => (
                    variant === 'public' && route.private === false ?
                        <Route
                            key={route.id}
                            exact path={route.path}
                            element={route.element} /> : null
                ))
            }
            {
                DATA_ROUTES.map((route) => (
                    variant === 'private' && route.private === true ?
                        <Route
                            key={route.id}
                            exact path={route.path}
                            element={route.element} /> : null
                ))
            }
            <Route exact path="*" element={<Error404 />} />
        </Routes>
    )
}

const DATA_ROUTES = [
    {
        id: 1,
        path: "/",
        element: <Home />,
        private: false,
    },
    {
        id: 2,
        path: "/acerca",
        element: <About />,
        private: false,
    },
    {
        id: 3,
        path: "/admin",
        element: <LoginAdmin />,
        private: false,

    },
    {
        id: 4,
        path: "/servicos",
        element: <Servicos />,
        private: false,

    },
    {
        id: 5,
        path: "/cart",
        element: <Cart />,
        private: false,

    },
    {
        id: 6,
        path: "/admin/compras",
        element: <AdminCompras />,
        private: true,
    },
    {
        id: 7,
        path: "/admin/products",
        element: <AdminProducts />,
        private: true,
    },
    {
        id: 8,
        path: "/admin/plans",
        element: <AdminPlans />,
        private: true,
    },
    {
        id: 9,
        path: "/admin/statistics",
        element: <Statistics />,
        private: true,
    },

]