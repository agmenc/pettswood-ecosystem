package org.pettswood.examples.helloworld

import org.pettswood.{Result, Concept}

class HelloWorld extends Concept {
  protected def cell(text: String) = Result.given(text, "World")
}