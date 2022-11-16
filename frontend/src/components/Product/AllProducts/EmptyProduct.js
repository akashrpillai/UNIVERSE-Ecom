import React from 'react';
import { Typography } from '@mui/material';



const EmptyProduct = () => {
 
  return (
    <div className='emptyView-wrap'>
      <Typography variant='h4'>No Products To Show</Typography>
      <img src='/emptyimage.gif' alt='' />
    </div>
  )
}

export default EmptyProduct