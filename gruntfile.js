
//noinspection JSUnresolvedVariable
module.exports = function( grunt ) {

  //noinspection JSUnresolvedFunction
  grunt.initConfig({
    package: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        options: {
          banner: '/*!\n' +
            ' * Project: <%= package.name %>\n' +
            ' * Author: <%= package.author %>\n' +
            ' * Version: <%= package.version %>\n' +
            ' * Build date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * License: <%= package.license %>\n' +
            ' */\n',
          beautify: true,
          mangle: false,
          sourceMap: true,
          sourceMapName: 'build/script.map.js'
        },
        src: 'src/app/**/*.js',
        dest: 'build/script.js'
      }
    },
    sass: {
      build: {
        options: {
          style: 'expanded',
          noCache: true
        },
        files: [{
          expand: true,
          cwd: 'src/stylesheets/',
          src: ['**/*.scss'],
          dest: 'build/',
          ext: '.css'
        }]
      }
    },
    copy: {
      templates: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            cwd: 'src/app/',
            src: ['**/*.template.html', '*.template.html'],
            dest: 'build/templates/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'build/'
          }
        ]
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/images/',
            src: ['**'],
            dest: 'build/assets/images/'
          },
          {
            expand: true,
            cwd: 'src/assets/libs/',
            src: ['**'],
            dest: 'build/assets/libs/'
          }
        ]
      }
    }
  });


  /* Load tasks: */
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );

  /* Register tasks: */
  grunt.registerTask( 'app-build', ['uglify:build', 'copy:templates'] );
  grunt.registerTask( 'stylesheets-build', ['sass:build'] );
  grunt.registerTask( 'core-build', ['uglify:build', 'sass:build', 'copy:templates'] );
  grunt.registerTask( 'complete-build', ['uglify:build', 'sass:build', 'copy'] );

  /* Default task: */
  grunt.registerTask( 'default', ['uglify:build', 'sass:build', 'copy'] );

};