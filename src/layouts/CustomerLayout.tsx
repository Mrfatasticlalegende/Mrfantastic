import { StoreProvider } from '../context/StoreContext';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import LocationModal from '../components/LocationModal';
import CartDrawer from '../components/CartDrawer';
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        <CategoryBar />
        <main className="pb-20">
          <Outlet />
        </main>
        <LocationModal />
        <CartDrawer />
      </div>
    </StoreProvider>
  );
}
