import { Box, Button, Card, CardContent, Checkbox, TextField, Typography } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { MainContext } from '../../contexts/MainContext'
import AuthComponent from '../../components/AuthComponent'

const Note = () => {
  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({title:"", text:""})
  const [editForm, setEditForm] = useState({title:"", text:"", completed:false, _id:""})
  
  const {accessToken} = useContext(MainContext)

  useEffect(() => {
    getNotes(accessToken)
  }, [])
  
  const getNotes = (token) => {
    axios.get(
      'http://localhost:8000/notes',
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res=>{
        setNotes(res.data)
      })
      .catch(err=> {
        console.log(err)
        if (err.response.status===400) setNotes([])
      })
  }
  const addNote = async (e) => {
    e.preventdefault
    console.log(form)
    await axios.post(
      'http://localhost:8000/notes',
      form,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res=>{
        getNotes(accessToken)
      })
      .catch(err=> {
        console.log(err)
      })
  }
  const patchNote = async (id) => {
    await axios.patch(
      `http://localhost:8000/notes/${id}`,
      editForm,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res=>{
        setEditForm({})
        getNotes(accessToken)
      })
      .catch(err=> {
        console.log(err)
      })
  }

  const deleteNote = async (id) => {
    setEditForm({})
    await axios.delete(
      `http://localhost:8000/notes/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res=>{
        if (id===editForm._id) setEditForm({})
        getNotes(accessToken)
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
  const handleEdit = (e) => {
    const { value , id } = e.target
    setEditForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  return (
    <AuthComponent>
     <Box sx={{display:"flex", gap:"100px"}}>
      <Box>
          <Typography>Create a new Todo</Typography>
          <Card
            component = "form"
            noValidate
            autoComplete="off"
            sx={{ display:"flex", flexDirection:"column", alignItems:"flex-start", width:"300px",height:"min-content",background:"rgb(255,255,190)", padding:"20px", marginBottom:"20px"}}>
            <TextField
              id="title"
              label = "Title"
              variant="standard"
              onChange={handleChange}
              sx={{width:"80%", marginBottom:"10px"}}
            />
            <TextField
              id="text"
              label = "Description"
              onChange={handleChange}
              variant="standard"
              sx={{width:"100%"}}
              rows={4}
              multiline
            />
            <Button 
              variant="text" 
              onClick={addNote} 
              sx={{marginLeft:"auto", marginTop: "10px"}}
            >
              Add ToDo
            </Button>
          </Card>
          {(editForm._id) &&
            <Box>
              <Typography>Edit Todo entitled: {editForm.title}</Typography>
              <Card
                component = "form"
                noValidate
                autoComplete="off"
                sx={{ display:"flex", flexDirection:"column", alignItems:"flex-start", width:"300px",height:"min-content",background:"rgb(255,255,190)", padding:"20px"}}>
                <Box sx={{display:"flex",width:"100%", alignItems:"Center"}}>
                  <Checkbox
                    id="completed"
                    checked={editForm.completed} 
                    onChange={()=>setEditForm(prev => ({...prev, completed:!prev.completed}))}
                  />
                  <Typography 
                    variant="h7" 
                    sx={{marginRight:"auto"}}
                  >
                    Completed
                  </Typography>
                  <Button 
                    variant="text" 
                    color="error" 
                    onClick={()=>setEditForm({})}
                  >
                    Close
                  </Button>
                </Box>
                <TextField
                  id="title"
                  label = "Title"
                  value={editForm.title}
                  variant="standard"
                  onChange={handleEdit}
                  sx={{width:"80%", marginBottom:"10px"}}
                />
                <TextField
                  id="text"
                  label = "Description"
                  value={editForm.text}
                  onChange={handleEdit}
                  variant="standard"
                  sx={{width:"100%"}}
                  rows={4}
                  multiline
                />
                <Button 
                  variant="text" 
                  onClick={()=>patchNote(editForm._id)} 
                  sx={{marginLeft:"auto", marginTop: "10px"}}
                >
                  Save
                </Button>
              </Card>
            </Box>
          }
          
        </Box>
        <Box sx={{width:"350px", marginTop:"25px"}}>
          {(notes.length!==0) ? notes.map(each => 
            {console.log(each.completed)
            return <Card key={each._id} sx={{marginBottom: "15px", background:"rgb(255,255,190)"}}>
              <CardContent>
                <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"flex-start"}}>
                  <Checkbox checked={each.completed} disabled/>
                  <Box sx={{display:"flex", flexDirection:"column", height:"min-content"}}>
                    <Typography variant="h6" sx={{textTransform:"Capitalize", margin:"5px 0px", fontWeight:"bold", whiteSpace:"nowrap",overflow: "hidden",textOverflow: "ellipsis", maxWidth: "200px"}}>
                      {each.title}
                    </Typography>
                    <Typography variant="h8" sx={{inlineSize:"225px", overflowWrap:"break-word", maxHeight:"100px"}}>
                    {each.text}
                    </Typography>
                  </Box>
                  <Box>
                    <Button color="error" onClick={()=>deleteNote(each._id)} size="small" sx={{marginLeft:"auto", marginRight:"5px"}}>
                      Delete
                    </Button>
                    
                    <Button color="info" onClick={()=>setEditForm(each)} size="small" sx={{marginLeft:"auto", marginRight:"5px"}}>
                      Edit
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>}) :
            <>
              <Typography>No Todo to display</Typography>
              <Typography>Create your first Todo.</Typography>
            </>
          }
        </Box>
      </Box>
    </AuthComponent>
  )
}

export default Note