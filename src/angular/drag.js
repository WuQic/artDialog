var $ = require('jquery');
var Drag = require('../lib/drag');
var directive = require('./directive');

directive.module
    .directive('drag', function () {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs',
                function($scope, $element, $attrs) {
                    this.$element = $element;
                    this.$destroyDrag = function() {
                        this.$drag.destroy();
                        delete this.$drag;
                    }.bind(this);
                }
            ],
            link: function(scope, elem, attrs, superheroCtrl) {
                superheroCtrl.$drag = new Drag(elem[0]);
            }
        };
    })
    .directive('dragHandle', function() {
        return {
            require: '^drag',
            restrict: 'A',
            link: function(scope, elem, attrs, superheroCtrl) {
                superheroCtrl.$destroyDrag();
                elem.on(Drag.START, function(event) {
                    new Drag(superheroCtrl.$element[0], event);
                    event.preventDefault();
                });
            }
        };
    });