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
          message: 'Component Title (home)',
          default: 'home'
        };

        var promtSelector = {
          type: 'input',
          name: 'selector',
          message: 'Component Selector (aa-home)',
          default: 'aa-home'
        };

        var promtFolder = {
          type: 'list',
          name: 'componentFolder',
          message: 'Choose the folder create the component...',
          choices: directoriesInAppFolder.directories
        }

        var prompts = [promtTitle, promtSelector, promtFolder];

        me.prompt(prompts, function(props) {
          me.props = props;
          this.metadata = {
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
						var template = this.templatePath('component');

						var currentDirectory = this.props.componentFolder

						var destination = this.destinationPath(currentDirectory + '/components/' + this.metadata.title + '.ts');
						this.fs.copyTpl(template, destination, this.metadata);
				},
				spec: function() {

      var template = this.templatePath('component.spec');
						var currentDirectory = this.props.componentFolder
						var destination = this.destinationPath(currentDirectory + '/components/' + this.metadata.title + '.spec.ts');
						this.fs.copyTpl(template, destination, this.metadata);
				}

		},

		install: function() {
		}
});