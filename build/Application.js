/// <reference path="../_all.ts" />
var CalculatorApp;
(function (CalculatorApp) {
    'use strict';
    function CalculatorView() {
        return {
            restrict: 'E',
            controller: CalculatorApp.CalculatorCtrl,
            controllerAs: "vm",
            templateUrl: './app/directives/CalculatorView.html',
            link: function (scope, element, atts) {
                element.find('button').on('click', function (event) {
                    event.preventDefault();
                    var target = event.target, dataValue = target.getAttribute('data-value');
                    if (target.innerHTML) {
                        scope.vm.appendToExpression(dataValue ? dataValue : target.innerHTML);
                    }
                });
            }
        };
    }
    CalculatorApp.CalculatorView = CalculatorView;
})(CalculatorApp || (CalculatorApp = {}));
/// <reference path="../_all.ts" />
var CalculatorApp;
(function (CalculatorApp) {
    'use strict';
    var CalculatorCtrl = (function () {
        function CalculatorCtrl($scope) {
            this.$scope = $scope;
            // Controller init properties
            $scope.output = "";
            $scope.expression = new Array();
            $scope.decimalAdded = false;
            $scope.outputSize = 'big'; // Flexible output text size
            $scope.operators = ['+', '-', '*', '/']; // Main operators
        }
        CalculatorCtrl.prototype.appendOperator = function (expression, operator) {
            // Get last char at expression string
            var last = expression[expression.length - 1];
            // Check may have some other operators before this operators. Operators can't be add one by one
            return ((this.$scope.operators.indexOf(last) > -1 && expression.length > 1) || !expression.length) ?
                expression.substring(0, expression.length - 1) :
                expression + operator;
        };
        CalculatorCtrl.prototype.calculateExpresion = function (expression) {
            var last = expression[expression.length - 1], result;
            if (this.$scope.operators.indexOf(last) > -1 || last == ".") {
                expression = expression.substring(0, expression.length - 1);
            }
            // Catch invalid expression, and block incorrect output
            try {
                result = eval(expression).toString();
            }
            catch (err) {
                if (err) {
                    console.error("Invalid input, please check your exprassion. Error " + err);
                    alert('Invalid input, please check your exprassion.');
                    result = expression;
                }
            }
            // Return calculate results
            if (result) {
                return result;
            }
        };
        CalculatorCtrl.prototype.appendToExpression = function (inputVal) {
            // Limit for output data
            if (this.$scope.output.length >= 40) {
                return false;
            }
            // Create calculate functionality
            switch (inputVal) {
                case "C":
                    this.$scope.output = "";
                    this.$scope.decimalAdded = false;
                    break;
                case "=":
                    this.$scope.output = this.calculateExpresion(this.$scope.output);
                    this.$scope.decimalAdded = false;
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                    this.$scope.output = this.appendOperator(this.$scope.output, inputVal);
                    this.$scope.decimalAdded = false;
                    break;
                case "%":
                    this.$scope.output = (0.01 * +this.calculateExpresion(this.$scope.output)).toString();
                    break;
                case ".":
                    if (!this.$scope.decimalAdded) {
                        this.$scope.output += inputVal;
                        this.$scope.decimalAdded = true;
                    }
                    break;
                case ")":
                    if (this.$scope.output.length && this.$scope.output.indexOf('(') > -1) {
                        this.$scope.output += inputVal;
                    }
                    break;
                default:
                    this.$scope.output += inputVal;
            }
            // Resize text depends of expression length
            this.$scope.outputSize = this.$scope.output.length >= 11 ? 'small' : 'big';
            // Run angular dirty-check
            if (!this.$scope.$$phase) {
                this.$scope.$apply();
            }
        };
        CalculatorCtrl.$inject = ['$scope'];
        return CalculatorCtrl;
    }());
    CalculatorApp.CalculatorCtrl = CalculatorCtrl;
})(CalculatorApp || (CalculatorApp = {}));
/// <reference path='_all.ts' />
/**
 * The main Test Angular App module.
 *
 * @type {angular.Module}
 */
var CalculatorApp;
(function (CalculatorApp_1) {
    'use strict';
    var CalculatorApp = angular.module('App', [])
        .controller('CalculatorCtrl', CalculatorApp_1.CalculatorCtrl)
        .directive('calculatorView', CalculatorApp_1.CalculatorView);
})(CalculatorApp || (CalculatorApp = {}));
/// <reference path='typings/jquery/jquery.d.ts' />
/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='interfaces/CalculatorModels.ts' />
/// <reference path='directives/CalculatorView.ts' />
/// <reference path='controllers/CalculatorCtrl.ts' />
/// <reference path='Application.ts' /> 

//# sourceMappingURL=Application.js.map
