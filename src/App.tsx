import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./components/firstpage.tsx";
import SecondPage from "./components/SecondPage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
