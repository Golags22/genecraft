import { Hero, Mission, OurStory, WhatweOffer } from "../sections/about";
import { CallToAction } from "../sections/home";

export default function About(){

    return(
        <div>
        <Hero />
        <Mission />
        <OurStory />
        <WhatweOffer />
        <CallToAction />
        </div>
    )
}