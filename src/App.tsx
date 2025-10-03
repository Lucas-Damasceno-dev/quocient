import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context';
import QuizConfigPage from './components/quiz/QuizConfigPage';
import QuizPage from './components/quiz/QuizPage';
import ResultsPage from './components/quiz/ResultsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute 
                  allowedCondition={(state) => !state.quizStarted || state.quizCompleted} 
                  redirectTo="/quiz" 
                >
                  <QuizConfigPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/quiz" 
              element={
                <ProtectedRoute 
                  allowedCondition={(state) => state.quizStarted && !state.quizCompleted} 
                  redirectTo={state => state.quizCompleted ? "/results" : "/"} 
                >
                  <QuizPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute 
                  allowedCondition={(state) => state.quizCompleted} 
                  redirectTo="/" 
                >
                  <ResultsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App