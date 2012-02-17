/*global dojo dijit widgets orion  window console define*/

define([ 
    "dojo/_base/declare", 
    "dijit/_Widget", 
    "dijit/_TemplatedMixin",
    "dojo/_base/xhr"
    ], function(declare, widget, templatedMixin, xhr ) { 
    
    return declare("widgets.PluginThumbnail", [widget, templatedMixin], { 
    
        templateString: '<div class="span4">' +
			   '<div class="thumbnail">' +
			      '<div class="caption">' +
				 '<h4 data-dojo-attach-point="pluginTitle"></h4>' +
				 '<p data-dojo-attach-point="pluginDescription"></p>' +
				 '<p><a data-dojo-attach-event="onclick:followPluginLink" data-dojo-attach-point="pluginURL" href="#" class="btn primary">Add to Orion &raquo;</a></p>' +
			      '</div>' +
			   '</div>' +
			'</div>',

    	descriptor: '#plugins?installPlugin=',
        
        constructor: function(){ 
	   this.inherited( arguments );
	},

        handleResponse: function(){

	},

	handleError: function(){

	},

    	updateCount: function( plugindata ){

	   var args = {
              url: "/plugins",
              putData: plugindata,
              handleAs: 'text',
	      load: dojo.hitch( this, 'handleResponse' ),
	      error: dojo.hitch( this, 'handleError' )
           };

           xhr.put(args);

	},

        followPluginLink: function(){
	   var plugindata = '{url:' + this.plugin.url + '}';
	   this.updateCount( plugindata );
	   
	   var url = this.plugin.url;
	   if( this.orionTarget ){
	     url = this.orionTarget + this.descriptor + this.plugin.url;
	   }
	   
	   window.location.href=url;
        }, 
		
	postCreate: function(){
	   this.inherited( arguments );
	   this.pluginTitle.innerHTML = this.plugin.name;	
	   this.pluginDescription.innerHTML = this.plugin.description;
           if( !this.orionTarget ){
              this.pluginURL.innerHTML = 'Plugin page &raquo';
	   }
	}
    }); 
}); 
