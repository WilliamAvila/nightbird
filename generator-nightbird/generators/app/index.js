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
            
            var prompts = [promtTitle,promtBaseUrl,promtHost,promtPort,promtFramework];
        
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
                '**/app.scss',
                '**/home.html',
                '**/home.ts',
                '**/package.json',
                '**/vendor.ts',
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
                
        },
        
        framework:function(){
                this.fs.copy(
                    this.templatePath(this.props.cssframework[0]+'/home.html'),
                    this.destinationPath('src/app/home/home.html')
                        );
                this.fs.copy(
                    this.templatePath(this.props.cssframework[0]+'/home.ts'),
                    this.destinationPath('src/app/home/home.ts')
                );
                this.fs.copy(
                    this.templatePath(this.props.cssframework[0]+'/vendor.ts'),
                    this.destinationPath('src/vendor.ts')
                );
                this.fs.copy(
                    this.templatePath(this.props.cssframework[0]+'/app.scss'),
                    this.destinationPath('src/app/app.scss')
                );
        },
        framworkJSON:function(){
           var packagejson= this.fs.readJSON(this.templatePath('package.json'));
           
           this.props.cssframework[1].forEach(function(element) {
               packagejson.dependencies[element.dep] = element.ver;
           }, this);
           this.fs.writeJSON('package.json', packagejson);
        }
        
    },

    install: function () {
       this.npmInstall()
    }
});