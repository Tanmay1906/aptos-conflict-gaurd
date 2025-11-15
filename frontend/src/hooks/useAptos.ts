import { useQuery } from '@tanstack/react-query';
import { getAccountBalance } from '@/lib/aptos';

export const useAccountBalance = (address: string) => {
  return useQuery({
    queryKey: ['accountBalance', address],
    queryFn: () => getAccountBalance(address),
    enabled: !!address,
  });
};
