package org.pettswood.examples.authorisation

import org.pettswood._

class Start extends Concept {
  // Head off and start some RESTful web service or web app
  protected def cell(text: String) = Pass("Started")
}