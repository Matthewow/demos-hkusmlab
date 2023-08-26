## Driver-Order Matching

Welcome to the Driver-Order Matching Web App. The project is supervised by Dr. Ke Jingtao of the HKU Smart Mobility Lab.

This web application offers a platform for users to upload driver and passenger order information through CSV files. The primary goal is to efficiently match drivers with passengers based on the uploaded data.

### Get started

After clone the repo, run the commands below,

`npm install`

`npm start`

By default, the port is `3002`, you could modify this in `.env` file under the root dir.

### Features

- Data Upload: Users can upload two types of CSV files – driver info and passenger order info.

- Matching Algorithms: The app provides two algorithms for matching:

  - Broadcast: In this approach, the e-hailing firm broadcasts the requests received from passengers to taxi drivers. The drivers are at liberty to select an order.

  - Dispatch: In this method, the platform assigns the orders requested by passengers to specific drivers. Normally, drivers are not allowed to reject the assignment.

- Radius Parameter: Users can select a radius parameter ranging from 500m to 5000m. This parameter can significantly influence the matching result.

- Results Presentation: The matching results are presented in a tabular format which can be downloaded as a CSV file for further analysis.

- Data Visualization: The application provides a map-based visualization to view the matched driver-order pairs. This can give users a spatial understanding of the matches.

This project aims to streamline and improve the efficiency of e-hailing services by providing an easy-to-use platform for data upload, matching, and visualization. We hope you find it useful and we welcome your feedback and suggestions.
