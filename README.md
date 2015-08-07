# PGC Information Pages
The PGC Information Pages is a stand-alone web application that displays a continuous slide of selected content, much like a slideshow. It runs in a web browser, but meant for display on a High-Definition (HD) display, such as a television or computer screen. The application is somewhat responsive to different screen resolutions, but is optimized for 16:9 displays.
### Screenshots
#### Welcome Screen
> Initial screen on load
 
![Welcome Screen](/images/ss-welcome.jpg "Welcome Screen")

#### MODIS Polar Mosaics
> Daily imagery from MODIS Terra
> * Most recent Arctic & Antarctic mosaics

![MODIS Polar Mosaics](/images/ss-modis.jpg "MODIS Polar Mosaics")

#### DigitalGlobe, Inc. Collections
> Index to DigitalGlobe imagery collection
> * Count of mono/stereo collection
> * Map of mono/stereo collection
> * Features 1-day, 7-day, 1-month, 9-month collections
> * Global and polar versions

![DigitalGlobe Collection 7-Day](/images/ss-modis.jpg "DigitalGlobe Collection 7-Day")

#### Facilities & Research Sites
> Local information for select NSF or polar locations
> * Local date/time
> * Local weather
> * Most recent MODIS Terra & Aqua
> * Webcam (if available)
> * Nearby Vessels (if available)

![Barrow, Alaska](/images/ss-modis.jpg "Barrow, Alaska")

#### Day/Night Map
> Arctic & Antarctic day/night maps
> * Note: satellite imagery is not updated

![Day/Night](/images/ss-modis.jpg "Day/Night")

## How to run the information pages
### Option 1: Run from PGC
This is the simplest option with no customizations. It will always deploy the latest release of this application.
> Your location will not be updated. It will display St. Paul, Minnesota.

1. On the host machine, point a web browser to the following URL:
`http://applications.pgc.umn.edu/infopages`
2. Within the application, click the "GO FULL SCREEN" button in the top-right corner

### Option 2: Self-Hosted
This configuration allows you to customize your location and deploy on your own web server.

1. Download and unzip the latest release:
`https://github.com/PolarGeospatialCenter/pgc-info-pages/releases/latest`
2. Edit the `settings.js` file for your location (zip code, city/state/country, or latitude/longitude)
3. Copy the files to a publicly-accessible location on your web server
4. Point a web browser to the directory containing the `index.html` file
5. Within the application, click the "GO FULL SCREEN" button in the top-right corner

## Credits & Data Sources
#### Webcams
* United States Antarctic Program (McMurdo Station, Palmer Station)
  http://www.usap.gov/videoclipsandmaps/mcmwebcam.cfm
  http://www.usap.gov/videoclipsandmaps/palWebCam.cfm
* NOAA Earth System Research Laboratory (South Pole)
  http://www.esrl.noaa.gov/gmd/obop/spo/livecamera.html
* University of Alaska - Fairbanks Sea Ice Group (Barrow)
  http://seaice.alaska.edu/gi/observatories/barrow_webcam
* Toolik Field Station (Toolik)
  http://toolik.alaska.edu/edc
* College of Science & Engineering (University of Minnesota)
  http://cse.umn.edu/dashboard/webcam
* CH2M Hill Polar Services (Summit Station)
  http://www.summitcamp.org/status/webcam


#### Data & Photographs
* NASA Worldview Application (MODIS Satellite Imagery)
  https://earthdata.nasa.gov/labs/worldview
* DigitalGlobe, Inc. (Satellite Imagery Acquistion)
  http://www.digitalglobe.com
* MarineTraffic.org (Vessel Maps)  
  http://www.marinetraffic.org
* Fourmilab (Earth & Moon Viewer)
  http://www.fourmilab.ch/earthview
* World Weather Online (Weather API)
  http://www.worldweatheronline.com

#### Development
* jQuery
  http://www.jquery.com
* Moment.js
  http://momentjs.com
