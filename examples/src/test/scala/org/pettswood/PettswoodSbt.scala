package org.pettswood

import org.pettswood.runners.sbt.SbtIntegrationHook
import runners.SingleRunner

class PettswoodSbt extends SbtIntegrationHook

object Runner extends App {
  println(sys.props("user.dir"))
  SingleRunner("src/test/resources/specs/TradeBookingSystemAccessControls.html")
}