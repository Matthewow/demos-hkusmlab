import React from 'react'
import 'echarts-gl'
import ReactEcharts from 'echarts-for-react'
import { get3DArray } from '../data/marketReactionData'

export default function Surface3D({ field = 2, zMin = 0, zMax = 1 }) {
  const data = get3DArray(field)
  console.log(data)

  const getOption = () => {
    return {
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: false,
        dimension: 2,
        min: zMin,
        max: zMax,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
      },
      xAxis3D: {
        type: 'value',
        min: 0.7,
        max: 1.3,
      },
      yAxis3D: {
        type: 'value',
        min: 15600,
        max: 20400,
      },
      zAxis3D: {
        type: 'value',
        min: zMin,
        max: zMax,
      },
      grid3D: {
        viewControl: {
          projection: 'orthographic',
        },
      },
      series: [
        {
          name: 'Price Fluctuation',
          type: 'bar3D',
          wireframe: {
            show: true,
          },
          data: data,
          shading: 'lambert',
          label: {
            formatter: function (param) {
              return param.value[2].toFixed(1)
            },
          },
          barSize: 10,
        },
      ],
    }
  }

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '600px', width: '100%' }}
    />
  )
}
