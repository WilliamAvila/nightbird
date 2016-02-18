'use strict';
var generators = require('yeoman-generator'),
    _ = require('lodash');

module.exports = generators.Base.extend({
    prompting: function () {
        console.log('inside controller sub-generator');
        var done = this.async();
        var promtTitle = {
                type: 'input',
                name: 'title',
                message: 'Controller Name (nb)',
                default: 'nb'
            };
            
        
         var prompts = [promtTitle];
        
            this.prompt(prompts, function (props) {
                 this.props = props;
                 done();
            }.bind(this));
    },
    
    writing: function(){
        
       console.log("controller name: "+ this.props.title+".controller.js");
    }
});