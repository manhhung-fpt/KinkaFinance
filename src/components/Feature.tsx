import * as React from "react"
import { Link } from "gatsby"
import { graphql, type HeadFC, type PageProps, useStaticQuery } from "gatsby"
import Button from "./Button"
import { GatsbyImage } from "gatsby-plugin-image"
import FeatureItem from './FeatureItem';

interface FeatureNode {
    id: string;
    title: string;
    description: string;
  }

const Feature = () => {
    const data = useStaticQuery(graphql`
    {
        allContentfulIntroBlock {
          nodes {
            title
            description
            id
          }
        }
        allContentfulHero {
          nodes {
            tittle
            description
            buttonlink
            background {
              gatsbyImageData
            }
          }
        }
      }
    `);

    return (
        <div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 md:py-24 py-12">
          <div className="grid xl:grid-cols-12 grid-cols-1 gap-8 text-center">
            <div className="xl:col-span-2 xl:block hidden"></div>
            <div className="xl:col-span-8 flex flex-col gap-12 justify-center">
              <div className="flex flex-col gap-2 text-center">
                <h3 className="lg:text-display-xl md:text-display-lg text-display-md font-semibold">
                High Quality Output, Awesome Service
                </h3>
                <p className="md:text-body-lg text-body-md font-normal text-neutral-700">
                  Deliver an exceptional event experience
                </p>
              </div>
            </div>
            <div className="xl:col-span-2 xl:block hidden"></div>
          </div>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-0 md:pt-10 md:pb-6 items-center">
            {data.allContentfulIntroBlock.nodes.map((node: FeatureNode) => (
              <FeatureItem
                key={node.id}
                title={node.title}
                description={node.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    )
};

export default Feature;