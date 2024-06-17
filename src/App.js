import "./App.css";
import { LoginSignup } from "./Components/LoginSignUp/LoginSignup";
import { HomePage } from "./Components/HomePage/HomePage";
import { PostProduct } from "./Components/PostProduct/PostProduct";
import { UserPage } from "./Pages/Admin/UserPage/UserPage";
import { ProductDetail } from "./Components/ProductDetail/ProductDetail.jsx";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/postproduct" element={<PostProduct />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/productdetail" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
