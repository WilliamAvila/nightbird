'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require("glob");



module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('generator-nightbird') + ' generator!'
            ));

            var promtTitle = {
                type: 'input',
                name: 'title',
                message: 'Web App Title (app)',
                default: 'app'
            };
            var promtBaseUrl = {
                type: 'input',
                name: 'url',
                message: 'URL (/)',
                default: '/'
            };
            var promtHost = {
                type: 'input',
                name: 'host',
                message: 'Host (localhost)',
                default: 'localhost'
            };

            var promtPort = {
                type: 'input',
                name: 'port',
                message: 'Port (3000)',
                default: '3000'
            };



            var promtFramework = {
                type: 'list',
                name: 'cssframework',
                message: 'Choose a CSS Framwork...',
                choices: [
                    {
                        name: 'Bootstrap',
                        value: ['for_bootstrap',[
                            {
                                dep: 'bootstrap',
                                ver: '^3.3.6'

                            },{
                                dep: 'bootstrap-sass',
                                ver: '^3.3.6'  
                            },
                            {
                                dep: 'jquery',
                                ver: '^2.2.0'                                
                            }
                            
                            ]]
                    },
                    {
                        name: 'Foundation',
                        value: ['for_foundation',[
                            {
                                dep: 'foundation',
                                ver: '^4.2.1-1'
                            
                            },{
                                dep: 'jquery',
                                ver: '^2.2.0'  
                            }
                            
                            ]]
                    }]
            }
            
            var prompts = [promtTitle,promtBaseUrl,promtHost,promtPort];
        
            this.prompt(prompts, function (props) {
                 this.props = props;
                 done();
            }.bind(this));
    },

    writing:{
        src:function(){
            var done = this.async();
            var ignorefiles = [
                'for_bootstrap/*',
                'for_foundation/*',
                'for_bootstrap',
                'for_foundation',
                '**/metadata.json',
                'node_modules/*',
                'node_modules'
                
            ];
                var _this = this;
                glob('**/*',{ignore:ignorefiles,cwd:this.templatePath(),nodir:true}, function(err, files) {
                   files.forEach(function(element) {
                      _this.fs.copy(_this.templatePath(element),_this.destinationPath(element));
                    }, this); 
                    done();
                });               
        },
        
        metadata:function(){
            var metadata = {
                "title": this.props.title,
                "baseUrl": this.props.url,
                "host": this.props.host,
                "port": this.props.port
                }
            this.fs.writeJSON('metadata.json', metadata);    
                
        }
        
    },

    install: function () {
       this.npmInstall()
    }
});