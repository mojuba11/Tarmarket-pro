import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

const Layout = () => (
  <div className="bg-tarmarket-cream min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto">
      <Outlet /> 
    </div>
  </div>
);

export default Layout;