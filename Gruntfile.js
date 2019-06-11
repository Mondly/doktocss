// Load Grunt
module.exports = function (grunt) {
    
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Tasks
      sass: { 
        expanded: {
            // Target options
            options: {
              style: 'expanded',
              sourcemap: false
            },
            files: {
              'css/styles.css': 'scss/styles.scss',
              //'css/styles2.css': 'sass/styles2.scss'
            }
          },
    
          min: {
            options: {
              style: 'compressed',
              sourcemap: false
            },
            files: {
                'css/styles.min.css': 'scss/styles.scss',
                //'css/styles2.min.css': 'sass/styles2.scss'
            }
          },
    
      },
     
      postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
        require('autoprefixer')({
          browsers: [
            'last 2 versions',
            'Chrome >= 30',
            'Firefox >= 30',
            'ie >= 10',
            'Safari >= 8'
          ]
            })
      ]
        },
        expanded: {
          src: 'css/styles.css',
          // src: 'css/styles2.css'
        },
        min: {
          src: 'css/styles.min.css',
          // src: 'css/styles2.min.css'
        },
      },

      watch: { // Compile everything into one task with Watch Plugin
        css: {
          files: '**/*.scss',
          tasks: ['sass_comp']
        },
      },

      browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'css/*.css',
                    '**/*.html',
                    '**/*.js'
                ]
            },
            options: {
                watchTask: true,
                server: './'
            }
        }
    },

    //  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files Sass!',
          title: 'DoktoloCSS', // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 2 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Finish Compiled!',
          title: 'DoktoloCss',
          success: true,
          duration: 2
        }
      },
   
    },
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Register Grunt tasks

    grunt.registerTask('sass_comp', 
    ['sass:expanded',
    'sass:min',
    'postcss:expanded',
    'postcss:min',
    'notify'
    ]
  );
    grunt.registerTask('default', ['browserSync' ,'watch' ]);
  };