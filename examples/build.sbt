name := "pettswood-examples"

organization := "org.pettswood"

version := "0.0.1"

scalaVersion := "2.9.1"

retrieveManaged := true

// Add repo
resolvers += "Pettswood on Github" at "https://raw.github.com/agmenc/Pettswood/master/releases/"

// Add Pettswood library dependency
libraryDependencies += "org.pettswood" %% "pettswood" % "0.0.7" % "test" withSources()

// Tell sbt that the "test" action should run your Pettswood tests
testFrameworks += new TestFramework("org.pettswood.runners.sbt.PettswoodFramework")