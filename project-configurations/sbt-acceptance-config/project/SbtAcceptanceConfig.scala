import sbt._
import Keys._

object MainBuildSettings {
  lazy val buildSettings = Defaults.defaultSettings ++ Seq (
    organization := "com.github.agmenc",
    version      := "0.0.1",
    scalaVersion := "2.9.2",
    retrieveManaged := true
  )
}

object AcceptanceTestSettings {
  lazy val AcceptanceTestConfig = config("acceptance") extend(Runtime)

  lazy val acceptanceTestSettings = Project.inConfig(AcceptanceTestConfig)(Defaults.testSettings) ++ Seq(
    testFrameworks += new TestFramework("org.pettswood.runners.sbt.PettswoodFramework"),
    resolvers += "sonatype snapshots" at "http://oss.sonatype.org/content/repositories/snapshots",
    libraryDependencies := libs
  )

  val libs = Seq(
    "com.github.agmenc" % "pettswood_2.9.1" % "0.0.9-SNAPSHOT" % "acceptance" withSources()
  )
}

object SbtAcceptanceConfig extends Build {
  import MainBuildSettings._
  import AcceptanceTestSettings._

  lazy val main = Project ("SbtAcceptanceConfig", file ("."))
    .configs(AcceptanceTestConfig)
    .settings(buildSettings : _*)
    .settings(acceptanceTestSettings : _*)
}

