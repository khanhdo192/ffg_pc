module.exports = function (grunt) {
	require('time-grunt')(grunt);

	var timestamp = new Date().getTime();
	var tasks = { scope: ['devDependencies', 'dependencies'] };
	var options = { config: { src: "grunt/*.js" }, version: 1 };
	var configs = require('load-grunt-configs')(grunt, options, timestamp);

	require('load-grunt-tasks')(grunt, tasks);

	grunt.initConfig(configs);
	grunt.registerTask('default', []);
	grunt.registerTask('build', ['sass', 'replace']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('empty', ['clean']);
}