import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience.jsx'
import { Loader } from '@react-three/drei'

function App() {
  return (<>
    <Loader 
          dataInterpolation={ (p) => `Stupid: ${p.toFixed(0)}%` }
          barStyles={{ 
              backgroundColor: 'black',
              height: '20px' 
          }}
          innerStyles={{
              backgroundColor: 'white',
              height: '20px'
          }}
          containerStyles={{
              backgroundColor: '#d6b138',
              padding: '20px' 
          }}
          dataStyles={{
              color: 'white', 
              fontSize: '16px'
          }}
      />
      <Canvas 
        shadows
        camera={ 
          { 
            position: [0, 0, 10],
            fov: 30 
          }
        }>
        <Experience />
      </Canvas>
  </> 
  )
}

export default App;
