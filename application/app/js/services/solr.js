'use strict';

/**
 * Neo4j service.
 */
app.service('Solr', ['$http', '$q', 'SOLR_URL', function ($http, $q, SOLR_URL) {

    /**
     * Execute a solr query.
     */
    this.query = function (keywords, facet, rows_per_page, page_num) {
        // Base search url
        var url = SOLR_URL + '?wt=json';
        url+= '&rows=' + rows_per_page;
        url+= '&start=' + (rows_per_page * (page_num-1));

        // default query
        var query = "(doctitle:@@keywords@@)^5 OR (description:@@keywords@@)^4 OR (tags:@@keywords@@)^3 OR (customer:@@keywords@@)^3 OR (project:@@keywords@@)^3 OR (text:@@keywords@@)^2";
        query = query.replace(new RegExp('@@keywords@@', 'g'), keywords);
        // Adding facet search
        for(var name in facet) {
            for(var item in facet[name]) {
                query += " AND " + name + ':"' + facet[name][item ]+ '"';
            }
        }
        console.log(query);
        url+= '&q=' + encodeURIComponent(query);


        // Adding facet
        url+= '&facet=true&facet.field=customer&facet.field=project&facet.field=tags&facet.field=neo4j-version&facet.field=lang';
        url+='&facet.mincount=1';

        var request = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=utf-8'
            },
            data: {}
        };
        var deferred = $q.defer();
        $http(request)
            .success(function (body, status, headers, config) {
                deferred.resolve(body);
                return body;

            })
            .error(function (data, status, headers, config) {
                throw new Error('Bad return value (' + status + ') for REST API. \n\nRequest :' + JSON.stringify(request) + '\n\nResponse :' + JSON.stringify(data));
            });
        return deferred.promise;
    };

}]);
