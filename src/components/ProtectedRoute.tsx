import { Navigate } from 'react-router-dom';
import { useQuiz } from '@/context';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedCondition: (state: any) => boolean;
  redirectTo: string | ((state: any) => string);
}

const ProtectedRoute = ({ children, allowedCondition, redirectTo }: ProtectedRouteProps) => {
  const { state } = useQuiz();
  
  if (!allowedCondition(state)) {
    const targetRedirect = typeof redirectTo === 'function' ? redirectTo(state) : redirectTo;
    return <Navigate to={targetRedirect} replace />;
  }

  return children;
};

export default ProtectedRoute;