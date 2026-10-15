import { useEffect } from 'react'
import './Style.css'

const config = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 7, random: true },
    line_linked: { enable: false, distance: 100, color: '#131010', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 1 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: 'grab' }, resize: true },
  },
  retina_detect: true,
}

function Particles() {
  useEffect(() => {
    window.particlesJS('particles-js', config)

    return () => {
      // destroypJS remove o canvas e zera window.pJSDom, então recriamos a lista
      window.pJSDom[0]?.pJS.fn.vendors.destroypJS()
      window.pJSDom = []
    }
  }, [])

  return <div id="particles-js" className="particles" />
}

export default Particles
