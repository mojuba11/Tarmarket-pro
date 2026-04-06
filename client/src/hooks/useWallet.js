import { useState, useEffect } from 'react';

export const useWallet = (userId) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // Future: Replace with actual axios call to your Node backend
  useEffect(() => {
    const fetchBalance = async () => {
      // const res = await axios.get(`/api/wallet/${userId}`);
      setBalance(32.40); 
      setLoading(false);
    };
    fetchBalance();
  }, [userId]);

  return { balance, loading };
};