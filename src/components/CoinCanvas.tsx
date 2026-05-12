import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stage, OrbitControls, useGLTF, Html } from '@react-three/drei';

interface CoinCanvasProps {
  type: 'GMYA' | 'MPK';
}

// Component untuk memuat dan menampilkan model GLTF
function Model({ path }: { path: string }) {
  // useGLTF akan memuat model GLTF dari path yang diberikan
  const { scene } = useGLTF(path);
  // Mengembalikan primitive object dari scene yang dimuat
  return <primitive object={scene} dispose={null} />;
}

export default function CoinCanvas({ type }: CoinCanvasProps) {
  const modelPath = type === 'GMYA' ? 'public/3d/GMYA.glb' : 'public/3d/LamanMPK.glb';

  useEffect(() => {
    console.log(`CoinCanvas mounted for: ${type}`);
  }, [type]);

  return (
    <Canvas key={modelPath} camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Lampu Ambient tambahan buat jaga-jaga kalau Stage-nya belum load */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} /> {/* Menambahkan pointLight untuk pencahayaan */}

      <Suspense fallback={<Html center><div className="text-white text-sm">Memuat model 3D...</div></Html>}>
        {/* Bungkus Float & Model DI DALAM Stage */}
        <Stage environment="city" intensity={0.6} center> {/* Menggunakan 'center' untuk penempatan model otomatis */}
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Model path={modelPath} />
          </Float>
        </Stage>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={5} />
      </Suspense>
    </Canvas>
  );
}

// Preload model agar saat komponen dipanggil tidak ada delay loading yang lama
useGLTF.preload('public/3d/GMYA.glb'); // Preload model GMYA
useGLTF.preload('public/3d/LamanMPK.glb'); // Preload model Laman_MPK
