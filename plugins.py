import logging
import wsgiref.handlers
import cgi
import urllib
import time
from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from datetime import date
import models

class Collection(webapp.RequestHandler):

  def put(self):

    url = self.request.body.split( 'url:' )[1]
    url = url.split('}')[0]

    plugins = db.GqlQuery( "SELECT * FROM Plugin WHERE url = '%s'" % url )

    for plugin in plugins:
      count = plugin.count
      count = count +1
      plugin.count = count
      plugin.put();
	  
  def post(self):

    name = self.request.body.split( 'name:' )[1]
    name = name.split(',')[0]

    url = self.request.body.split( 'url:' )[1]
    url = url.split('}')[0]

    description = self.request.body.split( 'description:' )[1]
    description = description.split(',')[0]

    plugin = models.Plugin()
    plugin.name = name
    plugin.description = description 
    plugin.url = url 
    plugin.put()

  def get(self):      

    plugins = db.GqlQuery("SELECT * FROM Plugin")

    self.response.headers['Content-Type'] = 'text/json'
    plist = '['
    
    count = 0  
      
    for plugin in plugins:
    	plist = plist + '{ "name":\"%s\", "description":\"%s\", "url":\"%s\" },' % ( plugin.name ,plugin.description,plugin.url ) 
    	
    plist = plist[:-1]
    
    plist = plist + ']'
    
    self.response.out.write( "%s" % plist );
    
      
def main():
    application = webapp.WSGIApplication([('/.*', Collection),], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()  
