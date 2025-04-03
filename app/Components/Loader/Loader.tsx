import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div>
       <CircularProgress size="6rem" sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'primary.main',
            }} />
    </div>
  )
}

export default Loader
