import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Restricted from './components/Restricted';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <div className="form">
        <Login/>
        <Routes>
          <Route path="/restricted" element={<Restricted/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
