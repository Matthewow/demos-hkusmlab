import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export const MatchResult = () => {
  const columns = [
    { field: 'order_id', headerName: 'Order ID', width: 130 },
    { field: 'order_region', headerName: 'Order Region', width: 130 },
    { field: 'driver_id', headerName: 'Driver ID', width: 130 },
    { field: 'driver_region', headerName: 'Driver Region', width: 130 },
    { field: 'radius', headerName: 'Radius', width: 130 },
  ]

  const rows = [
    {
      id: 1,
      order_id: 1,
      order_region: 'Kowloon',
      driver_id: 1,
      driver_region: 'Kowloon',
      radius: 1,
    },
    {
      id: 2,
      order_id: 2,
      order_region: 'Kowloon',
      driver_id: 2,
      driver_region: 'Kowloon',
      radius: 2,
    },
    {
      id: 3,
      order_id: 3,
      order_region: 'Kowloon',
      driver_id: 3,
      driver_region: 'Kowloon',
      radius: 3,
    },
  ]
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </>
  )
}
