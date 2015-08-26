module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    concat: {
        build: {
            src: [
                'bower_components/jquery/dist/jquery.min.js',
                'src/js/main.js'
            ],
            dest: 'build/main.js'
        }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author %> */\n'
      },
      build: {
        src: 'build/main.js',
        dest: 'build/main.min.js'
      }
    },

    'compile-handlebars' : {
        allStatic: {
            files: [{
                src: "src/home.hbs",
                dest: "build/index.html"
            }],
            templateData: 'src/data.json',
            partials: ['src/partials/api.hbs']
        }
    },

    copy: {
        main: {
            src:"build/main.js",
            dest:"build/main.min.js" //Just copy file, don't uglify
        }
    },

    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
              'build/style.css': 'src/scss/style.scss'
            }
        }
    },

    watch: {
      scripts: {
        files: 'src/js/*.js',
        tasks: ['concat', 'copy'],
        options: {
          interrupt: true,
        },
      },
      css: {
        files: 'src/scss/*.scss',
        tasks: ['sass']
      },
      pages: {
        files: ['src/*.hbs', 'src/partials/*.hbs', 'src/*.json'],
        tasks: ['compile-handlebars']
      }
    },

    cssmin: {
      build: {
        files: {
          'build/style.css': ['build/style.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'copy', 'sass','compile-handlebars', 'watch']);
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'cssmin', 'compile-handlebars']);

};
