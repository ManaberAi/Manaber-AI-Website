import Faq from '@/components/home/Faq'
import Hero from '@/components/home/Hero'
import HeroCards from '@/components/home/HeroCards'
import PrivacySlab from '@/components/home/PrivacySlab'
import SplitCta from '@/components/home/SplitCta'
import SplitFeature from '@/components/home/SplitFeature'
import StatsBand from '@/components/home/StatsBand'
import UseCaseBento from '@/components/home/UseCaseBento'
import useReveal from '@/hooks/useReveal'

/**
 * Slab alternation, top to bottom:
 *
 *   white nav card → DARK hero → white (cards, stats, split feature)
 *   → INDIGO privacy slab → BLACK bento → white CTA → LAVENDER faq
 *   → BLACK footer
 *
 * `HeroCards` deliberately sits outside a `Section`: it has no ground of its
 * own and is pulled up over the hero so the bubble cards straddle its edge.
 */
export default function Home() {
  useReveal()

  return (
    <>
      <Hero />
      <HeroCards />
      <StatsBand />
      <SplitFeature />
      <PrivacySlab />
      <UseCaseBento />
      <SplitCta />
      <Faq />
    </>
  )
}
