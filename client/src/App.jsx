// App.jsx
import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";


function App() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8 h-full">
        <Outlet />
      </div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 h-full">
        <Footer />
      </div>
    </Container>
  );
}

export default App;
