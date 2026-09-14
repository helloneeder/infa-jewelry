import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import AdminLayout from './AdminLayout'
import { RequireAuth } from './RequireAuth'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ProductsPage from '@/pages/ProductsPage'
import ProductEditPage from '@/pages/ProductEditPage'
import CategoriesPage from '@/pages/CategoriesPage'
import ArticlesPage from '@/pages/ArticlesPage'
import MediaPage from '@/pages/MediaPage'
import SettingsPage from '@/pages/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/new', element: <ProductEditPage /> },
          { path: 'products/:id', element: <ProductEditPage /> },
          { path: 'categories', element: <CategoriesPage /> },
          { path: 'articles', element: <ArticlesPage /> },
          { path: 'media', element: <MediaPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/404" replace /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
