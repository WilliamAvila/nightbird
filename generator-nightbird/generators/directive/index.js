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
          message: 'Directive Title (directive)',
          default: 'directive'
        };
        var promtSelector = {
          type: 'input',
          name: 'selector',
          message: 'Directive Selector (aa-dir)',
          default: 'aa-dir'
        };
        var promtFolder = {
          type: 'list',
          name: 'directiveFolder',
          message: 'Choose the folder create the directive...',
          choices: directoriesInAppFolder.directories
        };

        var prompts = [promtTitle, promtSelector, promtFolder];

        me.prompt(prompts, function(props) {
          me.props = props;
          me.metadata = {
            title: _.kebabCase(me.props.title),
            classtitle: _.capitalize(me.props.title),
            selector: _.kebabCase(me.props.selector)
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
      var template = this.templatePath('directive.spec');
						var currentDirectory = this.props.directiveFolder
						var destination = this.destinationPath(currentDirectory + '/directive/' + this.metadata.title + '.ts');
						this.fs.copyTpl(template, destination, this.metadata);
    },
    spec: function() {
      var template = this.templatePath('directive');
						var currentDirectory = this.props.directiveFolder
						var destination = this.destinationPath(currentDirectory + '/directive/' + this.metadata.title + '.spec.ts');
						this.fs.copyTpl(template, destination, this.metadata);
    }

  },

  install: function() {
  }
});