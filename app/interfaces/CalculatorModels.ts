module CalculatorApp {

    export interface ICalculatorCtrl extends ng.IComponentController {
        appendToExpression: ( inputVal : string ) => boolean
    }

    export interface ICalculatorScope extends ng.IScope{
        decimalAdded: boolean
        output: string
        outputSize: string
        expression: Array<string>
        operators: Array<string>
    }

    export interface ICalcViewScope extends ng.IScope {
        vm: ICalculatorCtrl
    }

}