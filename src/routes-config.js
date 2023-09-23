import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { HomePage } from './pages/Home'
import { MarketReactionPage } from './pages/MarketReaction'

export const RoutesConfig = [
  {
    name: 'Home',
    path: '/',
    component: <HomePage />,
  },
  {
    name: 'Driver Order Matching with Broadcast and Dispatchg',
    path: '/driver-order-matching',
    component: <DriverOrderMatchingPage />,
  },
  {
    name: "Market's Reaction w.r.t Price Fluctuation and Fleet Size",
    path: '/market-reaction',
    component: <MarketReactionPage />,
  },
]
