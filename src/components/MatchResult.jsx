import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export const MatchResult = (props) => {
  const columns = [
    { field: 'order_id', headerName: 'Order ID', width: 130 },
    { field: 'order_region', headerName: 'Order Region', width: 130 },
    { field: 'driver_id', headerName: 'Driver ID', width: 130 },
    { field: 'driver_region', headerName: 'Driver Region', width: 130 },
    { field: 'radius', headerName: 'Radius', width: 130 },
  ]

  return (
    <>
      <DataGrid
        rows={props.rows}
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