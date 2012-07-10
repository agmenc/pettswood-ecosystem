import sbt._
import Keys._

object BuildSettings {
  val buildSettings = Defaults.defaultSettings ++ Seq (
    organization := "com.github.agmenc",
    version      := "0.0.1",
    scalaVersion := "2.9.2"
  )
}

object Dependencies {
  val scalatest	= "org.scalatest" % "scalatest_2.9.0" % "1.4.1" % "test"
}

object SbtSimple extends Build {
  import MainBuildSettings._
  import Dependencies._

  val libs = Seq (scalatest)

  lazy val main = Project ("SbtSimple", file ("."))
    .settings(buildSettings : _*)
    .settings(libraryDependencies ++= libs)
}

