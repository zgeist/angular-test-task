/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../_all.ts" />

describe("Calculator Application test", () => {

    var $scope;
    var controller;

    describe("Calculator Controller", () => {

        beforeEach( inject( ( $rootScope, $controller ) => {

            $scope = $rootScope.$new();

            controller = new CalculatorApp.CalculatorCtrl( $scope );

            $scope.$digest();

        } ) );

        it('Constructor defined', () => {
            expect($scope.output).toBeDefined();
            expect($scope.expression).toBeDefined();
            expect($scope.decimalAdded).toBeDefined();
            expect($scope.operators).toBeDefined();
            expect($scope.outputSize).toBeDefined();
        });

        it('Default input', () => {

            $scope.output = "65";
            controller.appendToExpression( "8" );

            expect($scope.output).toEqual("658");

        });

        it('Cleanup output', () => {

            $scope.output = "6483+44*3";
            controller.appendToExpression( "C" );

            expect($scope.output).toEqual("");

        });

        describe('Operators test', () => {
            it('Operator "+" input', () => {

                $scope.output = "10";
                controller.appendToExpression("+");
                $scope.output += "15";
                controller.appendToExpression("=");

                expect($scope.output).toEqual('25');
            });
            it('Operator "-" input', () => {

                $scope.output = "25";
                controller.appendToExpression("-");
                $scope.output += "10";
                controller.appendToExpression("=");

                expect($scope.output).toEqual('15');
            });
            it('Operator "*" input', () => {

                $scope.output = "5";
                controller.appendToExpression("*");
                $scope.output += "5";
                controller.appendToExpression("=");

                expect($scope.output).toEqual('25');
            });
            it('Operator "/" input', () => {

                $scope.output = "50";
                controller.appendToExpression("/");
                $scope.output += "5";
                controller.appendToExpression("=");

                expect($scope.output).toEqual('10');
            });

            it('Operator "%" input', () => {

                $scope.output = "50";
                controller.appendToExpression("%");

                expect($scope.output).toEqual('0.5');
            });
        });
    });
});

