import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QuizProvider } from './context';
import QuizConfigPage from './components/quiz/QuizConfigPage';
import QuizPage from './components/quiz/QuizPage';
import ResultsPage from './components/quiz/ResultsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2,
  },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function App() {
  const location = useLocation();

  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProtectedRoute
                    allowedCondition={(state) => !state.quizStarted || state.quizCompleted}
                    redirectTo="/quiz"
                  >
                    <QuizConfigPage />
                  </ProtectedRoute>
                </motion.div>
              }
            />
            <Route
              path="/quiz"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProtectedRoute
                    allowedCondition={(state) => state.quizStarted && !state.quizCompleted}
                    redirectTo={(state) => (state.quizCompleted ? '/results' : '/')}
                  >
                    <QuizPage />
                  </ProtectedRoute>
                </motion.div>
              }
            />
            <Route
              path="/results"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProtectedRoute
                    allowedCondition={(state) => state.quizCompleted}
                    redirectTo="/"
                  >
                    <ResultsPage />
                  </ProtectedRoute>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </QuizProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;