package org.pettswood.examples.authorisation

import org.pettswood._

class Start(service: Service) extends Concept {
  protected def cell(text: String) = { service.start(); Pass("Started") }
}