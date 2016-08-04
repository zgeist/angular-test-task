/// <reference path="../_all.ts" />
module CalculatorApp {
    'use strict';

    export class CalculatorCtrl implements ICalculatorCtrl{

        public static $inject = ['$scope'];

        constructor(
            private $scope : ICalculatorScope
        ) {

            // Controller init properties
            $scope.output = "";
            $scope.expression = new Array();
            $scope.decimalAdded = false;
            $scope.outputSize = 'big'; // Flexible output text size
            $scope.operators = ['+', '-', '*', '/'] // Main operators
        }

        private appendOperator( expression, operator ) {

            // Get last char at expression string
            var last = expression[ expression.length - 1 ];

            // Check may have some other operators before this operators. Operators can't be add one by one
            return ( (this.$scope.operators.indexOf( last ) > -1 && expression.length > 1) || !expression.length ) ?
                expression.substring( 0, expression.length - 1 ) :
                expression + operator;

        }

        private calculateExpresion( expression ) {

            var last = expression[ expression.length - 1 ], result;

            if( this.$scope.operators.indexOf( last ) > -1 || last == "." ){
                expression = expression.substring( 0, expression.length - 1 );
            }

            // Catch invalid expression, and block incorrect output
            try {

                result = eval( expression ).toString();

            } catch( err ) {

                if( err ) {
                    console.error("Invalid input, please check your exprassion. Error " + err);
                    alert('Invalid input, please check your exprassion.');
                    result = expression;
                }

            }

            // Return calculate results
            if(result){
                return result;
            }

        }

        public appendToExpression( inputVal : string ) {

            // Limit for output data
            if( this.$scope.output.length >= 40 ){
                return false;
            }

            // Create calculate functionality
            switch (inputVal) {
                case "C" :

                    this.$scope.output = "";
                    this.$scope.decimalAdded = false;

                    break;

                case "=" :

                    this.$scope.output = this.calculateExpresion( this.$scope.output );

                    this.$scope.decimalAdded = false;

                    break;

                case "+" :
                case "-" :
                case "*" :
                case "/" :

                    this.$scope.output = this.appendOperator( this.$scope.output, inputVal );
                    this.$scope.decimalAdded = false;

                    break;

                case "%" :

                    this.$scope.output = (0.01 * +this.calculateExpresion( this.$scope.output ) ).toString();

                    break;
                case "." :

                    if( !this.$scope.decimalAdded ) {

                        this.$scope.output += inputVal;
                        this.$scope.decimalAdded = true;

                    }

                    break;

                case ")" :

                    if( this.$scope.output.length && this.$scope.output.indexOf('(') > -1 ) {
                        this.$scope.output += inputVal;
                    }

                    break;
                default :
                    this.$scope.output += inputVal;
            }

            // Resize text depends of expression length
            this.$scope.outputSize = this.$scope.output.length >= 11 ? 'small' : 'big';

            // Run angular dirty-check
            if( !this.$scope.$$phase ){
                this.$scope.$apply();
            }

        }

    }

}
