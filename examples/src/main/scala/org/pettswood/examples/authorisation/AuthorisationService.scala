package org.pettswood.examples.authorisation

import collection.mutable.HashMap

case class Role(name: String, permissions: Permission*)
case class Permission(actionName: String)
case class User(name: String, roles: Role*)

object Guest extends User("Guest")
object DoNothingRole extends Role("do nothing")

object AvailableRoles {
  val roles = List(
    Role("trading",            Permission("View Trade"), Permission("Amend Trade"), Permission("Create Trade"), Permission("Book Trade")),
    Role("trade support",      Permission("View Trade"), Permission("Amend Trade"), Permission("Create Trade")),
    Role("first-line support", Permission("View Trade"), Permission("Amend Trade")),
    Role("it",                 Permission("View Trade"))
  )

  def apply(roleName: String):Role = {
    roles.filter(_.name == roleName.toLowerCase).headOption match {
      case Some(role) => role
      case None => DoNothingRole
    }
  }
}

trait Service {
  def start() { /* Light the touchpaper and stand well clear */ }
}

class AuthorisationService(userDatabase: HashMap[String, User]) extends Service {
  var loggedInUser: User = Guest

  def logIn(name: String) { loggedInUser = userDatabase.getOrElse(name, Guest) }

  def allowed(action: String):Boolean = {
    loggedInUser.roles
      .flatMap(_.permissions)
      .exists(_.actionName.toLowerCase == action.toLowerCase)
  }
}