var mainApp = angular.module('mainApp', []);


mainApp.controller('appController', ['$scope', '$http' , function ($scope, $http) {

$http.get("https://spotlightweb.herokuapp.com/playlist").then(function(response){
  $scope.CurrentSong = response.data.currentSong;
  $scope.playlist = response.data.playlist;
  $scope.playlist.Art = "http://www.abstractartistgallery.org/wp-content/uploads/2013/03/Abstract-Art-Painting-Tadeusz-Machowski-1.jpg";
  $scope.curSong = {
    "Name": $scope.CurrentSong.name,
    "Artist": $scope.CurrentSong.artist,
    "Vote": $scope.CurrentSong.voteCnt,
    "Art": "http://www.abstractartistgallery.org/wp-content/uploads/2013/03/Abstract-Art-Painting-Tadeusz-Machowski-1.jpg"  
  }
});

$scope.canVote = true;

$scope.getVote = function(id){

  if($scope.canVote == true){
    $http.post("https://spotlightweb.herokuapp.com/vote?songId="+ id).then(function(response){
      $scope.playlist = response.data.playlist;
      $scope.canVote = false;
    });
  }else if($scope.canVote == false){
    if($scope.CurrentSong.id != id){
      $scope.canVote = true;
    }
  }
}

$scope.getAuth = function(){
  $http.get("https://accounts.spotify.com/authorize/?client_id=f4013c48969645179f4f32a94e4b69ae&response_type=code&redirect_uri=https%3A%2F%2Fspotlightweb.herokuapp.com%2Fauth")
  .then(function(response){

  });
}

}]);


mainApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{a').endSymbol('a}');
    });

mainApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);