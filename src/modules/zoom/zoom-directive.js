angular.module('anol.zoom')
/**
 * @ngdoc directive
 * @name anol.zoom.directive:anolZoom
 *
 * @requires $compile
 * @requires anol.map.ControlsService
 *
 * @param {string} zoomInTooltipText Tooltip text for zoom in button
 * @param {string} zoomOutTooltipText Tooltip text for zoom out button
 * @param {string} zoomInTooltipPlacement Tooltip position for zoom in button
 * @param {string} zoomOutTooltipPlacement Tooltip position for zoom out button
 *
 * @description
 * Provides zoom buttons
 */
.directive('anolZoom', ['$compile', 'ControlsService',
    function($compile, ControlsService) {
    return {
        restrict: 'A',
        scope: {
            zoomInTooltipText: '@',
            zoomInTooltipPlacement: '@',
            zoomOutTooltipText: '@',
            zoomOutTooltipPlacement: '@'
        },
        link: function(scope, element, attrs) {
            var olControl = new ol.control.Zoom({
                zoomInLabel: document.createTextNode(''),
                zoomOutLabel: document.createTextNode('')
            });
            var control = new anol.control.Control({
                olControl: olControl
            });
            var zoomInButton = angular.element(olControl.element).find('.ol-zoom-in');
            zoomInButton.removeAttr('title');
            zoomInButton.attr('tooltip', scope.zoomInTooltipText || 'Zoom in');
            zoomInButton.attr('tooltip-placement', scope.zoomInTooltipPlacement || 'right');
            zoomInButton.attr('tooltip-append-to-body', true);
            $compile(zoomInButton)(scope);

            var zoomOutButton = angular.element(olControl.element).find('.ol-zoom-out');
            zoomOutButton.removeAttr('title');
            zoomOutButton.attr('tooltip', scope.zoomOutTooltipText || 'Zoom out');
            zoomOutButton.attr('tooltip-placement', scope.zoomOutTooltipPlacement || 'right');
            zoomOutButton.attr('tooltip-append-to-body', true);
            $compile(zoomOutButton)(scope);

            ControlsService.addControl(control);
        }
    };
}]);
