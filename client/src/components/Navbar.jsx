export const Navbar = () => (
  <nav className="flex justify-between items-center p-6 bg-tarmarket-cream border-b border-tarmarket-tan/30">
    <div className="text-2xl font-bold text-tarmarket-umber tracking-tight">TARMARKET</div>
    <div className="space-x-6">
      <button className="text-tarmarket-clay hover:text-tarmarket-umber transition">About</button>
      <button className="bg-tarmarket-umber text-white px-5 py-2 rounded-full text-sm">Sign In</button>
    </div>
  </nav>
);