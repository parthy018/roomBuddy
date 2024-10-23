// App.jsx
import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Footer1 from "./components/Footer1";

function App() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8 h-full">
        <Outlet />
      </div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 h-full">
        <Footer />
      </div>
      {/* <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 h-full">
      <Footer1 />
      </div> */}
    </Container>
  );
}

export default App;
