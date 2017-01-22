var mainApp = angular.module('mainApp', []);


mainApp.controller('appController', ['$scope', '$http' , function ($scope, $http) {

  $scope.canVote = true;
  $scope.CurrentSong = {CurrentSong : null};

  $scope.refresh = function(){
    $http.get("https://spotlightweb.herokuapp.com/playlist").then(function(response){
      console.log(response);

      if($scope.CurrentSong.id != response.data.currentSong.id){
        $scope.canVote = true;
      }
      $scope.CurrentSong = response.data.currentSong;
      $scope.playlist = response.data.playlist;
      $scope.curSong = {
        "Name": $scope.CurrentSong.name,
        "Artist": $scope.CurrentSong.artist,
        "Vote": $scope.CurrentSong.voteCnt,
        "Art": $scope.CurrentSong.imageURL,  
      }
    });
    console.log("hi");

  }

  setInterval(function(){
    $scope.refresh();
  }, 5000)


$scope.getVote = function(id){
  if($scope.canVote == true){
    $http.post("https://spotlightweb.herokuapp.com/vote?songId="+ id).then(function(response){
      $scope.playlist = response.data.playlist;
      $scope.canVote = false;
    });
  }
}

// $scope.getAuth = function(){
//   $http.get("https://accounts.spotify.com/authorize/?client_id=f4013c48969645179f4f32a94e4b69ae&response_type=code&redirect_uri=https%3A%2F%2Fspotlightweb.herokuapp.com%2Fauth")
//   .then(function(response){

//   });
// }

}]);


mainApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{a').endSymbol('a}');
    });

mainApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);