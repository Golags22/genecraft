import { Hero, Mission, OurStory, Howitwork,BoardOfDirectors, Partiners } from "../sections/about";
import { CallToAction } from "../sections/home";

export default function About(){

    return(
        <div>
        <Hero />
         <Howitwork />
        <Mission />
        <BoardOfDirectors />
        <OurStory />
       
        <CallToAction />
        <Partiners />
        </div>
    )
}