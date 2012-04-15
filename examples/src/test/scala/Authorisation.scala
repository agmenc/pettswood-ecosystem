import collection.mutable.HashMap
import org.pettswood.examples.authorisation._
import org.pettswood._

class Authorisation(domain: DomainBridge) extends Mixin(domain) {
  var database = HashMap[String, User]()

  domain.learn("Start", () => new Start())
  domain.learn("Assuming users", () => new AssumingUsers(database))
  domain.learn("Access by user", () => new AccessByUser(new AuthorisationService(database)))
}