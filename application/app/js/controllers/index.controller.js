'use strict';

/**
 * Home controller.
 */
app.controller('IndexCtrl', ['$scope', '$location', 'Search', function ($scope, $location, Search) {
    Search.text = $location.search().search || '';
    $scope.search = Search;

    console.log($location.search().search + "@" + $scope.search.text);

    $scope.searchFct = function() {
        $location.search("search",$scope.search.text);
    };
}]);
