'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require("glob");

var csslang = [
  {
    dep: 'foundation-sites',
    ver: '^6.2.0'
  },
  {
    dep: 'jquery',
    ver: '^2.2.1'
  }

];

module.exports = yeoman.generators.Base.extend({
    writing:{
        framework:function(){
                this.fs.copy(
                    this.templatePath('home.html'),
                    this.destinationPath('src/app/home/components/home.html')
                        );
                this.fs.copy(
                    this.templatePath('app.scss'),
                    this.destinationPath('src/app/app.scss')
                );
                this.fs.copy(
                    this.templatePath('_settings.scss'),
                    this.destinationPath('src/app/_settings.scss')
                );
        },
        framworkJSON:function(){
           var packagejson= this.fs.readJSON(this.destinationPath('package.json'));
           csslang.forEach(function(element) {
               packagejson.dependencies[element.dep] = element.ver;
           }, this);
           this.fs.writeJSON('package.json', packagejson);
        }

    },

    install: function () {
       this.npmInstall()
    }
});