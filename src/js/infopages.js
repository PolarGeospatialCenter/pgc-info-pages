(function(name, factory){
    typeof require == "undefined" ?
        (typeof dojo != "undefined" && dojo.provide(name)) &
            // direct script
            factory(this[name] = {}) :
        typeof exports == "undefined" ?
            // browser transport/C loader or RequireJS
            define(name, ["exports"], factory) :
            // CommonJS environment
            factory(exports);
})("infopages", function(exports){
	exports.data = [
		{	"index": 0,
			"visible": true,
			"template": "intro",
			"displayLength": 5,
			"infoName": "Intro"
		},
		{	"index": 10,
			"visible": true,
			"template": "vessels",
			"displayLength": 10,
			"infoName": "Laurence M. Gould",
			"vessel" : { "name": "Laurence M. Gould", "mmsi": "368138000", "zoom": 15 }
		},
		{	"index": 10,
			"visible": true,
			"template": "vessels",
			"displayLength": 10,
			"infoName": "Nathaniel B. Palmer",	
			"vessel" : { "name": "Nathaniel B. Palmer", "mmsi": "366610000", "zoom": 15  }
		},
		{	"index": 1,
			"visible": true,
			"template": "modismosaic",
			"displayLength": 5,
			"infoName": "MODIS Mosaics"
		},
		{	"index": 2,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 1-day",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_1Day.jpg", "json":"https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_Count.json" }
		},
		{	"index": 3,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 7-day",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_7Day.jpg", "json":"https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_Count.json" }
		},
		{	"index": 4,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 1-month",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_1Month.jpg", "json":"https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_Count.json" }
		},
		{	"index": 5,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 9-month",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_9Month.jpg", "json":"https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_Count.json" }
		},
		{	"index": 6,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 1-day Polar",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_1Day_Polar.jpg", "json":"" }
		},
		{	"index": 7,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 7-day Polar",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_7Day_Polar.jpg", "json":"" }
		},
		{	"index": 8,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 1-month Polar",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_1Month_Polar.jpg", "json":"" }
		},
		{	"index": 9,
			"visible": true,
			"template": "digitalglobe",
			"displayLength": 5,
			"infoName": "DG 9-month Polar",
			"collection" : { "show": true, "jpg": "https://data.pgc.umn.edu/maps/infopages/DigitalGlobe_9Month_Polar.jpg", "json":"" }
		},
		{	"index": 10,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Polar Geospatial Center",
			"infoRegion": "University of Minnesota",
			"infoLat": 44.984182,
			"infoLon": -93.182169,
			"timeZone": "America/Chicago",
			"infoPhoto": "",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISPGC"
			},
			"webcam" : { "show": true, "name": "University of Minnesota", "url": "https://data.pgc.umn.edu/maps/infopages/WebcamUMN.jpg" },
			"vessel" : { "show": false, "zoom": 8 }
		},
		{	"index": 11,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "McMurdo Station",
			"infoRegion": "Antarctica",
			"infoLat": -77.845188,
			"infoLon": 166.669057,
			"timeZone": "Antarctica/McMurdo",
			"infoPhoto": "img/mcm.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISMCM"
			},
			"webcam" : { "show": true, "name": "Arrival Heights", "url": "https://images.webcams.travel/webcam/1284734042.jpg" },
			//"webcam" : { "show": true, "query": { "location":"McMurdo", "name":"Arrival Heights", "camera":"arrivalHeights"}, "url": "https://www.usap.gov/videoClipsAndMaps/SouthPoleWebcam/" },
			"vessel" : { "show": true, "zoom": 8 }
		},
		{
			"index": 12,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Palmer Station",
			"infoRegion": "Antarctica",
			"infoLat": -64.774216,
			"infoLon": -64.052185,
			"timeZone": "Antarctica/Palmer",
			"infoPhoto": "img/palmer.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISPAL"
			},
			"webcam" : { "show": true, "name": "Palmer Station", "url": "https://images.webcams.travel/webcam/1359242806.jpg" },
			//"webcam" : { "show": true, "query": { "location":"Palmer", "name":"Palmer Station", "camera":"palmer"}, "url": "https://www.usap.gov/videoClipsAndMaps/SouthPoleWebcam/" },
			"vessel" : { "show": true, "zoom": 8 }
		},
		{
			"index": 13,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "South Pole",
			"infoRegion": "Antarctica",
			"infoLat": -90.00000,
			"infoLon": 0.000000,
			"timeZone": "Antarctica/South_Pole",
			"infoPhoto": "img/pole.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISPOL"
			},
			"webcam" : { "show": true, "name": "Atmospheric Research Observatory (ARO)", "url": "https://www.esrl.noaa.gov/gmd/webdata/spo/webcam/cmdlfullsize.jpg" },
			//"webcam" : { "show": true, "query": { "location":"South+Pole", "name":"Atmospheric Research Observatory", "camera":"aro"},"url": "https://www.usap.gov/videoClipsAndMaps/SouthPoleWebcam/" },
			"vessel" : { "show": false, "zoom": 8 }
		},
		{
			"index": 14,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Barrow",
			"infoRegion": "Alaska",
			"infoLat": 71.295556,
			"infoLon": -156.766389,
			"timeZone": "America/Anchorage",
			"infoPhoto": "img/pole.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISBAR",
				"rotation": 270
			},
			"webcam" : { "show": true, "name": "Barrow Sea Ice Cam", "url": "https://data.pgc.umn.edu/maps/infopages/WebcamBarrow.jpg" },
			"vessel" : { "show": true, "zoom": 8 }
		},
		{
			"index": 15,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Toolik Field Station",
			"infoRegion": "Alaska",
			"infoLat": 68.627483,
			"infoLon": -149.594940,
			"timeZone": "America/Anchorage",
			"infoPhoto": "img/pole.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISTFS",
				"rotation": 270
			},
			"webcam" : { "show": true, "name": "Toolik Lake", "url": "https://data.pgc.umn.edu/maps/infopages/WebcamToolik.jpg" },
			"vessel" : { "show": false, "zoom": 8 }
		},
		{
			"index": 16,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Kangerlussuaq",
			"infoRegion": "Greenland",
			"infoLat": 67.008611,
			"infoLon": -50.689167,
			"timeZone": "America/Godthab",
			"infoPhoto": "img/pole.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISKAN",
			},
			"webcam" : { "show": false, "name": "",  "url": "" },
			"vessel" : { "show": true, "zoom": 8 }
		},
		{
			"index": 17,
			"visible": true,
			"template": "locations",
			"displayLength": 15,
			"infoName": "Summit",
			"infoRegion": "Greenland",
			"infoLat": 67.008611,
			"infoLon": -50.689167,
			"timeZone": "America/Godthab",
			"infoPhoto": "img/pole.jpg",
			"modis" : {
				"show": true,
				"url": "https://data.pgc.umn.edu/maps/infopages/MODISSUM"
			},
			"webcam" : { "show": true, "name": "Greenhouse &amp; Fuel Pit", "url": "https://data.pgc.umn.edu/maps/infopages/WebcamSummit.jpg" },
			"vessel" : { "show": false, "zoom": 8 }
		},
		{	"index": 18,
			"visible": true,
			"template": "daynight",
			"displayLength": 15,
			"infoName": "Day/Night Map",
		},
		{
			"index": 19,
			"visible": true,
			"template": "credits",
			"displayLength": 15,
			"infoName": "Credits",
		}
	];
});
