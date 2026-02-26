var $ = require('jquery');
var moment = require('moment');
var pages = require('./infopages').data;
require('moment-timezone');
var screenfull = require('screenfull');

window.pageRender = '';

//version tag to trigger image builds 1.0

$(function () {

	var index = 0;

	// Configuration
	var timeFormat = 'HH:mm:ss';
	var timeFormatAP = 'h:mm:ss A';
	var dateFormat = 'MMMM Do, YYYY';
	var dateFormatAP = 'ddd, MMM Do';

	var fadeOutDur = 250;
	var fadeInDur = 500;
	var secondsInterval = null;

	// Setup Fullscreen
	$('#fullScreenButton').on('click', function() {
	  if (screenfull.enabled) {
		screenfull.toggle();
	  }
	  if (screenfull.isFullscreen) {
		$('#fullScreenButton').text('EXIT FULL SCREEN');
		$('#fullScreenButton').css('color','#A6A6A6');
	  }
	  else {
		$('#fullScreenButton').text('GO FULL SCREEN');
		$('#fullScreenButton').css('color','#FFFFFF');
	  }
	});

	$(window).resize(function() {
		$('#scroller #scrollerRow li').css('min-width',Math.round($('#scrollerRow').width()/7) + 'px');
	});

	// Get User Time and Location
	var userLocation = '';

	if (settings.location.zip) {
		userLocation = settings.location.zip;
	}
	else if (settings.location.city && settings.location.state && settings.location.country) {
		userLocation = (settings.location.city+','+settings.location.state.toUpperCase()+','+settings.location.country).replace(' ','+');
	}
	else if (settings.location.lat && settings.location.lon) {
		userLocation = settings.location.lat+','+settings.location.lon;
	}
	else {
		userLocation = 55108; // Defaults to Saint Paul, Minnesota
	}

	$.get('https://api.worldweatheronline.com/free/v2/weather.ashx',
		{
			q :	userLocation,
			key	: 'c25b7a54912289dc77ca682b16590',
			format : 'json',
			includeLocation : 'yes'
		},
		function(response) {
			$('#userWxIcon').attr('src',response.data.current_condition[0].weatherIconUrl[0].value);
			$('#userLocation').html(response.data.nearest_area[0].areaName[0].value + ', ' + response.data.nearest_area[0].region[0].value);
		}
	);



	$('#userTimeLocal').html(moment().format(timeFormatAP));
	$('#userTimeDate').html(moment().format(dateFormatAP));

	function localSecondsTick() {
		$('#userTimeLocal').html(moment().format(timeFormatAP));
		$('#scrollerTicker span').last().remove();
	}
	setInterval(localSecondsTick,1000); // Set Ticker

	// Remove 'pages.visible == false'
	var tmp = [];
	for (i=0; i<pages.length; i++) {
		if (pages[i].visible == true) {
			tmp.push(pages[i]);
		}
	}

	pages = tmp;

	// Main rendering function for each page
	function render() {
		if (secondsInterval) { clearInterval(secondsInterval); }
		var pageData = pages[index];

		// Update Scroller
		$.get("tpl/scroller.html", function(data) {
			var tpl = $(data);
			var row = $('#scrollerRow');
			var html = '';
			var v=a=0;
			for (var i=0; i<pages.length; i++) {
				v=i+index;
				if (v>=pages.length) { v=0+a;a++; }
				html += '<li><div class="gradient-black">'+pages[v].infoName+'</div></li>';
			}

			tpl.html(html);

			row.html(tpl);
			$('#scroller #scrollerRow li').css('min-width',Math.round($('#scrollerRow').width()/7) + 'px');

			row.fadeOut(fadeOutDur, function() {
				tpl.hide();
				$(this).replaceWith(tpl);
				$('#scrollerRow').fadeIn(fadeInDur);
				$('#scroller #scrollerRow li').css('min-width',Math.round($('#scrollerRow').width()/7) + 'px');
			});

			// Set Scroller Ticker
			var dots = '';
			for (var i=0; i<pageData.displayLength; i++) {
				dots+='<span>&middot;</span>';
			}
			$('#scrollerTicker').html(dots);
		},'html');

		// Update Display
		var div = $('#display');

		if (pageData.visible == true) {

			switch(pageData.template) {

				case 'intro':
					$.get('tpl/'+pageData.template+'.html',function(data) {
						var tpl = $(data);

						//div.replaceWith(tpl);
						div.html(tpl);
						div.fadeOut(fadeOutDur, function() {
							//tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;

				case 'vessels':
					$.get('tpl/'+pageData.template+'.html',function(data) {
						var tpl = $(data);
						tpl.find('#vesselName').html(pageData.vessel.name);
						tpl.find('#marinetraffic').attr('src','https://www.marinetraffic.com/en/ais/embed/zoom:'+pageData.vessel.zoom+'/centery:0/centerx:0/maptype:2/shownames:true/mmsi:'+pageData.vessel.mmsi+'/fleet:/showmenu:false/remember:false');

						//div.replaceWith(tpl);
						div.html(tpl);
						div.fadeOut(fadeOutDur, function() {
							//tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;

				case 'modismosaic':
					$.get("tpl/modismosaic.html", function(data) {
						var tpl = $(data);

						var latest=moment().subtract(1,'d');
						tpl.find('#modisMosaicDate').html(latest.format(dateFormat));

						// Replace
						div.fadeOut(fadeOutDur, function() {
							tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;

				case 'locations':
					$.get("tpl/locations.html", function(data) {
						var tpl = $(data);

						// Webcam
						if (pageData.webcam.show == true) {
							if (pageData.webcam.query) {
								$.get('php/usap.php',
										{cameraLocation: pageData.webcam.query.location, camera: pageData.webcam.query.camera},
										function(data) {
											console.log(data);
											var img = data.split(',');
											var url = pageData.webcam.url + img[0];
											tpl.find('#webcamUrl').css('background-image','url('+url+')');
											tpl.find('#webcamName').html(pageData.webcam.query.name);
									}
								);
							}
							else {
								tpl.find('#webcamUrl').css('background-image','url('+pageData.webcam.url+')');
								tpl.find('#webcamName').html(pageData.webcam.name);
							}
						}
						else {
							tpl.find('.content-webcam').html('');
							tpl.find('.content-webcam').hide();
						}

						// InfoBox
						tpl.find('#infoName').html(pageData.infoName);
						tpl.find('#infoRegion').html(pageData.infoRegion);
						tpl.find('#infoLat').html(pageData.infoLat + '°');
						tpl.find('#infoLon').html(pageData.infoLon  + '°');
						//tpl.find('#infoPhoto').attr('src',pageData.infoPhoto);

						// TimeBox
						function secondsTick() {
							$('#timeLocal').html(moment().tz(pageData.timeZone).format(timeFormat));
						}
						tpl.find('#timeLocal').html(moment().tz(pageData.timeZone).format(timeFormat));
						tpl.find('#timeDate').html(moment().tz(pageData.timeZone).format(dateFormat));
						tpl.find('#timeZone').html(moment().tz(pageData.timeZone).format('Z') + ' UTC');

						// WxBox
						$.get('https://api.worldweatheronline.com/free/v2/weather.ashx',
						    {
								q : pageData.infoLat+","+pageData.infoLon,
								key : 'c25b7a54912289dc77ca682b16590',
								format : 'json'
							},
							function(response) {
								tpl.find('#wxDegF').html(response.data.current_condition[0].temp_F + '°F');
								tpl.find('#wxDegC').html(response.data.current_condition[0].temp_C + '°C');
								tpl.find('#wxWindMPH').html(response.data.current_condition[0].windspeedMiles + ' mph');
								tpl.find('#wxCloud').html(response.data.current_condition[0].cloudcover + '%');
								tpl.find('#wxWindDir').html(response.data.current_condition[0].winddir16Point);
								tpl.find('#wxPressure').html(response.data.current_condition[0].pressure + ' mb');
								tpl.find('#wxDescription').html(response.data.current_condition[0].weatherDesc[0].value);
								tpl.find('#wxIcon').attr('src',response.data.current_condition[0].weatherIconUrl[0].value);
							},"json"
						);

						// MODIS
						if (pageData.modis.show == true) {
							var prev=moment().tz(pageData.timeZone).subtract(2,'d');
							var latest=moment().tz(pageData.timeZone).subtract(1,'d');

							//var modisPrevUrl=pageData.modis.url.replace('zzzzzzz',prev.format('YYYY') + prev.format('DDD'));
							//var modisLatestUrl=pageData.modis.url.replace('zzzzzzz',latest.format('YYYY') + latest.format('DDD'));
							var modisPrevUrl=pageData.modis.url+'2day.jpg';
							var modisLatestUrl=pageData.modis.url+'1day.jpg';

							if (pageData.modis.rotation == 270) {
								tpl.find('#modisPrevUrl').addClass('rotate270');
								tpl.find('#modisLatestUrl').addClass('rotate270');
							}
							tpl.find('#modisPrevUrl').css('background-image','url('+modisPrevUrl+')');
							tpl.find('#modisLatestUrl').css('background-image','url('+modisLatestUrl+')');
							tpl.find('#modisPrevTitle').html('MODIS Terra');
							tpl.find('#modisLatestTitle').html('MODIS Terra');
							tpl.find('#modisPrevDate').html(prev.format(dateFormat));
							tpl.find('#modisLatestDate').html(latest.format(dateFormat));
						}
						else {
							tpl.find('.content-modis').html('');
							tpl.find('.content-modis').hide();
						}

						// Vessels
						if (pageData.vessel.show == true) {
							tpl.find('#marinetraffic').attr('src','https://www.marinetraffic.com/en/ais/embed/zoom:'+pageData.vessel.zoom+'/centery:'+pageData.infoLat+'/centerx:'+pageData.infoLon+'/maptype:2/border:0/shownames:true/remember:false/fleet:lpaul@umn.edu/showmenu:false');
						}
						else {
							tpl.find('.content-vessels').html('');
							tpl.find('.content-vessels').hide();
						}

						secondsInterval = setInterval(secondsTick,1000); // Location's time
						div.fadeOut(fadeOutDur, function() {
							tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;

				case 'credits':
					$.get("tpl/credits.html", function(data) {
						var tpl = $(data);

						// Replace
						div.fadeOut(fadeOutDur, function() {
							tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
							$('.credits-roll').animate({'top':'3%'},(pageData.displayLength * 1000) - fadeInDur, 'linear');
						});
					},'html');
					break;

				case 'daynight':
					$.get("tpl/daynight.html", function(data) {
						var tpl = $(data);

						// Replace
						div.fadeOut(fadeOutDur, function() {
							tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;

				case 'digitalglobe':
					$.get("tpl/digitalglobe.html", function(data) {
						var tpl = $(data);

						var mono, stereo;
						$.get('php/digitalglobe.php', function(data) {
							if (pageData.infoName == 'DG 1-day') {
								mono = data.dg_imagery_index_all_1day;
								stereo = data.dg_imagery_index_stereo_1day;
							} else if (pageData.infoName == 'DG 7-day') {
								mono = data.dg_imagery_index_all_7days;
								stereo = data.dg_imagery_index_stereo_7days;
							} else if (pageData.infoName == 'DG 1-month') {
								mono = data.dg_imagery_index_all_1month;
								stereo = data.dg_imagery_index_stereo_1month;
							} else if (pageData.infoName == 'DG 9-month') {
								mono = data.dg_imagery_index_all_9month;
								stereo = data.dg_imagery_index_stereo_9month;
							}
							else {
								mono='-';
								stereo='-';
							}
							tpl.find('#countMono').html(mono.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
							tpl.find('#countStereo').html(stereo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
						},"json"
						);

						tpl.find('#collectionUrl').attr('src',pageData.collection.jpg);

						// Replace
						div.fadeOut(fadeOutDur, function() {
							tpl.hide();
							$(this).replaceWith(tpl);
							$('#display').fadeIn(fadeInDur);
						});
					},'html');
					break;
			}



			// jQuery Stuff
			$('img.modis').error(function() { $(this).attr('src', 'images/modis-no-image.png') });
			$('img.webcam').error(function() { $(this).attr('src', 'images/webcam-no-image.png') });
			$('#wxIcon').error(function() { $(this).attr('src', 'images/wx-no-image.png') });

			// Don't loop, reload the page?
			//if (index == pages.length-1) { location.reload(true); }

			// Get the next index and setTimeout
			index = (index + 1) % pages.length;

			window.pageRender = setTimeout(render,pageData.displayLength * 1000);
		}

		$('#stopButton').hide();
		$('#stopButton').click(function() { clearTimeout(window.pageRender); });
	}

	// Finally, call render()
	render();
});
