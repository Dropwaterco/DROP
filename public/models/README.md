# DROP 3D model delivery

Place the production GLB files in this directory using these exact filenames:

- `drop-mint.glb`
- `drop-original.glb`
- `drop-athlete.glb`
- `drop-clove.glb`

After adding a verified file, set its `modelReady` value to `true` in
`src/components/product-3d/productConfig.ts`.

## Required export contract

- Y-up, can centered at the world origin, pivot through the physical center
- Real-world relative scale consistent across all four cans
- Applied transforms, clean normals, no cameras or lights
- Separate body, lid, pull-tab, and label-capable materials where appropriate
- PBR metallic/roughness workflow with accurate DROP artwork
- Embedded or colocated textures, ideally KTX2/WebP at 2K maximum
- Meshopt or Draco compression after visual approval
- Target under 3 MB per variant where practical
