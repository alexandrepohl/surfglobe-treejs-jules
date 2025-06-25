# 🌍 Optimal Three.js GPT Prompting Strategy

## 1. Start with Architecture Framing

```markdown
**Prompt Example:**  
"Act as a senior Three.js/WebGL architect specializing in geographic visualization. I need to build a high-performance 3D globe for a surf app with these requirements:  
- 60fps on mid-range mobile devices  
- Interactive surf spot markers (1000+ instances)  
- Real-time day/night cycles  
- Touch-optimized navigation  
Propose a technical architecture balancing performance and visual fidelity, listing:  
1. Key Three.js techniques  
2. Recommended optimization layers  
3. Critical math libraries (e.g., d3-geo)  
4. Mobile-specific considerations"
```

## 2. Request Code-Blueprint Generation

```markdown
**Prompt Example:**  
"Generate a Three.js code blueprint using React Three Fiber that:  
- Implements GPU-optimized instanced rendering for surf markers  
- Uses spherical linear interpolation for smooth camera transitions  
- Integrates SunCalc.js for lighting synchronization  
Include:  
1. Shader snippets for atmospheric scattering  
2. Level-of-Detail (LOD) strategy for markers  
3. Touch event handling pseudocode"
```

## 3. Demand Performance-Critical Solutions

```markdown
**Prompt Example:**  
"Provide advanced Three.js solutions for:  
1. **Occlusion Culling**: Only render markers visible in viewport  
2. **Texture Streaming**: Progressive loading of HD terrain  
3. **WebWorker Integration**: Offloading coordinate calculations  
Include benchmarks comparing THREE.Sphere vs THREE.IcosahedronGeometry for mobile."
```

## 🚀 Beyond Three.js - Essential Considerations

### A. Visual Realism Boosters

| Technique | GPT Prompt Snippet | Purpose |
|-----------|-------------------|---------|
| Procedural Waves | "Shader code for animated ocean waves near pins" | Dynamic surf visualization |
| Lens Flare | "Implement Three.js lens flare that responds to sun position" | Sunrise/sunset effects |
| GPU Particles | "Optimized particle system for spray/mist effects" | Marker hover animations |

### B. UX Imperatives

```javascript
// Have GPT generate these interaction models
const interactions = {
  zoom: 'Dynamic Damping (exponential decay)',
  rotation: 'Axis-constrained with momentum',
  tap: 'Raycasting with 500ms debounce',
  accessibility: 'Screen reader-friendly marker alerts'
};
```

### C. Mobile-Specific Tricks

```markdown
**Prompt These Solutions:**  
1. "Three.js fallback for devices without WebGL2"  
2. "Touch vs mouse input normalization strategy"  
3. "Memory management for texture atlas swapping"  
```

## 💡 Pro Tips for GPT Collaboration

### Iterative Refinement

```markdown
"Improve this shader by:  
1. Adding Fresnel effect to ocean edges  
2. Optimizing for iOS's GPU architecture  
3. Making it responsive to device pixel ratio"
```

### Error-First Debugging

```markdown
"Diagnose this WebGL error [paste error] occurring when:  
- Adding more than 50 markers  
- On Android Chrome v112+  
- Only with texture compression enabled"
```

### Benchmark-Driven Optimization

```markdown
"Provide a Three.js performance comparison between:  
- InstancedMesh vs regular Mesh for markers  
- RAW vs Basis texture formats  
With memory/GPU metrics for each"
```

## 🛑 Critical Guardrails

### Validation Checklist

```javascript
const validateGPTOutput = {
  math: 'Verify lat/lng → Cartesian conversions',
  performance: 'Test marker scaling (100 → 10,000)',
  extensions: 'Confirm WebGL fallbacks exist',
  licensing: 'Double-check texture/asset usage rights'
};
```

### Real-World Testing

- Always test GPT-generated shaders on low-end devices
- Verify touch events work during CSS animations
- Profile memory usage when backgrounding the app

## 📌 Final Recommended Prompt Template

```markdown
"You're a Three.js/WebGL specialist focused on mobile-optimized geographic visualization. For a surf app globe, provide:  

1. **Code**: React Three Fiber implementation with:  
   - Instanced marker rendering  
   - Sun-synchronized lighting  
   - Touch-optimized orbit controls  

2. **Optimizations**:  
   - LOD system for markers  
   - Texture compression settings  
   - GPU memory management  

3. **UX Enhancements**:  
   - Marker selection animations  
   - Loading state transitions  
   - Accessibility attributes  

Format response with:  
- Code snippets (TypeScript)  
- Performance caveats  
- Mobile-specific warnings"
```