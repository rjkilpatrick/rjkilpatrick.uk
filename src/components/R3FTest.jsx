import * as THREE from "three";
import React, { useLayoutEffect, useRef } from "react";
import { Canvas, applyProps } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { FlakesTexture } from "three-stdlib";

const Suzanne = (props) => {
  const { scene, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf"
  );
  useLayoutEffect(() => {
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    applyProps(materials.default, {
      color: "orange",
      roughness: 0,
      normalMap: new THREE.CanvasTexture(
        new FlakesTexture(),
        THREE.UVMapping,
        THREE.RepeatWrapping,
        THREE.RepeatWrapping
      ),
      "normalMap-repeat": [40, 40],
      normalScale: [0.05, 0.05],
    });
  });
  return <primitive object={scene} {...props} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />{" "}
      <hemisphereLight intensity={0.125} color="#8040df" groundColor="red" />
    </>
  );
};

const Scene = () => {
  return (
    <>
      <axesHelper scale={2} />
      <Center top front position={[2, 0, 0]}>
        <Text>
          Text <meshStandardMaterial color="black" />
        </Text>
      </Center>
      <Center top position={[-2, 0, 0]}>
        <Suzanne rotation={[-0.63, 0, 0]} scale={2} />
      </Center>
    </>
  );
};

const Text = ({ children, font = "./Inter_Medium_Regular.json", ...props }) => {
  const ref = useRef();

  return (
    <>
      <Text3D castShadow font={font}>
        {children}
      </Text3D>
    </>
  );
};

const App = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }} shadows dpr={[1, 2]}>
      <Lights />
      <Scene />
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  );
};

export default App;
