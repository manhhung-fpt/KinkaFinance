import * as React from "react"
import { Link } from "gatsby"
import { graphql, type HeadFC, type PageProps, useStaticQuery } from "gatsby"
import Button from "./Button"
import { GatsbyImage } from "gatsby-plugin-image"


const Footer = () => {
    return (
        <footer className="bg-neutral-800 text-white">
            <div className="container mx-auto">
                <div className="flex flex-col gap-6 pb-10">
                    
                    <div className="flex lg:flex-row flex-col justify-between items-center lg:text-left gap-4 text-center">
                        <p className="text-body-sm font-medium text-neutral-400">
                            © KinKaFinance {new Date().getFullYear()}. Made with love by{" "}
                            <a
                                className="text-primary-100"
                                href="https://landify.design/?ref=regim">
                                HenryTran
                            </a>
                        </p>
                        <p className="text-body-sm font-medium text-neutral-400">
                            For further details, drop a mail to{" "}
                            <a className="text-primary-100" href="mailto:hello@landify.design">
                                manhhungtran2308@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;