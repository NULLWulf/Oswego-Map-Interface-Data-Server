# 🗺️ [SUNY Oswego Asset Map Interface](https://oswego-map.herokuapp.com/) 🗺️
Currently, a test deployment is running on a Heroku Dyno.  A work-flow is set up to keep the dyno awake.
## :question: Description :question:
A MapboxGL-JS driven front-end application meant to provide a visual means of interacting with SUNY Oswego's inventory 
system.  "Inventory" in this case can be anything from a smoke detector to a building itself.  Currently, the assets are
presented in parent-child relationship with the building's serving as a prent to the smaller assets. The web application is powered
by a Spring Boot web server API for serving web content as well as data from a SQL based database.
### :ballot_box_with_check: Current Features :ballot_box_with_check:
- Essential map controls (zoom, rotate, pitch, etc.), Satellite/Stylistic toggle 
- Map meta-data updates on mouse movement, touchscreen interaction
- Campus region quick navigation drop-down
- Building Data Context Box
  - Populates upon interaction
  - Populates list of assets belonging to buildings
  - Map centers on building upon click
  - Shows image in heading if image available
- Asset Data Context Box
  - Populates upon selection via asset dropdown in building context box
  - Refocus parent building (say if map moves out of view)
- Data Storage
  - Sample data of assets and buildings currently stored in H2 in-memory database
  - Building data also stored in MapBox tileset (GeoJSON)
### :soon: Proposed Features :soon:
- Optimize for mobile devices
- Search functionality for finding assets
- Connectivity with production sized SQL database
  - Use H2 only for testing
- More useful data layers such as:
  - Specific equipment locations
  - Malfunctioning equipment
  - Live data of equipment metrics
- Direct integration with AIM Assetworks via API
- Energy Usage Map (likely its own project)
### ❗ Known Issues ❗
- Requires more datasets as well as variety of data to experiment with additional data layers
- Requires a styling overhaul
- Limited asset data available currently
    - When larger data sets are available will require more efficient means of sorting, filtering, paging etc.
- Limited exception handling for both front and back-end
## :hammer_and_wrench: Languages, Tools, Tech :hammer_and_wrench:

### 🖥️ Tech Stack 🖥️
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/apache/apache-original-wordmark.svg"  title="Apache" alt="Apache" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/gilbarbara/logos/blob/master/logos/chrome.svg"  title="Chrome" alt="Chrome" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" title="Git" alt="Git" width="40" height="40" />&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/github/github-original.svg"  title="GitHub" alt="GitHub" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/heroku/heroku-original-wordmark.svg"  title="Heroku" alt="Heroku" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/java/java-original-wordmark.svg" title="Java" alt="Java" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/jetbrains/jetbrains-original.svg" title="Jet Brains" alt="Jet Brain" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/gilbarbara/logos/blob/master/logos/maven.svg" title="Maven" alt="Maven" width="50" height="50"/>&nbsp;
  <img src="./src/main/resources/static/images/branding/logo-svg/mapbox-logo-black.svg" title="MapBox" alt="MapBox" width="50" height="50"/>&nbsp;
  <img src="https://github.com/gilbarbara/logos/blob/master/logos/mysql-icon.svg" title="MySql" alt="MySql" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="NPM" alt="NPM" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original-wordmark.svg" title="Spring" alt="Spring" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg" title="VSCode" alt="VSCode" width="40" height="40"/>&nbsp;
</div>

### 🌱 Environment 🌱
- Frontend
  - [Javascript ES5+](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/src/main/resources/static/js/map.js), [HTML5](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/src/main/resources/static/index.html), [CSS3](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/src/main/resources/static/css/style.css) (Project Files)
  - [Mapbox-GL-JS Vector Map Framework](https://docs.mapbox.com/mapbox-gl-js/api/)
  - [NPM](https://www.npmjs.com/)
    - [package.json](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/src/main/resources/static/package.json)
    - [package-lock.json](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/src/main/resources/static/package-lock.json)
- Backend
  - [Java SE 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
    - [src](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/tree/main/src)
  - [Maven](https://maven.apache.org/)
    - [pom.xml](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/pom.xml)
  - [Spring Boot](https://spring.io/projects/spring-boot)
    - Spring JPA
    - Spring MVC
    - Spring Rest Controller
    - and more
- Development
  - [H2 In-Memory Database](https://www.h2database.com/html/main.html)
  - [Spring Boot Developer Tools](https://docs.spring.io/spring-boot/docs/2.1.5.RELEASE/reference/html/using-boot-devtools.html)
- Deployment
  - Heroku dyno with continuous integration handled through Heroku-20 Java Buildpack

For a full list of dependencies visit the [Dependency Graph](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/network/dependencies).

### :building_construction: [Project Directory Structure](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/blob/main/docs/structure.md) :building_construction:

## :handshake: Contributing :handshake:
There are numerous ways for this project to be improved upon.  We feel one of the best ways to see this project
fleshed out and actualized over time is to open it up to open-source contributing in addition to whomever may be working
on it on an official basis.  Contributions can come from anyone whether they be hobby programmers, staff and or other students
at the SUNY Oswego Campus or elsewhere. It's also possible to potentially refactor this project to suit your own campus's
needs.
### :sos: Ways To Help :sos:
- Conversion of front-end to a well known front-end framework (React, Angular, etc.)
  - Recommend reaching out to repo owner before experimenting and implementing such changes
- Improvements to anything listed in **[Current Features](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server#ballot_box_with_check-current-features-ballot_box_with_check)**
- Addition of anything listed in **[Proposed Features](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server#soon-proposed-features-soon)**
- Addressing anything listed in **[Known Issues](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server#-known-issues-)**
- Modification or Alternative Mapbox Styles
  - [Active Mapbox Style for Copying](https://api.mapbox.com/styles/v1/suny-oswego/cl3bphxsb005s14qz971ul1vq.html?title=copy&access_token=pk.eyJ1Ijoic3VueS1vc3dlZ28iLCJhIjoiY2wzYm90eWhrMDB4ZTNpb2R2OTRtZ2dsZSJ9.iZWk7zC3_UlciiXyaX4PWQ&zoomwheel=true&fresh=true#15.99/43.452543/-76.543031/-39.3)
  - Create a pull-request and link a copy of your Mapbox style for consideration in the comments
### :ladder: Steps to Contribute :ladder:
1. Fork the Main Repository
2. Commit and push any changes to forked repository
3. Create a pull request describing changes, additions, etc. made to project
4. Wait for repo owner review and acceptance of contribution
   - First time contributors will likely have contribution examined in depth before acceptance
5. If Accepted, repo owner will merge in main repository
6. Update forked repository accordingly

### ⚖️ Contribution Guidelines ⚖️
- The content of contributions must comply with the [SUNY Oswego Code of Conduct](https://www.oswego.edu/policies)
- Other SUNY Oswego policies as applicable
- Must add some sort of measurable value to the project
- May not contain any sort of intentionally malfunction causing or malicious code
- May not be re-used for commercial use

## 🎗️ Credits 🎗️
#### :copyright: 2022 [SUNY Oswego Facility Services](https://www.oswego.edu/facilities-services/facilities-services-0)
#### :writing_hand: Project Originator [Nathaniel Wolf](https://github.com/nullwulf)