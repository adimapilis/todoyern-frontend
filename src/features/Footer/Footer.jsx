import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{
      borderTop:"solid 1px rgba(0,0,0,.15)",
      position:"fixed",
      bottom:"0px",
      left:"0px",
      right:"0px",
      textAlign:"end",
      paddingRight:"20px",
      background:"White"
    }}>
      &#169; Adrian Dimapilis
    </Box>
  )
}

export default Footer