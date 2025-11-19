import { About, Contact, Experience, Hero, Projects, Skills } from "./components";
import PrimaryLayout from "./Layout/PrimaryLayout";

const App = () => {
  return (
    <>
      <PrimaryLayout>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </PrimaryLayout>
    </>
  );
}

export default App;