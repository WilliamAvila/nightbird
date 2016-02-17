'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require("glob").Glob


module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('generator-nightbird') + ' generator!'

            ));
            
            var prompts = [{
                type: 'list',
                name: 'cssframework',
                message: 'Choose a CSS Framwork...',
                choices: ['Bootstrap', 'Foundation']
            }];
        
            this.prompt(prompts, function (props) {
                 this.props = props;
                 done();
            }.bind(this));
    },

    writing:{
        src:function(){
            var ignorefiles = [
                'for_bootstrap/*',
                'for_foundation/*',
                'for_bootstrap',
                'for_foundation',
                '**/app.scss',
                '**/home.html',
                '**/home.ts',
                '**/package.json',
                '**/vendor.ts'
            ];
                var _this = this;
            
                glob('**/*',{ignore:ignorefiles,cwd:this.templatePath()}, function(err, files) {
                    files.forEach(function(element) {
                       _this.fs.copy(_this.templatePath(element),_this.destinationPath(element));
                    }, this); 
                    
                });
                if(this.props.cssframework == 'Bootstrap'){
                    console.log('bootstrap');
                }else{
                    console.log('foundation');
                }
        }
    },
                    
                
                
                    
                
                
            

    install: function () {
        //this.npmInstall()
    }
});