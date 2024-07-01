import { useState } from 'react'
import './App.css'
import { Box, Button, Container } from '@mui/material'
import FormsStepper from './components/Formstepper/FormsStepper'

function App() {
  const [formClick, setFormCLick] = useState(false)

  return (
    <Box sx={{ height:"100vh",display:"flex",marginTop:"100px",}} id="app">
      {
        !formClick ?
          <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <Button variant="contained" onClick={() => setFormCLick(true)}>Add Item</Button>
          </Box>
          :
          <Container sx={{display:"flex"}}>
              <FormsStepper />
          </Container>
      }
    </Box>
  )
}

export default App
