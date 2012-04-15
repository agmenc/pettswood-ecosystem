package org.pettswood.examples.authorisation

import collection.mutable.HashMap
import org.pettswood._

class AssumingUsers(database: HashMap[String, User]) extends MultiRow {
  var username = ""

  def columns = {
    case "Name" => Name
    case "Roles" => Roles
  }

  case class Name(name: String) extends Doer {username = name}
  case class Roles(roles: String) extends Digger {
    val allowedRoles = roles.split(",").map(_ trim).map(AvailableRoles(_))
    database.put(username, User(username, allowedRoles: _*))
    def actual = roles
  }
}