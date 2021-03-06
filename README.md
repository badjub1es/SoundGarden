# SoundGarden
SoundGarden is a SoundCloud inspired music sharing application. Access the [SoundGarden MVP](https://github.com/badjub1es/SoundGarden/wiki/MVP).
SoundGarden is an application for sharing music with other local Artists. 

# Index
| [MVP Feature List](https://github.com/badjub1es/SoundGarden/wiki/MVP) | [Database Schema](https://github.com/badjub1es/SoundGarden/wiki/Database-Schema)

# Technologies Used
<a src="google.com"> <img src="https://user-images.githubusercontent.com/24263351/157998349-284820ed-dff1-4ddb-ace8-620da40907a8.png" alt="drawing" width="75"/> </a><img src="https://cdn-media-1.freecodecamp.org/images/LwOjDA5I0tNxHZPOuhTS9abq4Bc3FxMr1SJQ" alt="drawing" width="150"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="drawing" width="75"/><img src="https://expressjs.com/images/express-facebook-share.png" alt="drawing" width="75"/><img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/postgresql_original_wordmark_logo_icon_146392.png" alt="drawing" width="75"/><img src="https://opencollective-production.s3.us-west-1.amazonaws.com/566dd3f0-27a8-11ec-9a5a-0519330cdfea.png" alt="drawing" width="75" background-color="white"/><img src="https://www.kindpng.com/picc/m/464-4640184_css3-png-download-css-icon-transparent-png.png" alt="drawing" width="75" background-color="white"/><img src="https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png" alt="drawing" width="75" background-color="white"/><img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="drawing" width="75" background-color="white"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png" alt="drawing" width="75" background-color="white"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Amazon-S3-Logo.svg/1200px-Amazon-S3-Logo.svg.png" alt="drawing" width="75" background-color="white"/>

# Getting Started

* Clone this repo.
  ```sh
  git clone git@github.com:badjub1es/SoundGarden.git
  ```
* Install dependencies from the root directory.
  ```sh
  npm i
  ```
* Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
  ```sh
  CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
  ```
* Create a .env file in the backend directory based on the .env example found within the respective directory.
* Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for you JWT_SECRET, your desired PORT (preferably 5000), and your AWS S3 Bucket credentials. 
* Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match yourt PORT configuration found in your .env file.
  ```sh
  "proxy": "http://localhost:5000"
  ```
* You can use the Demo user or create an account to begin using SoundGarden

# Features 
Logged in users can perform the following: 
*  Upload, View, Update, and Delete audio files. 
*  Create, View, Update, and Delete personal song playlists. 
*  Use the Discover tabs search functionality to find other artists on the platform. 
