// Module
var app = angular.module('home', []);
//weather controller
function weatherController($scope, $http) {
	// default search term on page load
	$scope.searchTerm = 'boston';
	$scope.date = [];
	var day = new Date();
	var nextDate = day;
	$scope.date.push(day);
	// list of dates from current date +6 
		for(i=1; i<7; i++) 
		{
			var nextDay = new Date(nextDate);
			var nextDate = nextDay.setDate(day.getDate()+i);
			$scope.date.push(nextDate);
		}
	// gets data from API
	$scope.getData = function(indx) {
	var a = indx;
	term = $scope.searchTerm;
	console.log(term);
	 var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    $http.jsonp(url, { params : {
        q : term,
		cnt : '7',
        units : 'metric',
        callback: 'JSON_CALLBACK'
      }}).
      success(function(data, status, headers, config) {
        $scope.main = data.list[a].temp;
        $scope.wind = data.list[a].speed;
        $scope.humid = data.list[a].humidity;
        $scope.clouds = data.list[a].clouds;
        $scope.description = data.list[a].weather[0].description;
		$scope.image = 'http://openweathermap.org/img/w/' + data.list[a].weather[0].icon + '.png';
	   console.log(data.list[a].weather[0].icon);
      });
	}
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