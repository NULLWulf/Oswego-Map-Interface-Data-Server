# SUNY Oswego Asset Map Interface

## :globe_with_meridians: [Test Deployment](https://oswego-map.herokuapp.com/) :globe_with_meridians:
Currently, a test deployment is running on a Heroku Dyno.  A work-flow is set up to keep the dyno awake, so there should
not be any downtime. 

## :question: Description :question:
A MapboxGL-JS driven front-end application meant to provide a visual means of interacting with SUNY Oswego's inventory 
system.  "Inventory" in this case can be anything from a smoke detector to a building itself.  Currently, the assets are
presented in parent-child relationship with the building's serving as a prent to the smaller assets.  Currently, powered
by a Spring Boot web server API to serving web content as well as data from a SQL based database.

### Current Features

### Proposed Future Features


## :hammer_and_wrench: Languages and Tools :hammer_and_wrench:
Visual Representation of the various languages, tools, and some frameworks used in this project.  This list is not exhaustive.  For a full list of dependencies visit the [Dependency Graph](https://github.com/dmpippin/Oswego-Map-Interface-Data-Server/network/dependencies).
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

***
## :building_construction: Project Structure :building_construction:
```
├── Procfile
├── README.md
├── mvnw
├── mvnw.cmd
├── pom.xml
├── printTree.zshrc
├── src
│   ├── main
│   │   ├── java
│   │   │   └── edu
│   │   │       └── oswegofs
│   │   │           └── mapdataserver
│   │   │               ├── AssetController.java
│   │   │               ├── AssetRepository.java
│   │   │               ├── Assets.java
│   │   │               ├── MapDataServerApplication.java
│   │   │               ├── Property.java
│   │   │               ├── PropertyController.java
│   │   │               ├── PropertyRepository.java
│   │   │               ├── ServletInitializer.java
│   │   │               └── WebController.java
│   │   └── resources
│   │       ├── application-heroku.properties
│   │       ├── application.properties
│   │       ├── data.sql
│   │       └── static
│   │           ├── css
│   │           │   └── style.css
│   │           ├── data
│   │           │   ├── TMA_BUILDINGS_04_17_2021.xlsx
│   │           │   ├── building-locations.csv
│   │           │   ├── buildingsExcelMaster.xlsx
│   │           │   ├── buildingsFromMapBox.geojson
│   │           │   ├── data-issues.txt
│   │           │   └── repositioner.xlsx
│   │           ├── fonts
│   │           │   ├── ITCSymbolStd-Black.otf
│   │           │   └── ItcSymbol-Black.otf
│   │           ├── images
│   │           │   ├── branding
│   │           │   │   ├── FacilitiesLogo.png
│   │           │   │   ├── inverted_fs.png
│   │           │   │   ├── logo-svg
│   │           │   │   │   └── mapbox-logo-black.svg
│   │           │   │   └── oswego_logo_234x84_blk (1).gif
│   │           │   └── building-images
│   │           │       ├── 0001.jpg
│   │           │       ├── 0002.jpg
│   │           │       ├── 0003.jpg
│   │           │       ├── 0003A.jpg
│   │           │       ├── 0003B.jpg
│   │           │       ├── 0004.jpg
│   │           │       ├── 0004A.jpg
│   │           │       ├── 0005.jpg
│   │           │       ├── 0005A.jpg
│   │           │       ├── 0006.jpg
│   │           │       ├── 0007.jpg
│   │           │       ├── 0008.jpg
│   │           │       ├── 0009.jpg
│   │           │       ├── 0010.jpg
│   │           │       ├── 0011.jpg
│   │           │       ├── 0012.jpg
│   │           │       ├── 0013.jpg
│   │           │       ├── 0014.jpg
│   │           │       ├── 0015.jpg
│   │           │       ├── 0015A.jpg
│   │           │       ├── 0015B.jpg
│   │           │       ├── 0017.jpg
│   │           │       ├── 0019.jpg
│   │           │       ├── 0020.jpg
│   │           │       ├── 0021.jpg
│   │           │       ├── 0022.jpg
│   │           │       ├── 0023.jpg
│   │           │       ├── 0024.jpg
│   │           │       ├── 0026.jpg
│   │           │       ├── 0028.jpg
│   │           │       ├── 0029.jpg
│   │           │       ├── 0031.jpg
│   │           │       ├── 0032.jpg
│   │           │       ├── 0033.jpg
│   │           │       ├── 0034.jpg
│   │           │       ├── 0035.jpg
│   │           │       ├── 0036.jpg
│   │           │       ├── 0037A.jpg
│   │           │       ├── 0037B.jpg
│   │           │       ├── 0037C.jpg
│   │           │       ├── 0037D.jpg
│   │           │       ├── 0037E.jpg
│   │           │       ├── 0037F.jpg
│   │           │       ├── 0037G.jpg
│   │           │       ├── 0037H.jpg
│   │           │       ├── 0037I.jpg
│   │           │       ├── 0037J.jpg
│   │           │       ├── 0037K.jpg
│   │           │       ├── 0037L.jpg
│   │           │       ├── 0041.jpg
│   │           │       ├── 0042.jpg
│   │           │       ├── 0043.jpg
│   │           │       ├── 0044.jpg
│   │           │       ├── 0045.jpg
│   │           │       ├── 0046.jpg
│   │           │       ├── 0047.jpg
│   │           │       ├── 0048.jpg
│   │           │       ├── 0053.jpg
│   │           │       ├── 0071.jpg
│   │           │       ├── 0082.jpg
│   │           │       ├── 0083.jpg
│   │           │       ├── 0104.jpg
│   │           │       ├── 0107.jpg
│   │           │       └── FALL.jpg
│   │           ├── index.html
│   │           ├── js
│   │           │   ├── map.js
│   │           │   └── unused.js
│   │           ├── lib
│   │           │   ├── aopalliance-1.0.jar
│   │           │   ├── commons-logging-1.2.jar
│   │           │   ├── spring-aop-5.2.3.RELEASE.jar
│   │           │   ├── spring-aspects-5.2.3.RELEASE.jar
│   │           │   ├── spring-beans-5.2.3.RELEASE.jar
│   │           │   ├── spring-context-5.2.3.RELEASE.jar
│   │           │   ├── spring-context-support-5.2.3.RELEASE.jar
│   │           │   ├── spring-core-5.2.3.RELEASE.jar
│   │           │   ├── spring-expression-5.2.3.RELEASE.jar
│   │           │   ├── spring-instrument-5.2.3.RELEASE.jar
│   │           │   ├── spring-jdbc-5.2.3.RELEASE.jar
│   │           │   ├── spring-jms-5.2.3.RELEASE.jar
│   │           │   ├── spring-messaging-5.2.3.RELEASE.jar
│   │           │   ├── spring-orm-5.2.3.RELEASE.jar
│   │           │   ├── spring-oxm-5.2.3.RELEASE.jar
│   │           │   ├── spring-test-5.2.3.RELEASE.jar
│   │           │   └── spring-tx-5.2.3.RELEASE.jar
│   │           ├── mobile.html
│   │           ├── package-lock.json
│   │           ├── package.json
│   │           └── sql
│   │               ├── distinct_assetTypes.sql
│   │               ├── distinct_assetTypes_and_Groups.sql
│   │               ├── getAssetsByPropertyId.sql
│   │               └── getAssetsbyPropetyIdType.sql
│   └── test
│       └── java
│           └── edu
│               └── oswegofs
│                   └── mapdataserver
│                       └── MapDataServerApplicationTests.java
└── system.properties
```

## Credits
#### ©2022 SUNY Oswego Facility Services, 
#### Project Originator [Nathaniel Wolf](https://github.com/NULLWulf)