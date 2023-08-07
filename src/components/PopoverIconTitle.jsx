import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Popover, Stack } from '@mui/material'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined'

export const PopoverIconTitle = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="h6" sx={{ paddingY: 3 }}>
        {props.title}
      </Typography>
      <HelpOutlinedIcon
        sx={{ color: '#6699ff' }}
        onMouseEnter={(e) => {
          setAnchorEl(e.currentTarget)
        }}
        onMouseLeave={() => setAnchorEl(null)}
      />
      <Popover
        id="radius-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
      >
        <Box maxWidth={300}>{props.popoverContent}</Box>
      </Popover>
    </Stack>
  )
}
