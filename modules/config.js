'use strict';

var ApplicationConfiguration = (function(){
	// 应用程序名和依赖
	var applicationModuleName = 'prima';
	var applicationModuleVendorDependencies = ['ui.router', 'i18n', 'alert'];

	// 添加新模块
	var registerModule = function(moduleName, dependencies) {
		angular.module(moduleName, dependencies || []);
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();