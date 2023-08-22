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

  const rows = props.rows.map((item, index) => {
    return {
      id: index + 1,
      order_id: item.order_id,
      order_region: item.order_region,
      driver_id: item.driver_id,
      driver_region: item.driver_region,
      radius: item.radius,
    }
  })

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
        disableRowSelectionOnClick
        // checkboxSelection
      />
    </>
  )
}
