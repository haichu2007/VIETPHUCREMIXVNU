import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OutfitSelection, BodyMeasurements, DEFAULT_BODY_MEASUREMENTS, BODY_PRESETS } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  COLORS
} from '../data/mockData';
import {
  RotateCcw,
  Sparkles,
  Sliders,
  Move3d,
  Maximize2,
  RefreshCw,
  Compass,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ThreeMannequinCanvasProps {
  selection: OutfitSelection;
  compact?: boolean;
  onBodyChange?: (measurements: BodyMeasurements) => void;
}

export const ThreeMannequinCanvas: React.FC<ThreeMannequinCanvasProps> = ({
  selection,
  compact = false,
  onBodyChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Body Measurements State
  const [measurements, setMeasurements] = useState<BodyMeasurements>(
    selection.bodyMeasurements || DEFAULT_BODY_MEASUREMENTS
  );

  // View Controls
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [showBodyControls, setShowBodyControls] = useState(!compact);
  const [activePreset, setActivePreset] = useState<string>('female-slim');

  // Mouse Interaction State for 3D Orbit
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.05, y: 0 }); // Euler angles

  // Garment and Color references
  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  // Helper: notify parent of body changes
  const handleMeasurementChange = (key: keyof BodyMeasurements, value: any) => {
    const updated: BodyMeasurements = {
      ...measurements,
      [key]: value
    };
    setMeasurements(updated);
    if (onBodyChange) {
      onBodyChange(updated);
    }
  };

  // Helper: apply preset
  const handleApplyPreset = (presetId: string) => {
    const preset = BODY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setActivePreset(presetId);
      setMeasurements(preset.measurements);
      if (onBodyChange) {
        onBodyChange(preset.measurements);
      }
    }
  };

  // Quick Angles
  const setCameraAngle = (targetY: number) => {
    rotationRef.current.y = targetY;
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = targetY;
    }
  };

  // Set up Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.4);
    cameraRef.current = camera;

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff3e0, 2.0);
    mainKeyLight.position.set(3, 4, 3);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.camera.near = 0.5;
    mainKeyLight.shadow.camera.far = 15;
    mainKeyLight.shadow.bias = -0.001;
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0xc89b3c, 1.0);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const softFillLight = new THREE.PointLight(0xffffff, 0.8, 10);
    softFillLight.position.set(0, 1.5, 2.5);
    scene.add(softFillLight);

    // 5. Studio Pedestal / Circular Floor
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -0.02, 0);

    const floorGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.08, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x221f1d,
      roughness: 0.3,
      metalness: 0.2
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.receiveShadow = true;
    pedestalGroup.add(floorMesh);

    // Golden trim ring on pedestal
    const ringGeo = new THREE.TorusGeometry(1.62, 0.015, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.04;
    pedestalGroup.add(ringMesh);

    scene.add(pedestalGroup);

    // 6. Model Root Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Mouse / Touch Event Listeners for 360 Orbit
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rotationRef.current.y += deltaX * 0.009;
      rotationRef.current.x = Math.max(-0.25, Math.min(0.35, rotationRef.current.x + deltaY * 0.005));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x = Math.max(-0.25, Math.min(0.35, rotationRef.current.x + deltaY * 0.005));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        if (isAutoRotating && !isDraggingRef.current) {
          rotationRef.current.y += 0.006;
        }
        modelGroupRef.current.rotation.y = rotationRef.current.y;
        modelGroupRef.current.rotation.x = rotationRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Re-build 3D Model Meshes when body measurements or outfit selection change
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    // Clear previous meshes
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
      if ((child as any).material) {
        if (Array.isArray((child as any).material)) {
          (child as any).material.forEach((m: any) => m.dispose());
        } else {
          (child as any).material.dispose();
        }
      }
    }

    // Proportional Calculations based on measurements
    // Base reference: Height = 168cm, Bust = 86cm, Waist = 66cm, Hips = 92cm, Shoulder = 40cm
    const heightScale = measurements.heightCm / 168;
    const bustScale = measurements.bustCm / 86;
    const waistScale = measurements.waistCm / 66;
    const hipsScale = measurements.hipsCm / 92;
    const shoulderScale = measurements.shoulderCm / 40;

    // Materials
    const mannequinSkinMat = new THREE.MeshStandardMaterial({
      color: 0xe6cfb8,
      roughness: 0.45,
      metalness: 0.05
    });

    const mannequinAccentMat = new THREE.MeshStandardMaterial({
      color: 0x332822,
      roughness: 0.35,
      metalness: 0.1
    });

    // Primary Silk Robe Material (matches selected outfit color with luxurious sheen)
    const robeColorHex = parseInt(color.hex.replace('#', '0x'), 16) || 0x8b1e1e;
    const robeMat = new THREE.MeshStandardMaterial({
      color: robeColorHex,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide
    });

    // Jade Button Material
    const jadeMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.2,
      metalness: 0.6
    });

    // Gold Trim Material
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.75
    });

    // Trouser / Bottom Material
    const trouserColor = bottom.id.includes('denim')
      ? 0x22364c
      : bottom.id.includes('white')
      ? 0xf0ede6
      : 0x1f1d1c;
    const trouserMat = new THREE.MeshStandardMaterial({
      color: trouserColor,
      roughness: 0.5,
      metalness: 0.05
    });

    // Footwear Material
    const shoeColor = footwear.id.includes('chunky')
      ? 0xffffff
      : footwear.id.includes('guoc')
      ? 0x8b2222
      : 0x141414;
    const shoeMat = new THREE.MeshStandardMaterial({
      color: shoeColor,
      roughness: 0.4,
      metalness: 0.2
    });

    // 1. Model Root Anchor Y Offset based on Height
    const rootY = 0.08;
    const totalHeightY = 2.1 * heightScale;

    // --- BODY PARTS ---
    // A. Head & Face
    const headGroup = new THREE.Group();
    headGroup.position.set(0, totalHeightY * 0.88 + rootY, 0);

    const headGeo = new THREE.SphereGeometry(0.12, 32, 32);
    headGeo.scale(1, 1.25, 1.05);
    const headMesh = new THREE.Mesh(headGeo, mannequinSkinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Hair / Sleek Topknot Bun
    const hairGeo = new THREE.SphereGeometry(0.125, 24, 24);
    hairGeo.scale(1.02, 1.1, 1.02);
    const hairMesh = new THREE.Mesh(hairGeo, mannequinAccentMat);
    hairMesh.position.set(0, 0.04, -0.02);
    headGroup.add(hairMesh);

    const bunGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const bunMesh = new THREE.Mesh(bunGeo, mannequinAccentMat);
    bunMesh.position.set(0, 0.12, -0.09);
    headGroup.add(bunMesh);

    // Headwear 3D Mesh
    if (headwear.id === 'head-khan-dong') {
      const khanDongGeo = new THREE.TorusGeometry(0.13, 0.035, 16, 32);
      khanDongGeo.scale(1, 0.85, 1.1);
      const khanDongMesh = new THREE.Mesh(khanDongGeo, robeMat);
      khanDongMesh.rotation.x = Math.PI / 2.3;
      khanDongMesh.position.set(0, 0.06, 0.01);
      headGroup.add(khanDongMesh);
    } else if (headwear.id === 'head-non-la') {
      const nonLaGeo = new THREE.ConeGeometry(0.38, 0.18, 32, 1, true);
      const nonLaMat = new THREE.MeshStandardMaterial({
        color: 0xdfd3b8,
        roughness: 0.6,
        side: THREE.DoubleSide
      });
      const nonLaMesh = new THREE.Mesh(nonLaGeo, nonLaMat);
      nonLaMesh.position.set(0, 0.2, 0.04);
      nonLaMesh.rotation.x = 0.12;
      headGroup.add(nonLaMesh);
    }

    modelGroup.add(headGroup);

    // B. Neck & Mandarin Collar
    const neckY = totalHeightY * 0.8 + rootY;
    const neckGeo = new THREE.CylinderGeometry(0.06, 0.075 * shoulderScale, 0.12 * heightScale, 24);
    const neckMesh = new THREE.Mesh(neckGeo, mannequinSkinMat);
    neckMesh.position.set(0, neckY, 0);
    modelGroup.add(neckMesh);

    // Traditional Lap Linh Standing Collar
    const collarGeo = new THREE.CylinderGeometry(0.075 * shoulderScale, 0.085 * shoulderScale, 0.06, 24, 1, true);
    const collarMesh = new THREE.Mesh(collarGeo, robeMat);
    collarMesh.position.set(0, neckY + 0.01, 0);
    modelGroup.add(collarMesh);

    // Inner White Border for Collar (Nẹp lót trong)
    const collarInnerGeo = new THREE.CylinderGeometry(0.076 * shoulderScale, 0.076 * shoulderScale, 0.02, 24, 1, true);
    const innerWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const collarInnerMesh = new THREE.Mesh(collarInnerGeo, innerWhiteMat);
    collarInnerMesh.position.set(0, neckY + 0.035, 0);
    modelGroup.add(collarInnerMesh);

    // C. Shoulders & Torso (Morphs dynamically with measurements)
    const chestY = totalHeightY * 0.72 + rootY;
    const waistY = totalHeightY * 0.58 + rootY;
    const hipsY = totalHeightY * 0.48 + rootY;

    // Shoulder Bar / Clavicle
    const shoulderWidth = 0.44 * shoulderScale;
    const chestWidth = 0.32 * bustScale;
    const chestDepth = 0.22 * bustScale;
    const waistWidth = 0.24 * waistScale;
    const waistDepth = 0.18 * waistScale;
    const hipsWidth = 0.33 * hipsScale;
    const hipsDepth = 0.24 * hipsScale;

    // Upper Torso / Chest Mesh
    const upperTorsoGeo = new THREE.CylinderGeometry(
      chestWidth * 0.95,
      waistWidth,
      chestY - waistY,
      24
    );
    upperTorsoGeo.scale(1, 1, chestDepth / (chestWidth * 0.95));
    const upperTorsoMesh = new THREE.Mesh(upperTorsoGeo, mannequinSkinMat);
    upperTorsoMesh.position.set(0, (chestY + waistY) / 2, 0);
    modelGroup.add(upperTorsoMesh);

    // Lower Torso / Waist to Hips Mesh
    const lowerTorsoGeo = new THREE.CylinderGeometry(
      waistWidth,
      hipsWidth,
      waistY - hipsY,
      24
    );
    lowerTorsoGeo.scale(1, 1, hipsDepth / hipsWidth);
    const lowerTorsoMesh = new THREE.Mesh(lowerTorsoGeo, mannequinSkinMat);
    lowerTorsoMesh.position.set(0, (waistY + hipsY) / 2, 0);
    modelGroup.add(lowerTorsoMesh);

    // D. VIETNAMESE TRADITIONAL ROBE 3D GEOMETRY (Áo Ngũ Thân / Áo Dài / Áo Tấc)
    // Dynamic robe drape adapted around 3D bust, waist, and hips
    const robeRobeTopY = chestY + 0.04;
    const robeHemY = totalHeightY * 0.22 + rootY;
    const robeHeight = robeRobeTopY - robeHemY;

    // Flowing Robe Main Body (Tà áo 3D phồng nhẹ theo phom ngũ thân)
    const robeSegments = 32;
    const robeGeo = new THREE.CylinderGeometry(
      chestWidth * 1.08,
      hipsWidth * 1.35,
      robeHeight,
      robeSegments,
      12,
      true
    );
    // Flatten depth to mimic graceful flat front drape of traditional Vietnamese tunic
    robeGeo.scale(1, 1, (chestDepth * 1.1) / (chestWidth * 1.08));

    const robeMesh = new THREE.Mesh(robeGeo, robeMat);
    robeMesh.position.set(0, (robeRobeTopY + robeHemY) / 2, 0);
    robeMesh.castShadow = true;
    modelGroup.add(robeMesh);

    // Overlapping Flap (Thân vạt con vắt chéo sang sườn phải)
    const flapGeo = new THREE.CylinderGeometry(
      chestWidth * 1.09,
      hipsWidth * 1.25,
      robeHeight * 0.6,
      16,
      4,
      true,
      -Math.PI / 4,
      Math.PI / 2
    );
    const flapMesh = new THREE.Mesh(flapGeo, robeMat);
    flapMesh.position.set(0.01, (robeRobeTopY + waistY) / 2, 0.01);
    modelGroup.add(flapMesh);

    // Five Traditional Jade Buttons along the lap linh collar & right flank (5 cúc ngọc)
    const buttonPositions = [
      { x: 0.02, y: chestY + 0.02, z: chestDepth * 0.52 },
      { x: 0.06, y: chestY - 0.03, z: chestDepth * 0.51 },
      { x: 0.11, y: chestY - 0.08, z: chestDepth * 0.49 },
      { x: 0.15, y: chestY - 0.14, z: chestDepth * 0.44 },
      { x: 0.17, y: waistY + 0.02, z: waistDepth * 0.42 }
    ];

    buttonPositions.forEach((pos) => {
      const buttonGeo = new THREE.SphereGeometry(0.016, 12, 12);
      const buttonMesh = new THREE.Mesh(buttonGeo, jadeMat);
      buttonMesh.position.set(pos.x, pos.y, pos.z);
      modelGroup.add(buttonMesh);
    });

    // E. Arms & Sleeves
    // Sleeves drape naturally with relaxed fashion mannequin posture
    const sleeveLength = 0.55 * heightScale;
    const armAngle = 0.18; // Relaxed elegant stance

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-shoulderWidth / 2, chestY, 0);
    leftArmGroup.rotation.z = armAngle;

    const leftSleeveGeo = new THREE.CylinderGeometry(
      0.08 * shoulderScale,
      0.11 * shoulderScale,
      sleeveLength,
      20
    );
    const leftSleeveMesh = new THREE.Mesh(leftSleeveGeo, robeMat);
    leftSleeveMesh.position.set(0, -sleeveLength / 2, 0);
    leftSleeveMesh.castShadow = true;
    leftArmGroup.add(leftSleeveMesh);

    const leftHandGeo = new THREE.SphereGeometry(0.045, 12, 12);
    leftHandGeo.scale(1, 1.4, 0.7);
    const leftHandMesh = new THREE.Mesh(leftHandGeo, mannequinSkinMat);
    leftHandMesh.position.set(0, -sleeveLength - 0.03, 0);
    leftArmGroup.add(leftHandMesh);

    modelGroup.add(leftArmGroup);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(shoulderWidth / 2, chestY, 0);
    rightArmGroup.rotation.z = -armAngle;

    const rightSleeveGeo = new THREE.CylinderGeometry(
      0.08 * shoulderScale,
      0.11 * shoulderScale,
      sleeveLength,
      20
    );
    const rightSleeveMesh = new THREE.Mesh(rightSleeveGeo, robeMat);
    rightSleeveMesh.position.set(0, -sleeveLength / 2, 0);
    rightSleeveMesh.castShadow = true;
    rightArmGroup.add(rightSleeveMesh);

    const rightHandGeo = new THREE.SphereGeometry(0.045, 12, 12);
    rightHandGeo.scale(1, 1.4, 0.7);
    const rightHandMesh = new THREE.Mesh(rightHandGeo, mannequinSkinMat);
    rightHandMesh.position.set(0, -sleeveLength - 0.03, 0);
    rightArmGroup.add(rightHandMesh);

    modelGroup.add(rightArmGroup);

    // F. Legs & Lower Garment (Quần suông rộng hoặc Quần âu Gen Z)
    const legLength = hipsY - rootY - 0.12;
    const legSpacing = hipsWidth * 0.38;

    // Left Pant Leg
    const leftPantGeo = new THREE.CylinderGeometry(
      0.11 * hipsScale,
      0.14 * hipsScale,
      legLength,
      24
    );
    const leftPantMesh = new THREE.Mesh(leftPantGeo, trouserMat);
    leftPantMesh.position.set(-legSpacing, hipsY - legLength / 2, 0);
    leftPantMesh.castShadow = true;
    modelGroup.add(leftPantMesh);

    // Right Pant Leg
    const rightPantGeo = new THREE.CylinderGeometry(
      0.11 * hipsScale,
      0.14 * hipsScale,
      legLength,
      24
    );
    const rightPantMesh = new THREE.Mesh(rightPantGeo, trouserMat);
    rightPantMesh.position.set(legSpacing, hipsY - legLength / 2, 0);
    rightPantMesh.castShadow = true;
    modelGroup.add(rightPantMesh);

    // G. Footwear (Giày 3D)
    const shoeY = rootY + 0.04;
    const shoeWidth = 0.11;
    const shoeLength = 0.22;
    const shoeHeight = 0.07;

    // Left Shoe
    const leftShoeGeo = new THREE.BoxGeometry(shoeWidth, shoeHeight, shoeLength);
    const leftShoeMesh = new THREE.Mesh(leftShoeGeo, shoeMat);
    leftShoeMesh.position.set(-legSpacing, shoeY, 0.03);
    leftShoeMesh.castShadow = true;
    modelGroup.add(leftShoeMesh);

    // Right Shoe
    const rightShoeGeo = new THREE.BoxGeometry(shoeWidth, shoeHeight, shoeLength);
    const rightShoeMesh = new THREE.Mesh(rightShoeGeo, shoeMat);
    rightShoeMesh.position.set(legSpacing, shoeY, 0.03);
    rightShoeMesh.castShadow = true;
    modelGroup.add(rightShoeMesh);

  }, [selection, measurements]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-sm bg-[radial-gradient(ellipse_at_50%_40%,_#FFFFFF_0%,_#F7F3EC_60%,_#EBE1D0_100%)] select-none">
      {/* Top Floating Bar: 3D Indicator & Quick Camera Views */}
      <div className="w-full flex items-center justify-between px-4 py-3 z-10 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#8B1E1E] text-white font-mono font-bold text-[10px] rounded-full uppercase shadow-2xs">
            <Move3d size={12} />
            3D Mannequin
          </span>
          <span className="text-[#6E6455] text-xs font-semibold hidden sm:inline">
            Xoay 360° tự do
          </span>
        </div>

        {/* Quick Angle Buttons */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl border border-[#E0D5C1] shadow-2xs">
          <button
            type="button"
            onClick={() => setCameraAngle(0)}
            className="px-2 py-0.5 text-[11px] font-semibold text-[#4A4338] hover:text-[#8B1E1E] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
            title="Góc chính diện"
          >
            Trước
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle(Math.PI / 4)}
            className="px-2 py-0.5 text-[11px] font-semibold text-[#4A4338] hover:text-[#8B1E1E] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
            title="Góc nghiêng 3/4 Runway"
          >
            3/4
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle(Math.PI / 2)}
            className="px-2 py-0.5 text-[11px] font-semibold text-[#4A4338] hover:text-[#8B1E1E] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
            title="Góc nhìn bên"
          >
            Nghiêng
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle(Math.PI)}
            className="px-2 py-0.5 text-[11px] font-semibold text-[#4A4338] hover:text-[#8B1E1E] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
            title="Góc nhìn sau lưng"
          >
            Sau
          </button>
          <span className="text-[#DDD2C0]">|</span>
          <button
            type="button"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1 rounded transition-colors cursor-pointer ${
              isAutoRotating ? 'text-[#8B1E1E] bg-[#8B1E1E]/10' : 'text-[#7A7061] hover:text-[#1E1D1B]'
            }`}
            title={isAutoRotating ? 'Dừng xoay tự động' : 'Tự động xoay 360°'}
          >
            <RefreshCw size={12} className={isAutoRotating ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="relative w-full flex-1 min-h-[380px] max-h-[500px] cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating Instructions Pill */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 bg-black/40 backdrop-blur-xs text-white text-[10px] rounded-full font-medium tracking-wide">
        Kéo chuột để xoay 360° · Xem trọn phom áo 3D
      </div>

      {/* Bottom Panel Toggle */}
      <div className="w-full z-10 border-t border-[#E5DDD0] bg-white/95 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setShowBodyControls(!showBodyControls)}
          className="w-full px-4 py-2 flex items-center justify-between text-xs font-bold text-[#1E1D1B] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5 text-[#8B1E1E]">
            <Sliders size={13} />
            <span>TÙY CHỈNH THÔNG SỐ CƠ THỂ 3D</span>
            <span className="text-[10px] text-[#7A7061] font-normal">
              ({measurements.heightCm}cm · {measurements.bustCm}-{measurements.waistCm}-{measurements.hipsCm})
            </span>
          </div>
          {showBodyControls ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        {/* Collapsible Body Measurement Controls */}
        {showBodyControls && (
          <div className="p-4 pt-1 space-y-3.5 max-h-[260px] overflow-y-auto border-t border-[#F0EAE1]">
            {/* Presets Row */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A7061] mb-1.5">
                Vóc Dáng Chuẩn Người Việt:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {BODY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset.id)}
                    className={`px-2 py-1.5 rounded-lg text-left border transition-all cursor-pointer ${
                      activePreset === preset.id
                        ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-2xs'
                        : 'border-[#E0D5C1] bg-white hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-[#1E1D1B] flex items-center justify-between">
                      <span>{preset.name}</span>
                      {activePreset === preset.id && <Check size={11} className="text-[#8B1E1E]" />}
                    </div>
                    <div className="text-[9px] text-[#7A7061] truncate">{preset.measurements.heightCm}cm · {preset.measurements.bustCm}/{preset.measurements.waistCm}/{preset.measurements.hipsCm}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-1 text-xs">
              {/* Height Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#4A4338]">Chiều cao:</span>
                  <span className="font-mono font-bold text-[#8B1E1E]">{measurements.heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={190}
                  step={1}
                  value={measurements.heightCm}
                  onChange={(e) => handleMeasurementChange('heightCm', Number(e.target.value))}
                  className="w-full accent-[#8B1E1E] cursor-pointer"
                />
              </div>

              {/* Shoulder Width */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#4A4338]">Độ rộng vai:</span>
                  <span className="font-mono font-bold text-[#8B1E1E]">{measurements.shoulderCm} cm</span>
                </div>
                <input
                  type="range"
                  min={32}
                  max={52}
                  step={1}
                  value={measurements.shoulderCm}
                  onChange={(e) => handleMeasurementChange('shoulderCm', Number(e.target.value))}
                  className="w-full accent-[#8B1E1E] cursor-pointer"
                />
              </div>

              {/* Bust Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#4A4338]">Vòng 1 (Ngực):</span>
                  <span className="font-mono font-bold text-[#8B1E1E]">{measurements.bustCm} cm</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={115}
                  step={1}
                  value={measurements.bustCm}
                  onChange={(e) => handleMeasurementChange('bustCm', Number(e.target.value))}
                  className="w-full accent-[#8B1E1E] cursor-pointer"
                />
              </div>

              {/* Waist Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#4A4338]">Vòng 2 (Eo):</span>
                  <span className="font-mono font-bold text-[#8B1E1E]">{measurements.waistCm} cm</span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={100}
                  step={1}
                  value={measurements.waistCm}
                  onChange={(e) => handleMeasurementChange('waistCm', Number(e.target.value))}
                  className="w-full accent-[#8B1E1E] cursor-pointer"
                />
              </div>

              {/* Hips Slider */}
              <div className="sm:col-span-2">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-semibold text-[#4A4338]">Vòng 3 (Hông):</span>
                  <span className="font-mono font-bold text-[#8B1E1E]">{measurements.hipsCm} cm</span>
                </div>
                <input
                  type="range"
                  min={75}
                  max={120}
                  step={1}
                  value={measurements.hipsCm}
                  onChange={(e) => handleMeasurementChange('hipsCm', Number(e.target.value))}
                  className="w-full accent-[#8B1E1E] cursor-pointer"
                />
              </div>
            </div>

            {/* Sync Hint */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#7A7061] border-t border-[#E5DDD0]">
              <span className="flex items-center gap-1">
                <Sparkles size={11} className="text-[#C89B3C]" />
                Thông số 3D sẽ tự động cập nhật vào câu lệnh tạo ảnh AI.
              </span>
              <button
                type="button"
                onClick={() => {
                  setMeasurements(DEFAULT_BODY_MEASUREMENTS);
                  if (onBodyChange) onBodyChange(DEFAULT_BODY_MEASUREMENTS);
                }}
                className="text-[#8B1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw size={10} />
                Đặt lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
