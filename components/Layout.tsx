import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">{children}</div>
    </>
  );
}

export default Layout;
