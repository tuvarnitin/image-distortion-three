import { useEffect, useState } from "react"
import Scene from "./components/Scene"
import { images } from "./images"
export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false)
  })

  return (
    <div className="container">
      {
        loading ? <h2 style={{fontSize:'100px'}}>Loading...</h2> :
          <>
            <div className="links" onMouseLeave={() => setSelectedIndex(null)}>
              {
                images.map((image, i) => (
                  <h1 key={image.name} onMouseMove={() => setSelectedIndex(i)}>{image.name}</h1>
                ))
              }

            </div>
            <div id="canvas-container">
              <Scene selectedIndex={selectedIndex} />
            </div>
          </>
      }
    </div>
  )
}
