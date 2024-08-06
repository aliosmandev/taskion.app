import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'
import { Faqs } from '@/components/faqs'
import { Features } from '@/components/features'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CallToAction />
      <Reviews />
      <Faqs />
    </>
  )
}
