import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { appConfigs } from '../../../../appConfigs'

const LocationSearch = ({ setCorrdinates }) => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  //   const [corrdinates, setCorrdinates] = useState([])

  useEffect(() => {
    if (!search) {
      setResults([])
    } else {
      setLoading(true)

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${appConfigs.mapboxAccessToken}&country=hk`
        )
        .then((res) => {
          const { features } = res.data
          setResults(features)
          setLoading(false)
        })
        .catch((err) => console.error(err))
    }
  }, [search])

  return (
    <Autocomplete
      id="asynchronous-search"
      options={results}
      getOptionLabel={(option) => option?.place_name || ''}
      onChange={(_, newValue) => {
        setCorrdinates(newValue?.center || [114.1694, 22.3193])
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type a Location Name here"
          variant="outlined"
          onChange={(event) => {
            setSearch(event.target.value)
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default LocationSearch
