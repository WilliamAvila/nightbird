'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var folderSelector = require('../../helpers/folderSelector');



module.exports = yeoman.generators.Base.extend({


  prompting: function() {
    var done = this.async();
    var me = this;
    folderSelector.findAllFoldersInApp(this.destinationRoot(), function(directoriesInAppFolder) {

      if (!directoriesInAppFolder.err) {
        var promtTitle = {
          type: 'input',
          name: 'title',
          message: 'Pipe Title (pipe)',
          default: 'pipe'
        };

        var promtFolder = {
          type: 'list',
          name: 'pipeFolder',
          message: 'Choose the folder create the pipe...',
          choices: directoriesInAppFolder.directories
        }

        var prompts = [promtTitle, promtFolder];

        me.prompt(prompts, function(props) {
          me.props = props;
          me.metadata = {
            title: _.kebabCase(me.props.title),
            classtitle: _.capitalize(me.props.title)
          }
          done();
        }.bind(me));
      } else {
        console.log(directoriesInAppFolder.err);
        done();
      }

    })


  },

  writing: {

    service: function() {
						var template = this.templatePath('pipe');
						var currentDirectory = this.props.pipeFolder;
						var destination = this.destinationPath(currentDirectory + '/pipe/' + this.metadata.title + '.ts');
						this.fs.copyTpl(template, destination, this.metadata);
    },
    spec: function() {
            var template = this.templatePath('pipe.spec');
						var currentDirectory = this.props.pipeFolder;
						var destination = this.destinationPath(currentDirectory + '/pipe/' + this.metadata.title + '.spec.ts');
						this.fs.copyTpl(template, destination, this.metadata);
    }

  },

  install: function() {
  }
});