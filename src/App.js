import './App.css';
import { LoginSignup } from './Components/LoginSignUp/LoginSignup';
import { HomePage } from './Components/HomePage/HomePage';
import { PostProduct } from './Components/PostProduct/PostProduct';
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
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/postproduct" element={<PostProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
