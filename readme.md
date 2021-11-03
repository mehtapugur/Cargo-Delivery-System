<p align="center">
  <a href="#calling-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-main-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#camera_flash-screenshots">Screenshots</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-setup">Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#file_folder-project-folder-structure">Structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#rocket-project-history">History</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/24686636/139897266-b63db28f-0d24-49cd-803e-bedbcf3923bd.png" alt="title" />
</div>

## :calling: About
Cargo Delivery System is a desktop application that allows cargo companies to track their cargo and determine a route for the courier.

## :gear: Technologies

- [Firebase](https://github.com/firebase/firebase-ios-sdk)
- [Google Maps API](https://developers.google.com/maps)
- [Electron.js](https://www.electronjs.org/)
- [JavaScript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/en/)
- [CSS](https://www.w3schools.com/css/)
- [HTML](https://www.w3schools.com/html/)

Database operations of this application are designed with Firebase Realtime Database and Firebase Authentication.<br/>
Google Cloud, Google Maps API and Google Directions API are used for map operations.<br/>
It was developed with Electron.js to be a desktop application. <br/>
JavaScript and NodeJS are used for background processes.<br/>
CSS is used for styling.
<br/>

## :sparkles: Main Features

  - Cargo information is kept in Firebase and updated dynamically.
  - Users must register to use the application.
  - Cargoes in the database are listed.
  - Users can change the status of cargoes and delete them.
  - Cargo locations are shown on the map.
  - The markers of the cargoes with a "true" send value are deleted from the map.
  - Users can save a cargo address to the database by clicking on the map. A marker is created at the clicked place on the map.
  - The shortest path is drawn for the first two cargo locations in the database.

## :camera_flash: Screenshots

| Home | 
| --- | 
| <img src="https://user-images.githubusercontent.com/24686636/139913804-64b32830-c50c-4efb-928f-6ba8e8c8e1b3.png" width="600px"> |

  - The application has home page for login.
  - Users can register to the application with **Signup** button.
  - Registered users can login to the application with **Login** button.
  - When the users logs in, they will see the **Cargo** page with address, status and logout options.
  - **Note**: Password must be at least 8 characters.<br/><br/>

| Cargo | Logout | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139920166-1bac2ecd-4526-49e8-a8d6-3d74a50a01bc.png) | ![Preview](https://media.giphy.com/media/0BdQhGuevErtCfVVJ3/giphy.gif) |

  - Users can go to the **Address Page** with the address button.
  - Users can go to the **Status Page** with the status button.
  - Users can log out by pressing the **Logout** button.<br/><br/>

| Address | Map | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139924222-8ce09c47-771f-442b-9c70-ecdbd9ecca48.png) | ![Preview](https://media.giphy.com/media/TuFP8wtAsy8qo4YoKN/giphy.gif) |

  - The latitude and longitude information of the cargoes in the database are listed on the **Address Page**.
  - Users can open the Map page with the **Open Map** button.<br/><br/>

| Status | Map | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139925533-34187488-d284-47bb-9120-e8e6de5fcd51.png) | <img src="https://media.giphy.com/media/1J0KMKTZJiy94kiR2d/giphy.gif" width="720px"> |

  - The latitude and longitude information of the cargoes in the database are listed on the **Status Page**.
  - The status of the cargoes is shown, if the **send** information is "true", that is, if it has been sent, it checks the checkbox.
  - The cargo location with "true" send information is deleted from the map, the marker is deleted.
  - Users can delete the cargoes by pressing the **X** button.
  - Users can **Save** cargo with the latitude and longitude values they type.
  - Users can open the Map page with the **Open Map** button.
  - The shortest path is drawn for the first two cargo locations in the database.<br/>

## :computer: Setup
  
  - To run the project, NodeJS must be installed on your computer. After completing these installations, we open the git terminal. We write the following expression ``git clone https://github.com/mehtapugur/Cargo-Delivery-System.git`` and press the enter button. After opening the downloaded project in the code editor, we download the project dependencies by typing ``npm install`` in the terminal. After this process is finished, we run the project by typing ``npm start`` in the terminal. <br/><br/>
   
## :file_folder: Project Folder Structure
    
    Cargo-Delivery-System
    .
    |
    ├── src
    |    └── cargo
    |       └── address
    |          └── address.css
    |          └── address.html
    |          └── address.js
    │       └── map
    |          └── map.html
    |          └── map.js
    │       └── status  
    |          └── status.css
    |          └── status.html
    |          └── status.js
    │       └── cargo.css     
    │       └── cargo.html
    |       └── cargo.js
    │    └── main.css 
    │    └── main.html
    |    └── main.js
    |
    ├── index.js
    |
    ├── project-diary.md
    │                 
    ├── readme.md    
    |
<br/>

## :rocket: Project History

<a href="https://github.com/mehtapugur/Cargo-Delivery-System/blob/main/project-diary.md">Here<a/>, the project has a 15-day development period in Turkish. You can read if you want.<br/><br/>

## :memo: License
This project is under the terms of the MIT license.
<br/>
<br/>
Contact: [LinkedIn](https://www.linkedin.com/in/mehtapugur)
