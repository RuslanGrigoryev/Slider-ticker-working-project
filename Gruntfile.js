module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройка для объединения файлов находится тут
            dist: {
                    src: [
                        'js/libs/*.js', // Все JS в папке libs
                        'js/script.js'  // Конкретный файл
                    ],
                    dest: 'js/build/production.js',
                }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'i/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'i/build/'
                }]
            }
        },
        watch: {
          scripts: {
            files: ['js/libs/*.js', 'js/script.js'],
            tasks: ['concat', 'uglify'],
            options: {
              spawn: false,
            },
          },
          css: {
              files: ['css/*.scss'],
              tasks: ['sass'],
              options: {
                spawn: false,
                livereload: true
              }
          }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/style.css': 'css/style.scss'
                }
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['watch']);

};