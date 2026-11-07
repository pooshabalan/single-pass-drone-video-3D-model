import type { ExportFormat } from '../data/mockExportHistory';

export const downloadDemoFile = (format: ExportFormat, projectName: string = 'demo_project') => {
  const safeProjectName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'project';
  
  let content: string | ArrayBuffer = '';
  let filename = '';
  let type = 'text/plain';

  switch (format) {
    case 'OBJ':
      content = `# DEMO / SIMULATION DATA
# Exported by Drone2D-3D Frontend
v -1.0 0.0 1.0
v 1.0 0.0 1.0
v -1.0 0.0 -1.0
v 1.0 0.0 -1.0
v 0.0 1.0 0.0
f 1 2 5
f 2 4 5
f 4 3 5
f 3 1 5
f 1 3 4 2
`;
      filename = `${safeProjectName}_model_demo.obj`;
      break;

    case 'PLY':
      content = `ply
format ascii 1.0
comment DEMO / SIMULATION DATA
comment Exported by Drone2D-3D Frontend
element vertex 4
property float x
property float y
property float z
element face 2
property list uchar int vertex_index
end_header
0 0 0
0 1 0
1 1 0
1 0 0
3 0 1 2
3 0 2 3
`;
      filename = `${safeProjectName}_pointcloud_demo.ply`;
      break;

    case 'LAS':
      content = "DEMO / SIMULATION DATA\nThis is a placeholder text file for a LAS point cloud binary file format demonstration.";
      filename = `${safeProjectName}_pointcloud_demo.las`;
      break;

    case 'GLTF':
      content = JSON.stringify({
        asset: { version: "2.0", generator: "Drone2D-3D Frontend Demo" },
        scene: 0,
        scenes: [{ nodes: [0] }],
        nodes: [{ mesh: 0 }],
        meshes: [{ primitives: [{ attributes: { POSITION: 1 } }] }]
      }, null, 2);
      filename = `${safeProjectName}_model_demo.gltf`;
      type = 'application/json';
      break;

    case 'GLB': {
      const jsonContent = JSON.stringify({
        asset: { version: "2.0", generator: "Drone2D-3D Demo" },
        scene: 0,
        scenes: [{ nodes: [0] }]
      });
      const jsonPaddedLength = Math.ceil(jsonContent.length / 4) * 4;
      const jsonPadding = ' '.repeat(jsonPaddedLength - jsonContent.length);
      const jsonChunk = jsonContent + jsonPadding;

      const buffer = new ArrayBuffer(12 + 8 + jsonChunk.length);
      const view = new DataView(buffer);
      view.setUint32(0, 0x46546C67, true); // magic "glTF"
      view.setUint32(4, 2, true); // version 2
      view.setUint32(8, buffer.byteLength, true); // length
      view.setUint32(12, jsonChunk.length, true); // chunk length
      view.setUint32(16, 0x4E4F534A, true); // chunk type "JSON"
      
      const encoder = new TextEncoder();
      const jsonBytes = encoder.encode(jsonChunk);
      const jsonArray = new Uint8Array(buffer, 20);
      jsonArray.set(jsonBytes);
      
      content = buffer;
      filename = `${safeProjectName}_model_demo.glb`;
      type = 'model/gltf-binary';
      break;
    }

    case 'FBX':
      content = `; FBX 7300 (year 2013)
; Copyright (C) 1997-2013 Autodesk Inc. and/or its licensors.
; DEMO / SIMULATION DATA Export
FBXHeaderExtension:  {
    FBXHeaderVersion: 1003
    FBXVersion: 7300
    CreationTimeStamp:  {
        Version: 1000
        Year: 2026
        Month: 9
        Day: 11
        Hour: 10
        Minute: 0
        Second: 0
        Millisecond: 0
    }
    Creator: "Drone2D-3D Frontend Demo"
}
GlobalSettings:  {
    Version: 1000
    Properties70:  {
        P: "UpAxis", "int", "Integer", "",1
    }
}
`;
      filename = `${safeProjectName}_model_demo.fbx`;
      break;

    default:
      content = "DEMO / SIMULATION DATA";
      filename = `${safeProjectName}_demo.txt`;
  }

  try {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error downloading demo file:", error);
  }
};
