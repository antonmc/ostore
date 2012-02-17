/*global dojo dijit widgets orion  window console define*/

define([ 
    "dojo/_base/declare", 
    "dijit/_Widget", 
    "dijit/_TemplatedMixin",
    "dojo/dom",
    "dojo/dom-construct", 
    "dojo/_base/xhr" 
    ], function(declare, widget, templatedMixin, dom, construct, xhr ) { 
    
    return declare("widgets.RegisterDialog", [widget, templatedMixin ], { 
    
        templateString:'<div><div id="myModal" class="modal hide fade" style="display: none; ">' +
                          '<div class="modal-header">' +
                             '<a class="close" data-dismiss="modal">×</a>' +
                             '<h3>Register a plugin</h3>' +
                          '</div>' +
                          '<div class="modal-body">' +
                             '<form class="form-horizontal">' +
                                '<fieldset>' +
                                   '<div class="control-group">' +
                                      '<label class="control-label" for="input02">Plugin name:</label>' +
                                      '<div class="controls">' +
                                         '<input type="text" class="input-xlarge" data-dojo-attach-point="pluginName">' +
                                      '</div>' +
                                   '</div>' +
                                   '<div class="control-group">' +
                                      '<label class="control-label" for="input01">URL:</label>' +
                                      '<div class="controls">' +
                                         '<input type="text" class="input-xlarge" data-dojo-attach-point="pluginUrl">' +
                                      '</div>' +
                                   '</div>' +
                                   '<div class="control-group">' +
                                      '<label class="control-label" for="textarea">Description:</label>' +
                                      '<div class="controls">' +
                                         '<textarea class="input-xlarge" data-dojo-attach-point="pluginDescription" rows="3"></textarea>' +
                                      '</div>' +
                                   '</div>' +
                                '</fieldset>' +
                             '</form>' +
                          '</div>' +
                          '<div class="modal-footer">' +
                             '<a href="#" class="btn btn-primary" onclick="processRequest()">Save changes</a>' +
                             '<a href="#" class="btn" data-dismiss="modal">Close</a>' +
                          '</div>' +
                     '</div></div>',

         postCreate: function(){
	 },
   
	 handleResponse: function( response ){
            $('#myModal').modal('hide')
            location.reload(true);
         },

	 handleError: function( error ){
	    $('#myModal').modal('hide')
         },

	 processRequest: function(){

           var pluginUrl = this.pluginUrl.value;
           var pluginDescription = this.pluginDescription.value;
           var pluginName = this.pluginName.value;

           var newPluginData = '{ name:' + pluginName +', description:' + pluginDescription + ', url:' + pluginUrl + '}';

           var args = {
              url: "/plugins",
              postData: newPluginData,
              handleAs: 'text',
	      load: dojo.hitch( this, 'handleResponse' ),
	      error: dojo.hitch( this, 'handleError' )
           };

           xhr.post(args);
	 }

    });
})
