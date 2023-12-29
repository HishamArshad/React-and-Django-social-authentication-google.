 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NewLogin from './components/NewLogin';
 
function App() {
 
  return (
    <>

	<Router>
    {/* <Navbar isLoggedOut={isLoggedOut}/>
  */}
    <Routes>
		<Route path='/' element={<Login />} />
 
    </Routes>
  </Router>
    </>
  );
}

export default App;
 