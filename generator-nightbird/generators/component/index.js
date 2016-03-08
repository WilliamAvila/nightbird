'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var folderSelector =  require('../helpers/folderSelector');
helpe

module.exports = yeoman.generators.Base.extend({


		prompting: function () {
				var done = this.async();

        folderSelector.findAllFoldersInApp ( function (directoriesInAppFolder) {

          if(!directoriesInAppFolder.err){
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

				var prompts = [promtTitle,promtSelector, promtFolder];

				this.prompt(prompts, function (props) {
						this.props = props;
						this.metadata = {
								title: _.kebabCase(this.props.title),
								classtitle: _.capitalize(this.props.title),
								selector: _.kebabCase(this.props.selector)

						}
						done();
				}.bind(this));

          } else {
            this.env.err(directoriesInAppFolder.err);
            done();
          }

        })

		},

		writing: {

				service: function () {
						var template = this.templatePath('component');

						var currentDirectory = this.props.componentFolder

						var destination = this.destinationPath(currentDirectory + '/components/' + this.metadata.title + '.ts');
						this.fs.copyTpl(template, destination, this.metadata);
				},
				spec: function () {
						var currentDirectory = this.destinationRoot();
						var specDirectory = currentDirectory.replace('app', 'specs');
						var template = this.templatePath('component.spec');
						var destination = this.destinationPath(specDirectory + '/components/' + this.metadata.title + '.spec.ts');
						this.fs.copyTpl(template, destination, this.metadata);
				}

		},

		install: function () {
		}
});