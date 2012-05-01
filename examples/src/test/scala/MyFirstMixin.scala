import org.pettswood.examples.helloworld.HelloWorld
import org.pettswood.{DomainBridge, Mixin}

class MyFirstMixin(domain: DomainBridge) extends Mixin(domain) {
  domain.learn("Hello", () => new HelloWorld())
}