module.exports = function (grunt, options, timestamp) {
    return {
        tasks: {
            sass: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'sass',
                        src: ['*.scss'],
                        dest: 'public/css',
                        ext: '.css'
                    }]
                }
            },
            replace: {
                example: {
                    src: ['public/*.html'],
                    overwrite: true,
                    replacements: [
                        {
                            from: /\.js\?v=[0-9]{14}/g,
                            to: ".js"
                        },
                        {
                            from: "js/common.js",
                            to: "js/common.js?v=<%= grunt.template.today('ddmmyyyyHHMMss') %>"
                        },
                        {
                            from: "js/home.js",
                            to: "js/home.js?v=<%= grunt.template.today('ddmmyyyyHHMMss') %>"
                        },
                        {
                            from: "js/b2b-vendor.js",
                            to: "js/b2b-vendor.js?v=<%= grunt.template.today('ddmmyyyyHHMMss') %>"
                        },
                        {
                            from: "js/marketplace-vendor.js",
                            to: "js/marketplace-vendor.js?v=<%= grunt.template.today('ddmmyyyyHHMMss') %>"
                        },
                        {
                            from: "js/vendor-profile.js",
                            to: "js/vendor-profile.js?v=<%= grunt.template.today('ddmmyyyyHHMMss') %>"
                        },
                    ]
                }
            }
        }
    }
};