import { useState, useContext } from 'react'
import { Box, Button, Card, Link, TextField, Typography } from '@mui/material/';
import axios from "axios"
import { MainContext } from '../../contexts/MainContext';
import { useNavigate } from 'react-router-dom';


const Login = ({}) => {
  const [form, setForm] = useState({ username: "", password: ""})

  const { setAccessToken, setRoles } = useContext(MainContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value , id } = e.target
    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const onSubmit = (e) => {
    e.preventdefault
    axios.post('http://localhost:8000/login', form )
      .then(res=>{
        console.log(res.data.accessToken);
        localStorage.setItem('accessToken', res.data.accessToken)
        setAccessToken(res.data.accessToken)
        setRoles(res.data.roles)
        navigate('/')
      })
      .catch(err=> {
        console.log(err.response.data.message)
      })
  }
  
  return (
    <Box>
      <Typography 
      variant='h2'
      className="Title"
      sx={{marginBottom:"20px"}}>
        Todo yern?
      </Typography>
      <Card
        component = "form"
        noValidate
        autoComplete="off"
        sx={{display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 0px"}}>
        <TextField
          id="username"
          label="Username"
          helperText="Please input Username"
          onChange={handleChange}
          sx={{marginBottom: "10px"}}
        />
        <TextField
          id="password"
          label="Password"
          helperText="Please input Strong Password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={onSubmit} sx={{marginTop: "30px"}}>
          Login
        </Button>
        <Typography sx={{marginTop:"30px"}}>
          Don't have an account?&nbsp;
          <Link href="/register" sx={{textDecoration:"none"}}>
            Register
          </Link>
        </Typography>
        
      </Card>
    </Box>
  )
}

export default Login