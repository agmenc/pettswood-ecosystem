import collection.mutable.HashMap
import org.pettswood.examples.authorisation._
import org.pettswood._

class Authorisation(domain: DomainBridge) extends Mixin(domain) {
  val database = HashMap[String, User]()
  val service = new AuthorisationService(database)

  domain.learn("Start", () => new Start(service))
  domain.learn("Assuming users", () => new AssumingUsers(database))
  domain.learn("Access by user", () => new AccessByUser(service))
}