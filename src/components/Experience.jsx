import * as THREE from 'three'
import { Suspense, useState, useRef, useEffect } from 'react'
import { 
  CameraControls,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Sky,
  Text,
  useCursor,
  useTexture,
} from '@react-three/drei'
import { Fish } from './Creatures/Fish'
import { Cactoro } from './Creatures/Cactoro'
import { Dragon } from './Creatures/Dragon'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

export const Experience = () => 
{
  const [ active, setActive ] = useState(null)
  const [ hovered, setHovered ] = useState(null)
  useCursor(hovered)
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(() =>
  {
    if(active)
    {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      )
    } else 
    {
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true
      )
    }
  }, [ active ])

  return ( <>
      <ambientLight 
        intensity={0.5 } 
      />
      <Environment 
        preset='sunset' 
      />
      <Sky />
      <CameraControls 
          ref={ controlsRef }
          maxPolarAngle={ Math.PI / 2 }
          minPolarAngle={ Math.PI / 6 }
          
      />

    <Suspense fallback={ null }>

      {/* Monster 1 */}
      <MonsterStage
        position-x={ 2.5 }
        rotation-y={ - Math.PI / 8 }
        texture={'textures/anime_art_style_cactus_forest.jpg'}
        name="Kak"
        color={ "#90a448" }
        active={ active }
        setActive={ setActive }
        hovered={ hovered }
        setHovered={ setHovered }
      >
        <Cactoro 
          hovered={ hovered === 'Kak' }
        />
      </MonsterStage>

      {/* Monster 2 */}
      <MonsterStage
        position-z={ - 0.4 }
        texture={'textures/anime_art_style_a_water_based_pokemon_like_environ.jpg'}
        name="Ricky"
        color={ "#239dc4" }
        active={ active }
        setActive={ setActive }
        hovered={ hovered }
        setHovered={ setHovered }
      >
        <Fish 
          hovered={ hovered === 'Ricky' }
        />
      </MonsterStage>

      {/* Monster 3 */}
      <MonsterStage
        position-x={ - 2.5 }
        rotation-y={ Math.PI / 8 }
        texture={'textures/anime_art_style_lava_world.jpg'}
        name="Doggo"
        color={ "#c77344" }
        active={ active }
        setActive={ setActive }
        hovered={ hovered }
        setHovered={ setHovered }
      >
        <Dragon 
          hovered={ hovered === 'Doggo' }
        />
      </MonsterStage>

    </Suspense>
    </>
  )
}

const MonsterStage = (
  { 
    children,
    texture,
    name,
    color,
    active,
    setActive,
    hovered,
    setHovered,
    ...props
}) =>
{
  const map = useTexture( texture )
  const portalMaterial = useRef()

  useFrame((_state, delta) => 
  {
    const worldOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
  })

  return (<>
      <group {...props}>
        <Text
          // font='./fonts/Caprasimo-Regular.ttf'
          font='./fonts/Pokemon.ttf'
          fontSize={ 0.3 }
          position={ [ 0, - 1.45, 0.051 ] }
          anchorY="bottom"
        >
          {name}
          <meshBasicMaterial 
            color={ color } 
            toneMapped={ false }
          />
        </Text>
        {/* First creature */}
        <RoundedBox
          name={ name }
          args={ [ 2, 3, 0.1 ] }
          onClick={ () => setActive( active === name ? null : name ) }
          onPointerEnter={ () => setHovered( name ) }
          onPointerLeave={ () => setHovered( null ) }
        >
          <MeshPortalMaterial
            side={ THREE.DoubleSide }
            ref={ portalMaterial }
          >
          <ambientLight 
              intensity={0.5 } 
            />
            <Environment 
              preset='sunset' 
            />
            { children }
            <mesh>
              <sphereGeometry 
                args={ [ 5, 64, 64 ] } 
              />
              <meshStandardMaterial
                side={ THREE.BackSide }
                map={ map }
              />
            </mesh>
          </MeshPortalMaterial>
        </RoundedBox>
      </group>
  </>)
}
