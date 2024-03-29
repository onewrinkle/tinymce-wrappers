const { CheckerPlugin } = require('awesome-typescript-loader');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');
const swag = require('@ephox/swag');

module.exports = function(grunt) {
    var packageData = grunt.file.readJSON('package.json');
    var BUILD_VERSION = packageData.version + '-' + (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : '0');
    const libPluginPath = 'lib/main/ts/Plugin.js';
    const scratchPluginPath = 'scratch/compiled/plugin.js';
    const scratchPluginMinPath = 'scratch/compiled/plugin.min.js';
    const tsDemoSourceFile = path.resolve('src/demo/ts/Demo.ts');
    const jsDemoDestFile = path.resolve('scratch/compiled/demo.js');

    grunt.initConfig({
        pkg: packageData,

        clean: {
            dirs: ["../../pwa/src/assets/tinymce/plugins/separator/", 'scratch'],
            options: {
                force: true
            }
        },

        tslint: {
            options: {
                configuration: 'tslint.json'
            },
            plugin: ['src/**/*.ts']
        },

        shell: {
            command: 'tsc'
        },

        rollup: {
            options: {
                treeshake: true,
                name: 'plugin',
                format: 'iife',
                banner: '(function () {',
                footer: 'plugin();})();',
                onwarn: swag.onwarn,
                plugins: [
                    swag.nodeResolve({
                        basedir: __dirname,
                        prefixes: {}
                    }),
                    swag.remapImports()
                ]
            },
            plugin: {
                files: [{
                    src: libPluginPath,
                    dest: scratchPluginPath
                }]
            }
        },

        uglify: {
            plugin: {
                files: [{
                    src: scratchPluginPath,
                    dest: scratchPluginMinPath
                }]
            }
        },

        concat: {
            license: {
                options: {
                    process: function(src) {
                        var buildSuffix = process.env.BUILD_NUMBER ?
                            '-' + process.env.BUILD_NUMBER :
                            '';
                        return src.replace(
                            /@BUILD_NUMBER@/g,
                            packageData.version + buildSuffix
                        );
                    }
                },
                // scratchPluginMinPath is used twice on purpose, all outputs will be minified for premium plugins
                files: {
                    '../../pwa/src/assets/tinymce/plugins/separator/plugin.js': [
                        'src/text/license-header.js',
                        scratchPluginMinPath
                    ],
                    '../../pwa/src/assets/tinymce/plugins/separator/plugin.min.js': [
                        'src/text/license-header.js',
                        scratchPluginMinPath
                    ]
                }
            }
        },

        copy: {
            css: {
                files: [{
                        cwd: 'src/text',
                        src: ['license.txt'],
                        dest: '../../pwa/src/assets/tinymce/plugins/separator',
                        expand: true
                    },
                    { src: ['changelog.txt'], dest: '../../pwa/src/assets/tinymce/plugins/separator', expand: true },
                    {
                        cwd: 'src/assets', // set working folder / root to copy
                        src: '**/*', // copy all files and subfolders
                        dest: '../../pwa/src/assets/tinymce/plugins/separator/assets', // destination folder
                        expand: true // required when using cwd
                    }
                ]
            }
        },

        webpack: {
            options: {
                mode: 'development',
                watch: true
            },
            dev: {
                entry: tsDemoSourceFile,
                devtool: 'source-map',

                resolve: {
                    extensions: ['.ts', '.js']
                },

                module: {
                    rules: [{
                            test: /\.js$/,
                            use: ['source-map-loader'],
                            enforce: 'pre'
                        },
                        {
                            test: /\.ts$/,
                            use: [{
                                loader: 'ts-loader',
                                options: {
                                    transpileOnly: true,
                                    experimentalWatchApi: true
                                }
                            }]
                        }
                    ]
                },

                plugins: [new LiveReloadPlugin(), new CheckerPlugin()],

                output: {
                    filename: path.basename(jsDemoDestFile),
                    path: path.dirname(jsDemoDestFile)
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('@ephox/swag');

    grunt.registerTask('version', 'Creates a version file', function() {
        grunt.file.write('../../pwa/src/assets/tinymce/plugins/separator/version.txt', BUILD_VERSION);
    });

    grunt.registerTask('default', [
        'clean',
        'tslint',
        'shell',
        'rollup',
        'uglify',
        'concat',
        'copy',
        'version'
    ]);
};