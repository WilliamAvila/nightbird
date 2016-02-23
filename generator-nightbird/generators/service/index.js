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
                message: 'Service Title (title)',
                default: 'title'
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
               var template = this.templatePath('service');
              var currentDirectory = this.destinationRoot();
            
            var destination = this.destinationPath(currentDirectory + '/services/' + this.metadata.title + '.ts');            
               this.fs.copyTpl(template,destination,this.metadata);         
        },
        spec:function(){
               var currentDirectory = this.destinationRoot();
            var specDirectory = currentDirectory.replace('app', 'specs');            
            var template = this.templatePath('service.spec');
            var destination = this.destinationPath(specDirectory + '/services/' + this.metadata.title + '.spec.ts');
               this.fs.copyTpl(template,destination,this.metadata); 
        }
        
    },

    install: function () {
    }
});