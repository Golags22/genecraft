import { Hero, Mission, OurStory, WhatweOffer,BoardOfDirectors, Partiners } from "../sections/about";
import { CallToAction } from "../sections/home";

export default function About(){

    return(
        <div>
        <Hero />
        <Mission />
        <BoardOfDirectors />
        <OurStory />
        <WhatweOffer />
        <CallToAction />
        <Partiners />
        </div>
    )
}