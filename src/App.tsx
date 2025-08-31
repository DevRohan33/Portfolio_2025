import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MySaasApp from "./pages/my_app";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/app" element={<MySaasApp />} />
      </Routes>
    </Router>
  );
};

export default App;
