'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'core/home.html'
		});
	}
]);