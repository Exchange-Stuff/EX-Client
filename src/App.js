import './App.css';
import { LoginSignup } from './Components/LoginSignUp/LoginSignup';
import { HomePage } from './Components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
