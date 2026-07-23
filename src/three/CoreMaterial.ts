import * as THREE from "three";

// Cheap value-noise (hash + trilinear interpolation). Avoids depending on an
// external noise include — just enough organic wobble for the displacement.
const noiseChunk = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  ${noiseChunk}

  void main() {
    float slow = uTime * 0.18;
    float n = vnoise(position * 1.6 + slow);
    float n2 = vnoise(position * 3.2 - slow * 1.4) * 0.5;
    float displacement = (n + n2 - 0.75) * uIntensity;

    vDisplacement = displacement;
    vec3 displaced = position + normal * displacement;

    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - clamp(dot(viewDir, n), 0.0, 1.0), 2.2);

    float mixer = sin(vWorldPosition.x * 1.6 + uTime * 0.5) * 0.5 + 0.5;
    vec3 base = mix(uColorA, uColorB, mixer);
    base = mix(base, uColorC, clamp(vDisplacement * 3.0 + 0.5, 0.0, 1.0));

    vec3 color = base * (0.32 + fresnel * 1.3) + uColorB * fresnel * 0.5;
    float alpha = clamp(fresnel * 0.9 + 0.22, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * Iridescent holographic shader — cyan/violet/magenta blend, additive
 * blending, noise-displaced surface. This is the original bright/saturated
 * treatment; a later attempt dialed this back to fix a (mistaken) "too
 * bright" diagnosis on a different shape, but this version was the one that
 * actually landed well, so it's back. Built imperatively (plain
 * THREE.ShaderMaterial via useMemo, passed through the `material` prop) —
 * see HoloCore.tsx.
 */
export function createCoreMaterial() {
    return new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uIntensity: { value: 0.4 },
            uColorA: { value: new THREE.Color("#5EF2E0") },
            uColorB: { value: new THREE.Color("#9B6BFF") },
            uColorC: { value: new THREE.Color("#FF3D9A") },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    });
}

export type CoreMaterialInstance = ReturnType<typeof createCoreMaterial>;
