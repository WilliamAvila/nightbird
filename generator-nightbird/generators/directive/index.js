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
                message: 'Directive Title (directive)',
                default: 'directive'
            };
            var promtSelector = {
            type: 'input',
            name: 'selector',
            message: 'Directive Selector (aa-dir)',
            default: 'aa-dir'
        };
            
            var prompts = [promtTitle,promtSelector];
        
            this.prompt(prompts, function (props) {
                 this.props = props;
                 this.metadata =  {
                   title : _.kebabCase(this.props.title),
                   classtitle : _.capitalize(this.props.title),
                   selector: _.kebabCase(this.props.selector)
               }
                 done();
            }.bind(this));
    },

    writing:{
        
        service:function(){
               var template = this.templatePath('directive');
               var currentDirectory = this.destinationRoot();
            
               var destination = this.destinationPath(currentDirectory + '/directive/' + this.metadata.title + '.ts');            
               this.fs.copyTpl(template,destination,this.metadata);         
        },
        spec:function(){
               var currentDirectory = this.destinationRoot();
               var specDirectory = currentDirectory.replace('app', 'specs');            
               var template = this.templatePath('directive.spec');
               var destination = this.destinationPath(specDirectory + '/directive/' + this.metadata.title + '.spec.ts');
               this.fs.copyTpl(template,destination,this.metadata); 
        }
        
    },

    install: function () {
    }
});