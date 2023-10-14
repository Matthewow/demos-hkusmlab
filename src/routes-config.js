import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { HomePage } from './pages/Home'
import { MarketReactionPage } from './pages/MarketReaction'
import { SimulatorPlatform } from './pages/SimulatorPlatform'
import { TrafficFlowVisualization } from './pages/TrafficFlowVisualization'

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
    description: `This demo presents a novel approach for visualizing real-time urban road traffic flow in Hong Kong. By harnessing the power of advanced geospatial technologies and traffic sensor data, we have developed an interactive map interface that provides comprehensive insights into the city's dynamic traffic patterns. Users can view the overall traffic situation at a glance or delve into more granular details by simply clicking on a specific road on the interactive map. The clicked road segment reveals current traffic flow data, including the number of vehicles traversing that route in real-time. This system not only aids in understanding the current state of traffic but also provides valuable data for urban planning, traffic management, and policy-making. With its user-friendly design and real-time data access, this visualization tool serves as a valuable resource for city planners, traffic engineers, and the general public alike, contributing to more informed decisions and smarter, more sustainable urban development.`,
  },
]
