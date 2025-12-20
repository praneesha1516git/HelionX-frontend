import { Link } from "react-router";
import { SignedIn , SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";

const Navigation = () => {

  /**
   * Only JS expressions are allowed in return statement => js code that evaluates to a value
   * Function calls
   * primitive value
   * variables
   * ternary statements
   */

  return (
    <nav
      className={
        "px-12 py-6 h-20 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-black/40 shadow-md fixed top-0 left-0 right-0 z-30"
      }
    >
      {/* Logo Section */}
      <Link to="/" className={"flex items-center gap-3"}>
        <img
          src="/assets/images/logoBlack2.png"
          alt="Home"
          className="h-14 w-auto"
        />
      </Link>

      {/* Dashboard Link */}
      <div className={"flex items-center gap-12 "}>
        <SignedIn>
        <Link to="/dashboard" className={"flex items-center gap-3 px-5 py-3 border-b-2 border-transparent hover:border-b-1 hover:bg-white/50 hover:rounded-full"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-column-icon lucide-chart-column logo w-4 h-4 block"
          >
          
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span className="font-[Inter] text-sm font font-medium">Dashboard</span>
        </Link>
        </SignedIn>


        <div className={"flex gap-2 items-center"}>
          <SignedOut>
            <Button asChild variant={"outline"}>
              <Link to="/sign-in" className={"flex items-center gap-3 px-3 py-2"}>Sign In</Link>
            </Button>

            <Button asChild>
              <Link to="/sign-up" className={"flex items-center gap-3 px-3 py-2"}>Sign Up</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

        </div>

      </div>
    </nav>
  );
};

export default Navigation;
