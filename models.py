#!/usr/bin/env python

import datetime
import hashlib

from google.appengine.ext import db
from google.appengine.api import memcache
from google.appengine.api import users

class Plugin(db.Model):
  name = db.StringProperty()
  description = db.StringProperty()
  url = db.StringProperty()
  count = db.IntegerProperty()
  thing = db.IntegerProperty()
  
class Suggestion(db.Model):
  description = db.StringProperty()
  name = db.StringProperty()
  contact = db.StringProperty()
