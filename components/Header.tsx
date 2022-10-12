import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between md:justify-around">
      <div className="flex items-center">
        <Link href={"/"}>
          <img
            className="link h-28 object-contain"
            src="/images/logo.png"
            alt=""
          />
        </Link>
        <div className="hidden md:flex items-center space-x-5">
          <Link href={"/about"}>
            <h3 className="link" >About</h3>
          </Link>
          <Link href={"/contact"}>
            <h3 className="link" >Contact</h3>
          </Link>
          <Link href={"/follow"}>
            <h3 className="link bg-amber-900 rounded-lg py-1 px-3 text-white font-bold" >Follow</h3>
          </Link>
        </div>
      </div>
      <div className="flex items-center text-amber-900">
        <h3>Sign In</h3>
        <h3 className="m-5 border-2 rounded-lg py-1 px-2 border-amber-900 font-bold">Get Started</h3>
      </div>
    </header>
  );
}

export default Header;
