"use strict";


module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: './dist/libs',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    copy: {
      main: {
        files: [ // bower components
          {
            expand: true,
            cwd: 'app/',
            src: ['**'],
            dest: './dist/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'bower_components/',
            src: ['**'],
            dest: './dist/libs/',
            filter: 'isFile'
          }
        ]
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.js': ['dist/app.js']
        },
        options: {
          mangle: false
        }
      }
    },

    html2js: {
      dist: {
        src: ['app/templates/*.html'],
        dest: 'tmp/templates.js'
      }
    },

    clean: {
      temp: {
        src: ['tmp']
      },
      less: {
        src: ['dist/css/']
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/*.js', 'tmp/*.js'],
        dest: 'dist/app.js'
      }
    },

    less: {
      development: {
        options: {
          paths: ['dist/css']
        },
        expand: true,
        cwd: './',
        src: 'app/css/*.less',
        dest: 'dist/css/',
        ext: '.css',
        flatten: true
      }
    },

    watch: {
      dev: {
        files: ['Gruntfile.js', 'app/*.js', 'app/*.html', 'app/css/*.less'],
        tasks: ['copy', 'html2js:dist', 'concat:dist', 'clean:temp', 'clean:less', 'less:development'],
        options: {
          atBegin: true
        }
      },
      min: {
        files: ['Gruntfile.js', 'app/*.js', '*.html'],
        tasks: ['html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
        options: {
          atBegin: true
        }
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          src: ['index.html'],
          dest: '/'
        }, {
          src: ['dist/**'],
          dest: 'dist/'
        }, {
          src: ['assets/**'],
          dest: 'assets/'
        }, {
          src: ['libs/**'],
          dest: 'libs/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('dev', ['bower', 'copy', 'watch:dev', 'clean:less', 'less:development']);
  grunt.registerTask('prod', ['html2js:dist', 'concat:dist', 'uglify:dist',
    'clean:temp', 'compress:dist'
  ]);
};
