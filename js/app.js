// Module
var app = angular.module('home', []);
var weatherApiKey = '7ac8bbb80022d1c66b0db509a6ea33af'
//weather controller
function weatherController($scope, $http) {
	// default search term on page load
	$scope.searchTerm = 'Boston';
	$scope.date = [];
	$scope.dayweathers = [];
	$scope.selTab = 0;
	var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	// var nextDate = new Date(today);
	$scope.date.push(today);
	// list of dates from current date +6 
		for(i=1; i<5; i++) 
		{
			// var nextDay = new Date(nextDate);
			// var nextDate = nextDate.setDate(today.getDate()+i);
			var nextDate = new Date(today);
			nextDate.setDate(today.getDate()+i);
			$scope.date.push(nextDate);
		}
	// gets data from API
	$scope.getData = function() {
		// var a = indx;
		var term = $scope.searchTerm;
		if (term == null) {
			term = 'Boston';
		}
		console.log(term);
		var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
	    $http.jsonp(url, { params: {
	    	APPID : weatherApiKey,
	        q : term,
			cnt : '5',
	        units : 'metric',
	        callback: 'JSON_CALLBACK',
		}}).success(function(data, status, headers, config) {
			$scope.dayweathers = data;
	  //       $scope.main = data.list[a].temp;
	  //       $scope.wind = data.list[a].speed;
	  //       $scope.humid = data.list[a].humidity;
	  //       $scope.clouds = data.list[a].clouds;
	  //       $scope.description = data.list[a].weather[0].description;
			// $scope.image = 'http://openweathermap.org/img/w/' + data.list[a].weather[0].icon + '.png';
			// console.log(data.list[a].weather[0].icon);
			console.log(data);
			$scope.selectTab(0);
		});
	};

	$scope.selectTab = function(tabIndex) {
		$scope.selTab = tabIndex;

        $scope.main = $scope.dayweathers.list[tabIndex].temp;
        $scope.wind = $scope.dayweathers.list[tabIndex].speed;
        $scope.humid = $scope.dayweathers.list[tabIndex].humidity;
        $scope.clouds = $scope.dayweathers.list[tabIndex].clouds;
        $scope.description = $scope.dayweathers.list[tabIndex].weather[0].description;
		// $scope.image = 'http://openweathermap.org/img/w/' + $scope.dayweathers.list[tabIndex].weather[0].icon + '.png';
		$scope.image = 'icons/' + $scope.dayweathers.list[tabIndex].weather[0].icon + '.png';
		$scope.cityname = $scope.dayweathers.city.name;
		
		$scope.hrweathers = [];

		var url = 'http://api.openweathermap.org/data/2.5/forecast';
		var term = $scope.searchTerm;
		if (term == null) {
			term = 'Boston';
		}
		$http.jsonp(url, { params: {
			APPID : weatherApiKey,
			q : term,
			units : 'metric',
			callback : 'JSON_CALLBACK',
		}}).success(function(data, status, headers, config) {
			var alist = data.list;
			console.log(alist);
			var today = new Date($scope.date[tabIndex]);		
			for (var i = 0; i < alist.length; i++) {
				var listdate = new Date(data.list[i].dt * 1000);
				if (listdate >= today) {
					if (listdate.toLocaleDateString() == today.toLocaleDateString()) {
						data.list[i].dt = listdate;
						data.list[i].description = data.list[i].weather[0].description;
						data.list[i].icon = 'icons/' + data.list[i].weather[0].icon + '.png';
						$scope.hrweathers.push(data.list[i]);
						console.log(listdate);
					} else {
						break;
					}
				}
			}
			console.log($scope.hrweathers);
		});
	}

	$scope.isTabSelect = function(tabIndex) {
		return (tabIndex == $scope.selTab);
	}

	// $scope.getWeatherIcon = function(iconName) {
	// 	var iconfolder = 'icons/';
	// 	var iconfilename = 'Status-weather-clear-icon.png';
	// 	switch (iconName) {
	// 		case '01d':
	// 			iconfilename = 'Status-weather-clear-icon.png';
	// 			break;
	// 		case '01n':
	// 			iconfilename = '';
	// 			break;
	// 		case '02d':
	// 			iconfilename = '';
	// 			break;
	// 		case '02n':
	// 			iconfilename = '';
	// 			break;
	// 		case '03d':
	// 			iconfilename = '';
	// 			break;
	// 		case '03n':
	// 			iconfilename = '';
	// 			break;
	// 		case '04d':
	// 			iconfilename = '';
	// 			break;
	// 		case '04n':
	// 			iconfilename = '';
	// 			break;
	// 		case '09d':
	// 			iconfilename = '';
	// 			break;
	// 		case '09n':
	// 			iconfilename = '';
	// 			break;
	// 		case '10d':
	// 			iconfilename = '';
	// 			break;
	// 		case '10n':
	// 			iconfilename = '';
	// 			break;
	// 		case '11d':
	// 			iconfilename = '';
	// 			break;
	// 		case '11n':
	// 			iconfilename = '';
	// 			break;
	// 		case '50d':
	// 			iconfilename = '';
	// 			break;
	// 		case '50n':
	// 			iconfilename = '';
	// 			break;
	// 		default:
	// 	}
	// 	return iconfolder + iconfilename;
	// }
}
// News Controller
function newsController($scope, $http) {

	$scope.getNews = function() {
	$http.jsonp('http://api.usatoday.com/open/articles?section=weather&api_key=38mx6ck4dufzcw8z488hygjk&encoding=json&jsoncallbackmethod=JSON_CALLBACK').success(function(data) {
	  
        $scope.stories = data.stories;
	   console.log(data.stories[0].description);
      });
	
	}
}