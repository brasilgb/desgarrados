import React from 'react';
import { LayoutFront } from "@/Layouts";
import SubBar from "@/Layouts/FrontEnd/SubBar";
import Hero from "@/Layouts/FrontEnd/Home/Hero";
import ButtonsHero from '@/Layouts/FrontEnd/Home/ButtonsHero';
import SectionOne from '@/Layouts/FrontEnd/Home/SectionOne';
import SectionTwo from "@/Layouts/FrontEnd/Home/SectionTwo";
type Props = {}

const Home = (props: Props) => {
  return (
    <LayoutFront>
      <section className="text-lg bg-white border-b border-gray-200">
        <SubBar />
      </section>
      <Hero>
        <ButtonsHero />
      </Hero>
      <SectionOne />
      <SectionTwo />
    </LayoutFront>
  )
}

export default Home;