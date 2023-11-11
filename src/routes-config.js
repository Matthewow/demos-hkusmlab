import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { HomePage } from './pages/Home'
import { MarketReactionPage } from './pages/MarketReaction'
import { SimulatorPlatform } from './pages/SimulatorPlatform'
import { TrafficFlowVisualization } from './pages/traffic-flow-visualization/TrafficFlowVisualization'
import { NavigationRideHailingPage } from './pages/navigation-ride-hailing/NavigationRideHailing'

export const RoutesConfig = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
    description: '',
  },
  {
    name: 'Driver Order Matching with Broadcasting and Dispatching',
    path: '/driver-order-matching',
    component: <DriverOrderMatchingPage />,
    description: `The taxi market operates under two matching methods - dispatch and 
    broadcast. In our provided app, you can select the matching mode, then upload the
    travel request information from drivers and passengers, and subsequently
    obtain the matching results. You have the option to download these results
    or display them on a map.`,
  },
  {
    name: "Market's Reaction w.r.t Price Fluctuation and Fleet Size",
    path: '/market-reaction',
    component: <MarketReactionPage />,
    description: `In this section, we perform a sensitivity analysis of how taxi market statistics are influenced by fluctuations in taxi driver fleet size and pricing. The fleet size and pricing mechanism are critical factors influencing the taxi market. This web app can demonstrate the varying outcomes on platform revenues, driver's monthly income, order matching rate, and driver utilization rate following alterations in fleet size and pricing. Consequently, this aids the government or operators in managing fleet control and adjusting pricing strategies.`,
  },
  {
    name: '[Video] A Large-scale simulation platform for ride-hailing services in Manhattan, NYC',
    path: '/simulation-platform',
    component: <SimulatorPlatform />,
    description: `This is a large-scale simulation platform for managing and controlling
    ride-hailing vehicles. The simulator platform can be used to simulate the
    movements and trajectories of ride-hailing vehicles for idle cruising,
    picking up passengers, and delivering passengers on a large-scale
    transportation network. The simulation platform is calibrated by a real
    dataset in Manhattan NYC to ensure that the simulation well approximates
    the reality. This simulator is jointly developed by the teams of Dr.
    Jintao Ke at HKU and Prof. Hai Yang at HKUST. The simulation platform will
    be open for public use in the near future.`,
  },
  {
    name: 'Visualization of Urban Road Traffic Flow in Hong Kong',
    path: '/hk-traffic-flow',
    component: <TrafficFlowVisualization />,
    description: `This demo showcases an interactive map interface for real-time traffic flow visualization in Hong Kong. Utilizing advanced geospatial technologies and sensor data, it provides detailed insights into city-wide traffic patterns. Users can view the overall traffic scenario or access granular data for specific roads, including real-time vehicle counts. This tool is valuable for urban planning, traffic management, and policy-making, aiding in data-driven decisions for sustainable city development. It serves city planners, traffic engineers, and the public with its accessible design and real-time data.`,
  },
  {
    name: 'Urban Navigation for Ride-Hailing Drivers in Hong Kong.',
    path: '/urban-navigation',
    component: <NavigationRideHailingPage />,
    description: `"Urban Navigation for Ride-Hailing Drivers in Hong Kong" investigates the navigation methods employed by taxi and Uber drivers. It explores the challenges they face in efficiently picking up passengers and finding optimal routes in Hong Kong's dynamic urban landscape. The study examines factors such as traffic patterns, road infrastructure, and digital mapping applications to enhance understanding and develop strategies for improving the navigation experience. The findings aim to benefit both drivers and passengers in the ride-hailing industry.`,
  },
]
