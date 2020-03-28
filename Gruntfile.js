module.exports = function(grunt) {
    grunt.initConfig({	
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build : {
                tsconfig: './tsconfig.json',
                options: { fast: 'never' }
            },
            serve : {
                tsconfig: './tsconfig.json',
                watch: '.',
                options: { fast: 'never' }
            },
        },   
        nodemon: {
            serve: {
                script: 'build/server.js',
                options: {
                    nodeArgs: ['--require', 'source-map-support/register'],
                    watch: ['./build/*'],
                    ext: 'js',
                    delay: 1000
              }
            }
        }, 
        concurrent: {
            serve: ['ts:serve', 'nodemon:serve'],
            options: {
                logConcurrentOutput: true
            }
        },
        shell: {
            refreshToken: 'vsts-npm-auth -config .npmrc',
            start: 'node -r source-map-support/register build/server.js',
            cleardb: 'knex migrate:down --cwd build/source/database',
            migrate: 'knex migrate:up --cwd build/source/database',
            seeds: 'knex seed:run --cwd build/source/database',
            mochaTestAll: 'mocha build/test/**/*.Test.js --reporter spec',
            mochaTest: { command: (service) => `mocha build/test/**/*.Test.js --reporter spec -g ${service}` },
            coverageTests: "nyc mocha build/test/**/*.Test.js",
            
            releaseSetup: "node release/setup.js",
            mkdir:{ command: (dir) => `mkdir ${dir}` },
            deleteDir: { command: (dir) => `rm -rf ${dir}` },

            copy: { command: (file) => `copy ${file} build\\${file}` },
            copyRelease: { command: (file) => `copy release\\${file} build\\${file}` },
            copyAll: { command: (file) => `copy ${file}\\* build\\${file}` },

            unixCopy: { command: (file) => `cp ${file} build/${file}` },
            unixCopyRelease: { command: (file) => `cp release/${file} build/${file}` },
            unixCopyAll: { command: (file) => `cp ${file}/* build/${file}` },
        }
    });

    // Load the plugin that provides the "" task.
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');

    // Tasks
    grunt.registerTask('refresh_token', ['shell:refreshToken']);

    grunt.registerTask('init', ['shell:mkdir:build']);
    grunt.registerTask('build', ['shell:deleteDir:coverage',
                                 'shell:deleteDir:build',
                                 'shell:mkdir:build',
                                 'shell:mkdir:build\\specification',
                                 'shell:mkdir:build\\test\\files',
                                 'shell:copy:.env',
                                 'shell:copy:specification\\PreparaTec.yaml',
                                 'shell:copyAll:test\\files',
                                 'ts:build']);
    grunt.registerTask('unixBuild', ['shell:deleteDir:coverage',
                                     'shell:deleteDir:build',
                                     'shell:mkdir:build',
                                     'shell:mkdir:build/specification',
                                     'shell:mkdir:build/test',
                                     'shell:mkdir:build/test/files',
                                     'shell:unixCopy:.env',
                                     'shell:unixCopy:specification/PreparaTec.yaml',
                                     'shell:unixCopyAll:test/files',
                                     'ts:build']);
    grunt.registerTask('release', ['shell:deleteDir:build',
                                   'shell:mkdir:build',
                                   'shell:mkdir:build\\specification',
                                   'shell:copy:.npmrc',
                                   'shell:copyRelease:package.json',
                                   'shell:copyRelease:.env',
                                   'shell:releaseSetup',
                                   'ts:build',
                                   'shell:deleteDir:build\\test']);
    grunt.registerTask('unixRelease', ['shell:deleteDir:build',
                                       'shell:mkdir:build',
                                       'shell:mkdir:build/specification',
                                       'shell:unixCopy:.npmrc',
                                       'shell:unixCopyRelease:package.json',
                                       'shell:unixCopyRelease:.env',
                                       'shell:releaseSetup',
                                       'ts:build',
                                       'shell:deleteDir:build/test']);
    grunt.registerTask('migrate', ['shell:cleardb',
                                   'shell:migrate']);
    grunt.registerTask('cleardb', ['shell:cleardb']);
    grunt.registerTask('seed', ['shell:cleardb',
                                'shell:migrate',
                                'shell:seeds']);
    grunt.registerTask('start', ['shell:start']);
    grunt.registerTask('serve', ['concurrent:serve']);
    grunt.registerTask('coverage', ['shell:coverageTests']);
    grunt.registerTask('test', ['shell:mochaTestAll']);
    grunt.registerTask('test_', ['shell:mochaTests:']);
}