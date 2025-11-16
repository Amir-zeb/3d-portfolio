import { Leva } from "leva";
import { About, Experience, Hero, Skills } from "./components";
import PrimaryLayout from "./Layout/PrimaryLayout";

const App = () => {
  return (
    <>
      <Leva hidden />
      <PrimaryLayout>
        <Hero />
        <About />
        <Experience />
        {/* <Skills /> */}
      </PrimaryLayout>
    </>
  );
}

export default App;