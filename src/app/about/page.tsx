'use client'

import { AboutBio, AboutHero, MissionMinistry } from "@/components/page/about";


const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <AboutHero />
      <AboutBio />
      <MissionMinistry />
    </div>
  );
};

export default About;
