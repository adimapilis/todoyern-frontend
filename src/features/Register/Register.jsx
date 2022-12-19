import { useState } from 'react'
import { Box, Button, Card, Link, TextField, Typography } from '@mui/material/';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: "", password: ""})

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
    axios.post('http://localhost:8000/register', form )
      .then(res=>{
        console.log(res);
        navigate('/login')
      })
      .catch(err=>console.log(err))
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
          Sign up
        </Button>
        <Typography sx={{marginTop:"30px"}}>
          Already have an account?&nbsp;
          <Link href="/login" sx={{textDecoration:"none"}}>
            Login
          </Link>
          </Typography>
      </Card>
    </Box>
  )
}

export default Register