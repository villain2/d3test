/**
 */

(function (Modules, undefined)
{

    /**
     * @ngdoc object
     * @id D3Test
     * @name D3Test
     * @description
     *
     * This Module Initializes the D3Test Angular module. Uses the static angular
     * extern. This is a generic function used by the base template. Only modify if
     * updating or adding functionality to the default template. All angular template
     * controllers, directives, services and filters go here. See Angular
     * documentation for usage.
     */
    Modules.D3Test = angular.module("d3test", ['ngRoute', 'ngSanitize', 'duScroll']);
}(D3Test.Modules = D3Test.Modules || {} ));
