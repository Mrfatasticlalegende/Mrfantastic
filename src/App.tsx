/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import ProductGrid from './components/ProductGrid';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProductList from './admin/ProductList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer App Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<ProductGrid />} />
        </Route>

        {/* Admin App Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<div className="p-4">Orders Page (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-4">Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
