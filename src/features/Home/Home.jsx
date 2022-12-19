import { Box, List, ListItem, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { MainContext } from '../../contexts/MainContext'

const Home = () => {

  const {accessToken} = useContext(MainContext)
  const instruction =[
    "1. Click Register to create your own account",
    "2. Click Login if you already have an account",
    "3. Type Title and Description, then click Add Note to create New Note",
    "4. Click Edit to edit existing note, and Delete to remove it",
    "5. Click on Profile to for Account Settings"
  ]
 
  return (
    <Box sx={{display:"flex", alignItems:"center", flexDirection:"column", marginTop:"20px"}}>
      <Typography>Welcome to</Typography> 
      <Typography 
      variant='h2'
      className="Title"
      sx={{marginBottom:"20px"}}>
        Todo yern?
      </Typography>
      <Typography>Instruction</Typography>
      <List>
        {instruction.map(each => <ListItem key={each}>{each}</ListItem>)}
      </List>
      
      
      
      
    </Box>
  )
}

export default Home