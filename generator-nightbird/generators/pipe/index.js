'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');



module.exports = yeoman.generators.Base.extend({
    
    
    prompting: function () {
        var done = this.async();
            
            var promtTitle = {
                type: 'input',
                name: 'title',
                message: 'Pipe Title (pipe)',
                default: 'pipe'
            };
            
            var prompts = [promtTitle];
        
            this.prompt(prompts, function (props) {
                 this.props = props;
                 this.metadata =  {
                   title : _.kebabCase(this.props.title),
                   classtitle : _.capitalize(this.props.title)
               }
                 done();
            }.bind(this));
    },

    writing:{
        
        service:function(){
               var template = this.templatePath('pipe');
               var currentDirectory = this.destinationRoot();
            
               var destination = this.destinationPath(currentDirectory + '/pipe/' + this.metadata.title + '.ts');            
               this.fs.copyTpl(template,destination,this.metadata);         
        },
        spec:function(){
               var currentDirectory = this.destinationRoot();
               var specDirectory = currentDirectory.replace('app', 'specs');            
               var template = this.templatePath('pipe.spec');
               var destination = this.destinationPath(specDirectory + '/pipe/' + this.metadata.title + '.spec.ts');
               this.fs.copyTpl(template,destination,this.metadata); 
        }
        
    },

    install: function () {
    }
});