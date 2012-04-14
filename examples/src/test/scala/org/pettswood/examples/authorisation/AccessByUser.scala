package org.pettswood.examples.authorisation

import org.pettswood._

class AccessByUser(authorisationService: AuthorisationService) extends MultiRow {
  var username = ""

  def columns = {
    case "Name" => Name
    case permission => new TestPermission(permission).process
  }

  class TestPermission(permission: String) {
    def process(cellText: String): Digger = { PermissionChecker(permission) }

  }
  case class Name(name: String) extends Doer {username = name}
  case class PermissionChecker(permission: String) extends Digger {
    def actual = if (authorisationService.allowed(username, permission)) "X" else ""
  }
}