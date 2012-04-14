package org.pettswood.examples.authorisation

import collection.mutable.HashMap

case class Role(name: String, permissions: Permission*)
case class Permission(actionName: String)
case class User(name: String, roles: Role*)

object DoNothingRole extends Role("do nothing")

object AllowedRoles {
  val roles = HashMap(
    "trade support" -> Role("trade support", Permission("Create Trade"), Permission("View Trade"), Permission("Amend Trade"))
  )
  def apply(roleName: String):Role = {
    roles.getOrElse(roleName toLowerCase, DoNothingRole)
  }
}

class AuthorisationService(database: HashMap[String, User]) {
  def allowed(name: String, action: String):Boolean = {
    database.get(name) match {
      case Some(user) => user.roles.flatMap(_.permissions).exists(_.actionName.toLowerCase == action.toLowerCase)
      case None => false
    }
  }
}