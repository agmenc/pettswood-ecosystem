import org.pettswood.{DomainBridge, Mixin}
import concepts.HelloWorld

class MyFirstMixin(domain: DomainBridge) extends Mixin(domain) {
  domain.learn("Hello", () => new HelloWorld())
}