'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('generator-nightbird') + ' generator!'

            ));

        done();
            
        //     var prompts = [{
        //         type: 'confirm',
        //         name: 'someOption',
        //         message: 'Would you like to enable this option?',
        //         default: true
        //     }];
        // 
        //     this.prompt(prompts, function (props) {
        //         this.props = props;
        //         // To access props later use this.props.someOption;
        // 
        //         done();
        //     }.bind(this));
    },

    writing:{
        src:function(){
            this.fs.copy(this.templatePath(), this.destinationPath());
        }
                        
    },

    install: function () {
        this.npmInstall()
    }
});
