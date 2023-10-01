import React from 'react'
import 'echarts-gl'
import ReactEcharts from 'echarts-for-react'
import { get3DArray } from '../data/marketReactionData'

export default function Surface3D({ props }) {
  const data = get3DArray(props.index)

  const getOption = () => {
    return {
      tooltip: {
        formatter: function (params) {
          return (
            'Price Fluctuation: ' +
            params.value[0] +
            '<br>' +
            'Fleet Size: ' +
            params.value[1] +
            '<br>' +
            `${props.title}: ` +
            params.value[2]
          )
        },
      },
      backgroundColor: '#fff',
      visualMap: {
        show: false,
        dimension: 2,
        min: props.zAxisMin,
        max: props.zAxisMax,
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
        name: 'Price Fluctuation',
        type: 'value',
        min: 0.7,
        max: 1.3,
      },
      yAxis3D: {
        name: 'Fleet Size',
        type: 'value',
        min: 15600,
        max: 20400,
      },
      zAxis3D: {
        name: props.title,
        type: 'value',
        min: props.zAxisMin,
        max: props.zAxisMax,
      },
      grid3D: {
        viewControl: {
          projection: 'orthographic',
        },
      },
      series: [
        {
          name: props.title,
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
          barSize: 9,
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
