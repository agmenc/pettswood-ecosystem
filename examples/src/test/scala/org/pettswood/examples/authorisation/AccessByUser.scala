package org.pettswood.examples.authorisation

import org.pettswood._

class AccessByUser(authorisationService: AuthorisationService) extends MultiRow {

  def columns = {
    case "Name" => Name
    case permission => new TestPermission(permission).process
  }

  case class Name(name: String) extends Doer { authorisationService.logIn(name) }

  class TestPermission(permission: String) {
    def process(cellText: String): Digger = { PermissionChecker(permission) }
  }

  case class PermissionChecker(permission: String) extends Digger {
    def actual = if (authorisationService.allowed(permission)) "X" else ""
  }
}