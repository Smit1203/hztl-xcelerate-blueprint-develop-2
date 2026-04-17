import { useRouter as useRouterMock } from 'next-router-mock';
export const useRouter = () => {
  const router = useRouterMock();
  return {
    ...router,
    locale: 'en',
  };
};
