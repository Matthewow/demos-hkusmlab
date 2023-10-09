## HKU Smart Mobility Lab Demos

Welcome to the HKU Smart Mobility Lab Demos site. The project is supervised by Dr. Ke Jingtao from Dept. Civil Engineer, The University of Hong Kong.

The project showcases a curated selection of demos derived from our research.

### Get started

After clone the repo, run the commands below,

`npm install`

`npm start`

By default, the port is `3002`, you could modify this in `.env` file under the root dir.

### Driver-Order Matching

- Data Upload: Users can upload two types of CSV files – driver info and passenger order info.

- Matching Algorithms: The app provides two algorithms for matching:

  - Broadcast: In this approach, the e-hailing firm broadcasts the requests received from passengers to taxi drivers. The drivers are at liberty to select an order.

  - Dispatch: In this method, the platform assigns the orders requested by passengers to specific drivers. Normally, drivers are not allowed to reject the assignment.

- Radius Parameter: Users can select a radius parameter ranging from 500m to 5000m. This parameter can significantly influence the matching result.

- Results Presentation: The matching results are presented in a tabular format which can be downloaded as a CSV file for further analysis.

- Data Visualization: The application provides a map-based visualization to view the matched driver-order pairs. This can give users a spatial understanding of the matches.

This project aims to streamline and improve the efficiency of e-hailing services by providing an easy-to-use platform for data upload, matching, and visualization. We hope you find it useful and we welcome your feedback and suggestions.

### Market's Reaction w.r.t Price Fluctuation and Fleet Size

In this section, we perform a sensitivity analysis of how taxi market statistics are influenced by fluctuations in taxi driver fleet size and pricing. The fleet size and pricing mechanism are critical factors influencing the taxi market. This web app can demonstrate the varying outcomes on platform revenues, driver's monthly income, order matching rate, and driver utilization rate following alterations in fleet size and pricing. Consequently, this aids the government or operators in managing fleet control and adjusting pricing strategies.
  


### Features Progress

- [x] Driver-Order Matching
- [x] Market's Reaction w.r.t Price Fluctuation and Fleet Size
- [x] Demo Home Page
- [ ] Traffic Flow Visualization Demo 
- [ ] Integrate Picking up Animation Demo
- [ ] Refactor App with TS/JSDoc for better compatibility
