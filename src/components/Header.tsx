import * as React from "react"
import { Link } from "gatsby"

import Button from "./Button"
// @ts-ignore
import logo from "../images/White logo - no background.png"
const Header = () => {
    return (
        <header className="relative  bg-neutral-800">
        <div className="container mx-auto">
          <div className="flex py-6 justify-between items-center">
            <div className="flex flex-row gap-8 items-center">
              <Link to="/">
                <img className="h-12 w-auto" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="flex flex-row gap-4">
              <Button 
                link ="#calculator"
               label="Calculator" size="sm" />
            </div>
          </div>
        </div>
      </header>
    )
};

export default Header;
