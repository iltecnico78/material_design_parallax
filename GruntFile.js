module.exports = function(grunt) {
  
  
  
  // Project configuration.
  grunt.initConfig({
    global:{
        e:grunt.option('course')
    },
    /* posso leggere anche da un altro file json */
    pkg: grunt.file.readJSON('package.json'),
    /* 
        per vedere come si usa unglify 
        grunt-contrib-uglify
    */
    uglify: {
      options: {
        banner: '/* global.e avrei potuto non mettere global  commento in testata! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        /*
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
        */
        /* minifizzo file js */
         src: 'build/js/app.js',
         dest: 'build/js/app.js'
      }
    },
    babel: {
		options: {
            /* nel momento in cui ti da errore console browser riga di errore corretto */
			//sourceMap: true,
            /* converti da es2015  */
			//presets: ['es2015']
		},
		dist: {
            /* quale file trasformati e dove devono essere salvati, prima minifizzo e dopo converto tutto  */
			files: {
				//'build/js/app.js': 'build/js/app.js'
			}
		}
	},
    concat: {
        options: {
             /*serve per mettere a fine file il ; metterlo alla fine di ogni riga var
             var marco
             var cognome
             verrebbe
             var marcovar cognome // errore
             ;;;; non vengono considerati erorri
             */
             separator: ';'
        },
        dist: {
            src: ['src/js/**/*.js', '!src/js/vendors/*'],
            dest: 'build/js/app.js'
        },
        vendors:{
            src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/materialize-css/dist/js/materialize.min.js'
            /*
            'node_modules/angular/angular.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'src/js/vendors/*.js',
            'node_modules/jquery-ui/ui/widget.js',
            'node_modules/jquery-ui/ui/widgets/mouse.js',
            'node_modules/jquery-ui/ui/widgets/slider.js',
            'node_modules/video.js/dist/video.min.js',
            'node_modules/angular-fullscreen/src/angular-fullscreen.js',
            'node_modules/buzz/dist/buzz.min.js',
            'node_modules/checklist-model/checklist-model.js'
            */
            ],
            dest: 'build/js/vendors.js'
            
        },
        vendorsCss:{
            src: [
            'node_modules/materialize-css/dist/css/materialize.min.css'
            /*
            'node_modules/video.js/dist/video-js.min.css',
            'node_modules/jquery-ui/themes/base/slider.css',
            'node_modules/jquery-ui/themes/base/theme.css'
            */
            ],
            dest: 'build/css/vendors.css'
        },
        vendorsCssFontAwesome:{
            src: [
            'node_modules/font-awesome/css/font-awesome.min.css'
            /*
            'node_modules/video.js/dist/video-js.min.css',
            'node_modules/jquery-ui/themes/base/slider.css',
            'node_modules/jquery-ui/themes/base/theme.css'
            */
            ],
            dest: 'build/css/font-awesome.min.css'
        }

    

    },
    watch: {
        sass: {
            /* 'posso fare una modifica a tutti i file in ascolto */
            files: [ 'src/sass/**/*.scss'],
            /* lancio il task di sass */
            tasks: ['style'],
        },

        js: {
            /* 'posso fare una modifica a tutti i file in ascolto */
            files: [ 'src/js/**/*.js','src/js/*.js'],
             /* lancio il task di sass */
            tasks: ['js'],
        },
        html:{
           /* 'posso fare una modifica a tutti i file in ascolto */
            files: [ 'src/**/*.html'],
             /* lancio il task copy */
            tasks: ['copy:html'], 
        },
        images:{
           /* 'posso fare una modifica a tutti i file in ascolto */
            files: [ 'src/images/*'],
             /* lancio il task copy */
            tasks: ['copy:images'], 
        },
        //json:{
           /* 'posso fare una modifica a tutti i file in ascolto */
            //files: [ 'src/config/**/*.json'],
             /* lancio il task copy */
            //tasks: ['copy:json'], 
        //},
        
        configFiles: {
            /* 'posso fare una modifica a tutti i file in ascolto */
            files: [ 'Gruntfile.js'], 
            /* gli dico di lanciare default ogni cambiamento di  grunt.js */
            tasks: [ 'default'],
            /* lancia lui il task */
            options: {
            // se cambio gruntfile non devo riavviare esempio importo una libreria
                reload: true
            }
        }
    },
    sass: {
		options: {
            /* compressed miniffizza non mettere unglify*/
            style: 'compressed'
		},
		dist: {
			files: {
                /* prima c'è la destizione e dopo il sorgente */
				'build/css/app.css': 'src/sass/app.scss'
			}
		}
	},
    connect: {
        server: {
                options: {
                    /*port: 8000,*/
                    /* gli dico di usare la porta attiva */
                    useAvailablePort:true,
                    /* 127.0.0.1 */
                    hostname: '*',
                    /* definisco root nel copiare  */
                    directory:'build',
                    /* definisco root nel browser */
                    base:'build',
                    /* tieni vivo il server */
                    //keepalive:true,
                    /*
                    quando parte server fa qualcosa
                    onCreateServer: function(server, connect, options) {
                    var io = require('socket.io').listen(server);
                    io.sockets.on('connection', function(socket) {
                        // do something with socket
                    });
                    */
                    /* serve per lanciare il browser altrimenti dovrei aprirlo io*/
                    open:true
                }
            }
    },

    copy: {
        assets: {
            files: [
            // includes files within path 
            {
                /* tiene la struttura identica */
                expand: true, 
                /* path da cui partire */
                
                cwd:"src/",
                src: [
                    'images/**',
                    'fonts/**'
                ],
                dest: 'build/'
                
                /*
                filter: 'isFile'
                */
            },
            /*
            // includes files within path and its sub-directories
            {expand: true, src: ['path/**'], dest: 'dest/'},

            // makes all src relative to cwd
            {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

            // flattens results to a single level
            {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
            */
            ],
        },
        html: {
            files: [
            // includes files within path 
            {
                /* tiene la struttura identica */
                expand: true, 
                /* path da cui partire */
                cwd:"src/",
                src: [
                    '**/*.html'
                ],
                dest: 'build/'
                /*
                filter: 'isFile'
                */
            }]
        },
        json: {
            files: [
            // includes files within path 
            {
                /* tiene la struttura identica */
                //expand: true, 
                /* path da cui partire */
                
                //cwd:"src/config/",
                //src: [
                //    '**/*.html'
                //],
                //dest: 'build/config/'
                /*
                filter: 'isFile'
                */
            }]
        }
    }

  });

  // Load the plugin that provides the "uglify" task.
  /* precarica il plugin, in questo caso solo uglify ma se uso altri li devo mettere tutti */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
  

  // Default task(s).
  // facendo grunt nome (default) lancia unglify
  //grunt.registerTask('default', ['uglify','babel']);
  /* i nomi devono essere diversi, potrei chiamare con && diversi pacchetti */
  /*grunt.registerTask('create-scorm', ['uglify']);*/
  /*grunt.registerTask('copy', ['']);*/
  
  grunt.registerTask('style', ['sass']);
  grunt.registerTask('js', ['concat','babel']);
  grunt.registerTask('default', ['copy','js','style','connect','watch']);
  

};