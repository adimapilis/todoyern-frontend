import { Routes, Route, Outlet } from "react-router-dom";
import { Home, Login, Register, User, Note, Footer} from "./features/features"
import Navbar from "./components/Navbar"
import './App.css'

function App() {
  
  function Dashboard() {
    return (
      <div>
        <Navbar class="navbar"/>
        <Outlet />
        <Footer></Footer>
      </div>
    );
  }
  
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route index path ="home" element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="account" element={<User />}/>
          <Route path="notes" element={<Note />}/>
          
          
          <Route path ="*" element={<Home />}/>
        </Route>
      </Routes>
    
  )
}

export default App
