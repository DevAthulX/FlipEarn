import CTA from "../components/CTA"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import LatestListings from "../components/LatestListings"
import Plans from "../components/Plans"
import { useUser } from "@clerk/clerk-react"
const Home = () => {
  const { user } = useUser()
  return (
    <div> 
          <Hero />
          <LatestListings/>
          <Plans/>
          {!user &&(  <CTA/>) }
          <Footer />
    </div>
  )
}
export default Home