import { Hero } from '@/components/home/Hero';  
import { FeaturedProperties } from '@/components/home/FeaturedProperties';  
import { WhyChooseUs } from '@/components/home/WhyChooseUs';  
import { DhaPhases } from '@/components/home/DhaPhases';  
import { Testimonials } from '@/components/home/Testimonials';  
  
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
