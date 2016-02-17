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
            
                glob('**/*',{ignore:ignorefiles,cwd:this.templatePath(),nodir:true}, function(err, files) {
                    files.forEach(function(element) {
                       _this.fs.copy(_this.templatePath(element),_this.destinationPath(element));
                    }, this); 
                });
                if(this.props.cssframework == 'Bootstrap'){
                    this.fs.copy(
                        this.templatePath('for_bootstrap/home.html'),
                        this.destinationPath('src/app/home/home.html')
                    );
                    this.fs.copy(
                        this.templatePath('for_bootstrap/home.ts'),
                        this.destinationPath('src/app/home/home.ts')
                    );
                    this.fs.copy(
                        this.templatePath('for_bootstrap/vendor.ts'),
                        this.destinationPath('src/vendor.ts')
                    );
                    this.fs.copy(
                        this.templatePath('for_bootstrap/package.json'),
                        this.destinationPath('package.json')
                    );
                    this.fs.copy(
                        this.templatePath('for_bootstrap/app.scss'),
                        this.destinationPath('src/app/app.scss')
                    );
                }else{
                    this.fs.copy(
                        this.templatePath('for_foundation/home.html'),
                        this.destinationPath('src/app/home/home.html')
                    );
                    this.fs.copy(
                        this.templatePath('for_foundation/home.ts'),
                        this.destinationPath('src/app/home/home.ts')
                    );
                    this.fs.copy(
                        this.templatePath('for_foundation/vendor.ts'),
                        this.destinationPath('src/vendor.ts')
                    );
                    this.fs.copy(
                        this.templatePath('for_foundation/package.json'),
                        this.destinationPath('package.json')
                    );
                    this.fs.copy(
                        this.templatePath('for_foundation/app.scss'),
                        this.destinationPath('src/app/app.scss')
                    );
                }
        }
    },
                    
                
                
                    
                
                
            

    install: function () {
        //this.npmInstall()
    }
});