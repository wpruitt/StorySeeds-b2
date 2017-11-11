module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                predef: ["document", "console", "$", "$scope", "firebase"],
                esnext: true,
                globalstrict: true,
                globals: {"angular": true, "app": true, "alert": true}
            },
            files: ['app/**/*.js',
                    'app/StorySeedsApp.js',
                    '!app/components/**/*.js',
                    '!app/bower_components/**'
            ]
        },
        sass: {
            dist: {
                files: {
                    'app/Css/main.css': 'app/Scss/main.scss'
                }
            }
        },
        watch: {
            javascripts: {
                files: ['app/**/*.js',
                        'app/StorySeedsApp.js',
                        '!app/components/',
                        '!app/bower_components/**'
                ],
                tasks: ['jshint']
            },
            sass: {
                files: ['app/Scss/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};