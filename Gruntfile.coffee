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
                    dest: "index.html"
                }]

        watch:
            less:
                files: "src/stylus/**/*.styl"
                tasks: ["stylus"]
                options:
                    livereload: true
            coffee:
                files: "src/coffee/**/*.coffee"
                tasks: ["coffeelint", "coffee:main"]
                options:
                    livereload: true
            jsx:
                files: "src/jsx/**/*.coffee"
                tasks: ["coffeelint", "coffee:react"]
            html:
                files: "src/jade/**/*.jade"
                tasks: ["jade", "copy:index"]
                options:
                    livereload: true
            react:
                files: "build/**/*.jsx"
                tasks: ["react"]
                options:
                    livereload: true

    require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

    grunt.registerTask "build", ["coffeelint", "jade", "stylus", "coffee", "react", "copy"]
    grunt.registerTask "default", ["build", "watch"]
