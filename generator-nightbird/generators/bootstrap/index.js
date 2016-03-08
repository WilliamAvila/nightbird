'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require("glob");

var csslang = [
  {
    dep: 'bootstrap',
    ver: '^3.3.6'

  }, {
    dep: 'bootstrap-sass',
    ver: '^3.3.6'
  },
  {
    dep: 'jquery',
    ver: '^2.2.0'
  }

];

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

            var promtFramework = {
                type: 'list',
                name: 'cssframework',
                message: 'Choose a Stylesheet Language...',
                choices: [
                    {
                        name: 'SASS',
                        value: ['SASS',[
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
                        name: 'LESS',
                        value: ['LESS',[
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
                    }]
            }

            var prompts = [];

            this.prompt(prompts, function (props) {
                 this.props = props;
                 done();
            }.bind(this));
    },

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