'use client'
const ExploreBtn = () => {
  return (
    <button
        type="button"
        id="explore-btn"
        className="mt-7 mx-auto" 
        onClick={()=>console.log('clicked') }>
            <a href="#explore-section" className="text-lg font-medium text-white">
                Explore Events
            </a>
        </button>
  )
}

export default ExploreBtn