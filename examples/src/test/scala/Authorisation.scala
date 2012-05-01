import collection.mutable.HashMap
import org.pettswood.examples.authorisation._
import org.pettswood._

class Authorisation(pettswood: DomainBridge) extends Mixin(pettswood) {
  val userDatabase = HashMap[String, User]()
  val service = new AuthorisationService(userDatabase)

  pettswood.learn("Start", () => new Start(service))
  pettswood.learn("Assuming users", () => new AssumingUsers(userDatabase))
  pettswood.learn("Access by user", () => new AccessByUser(service))
}