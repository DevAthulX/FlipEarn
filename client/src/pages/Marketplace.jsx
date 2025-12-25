// import {ArrowLeftIcon, Filter, Search} from 'lucide-react'

// import { useState } from 'react'
// import {useSelector} from 'react-redux'
// import {useNavigate, useSearchParams} from 'react-router-dom'
// import ListingCard from '../components/ListingCard'
// import FilterSidebar from '../components/FilterSidebar'
// const Marketplace = () => {

//     const [searchParams] =useSearchParams()
//     const search =searchParams.get("search")
//      const {listings} = useSelector(state => state.listing)
//     const navigate = useNavigate()
//     const [showFilterPhone,setshowFilterPhone]=useState(false)
//     const [filters,setFilters] =useState({

// platform:null,

// maxPrice: 100000,

// minFollowers: 0,

// niche:null,

// verified: false,

// monitised: false,

// })
// const filteredListings =listings.filter((listing)=>{
//     if(filters.platform && filters.platform.length > 0 ){
//         if(!filters.platform.includes(listing.platform)) return false
//     }
//     if(filters.maxPrice){
//         if(listing.price > filters.maxPrice) return false
//     }

//     if(filters.minFollowers){
//         if(listing.followers_count < filters.minFollowers) return  false
//     }
//     if(filters.niche && filters.niche.length > 0){
//         if(!filters.niche.includes(listing.niche)) return false
//     }
//     if(filters.verified && listing.verified !== filters.verified) return false
//     if(filters.monitised && listing.monitised !== filters.monitised) return false
//     if(search){
//         const trimed = search.trim()
//         if(
//             !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
//             !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
//             !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
//             !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
//             !listing.niche.toLowerCase().includes(trimed.toLowerCase()) 
//         )
//         return false
//     }
//     return true
// })


//   return (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32">
//          <div className="flex items-center justify-between text-slate-500">
//             <button onClick={() => {navigate('/'); scrollTo(0,0)}} className='flex items-center gap-2 py-5'> <ArrowLeftIcon className="size-4"/>  Back to Home</button>
//             <button className='flex sm:hidden items-center gap-2 py-5' onClick={()=>setshowFilterPhone(true)}> <Filter className='size-4'/>Filters</button>
//          </div>
//          {/* <div className='relative flex items-start justify-between gap-8 pb-8'>
//                 <div>Filter</div>
//                 <div className='flex-1 grid x1:grid-cols-2 gap-4'>
//                    {filteredListings.sort((a,b)=>a.featured ? -1 : b.featured ? 1 : 0).map((listing,index)=>(<ListingCard listing={listing} key={index}/>))}
//                 </div>
//          </div> */}
//          <div className='relative flex items-start justify-between gap-8 pb-8'>
//               <FilterSidebar setFilters={setFilters} filters={filters} showFilterPhone={showFilterPhone} setshowFilterPhone={setshowFilterPhone}/>
//     {/* grid-cols-1 is the default (mobile), md:grid-cols-2 kicks in at tablet/desktop */}
//     <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
//         {filteredListings
//             .sort((a, b) => a.featured ? -1 : b.featured ? 1 : 0)
//             .map((listing, index) => (
//                 <ListingCard listing={listing} key={index} />
//             ))
//         }
//     </div>
// </div>
//     </div>
//   )
// }
// export default Marketplace
import {ArrowLeftIcon, Filter} from 'lucide-react'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import FilterSidebar from '../components/FilterSidebar'

const Marketplace = () => {
    const [searchParams] = useSearchParams()
    const search = searchParams.get("search")
    const {listings} = useSelector(state => state.listing)
    const navigate = useNavigate()
    const [showFilterPhone, setshowFilterPhone] = useState(false)
    const [filters, setFilters] = useState({
        platform: null,
        maxPrice: 100000,
        minFollowers: 0,
        niche: null,
        verified: false,
        monitised: false,
    })

    const filteredListings = listings.filter((listing) => {
        // Platform filter
        if (filters.platform && filters.platform.length > 0) {
            if (!filters.platform.includes(listing.platform)) return false
        }
        
        // Price filter
        if (filters.maxPrice) {
            if (listing.price > filters.maxPrice) return false
        }

        // Followers filter
        if (filters.minFollowers) {
            if (listing.followers_count < filters.minFollowers) return false
        }
        
        // Niche filter - fixed: niche is a string, not an array
        if (filters.niche) {
            if (listing.niche !== filters.niche) return false
        }
        
        // Verified filter
        if (filters.verified && listing.verified !== filters.verified) return false
        
        // Monetized filter
        if (filters.monitised && listing.monitised !== filters.monitised) return false
        
        // Search filter
        if (search) {
            const trimmed = search.trim().toLowerCase()
            const searchableFields = [
                listing.title,
                listing.username,
                listing.description,
                listing.platform,
                listing.niche
            ].map(field => field?.toLowerCase() || "")
            
            const matchFound = searchableFields.some(field => 
                field.includes(trimmed)
            )
            
            if (!matchFound) return false
        }
        
        return true
    })

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex items-center justify-between text-slate-500">
                <button 
                    onClick={() => {navigate('/'); scrollTo(0, 0)}} 
                    className='flex items-center gap-2 py-5'
                > 
                    <ArrowLeftIcon className="size-4"/>  
                    Back to Home
                </button>
                <button 
                    className='flex sm:hidden items-center gap-2 py-5' 
                    onClick={() => setshowFilterPhone(true)}
                > 
                    <Filter className='size-4'/>
                    Filters
                </button>
            </div>
            
            <div className='relative flex items-start justify-between gap-8 pb-8'>
                <FilterSidebar 
                    setFilters={setFilters} 
                    filters={filters} 
                    showFilterPhone={showFilterPhone} 
                    setshowFilterPhone={setshowFilterPhone}
                />
                
                <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {filteredListings.length > 0 ? (
                        filteredListings
                            .sort((a, b) => a.featured ? -1 : b.featured ? 1 : 0)
                            .map((listing, index) => (
                                <ListingCard listing={listing} key={index} />
                            ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No listings found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Marketplace