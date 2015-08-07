/*
* PGC Info Pages 
* Application Settings
*
* Copyright 2015 Polar Geospatial Center, University of Minnesota
* Contributing Author: Brad Herried (herri147@umn.edu)
*
* === Location ===
* 	+ Do not modify anything other than what is described below 
*	+ Please enter only one value type (zip, city/state/country, or lat/lon)
*	+ Enter all other values as false
*	+ If more than one value type is present, the application will default to zip --> city/state/county --> lat/lon
*	+ Example for each type
*			zip		:	55108,
*						
*			city	:	'Saint Paul,
*			state	:	'MN',
*			country	:	'United States',
*			
*			lat		:	44.9442,
*			lon		:	-93.0936
*/
(function(name, factory){
    typeof require == "undefined" ?
        (typeof dojo != "undefined" && dojo.provide(name)) &
            factory(this[name] = {}) :
        typeof exports == "undefined" ?
            define(name, ["exports"], factory) : factory(exports);
})("settings", function(exports){
	exports.location = 
		{
			// Enter the 5-digit zip code (US only)
			zip		:	55108,
						
			// Enter the city name (e.g. 'Saint Paul')
			// Enter the state as abbreviation (e.g. 'MN')
			// Enter the country name (e.g. 'United States')
			city	:	false,
			state	:	'WI',
			country	:	'United States',;
			
			// Enter the latitidue and longitude
			// in decimal degrees (e.g. -54.25625)
			lat		:	false,
			lon		:	false
		};
});