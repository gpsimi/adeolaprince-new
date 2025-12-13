'use client'

import { AboutBio, AboutHero, MissionVision } from "@/components/page/about";



const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <AboutHero />
      <AboutBio />
      <MissionVision />
    </div>
  );
};

export default About;
