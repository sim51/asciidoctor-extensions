'use strict';

/**
 * Search controller.
 */
app.controller('SearchCtrl', ['$scope', '$location', 'Search', 'Solr', function ($scope, $location, Search, Solr) {
    $scope.query = $location.search().search || Search.text;
    $scope.selectedFacet = {};
    $scope.page = 1;
    $scope.row = 10;

    $scope.search = function() {
        var query = $scope.query || '*';
        Solr.query(query, $scope.selectedFacet, $scope.row, $scope.page).then(function(response) {
            $scope.solr = response;
        });
    };

    $scope.autocomplete = function() {
    };

    $scope.addFacet = function(name, item) {
        if($scope.selectedFacet[name]) {
            $scope.selectedFacet[name].push(item);
        }
        else {
            $scope.selectedFacet[name] = [ item ];
        }
        $scope.search();
    };

    $scope.removeFacet = function(name, item) {
        if($scope.selectedFacet[name]) {
            var i = $scope.selectedFacet[name].indexOf(item);
            $scope.selectedFacet[name].splice(i,1);
        }
        $scope.search();
    };

    $scope.isFacetNotSelected = function(name, item) {
        if($scope.selectedFacet[name]) {
            return ($scope.selectedFacet[name].indexOf(item) == -1);
        }
        else {
            return true;
        }
    };

    $scope.getPage = function(page) {
        $scope.page = page;
        $scope.search();
    };

    $scope.search();
}]);
