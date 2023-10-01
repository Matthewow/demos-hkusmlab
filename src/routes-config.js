import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { HomePage } from './pages/Home'
import { MarketReactionPage } from './pages/MarketReaction'
import { SimulatorPlatform } from './pages/SimulatorPlatform'

export const RoutesConfig = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
  },
  {
    name: 'Driver Order Matching with Broadcasting and Dispatching',
    path: '/driver-order-matching',
    component: <DriverOrderMatchingPage />,
  },
  {
    name: "Market's Reaction w.r.t Price Fluctuation and Fleet Size",
    path: '/market-reaction',
    component: <MarketReactionPage />,
  },
  {
    name: '[Video] A Large-scale simulation platform for ride-hailing services in Manhattan, NYC',
    path: '/simulation-platform',
    component: <SimulatorPlatform />,
  },
]
