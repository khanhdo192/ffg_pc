module.exports.tasks = {
    watch: {
        options: {
            livereload: true,
        },
        css: {
            files: ['css/*.css'],
            tasks: []
        },
        js: {
            files: ['js/*.js'],
            tasks: []
        },
        scss: {
            files: ['sass/*.scss'],
            tasks: ['sass']
        },
        html: {
            files: ['*.html'],
            tasks: []
        },
    },
};