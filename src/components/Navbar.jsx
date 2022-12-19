import { AppBar, Box, Button, Toolbar } from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'

const Navbar = () => {
  const {accessToken,setAccessToken} = useContext(MainContext)
  const navigate = useNavigate()

  const NavItem = ({items}) =>{
    const array = items
    return (
      <Box>
        {array.map(each=>
          <Link className="navlink" to={`${each}`} key={each}>
            <Button variant="text" sx={{color:"white"}}> {each}</Button>
          </Link>
        )}
      </Box>
    )
  }

  const handleLogout = () => {
    setAccessToken("")
    localStorage.setItem("accessToken", "")
    setTimeout(()=>navigate('/'),2500)

  }
  return (
    <AppBar position="fixed">
      <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
        <Box sx={{marginRigh:"auto"}}> 
          <NavItem items={["home"]} />
        </Box>
        <Box>
          {!accessToken
          ? <NavItem items={["login","register"]} /> 
          : <NavItem items={["notes","account"]} />}
        </Box>
        {accessToken && 
          <Button 
            variant="text" 
            onClick={handleLogout}
            sx={{color:"white"}}
          >
            LogOut
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar