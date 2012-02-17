from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext import db
import models
import wsgiref.handlers
import os
from google.appengine.ext.webapp import template

class StartUp(webapp.RequestHandler):

  def get(self):

    entries = [ ['CodeMirror highlighting', 'Uses CodeMirror modes to highlight your code.', 'http://mamacdon.github.com/orion-codemirror/codeMirrorPlugin.html' ],
                ['Esprima outline', 
		 'Uses the esprima JavaScript parser to provide a detailed outline of your JavaScript code.',
		 'http://aclement.github.com/esprima-outline/esprimaOutlinerPlugin.html'],
                ['JavaScript outline', 
		 'Provides a simple hierarchical tree view of the functions in a JavaScript file.', 
		 'http://mamacdon.github.com/outliner/outlinerPlugin.html'],	
		['HTML Outline', 
		 'Provides a hierarchical outline of the elements in an HTML file.', 
                 'http://jarthorn.github.com/html-tools/htmlOutlinePlugin.html'],	
                ['Nonymous outline', 
                 'Provides a tree view of JavaScript functions using the Function-Object Consumption algorithm to generate meaningful names for anonymous functions.', 
                 'http://johnjbarton.github.com/outliner/nonymousPlugin.html'] ]

    TITLE=0
    DESCRIPTION=1
    URL=2

    for entry in entries:

      plugin = models.Plugin()

      plugin.name = entry[TITLE]
      plugin.description = entry[DESCRIPTION]
      plugin.url = entry[URL]
      plugin.count = 0

      plugin.put()
     
def main():
    application = webapp.WSGIApplication([('/.*', StartUp)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()
