/**
 * @ngdoc object
 * @name anol.geocoder.Nominatim
 *
 * @param {Object} options Options
 * @param {string} options.url Url of nominatim geocoder. Default 'http://nominatim.openstreetmap.org/search?'
 * @param {Array} options.viewbox Box to restrict search to
 *
 * @description
 * Nominatim geocoder. See http://wiki.openstreetmap.org/wiki/Nominatim
 */
anol.geocoder.Nominatim = function(_options) {
    var defaults = {
        url: 'http://nominatim.openstreetmap.org/search?'
    };
    var options = $.extend({},
        defaults,
        _options
    );
    anol.geocoder.Base.call(this, options);
};
anol.geocoder.Nominatim.prototype = new anol.geocoder.Base();
$.extend(anol.geocoder.Nominatim.prototype, {
    CLASS_NAME: 'anol.geocoder.Nominatim',
    RESULT_PROJECTION: 'EPSG:4326',
    extractDisplayText: function(result) {
        return result.display_name;
    },
    extractCoordinate: function(result) {
        return [
            parseFloat(result.lon),
            parseFloat(result.lat)
        ];
    },
    getData: function(searchString) {
        var data = {
            q: searchString,
            format: 'json',
            limit: this.options.limit !== undefined ? this.options.limit : 10
        };
        if(this.options.key !== undefined) {
            data.key = this.options.key;
        }
        if(this.options.viewbox !== undefined) {
            data.bounded = 1;
            data.viewbox = this.options.viewbox.join(',');
        }
        return data;
    }
});
