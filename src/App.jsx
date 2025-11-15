import { Hero } from "./components";
import PrimaryLayout from "./Layout/PrimaryLayout";

const App = () => {
  return (
    <>
      <PrimaryLayout>
        <Hero />
      </PrimaryLayout>
    </>
  );
}

export default App;