/// <reference path="../_all.ts" />
module CalculatorApp {
    'use strict';

    export function CalculatorView() : ng.IDirective {
        return {
            restrict: 'E',
            controller: CalculatorCtrl,
            controllerAs: "vm",
            templateUrl: './app/directives/CalculatorView.html',
            link: ( scope: ICalcViewScope, element: JQuery, atts: ng.IAttributes ) => {

                element.find('button').on( 'click', (event) => {
                    event.preventDefault();

                    var target      = event.target,
                        dataValue   = target.getAttribute('data-value');

                    if( target.innerHTML ){

                        scope.vm.appendToExpression(
                            dataValue ? dataValue : target.innerHTML
                        );

                    }
                } );
            }
        }
    }
}
