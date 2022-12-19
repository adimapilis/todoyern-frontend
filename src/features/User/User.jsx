import { Button, Card, TextField, Link, Select, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthComponent from '../../components/AuthComponent'
import { MainContext } from '../../contexts/MainContext'

const User = () => {
  const [form, setForm] = useState({ username: "", oldPassword: "", newPassword:"", _id:"", active:true})

  const {accessToken} = useContext(MainContext)
  const navigate = useNavigate()

  useEffect(() => {
    getUser(accessToken) 
  }, [])
  
  const getUser = async (token) => {
     await axios.get(
      'http://localhost:8000/users',
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res=>{
        console.log(res)
        setForm(res.data[0])
      })
      .catch(err=> {
        console.log(err)
        
      })
  }
  const patchUser = async (id) => {
    await axios.patch(
      `http://localhost:8000/users/${id}`,
      form,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res=>{
        localStorage.setItem('accessToken', "")
        navigate('/login')
      })
      .catch(err=> {
        console.log(err)
      })
  }

  const deleteUser= (id) => {
    axios.delete(
      `http://localhost:8000/users/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res=>{
        console.log(res)
        window.location.href ="/login"
      })
      .catch(err=> {
        console.log(err)
      })
  }
  const handleChange = (e) => {
    const { value , id } = e.target
    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  return (
    <AuthComponent>
      <Card
          component = "form"
          noValidate
          autoComplete="off"
          sx={{display:"flex", flexDirection:"column", alignItems:"center", padding:"40px", gap:"15px"}}>
          <Typography variant="h4">
            Edit Account
          </Typography>
          <TextField
            id="username"
            label="Username"
            value={form.username}
            helperText="Please input Username"
            onChange={handleChange}
            sx={{marginBottom: "10px"}}
          />
          <TextField
            id="oldPassword"
            label="Old Password"
            helperText="Please input Old Password"
            type="password"
            onChange={handleChange}
          />
          <TextField
            id="newPassword"
            label="New Password"
            helperText="Please input Different Password"
            type="password"
            onChange={handleChange}
          />
          <Box sx={{display:"flex", alignItems:"center"}}>
            <Typography>Active Status</Typography>
            <Select
              id="active"
              onChange={(e)=>setForm(prev=>({...prev, active:e.target.value}))}
              value={form.active}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={()=>{patchUser(form._id)}}
          >
            Update account
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={()=>{deleteUser(form._id)}}
          >
            Delete account
          </Button>
        </Card>
      </AuthComponent>
  )
}

export default User