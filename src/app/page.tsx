import { Hero } from '@/components/home/Hero';  
import { FeaturedProperties } from '@/components/home/FeaturedProperties';  
import { WhyChooseUs } from '@/components/home/WhyChooseUs';  
import { DhaPhases } from '@/components/home/DhaPhases';  
import { Testimonials } from '@/components/home/Testimonials';  

// Revalidate every 60 seconds so new properties/testimonials appear quickly
export const revalidate = 60;

export default function Home() {  
  return (  
    <>  
      <Hero />  
      <WhyChooseUs />  
      <FeaturedProperties />  
      <DhaPhases />  
      <Testimonials />  
    </>  
  );  
} 
