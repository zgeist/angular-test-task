/// <reference path='_all.ts' />

/**
 * The main Test Angular App module.
 *
 * @type {angular.Module}
 */

module CalculatorApp {
    'use strict';

    var CalculatorApp = angular.module( 'App', [] )
        .controller( 'CalculatorCtrl', CalculatorCtrl )
        .directive( 'calculatorView', CalculatorView )
}
