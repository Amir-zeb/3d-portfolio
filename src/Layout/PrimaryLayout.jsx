import { Leva } from "leva";
import { Footer, Header } from "../components";
import StarsCanvas from "../scenes/StarsCanvas";

const PrimaryLayout = ({ children }) => {
    return (<>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
        {/* <StarsCanvas /> */}
        <Leva hidden={false} collapsed />
    </>);
}

export default PrimaryLayout;