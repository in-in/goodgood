module.exports = function (grunt) {
  'use strict';
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      dev: {
        options: {
          includePaths: [
            'node_modules/susy/sass',
            'node_modules/breakpoint-sass/stylesheets',
            'node_modules/flickity/dist',
            'src/scss/',
            'src/scss/base/',
            'src/scss/layout/',
            'src/scss/module/',
            'src/scss/utils/'
          ],
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: {
          "src/css/style.css": "src/scss/index.scss"
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')(
            {browsers: 'last 2 versions'}
          ),
          require('postcss-svg')(
            {
              paths: ['src/img/svgmin'],
              defaults: "[fill]: hotpink",
              ei: false
            }
          )
        ]
      },
      dist: {
        src: 'src/css/style.css'
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'src/jade/',
          src: ['*.jade'],
          dest: 'src/',
          ext: '.html'
        }]
      }
    },

    concat: {
      dev: {
        options: {
          separator: ';\n'
        },
        src: [
          //'node_modules/flickity/dist/flickity.pkgd.js',
          'src/js/dev/*.js'
        ],
        dest: 'src/js/main.js'
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "src/*.html",
            "src/css/*.css",
            "src/js/*.js"
          ]
        },
        options: {
          watchTask: true,
          port: 3008,
          notify: false,
          injectChanges: true,
          open: true,
          ui: false,
          reloadDelay: 200,
          browser: "chromium-browser",
          server: {
            baseDir: "src"
          }
        }
      }
    },

//SVG

    svgmin: {
      options: {
        plugins: [
          {removeViewBox: false},
          {removeUselessStrokeAndFill: true},
          {removeMetadata: true}
        ]
      },
      dev: {
        files: [
          {
            expand: true,
            cwd: 'src/img/svg/',
            src: ['*.svg'],
            dest: 'src/img/svgmin/',
            ext: '.min.svg'
          }
        ]
      }
    },

    svgstore: {
      options: {
        cleanup: ['fill', 'stroke'],
        inheritviewbox: true,
        prefix: 'icon-',
        svg: {
          //xmlns: 'http://www.w3.org/2000/svg',
          style: "display: none;"
        }
      },
      dev: {
        files: {
          'src/jade/inc/svgsprite.jade': ['src/img/svgmin/*.min.svg']
        }
      }
    },

//UNCSS

    uncss: {
      dist: {
        options: {
          ignore: ['#added_at_runtime', '.created_by_jQuery']
        },
        files: {
          'src/css/style.css': ['src/index.html']
        }
      }
    },

//WATCH

    watch: {
      sass: {
        files: "src/scss/**/*.scss",
        tasks: ['sass:dev', 'postcss']
      },
      jade: {
        files: "src/jade/**/*.jade",
        tasks: ['jade']
      },
      js: {
        files: 'src/js/dev/index.js',
        tasks: ['concat']
      },
      svg: {
        files: 'src/img/svg/*.svg',
        tasks: ['newer:svgmin', 'svgstore']
      }
    },

//BUILD TASKS

    clean: {
      build: {
        src: ["build"]
      },
      svg: {
        src: ["src/img/svgmin"]
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '!**/js/dev/**',
              '!**/scss/**',
              '!**/jade/**',
              '!**/svg*/**'
            ],
            dest: 'build/'
          }
        ]
      }
    },

    cssmin: {
      build: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['*.html'],
          dest: 'build/',
          ext: '.html'
        }]
      }
    },

    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: ['*.js'],
          dest: 'build/js',
          ext: '.js'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img/'
        }]
      }
    },

    notify_hooks: {
      options: {
        enabled: true,
        duration: 10
      }
    },

//PUBLISH ON GITHUB PAGES

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }
  });


  //grunt.registerTask('comb', ['newer:csscomb']);
  
  grunt.registerTask('svg', [
    'clean:svg',
    'svgmin',
    'svgstore'
  ]);
  
  grunt.registerTask('build', [
    'clean:build',
    'copy',
    'cssmin',
    'htmlmin',
    'uglify',
    'imagemin'
  ]);
  
  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);
};
