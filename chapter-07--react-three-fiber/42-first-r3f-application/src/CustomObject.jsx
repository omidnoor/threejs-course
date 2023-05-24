import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry } from "three";
import * as THREE from "three";

const CustomObject = () => {
  const geometryRef = useRef();

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  const verticesCount = 10 * 3;

  console.log(geometryRef);

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={verticesCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
export default CustomObject;
