import { Footer, Header } from "../components";
import StarsCanvas from "../scenes/StarsCanvas";

const PrimaryLayout = ({ children }) => {
    return (<>
        <StarsCanvas />
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>);
}

export default PrimaryLayout;