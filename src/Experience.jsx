import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei"
import { Perf } from "r3f-perf"
import * as THREE from "three"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
// Create a torus geometry
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
  // get first value as it retruns array (destructuring)
  // const [torusGeometry, setTorusGeometry] = useState()
  // const [material, setMaterial] = useState()
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256)

  // const donutsGroup = useRef()
  const donuts = useRef([])

  // animate donuts
  useFrame((state, delta) => {
    // for (const donut of donutsGroup.current.children) {
    //   donut.rotation.y += delta * 0.2
    // }

    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2
    }
  })

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  const tempArray = [...Array(100)]
  tempArray.map(() => {})

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          HELLO R3F
        </Text3D>
      </Center>

      {/* <group ref={donutsGroup}>
        {[...Array(100)].map((value, i) => (
          <mesh
            key={i}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group> */}

      {[...Array(100)].map((value, i) => (
        <mesh
          ref={(ref) => (donuts.current[i] = ref)}
          key={i}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  )
}
