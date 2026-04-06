export const PrimaryButton = ({ children, onClick, className }) => (
  <button 
    onClick={onClick}
    className={`bg-tarmarket-umber text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#32251B] transition-all ${className}`}
  >
    {children}
  </button>
);