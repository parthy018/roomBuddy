// App.jsx
import { Outlet } from 'react-router-dom';
import Container from './components/Container';

function App() {
  return (
    <Container>
      
      <div className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8 h-full">
        <Outlet />
      </div>
      <footer className="w-full bg-transparent text-gray-600 py-1 text-center mt-1">
        <p>© 2024 My Website. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default App;
