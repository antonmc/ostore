/*global dojo dijit widgets orion  window console define*/

define([ 
    "dojo/_base/declare", 
    "dijit/_Widget", 
    "dijit/_TemplatedMixin",
    "dojo/dom",
    "dojo/dom-construct", 
    "dojo/_base/xhr", 
    "dojo/dom-style",
    "widgets/PluginThumbnail",
    "widgets/RegisterDialog"
    ], function(declare, widget, templatedMixin, dom, construct, xhr, domStyle ) { 
    
    return declare("widgets.PluginContainer", [widget, templatedMixin], { 
    
        templateString:'<div>' +
	                  '<div class="container">' +
                             '<div class="navbar">' +
                                '<div class="navbar-inner">' +
                                   '<div class="container" style="width: auto;">' +
                                      '<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
                                         '<span class="icon-bar"></span>' +
                                         '<span class="icon-bar"></span>' +
                                         '<span class="icon-bar"></span>' +
                                      '</a>' +
                                      '<a class="brand" href="#">Eclipse Orion Plugins</a>' +
                                      '<div class="nav-collapse">' +
                                         '<ul data-dojo-attach-point="navigation" class="nav">' +
                                            '<li class="active"><a href="#">Home</a></li>' +
                                         '</ul>' +
                                         '<form class="navbar-search pull-left" style="padding-top:5px;" action="">' +
                                            '<input type="text" class="search-query span2"  placeholder="Search">' +
                                         '</form>' +
                                         '<ul class="nav pull-right">' +
                                            '<li><a href="http://wiki.eclipse.org/Orion">Orion Project</a></li>' +
                                         '</ul>' +
                                     '</div><!-- /.nav-collapse -->' +
                                  '</div>' +
                                '</div><!-- /navbar-inner -->' +
                           '</div>' +
			   '<div data-dojo-attach-point="pluginset"></div>' +
			   '<p style="text-align:right;font-size:10px;">Built with Eclipse Orion</p>' +
			  '<div data-dojo-attach-point="registerDialog"></div>' +
                        '</div>',

        ROWCAP: 3,

        postCreate: function(){
           this.register = new widgets.RegisterDialog({}, this.registerDialog);
	   this.refresh();
	   if( this.target && this.target.mode === 'register'){
	      this.allowRegistration();
	   }
        },

	allowRegistration: function(){
           construct.place( '<li data-dojo-attach-point="reg"><a data-toggle="modal" href="#myModal">Register a plugin</a></li>', this.navigation )	
        },

	refresh: function(){
           construct.empty( this.pluginset );

	   var args = {
             url: "/plugins",
             handleAs: 'json',
             load: dojo.hitch( this, 'dataLoaded' )
           };

           xhr.get(args);
        },

	dataLoaded: function( response ){
           var rowPointer;
           var rowcheck = this.ROWCAP;
		
           for( var count = 0; count < response.length; count++ ){
			
             if( rowcheck === this.ROWCAP ){
               rowPointer = construct.create( 'div', {'class':'row', 'style':'padding-top:20px;'}, this.pluginset );
               rowcheck = 0;
	     }

             var item = new widgets.PluginThumbnail( {plugin:response[count], orionTarget: this.target} );
             rowPointer.appendChild( item.domNode );
	     rowcheck++;	
           }
	}
    });
});
