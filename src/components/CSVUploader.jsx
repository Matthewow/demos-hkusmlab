import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'

export const CSVUploader = (props) => {
  const { setterFuc, currentData } = props
  const [info, setInfo] = useState('')
  const handleCSVUpload = (data, fileInfo, originalFile) => {
    const { name, size } = fileInfo
    setInfo(`${name} - ${size}KB`)
    setterFuc(originalFile)
    console.log(data)
  }
  const handleDelete = () => {
    setInfo('')
    setterFuc(null)
  }

  return (
    <Box>
      {!!currentData ? (
        <Stack direction="row">
          <Typography variant="body2">{info}</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ marginLeft: 2 }}
          >
            delete
          </Button>
        </Stack>
      ) : (
        <Box
          style={{
            border: '1px solid #6699ff',
            borderRadius: '5px',
            padding: '10px',
            display: 'inline-block',
          }}
        >
          <label
            className="d-flex justify-content-center align-items-center btn"
            style={{
              height: 'fit-content',
              color: '#1565c0',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            <Typography variant="body2">+ Upload CSV File</Typography>
            <CSVReader
              inputId="CSVReader"
              inputStyle={{ display: 'none' }}
              onFileLoaded={handleCSVUpload}
              parserOptions={{
                header: false,
                skipEmptyLines: true,
              }}
            />
          </label>
        </Box>
      )}
    </Box>
  )
}
