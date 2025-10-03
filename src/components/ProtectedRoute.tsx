import { Navigate } from 'react-router-dom';
import { useQuiz } from '@/context';
import type { ReactNode } from 'react';
import type { QuizState } from '@/types/quiz';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedCondition: (state: QuizState) => boolean;
  redirectTo: string | ((state: QuizState) => string);
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