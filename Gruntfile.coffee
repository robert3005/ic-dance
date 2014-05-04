module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"

        coffeelint:
            options: grunt.file.readJSON "coffeelint.json"
            dev: ["src/**/*.coffee"]

        coffee:
            main:
                options:
                    sourceMap: true
                files: [{
                    expand: true
                    cwd: "src/coffee/"
                    src: ["**/*.coffee"]
                    dest: "js/"
                    ext: ".js"
                }]
            react:
                options:
                    sourceMap: true
                    bare: true
                files: [{
                    expand: true
                    cwd: "src/jsx/"
                    src: ["**/*.coffee"]
                    dest: "build/"
                    ext: ".jsx"
                }]

        stylus:
            development:
                files: [{
                    expand: true
                    cwd: "src/stylus/"
                    src: ["main.styl", "error.styl"]
                    dest: "css/"
                    ext: ".css"
                }]

        jade:
            options:
                pretty: true
            templates:
                files: [{
                    expand: true
                    cwd: "src/jade/"
                    src: ["**/*.jade"]
                    dest: "templates/"
                    ext: ".html"
                }]

        react:
            coffeejsx:
                files: [{
                    expand: true
                    cwd: "build"
                    src: ["**/*.jsx"]
                    dest: "js/"
                    ext: ".js"
                }]

        copy:
            index:
                files: [{
                    src: "templates/index.html"
                    dest: "index.full.html"
                }]

        uncss:
            dist:
                options:
                    media: ["print"]
                    ignore: [/map/, ".infoWindow", /timetable/, /fc/, /btn/,
                            /navbar\-collapse/, /collapse/, /collapsing/]
                files:
                  "css/main.dist.css": ["index.full.html"]

        cssmin:
            minify:
                files:
                    "css/main.min.css": ["css/main.dist.css"]

        clean:
            all: ["css", "js", "build", "templates"]

        browserify:
            dist:
                options:
                    transform: ["browserify-shim"]
                files:
                    "js/dist/main.js": ["js/*.js"]
            live:
                options:
                    transform: ["browserify-shim"]
                    watch: true
                    keepAlive: true
                files:
                    "js/dist/main.js": ["js/*.js"]
        uglify:
            dist:
                files:
                    "js/dist/main.min.js": ["js/dist/main.js"]

        processhtml:
            dist:
                files:
                  "index.html": ["templates/index.html"]

        watch:
            styl:
                files: "src/stylus/**/*.styl"
                tasks: ["stylus"]
                options:
                    livereload: true
            coffee:
                files: "src/coffee/**/*.coffee"
                tasks: ["coffeelint", "coffee:main"]
            jsx:
                files: "src/jsx/**/*.coffee"
                tasks: ["coffeelint", "coffee:react"]
            html:
                files: "src/jade/**/*.jade"
                tasks: ["jade", "processhtml", "copy:index"]
                options:
                    livereload: true
            react:
                files: "build/**/*.jsx"
                tasks: ["react"]
            browserify:
                files: "js/dist/main.js"
                options:
                    livereload: true

        concurrent:
            watch:
                options:
                    logConcurrentOutput: true
                tasks: ["watch", "browserify:live"]


    require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

    grunt.registerTask "build", ["coffeelint", "jade", "stylus", "coffee", "react", "copy"]
    grunt.registerTask "css", ["stylus", "uncss", "cssmin"]
    grunt.registerTask "js", ["coffeelint", "coffee", "react", "browserify:dist", "uglify"]
    grunt.registerTask "tpl", ["jade", "processhtml", "copy"]
    grunt.registerTask "dist", ["css", "js", "tpl"]
    grunt.registerTask "minify", ["copy", "uglify", "uncss", "cssmin", "processhtml"]
    grunt.registerTask "default", ["build", "concurrent"]
