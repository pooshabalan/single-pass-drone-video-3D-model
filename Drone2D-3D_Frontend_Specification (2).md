# Drone2D-3D --- Frontend Implementation Specification

## SIH26158 --- Single-Pass Drone Video to Accurate 3D Model Generation

> **SCOPE: FRONTEND ONLY**
>
> Build only the user interface and frontend behavior in this phase. Do
> not implement Python, OpenCV, COLMAP, OpenMVS, real photogrammetry,
> real video reconstruction, database logic, authentication, cloud
> processing, or backend APIs. Use mock data and simulated processing
> states so the real backend can be connected later.

------------------------------------------------------------------------

## 1. Product Vision

**Drone2D-3D** is the frontend workstation for a future single-pass
drone-video-to-3D reconstruction system.

The eventual workflow is:

``` text
Drone Video
   ↓
Frame Extraction
   ↓
Feature Detection / Matching
   ↓
Camera Pose Estimation
   ↓
Sparse Reconstruction
   ↓
Dense Reconstruction
   ↓
Mesh Generation
   ↓
3D Model / Geospatial Output
```

The frontend must present this workflow professionally without
implementing those algorithms.

Primary users are imagined as drone operators, surveyors, GIS engineers,
computer-vision researchers, and engineering teams.

The uploaded reference images are used only for functional inspiration:
upload, reconstruction, 3D viewer, point cloud, flight path,
measurements, statistics, logs, system status, and export. Do not copy
their futuristic/neon/AI-generated visual style.

------------------------------------------------------------------------

# 2. Non-Negotiable Design Requirements

## Visual identity

Use a **Professional AeroGIS / Geospatial Engineering Workstation**
design.

The UI must be:

-   professional
-   technical
-   precise
-   clean
-   modern
-   restrained
-   information-dense
-   credible as engineering software

Avoid:

-   AI-slop aesthetics
-   cyberpunk styling
-   gaming dashboards
-   neon colors
-   excessive glow
-   glassmorphism
-   excessive gradients
-   holographic effects
-   decorative particles
-   giant rounded cards
-   unnecessary animations

## Two themes

The same frontend must contain two complete themes:

1.  **Light Theme**
2.  **Dark Theme**

There must be a visible theme switcher.

The Light Theme must genuinely use the **white/off-white family**.

The Dark Theme must use deep slate/dark blue-gray surfaces.

Theme preference must persist using localStorage.

## Strict no-emoji rule

**Do not use emojis anywhere in the UI.**

Use professional icons instead. Use **Lucide React** consistently.

------------------------------------------------------------------------

# 3. Frontend Technology Stack

Use:

-   **React**
-   **TypeScript**
-   **Vite**
-   **Tailwind CSS**
-   **Lucide React**
-   **React Router**
-   **Three.js**
-   **React Three Fiber**
-   **@react-three/drei**
-   **Zustand**
-   **Recharts** where charts are useful

No backend technology is required for this phase.

------------------------------------------------------------------------

# 4. Explicitly Out of Scope

Do NOT implement:

-   Python
-   OpenCV
-   COLMAP
-   OpenMVS
-   OpenMVG
-   Meshroom/AliceVision
-   FFmpeg processing
-   GDAL processing
-   Structure-from-Motion algorithms
-   Multi-View Stereo algorithms
-   feature matching algorithms
-   camera pose estimation
-   bundle adjustment
-   real dense reconstruction
-   real mesh optimization
-   real GPS/georeferencing processing
-   database
-   authentication
-   backend API
-   cloud processing
-   real GPU telemetry
-   real survey-grade measurements

All reconstruction information is mock/simulated until a backend is
added later.

------------------------------------------------------------------------

# 5. Recommended Project Structure

``` text
src/
├── assets/
│   ├── images/
│   └── models/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── TopBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatusBar.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   └── EmptyState.tsx
│   ├── theme/
│   │   └── ThemeToggle.tsx
│   ├── upload/
│   │   ├── VideoUpload.tsx
│   │   ├── VideoPreview.tsx
│   │   └── VideoMetadata.tsx
│   ├── reconstruction/
│   │   ├── ReconstructionControls.tsx
│   │   ├── ReconstructionStages.tsx
│   │   ├── ReconstructionProgress.tsx
│   │   ├── ProcessingLogs.tsx
│   │   └── ReconstructionStats.tsx
│   ├── viewer/
│   │   ├── Viewer3D.tsx
│   │   ├── ViewerToolbar.tsx
│   │   ├── ViewerLegend.tsx
│   │   ├── PointCloudControls.tsx
│   │   └── ModelLayers.tsx
│   ├── map/
│   │   ├── FlightPathMap.tsx
│   │   └── LocationPanel.tsx
│   ├── measurements/
│   │   ├── MeasurementToolbar.tsx
│   │   ├── DistanceMeasurement.tsx
│   │   ├── AreaMeasurement.tsx
│   │   └── VolumeMeasurement.tsx
│   ├── export/
│   │   ├── ExportPanel.tsx
│   │   └── ExportFormatSelector.tsx
│   └── system/
│       └── SystemStatus.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Project.tsx
│   ├── Upload.tsx
│   ├── Reconstruction.tsx
│   ├── ModelViewer.tsx
│   ├── Map.tsx
│   ├── Measurements.tsx
│   ├── Export.tsx
│   └── Settings.tsx
├── data/
│   ├── mockProject.ts
│   ├── mockReconstruction.ts
│   ├── mockFlightPath.ts
│   └── mockModel.ts
├── store/
│   ├── appStore.ts
│   ├── reconstructionStore.ts
│   └── viewerStore.ts
├── hooks/
│   ├── useTheme.ts
│   ├── useReconstructionSimulation.ts
│   └── useViewerControls.ts
├── types/
│   ├── project.ts
│   ├── reconstruction.ts
│   ├── model.ts
│   └── viewer.ts
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

Keep mock data separate from presentation components.

------------------------------------------------------------------------

# 6. Application Layout

Use a professional desktop-first workstation layout.

``` text
┌─────────────────────────────────────────────────────────────────┐
│ Drone2D-3D     Project / Site Alpha     System Ready   Theme   │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│ SIDEBAR      │                  MAIN WORKSPACE                  │
│              │                                                  │
│ Dashboard    │                                                  │
│ Project      │                                                  │
│ Upload       │                                                  │
│ Reconstruction│                                                 │
│ 3D Model     │                                                  │
│ Map          │                                                  │
│ Measurements │                                                  │
│ Export       │                                                  │
│ Settings     │                                                  │
│              │                                                  │
├──────────────┴──────────────────────────────────────────────────┤
│ Processing / system status                                     │
└─────────────────────────────────────────────────────────────────┘
```

Desktop is the primary target. Support tablet widths and responsive
sidebar/drawer behavior.

------------------------------------------------------------------------

# 7. Color System

## Light Theme

The Light Theme must be white/off-white rather than gray-heavy.

``` text
Application Background   #F7F9FB
Primary Surface          #FFFFFF
Secondary Surface        #F1F4F6
Elevated Surface         #FFFFFF
Border                   #DCE2E7
Primary Text             #17212B
Secondary Text           #64748B
Muted Text               #8A97A5
Primary Accent           #087F78
Accent Hover             #066A64
Success                  #25855A
Warning                  #A96F16
Error                    #C54B4B
Information              #2563A8
```

## Dark Theme

``` text
Application Background   #0E141B
Primary Surface          #151E27
Secondary Surface        #1B2630
Elevated Surface         #202D38
Border                   #33414D
Primary Text             #F1F5F7
Secondary Text           #9AA8B5
Muted Text               #71808D
Primary Accent           #2A9D8F
Accent Hover             #35B4A5
Success                  #4CAF7A
Warning                  #D0A04A
Error                    #D56A6A
```

## 3D Viewer

Use a darker neutral viewer environment in Dark Mode:

``` text
#0A1016
```

The 3D model itself must retain natural/semantic colors rather than
becoming neon.

------------------------------------------------------------------------

# 8. Semantic Color Rules

Teal means:

-   primary action
-   selected item
-   active tool
-   progress
-   focus
-   important interaction

Green means success.

Amber means warning.

Red means error.

Do not use the accent color for every element.

Do not create neon borders or glowing shadows.

------------------------------------------------------------------------

# 9. Typography

Primary font:

**Inter**

Use it for navigation, headings, forms, buttons, statistics, and general
UI.

Use a monospace font only for processing logs and technical values where
useful.

Recommended hierarchy:

``` text
Page title       24–32px
Section title    16–20px
Body             14–16px
Secondary        12–14px
Technical log    12–13px
```

Do not use huge marketing-style headings.

------------------------------------------------------------------------

# 10. Spacing and Shape

Use a consistent 4/8px spacing system.

Preferred spacing:

``` text
4px, 8px, 12px, 16px, 20px, 24px, 32px
```

Recommended radius:

``` text
Buttons/inputs    6–8px
Cards             8–10px
Panels            10–12px
Dialogs           10–12px
```

Avoid excessive pill shapes.

Use subtle borders and restrained shadows.

Do not use glowing shadows.

------------------------------------------------------------------------

# 11. Icons

Use Lucide React only as the primary icon system.

Useful icons:

``` text
Upload
Video
Play
Pause
Rotate3D
Hand
ZoomIn
ZoomOut
Maximize
Map
MapPin
Route
Ruler
Box
Layers
Download
Settings
Activity
CircleCheck
TriangleAlert
CircleX
Sun
Moon
Monitor
Search
ChevronDown
```

All icon-only controls must have accessible labels/tooltips.

------------------------------------------------------------------------

# 12. Theme Toggle

Provide a visible professional Light/Dark switch.

Use:

``` text
Sun icon
Moon icon
```

not emoji characters.

Example:

``` text
[ Sun ] [ Moon ]
```

or a compact segmented toggle.

Persist the selected theme in localStorage.

The theme transition should be subtle, approximately 150--250ms.

------------------------------------------------------------------------

# 13. Top Bar

Include:

-   minimal drone/3D product icon
-   `Drone2D-3D`
-   version
-   current project
-   system status
-   theme toggle
-   settings if appropriate

Example:

``` text
[Drone Icon] Drone2D-3D     Site Alpha     System Ready     [Theme]
```

Keep it clean and compact.

------------------------------------------------------------------------

# 14. Sidebar

Navigation:

1.  Dashboard
2.  Project
3.  Upload Video
4.  Reconstruction
5.  3D Model
6.  Map & Flight Path
7.  Measurements
8.  Export
9.  Settings

Use Lucide icons.

Active navigation item should use a subtle teal background/indicator and
clear contrast.

Do not make the entire sidebar teal.

------------------------------------------------------------------------

# 15. Dashboard

Create a professional overview.

Header:

``` text
Dashboard
Single-Pass Drone Reconstruction Workspace
```

Summary cards:

-   Active Project
-   Total Frames
-   Registered Frames
-   Sparse Points
-   Dense Points
-   Reprojection Error
-   Reconstruction Status

Example mock values:

``` text
Project             Campus Survey — Site Alpha
Frames              1,200
Registered          982
Sparse Points       2.4M
Dense Points        8.7M
Reprojection        0.68 px
Status              Ready
```

Quick actions:

-   Upload Video
-   Start Reconstruction
-   Open 3D Model
-   Export Model

------------------------------------------------------------------------

# 16. Project Page

Show:

-   project name
-   description
-   location
-   latitude
-   longitude
-   video name
-   recording date
-   camera information
-   coordinate-system placeholder

Use realistic demo data, but do not claim real survey accuracy.

------------------------------------------------------------------------

# 17. Video Upload

Create a professional drag-and-drop upload area.

``` text
┌──────────────────────────────────────────────┐
│                                              │
│                [Upload icon]                 │
│                                              │
│              Upload Drone Video              │
│                                              │
│        Drag and drop video here or           │
│               Browse Files                   │
│                                              │
│              MP4 / MOV / AVI                 │
└──────────────────────────────────────────────┘
```

After upload display:

-   filename
-   duration
-   resolution
-   FPS
-   file size
-   estimated frame count
-   preview thumbnail
-   remove/reset control

Example:

``` text
site_alpha_flight.mp4
02:14
3840 × 2160
30 FPS
486 MB
1,200 estimated frames
```

------------------------------------------------------------------------

# 18. Reconstruction Configuration

Provide frontend-only controls:

### Frame selection

-   frame sampling mode
-   frame interval
-   maximum frames

### Feature quality

-   Low
-   Medium
-   High

### Reconstruction quality

-   Preview
-   Standard
-   High

### Output

-   Point Cloud
-   Mesh
-   Textured Model

These settings are UI state only.

------------------------------------------------------------------------

# 19. Reconstruction Simulation

Clicking `Start Reconstruction` must simulate the future workflow.

Primary button:

``` text
[Play icon] Start Reconstruction
```

Simulated stages:

``` text
01 Video Analysis
02 Frame Selection
03 Feature Extraction
04 Feature Matching
05 Camera Pose Estimation
06 Sparse Reconstruction
07 Dense Reconstruction
08 Mesh Generation
09 Mesh Optimization
10 Finalization
```

Status values:

``` text
pending
processing
completed
error
```

Overall states:

``` text
idle
initializing
processing
paused
completed
error
cancelled
```

Implement Start, Pause, Resume, Cancel, and Reset for the simulation.

Do not execute any real CV process.

------------------------------------------------------------------------

# 20. Processing Progress

Show:

``` text
RECONSTRUCTION

75%

Frame 450 / 1200

Estimated Time Remaining
03:12

Current Stage
Mesh Optimization
```

Use a restrained progress bar.

Also show the current processing stage.

------------------------------------------------------------------------

# 21. Processing Logs

Create a scrollable technical log.

Example:

``` text
12:21:03  Frame 448 / 1200 processed
12:21:05  Feature points extracted
12:21:07  Depth map generated
12:21:10  Frame 449 / 1200 processed
12:21:12  Mesh optimization started
12:21:16  Frame 450 / 1200 processed
```

Use monospace text.

Logs are simulated.

------------------------------------------------------------------------

# 22. Reconstruction Statistics

Display:

``` text
Total Frames          1,200
Registered Frames       982
Sparse Points          2.4M
Dense Points           8.7M
Mesh Vertices          1.1M
Mesh Faces             1.8M
Processing Time        12:34
Reprojection Error     0.68 px
```

Use reusable StatCard components.

------------------------------------------------------------------------

# 23. 3D Model Viewer

This is the primary visual workspace.

Use:

-   Three.js
-   React Three Fiber
-   Drei

Provide:

-   orbit
-   pan
-   zoom in
-   zoom out
-   reset
-   fit model
-   top view
-   front view
-   side view
-   fullscreen

Use Lucide icons.

The viewer should have a restrained grid and neutral environment.

Do not create a giant glowing futuristic grid.

------------------------------------------------------------------------

# 24. Demo 3D Scene

Because the backend is not implemented, create a lightweight frontend
demo scene.

Include:

-   terrain
-   building blocks
-   roads
-   vegetation placeholders
-   point-cloud-like points
-   mesh/wireframe representation

The demo only communicates the intended future visualization.

Keep geometry lightweight for smooth performance.

------------------------------------------------------------------------

# 25. Model Layers

Provide toggles:

``` text
[on] Terrain
[on] Buildings
[on] Roads
[on] Vegetation
[on] Water
[on] Point Cloud
[off] Mesh Wireframe
```

The demo scene should respond to these toggles.

------------------------------------------------------------------------

# 26. Point Cloud Controls

Provide:

-   show/hide point cloud
-   point size
-   density
-   color mode

Color modes:

-   Natural
-   Height
-   Classification

All are frontend visualization controls.

------------------------------------------------------------------------

# 27. Mesh Controls

Provide:

``` text
Solid
Wireframe
Solid + Wireframe
```

The viewer must update the representation.

------------------------------------------------------------------------

# 28. Model Legend

Use a compact legend:

``` text
Buildings
Roads
Vegetation
Terrain
Water
Point Cloud
```

Use restrained semantic colors.

Do not use neon colors.

------------------------------------------------------------------------

# 29. Flight Path / Map

Create a professional map/flight-path panel.

This phase does not require a real map backend.

Display:

-   takeoff marker
-   flight path
-   waypoint nodes
-   current drone position
-   project location
-   north indicator

Use a restrained teal flight path.

The map should feel like a GIS tool, not a futuristic HUD.

------------------------------------------------------------------------

# 30. Location Information

Example mock information:

``` text
Latitude       12.9716°
Longitude      77.5946°
Altitude       120 m
Flight Distance 2.8 km
Flight Duration 02:14
```

Treat these as demonstration data.

------------------------------------------------------------------------

# 31. Measurement Tools

Provide:

## Point-to-Point

Select two points in the demo 3D scene.

Example:

``` text
Distance
24.6 m
```

## Area

Select an area in the demo scene.

Example:

``` text
Area
1,248 m²
```

## Volume

Demonstrate volume measurement using simplified frontend geometry or
demo values.

Example:

``` text
Volume
4,820 m³
```

Clearly treat measurements as demo values and do not claim survey-grade
accuracy.

------------------------------------------------------------------------

# 32. Export

Create a professional export panel.

Formats:

``` text
OBJ
PLY
LAS
GLTF
GLB
FBX
```

Each format should have:

-   icon
-   name
-   short description
-   selected/unselected state

Provide an Export button.

At this stage export is simulated. Do not pretend that the generated
file is a real reconstructed model.

------------------------------------------------------------------------

# 33. System Status

Show mock system information:

``` text
CPU Usage       45%
GPU Usage       68%
Memory          72%
Disk            60%
Temperature     62°C
```

Use clean progress bars or indicators.

Do not access actual system telemetry in this frontend phase.

------------------------------------------------------------------------

# 34. Model Information

Display:

``` text
Model Type             Textured Mesh
Vertices               1.1M
Faces                  1.8M
Point Count            8.7M
Bounding Size          286 × 241 × 42 m
Coordinate Reference   Demo / Local
```

Do not claim geographic accuracy.

------------------------------------------------------------------------

# 35. Quality Indicators

Show:

-   reconstruction quality
-   camera registration
-   point density
-   mesh completeness
-   reprojection error

Example:

``` text
Reconstruction Quality     Good
Camera Registration        82%
Point Density              High
Reprojection Error         0.68 px
```

Use mock values.

------------------------------------------------------------------------

# 36. Success State

After simulation completes:

``` text
Reconstruction Complete

1,200 frames processed
982 frames registered
8.7M dense points
1.8M mesh faces

[Open 3D Model]
[View Statistics]
[Export Model]
```

Use a professional success icon, not an emoji.

------------------------------------------------------------------------

# 37. Empty States

Example:

``` text
No reconstruction available

Upload a drone video to begin the reconstruction workflow.

[Upload Video]
```

Use an icon.

------------------------------------------------------------------------

# 38. Error States

Example:

``` text
Reconstruction could not be started

The selected video is not available in this frontend demo.

[Try Again]
```

Handle simulated errors cleanly.

------------------------------------------------------------------------

# 39. Routes

Recommended routes:

``` text
/                 Dashboard
/project          Project
/upload           Upload Video
/reconstruction   Reconstruction
/model            3D Model
/map              Map & Flight Path
/measurements     Measurements
/export           Export
/settings         Settings
```

Use React Router.

------------------------------------------------------------------------

# 40. Settings

Initial settings:

## Appearance

-   Light
-   Dark
-   optional System

## Viewer

-   default camera angle
-   grid visibility
-   point-cloud visibility
-   default model layer

Keep settings frontend-only.

------------------------------------------------------------------------

# 41. State Management

Use Zustand only where global state is helpful.

Suggested stores:

``` text
appStore
- currentProject
- theme
- sidebar state

reconstructionStore
- status
- progress
- currentStage
- logs
- statistics

viewerStore
- camera mode
- visible layers
- point cloud
- mesh mode
- measurement mode
```

Do not over-engineer state.

------------------------------------------------------------------------

# 42. Mock Data

Keep all mock data centralized.

Example:

``` ts
const mockProject = {
  name: "Campus Survey — Site Alpha",
  video: "site_alpha_flight.mp4",
  totalFrames: 1200,
  registeredFrames: 982,
  sparsePoints: 2400000,
  densePoints: 8700000,
  reprojectionError: 0.68,
  processingTime: "12:34"
};
```

Use TypeScript types for project, reconstruction, model, flight path,
and viewer state.

------------------------------------------------------------------------

# 43. Accessibility

Implement:

-   semantic HTML
-   keyboard navigation
-   visible focus states
-   accessible labels
-   aria labels for icon-only buttons
-   tooltips
-   sufficient contrast
-   status text in addition to color

Never communicate important information through color alone.

------------------------------------------------------------------------

# 44. Responsive Behavior

Desktop is the primary target.

Support:

``` text
1440px+
1280px
1024px
768px
```

At smaller widths:

-   collapse sidebar
-   convert right panels to drawers where appropriate
-   stack bottom panels
-   preserve the 3D viewer as the priority area

Do not allow the desktop workstation to become cluttered.

------------------------------------------------------------------------

# 45. Animation Rules

Use functional animations only.

Recommended duration:

``` text
150–250ms
```

Allowed:

-   theme transition
-   sidebar transition
-   modal transition
-   progress animation
-   loading state
-   panel expansion
-   3D camera transition

Do not use:

-   particle backgrounds
-   animated gradients
-   holographic effects
-   constant pulsing
-   decorative floating objects
-   excessive motion

------------------------------------------------------------------------

# 46. UI Component Rules

Create reusable components:

``` text
Button
IconButton
Card
Panel
StatCard
Badge
StatusBadge
ProgressBar
Modal
Tooltip
Tabs
Dropdown
DataRow
EmptyState
```

Do not duplicate the same UI structure throughout the application.

------------------------------------------------------------------------

# 47. Professional Visual Rules

The 3D model is the hero.

Priority:

``` text
1. 3D reconstruction
2. Workflow status
3. Technical information
4. Controls
5. Navigation
6. Decoration
```

Decoration has the lowest priority.

The application should look like real engineering software.

------------------------------------------------------------------------

# 48. Reference Image Usage

Use the reference for functional ideas:

-   Drone2D-3D branding
-   upload workflow
-   reconstruction workflow
-   export formats
-   3D model viewer
-   point cloud
-   flight path
-   measurement tools
-   progress
-   logs
-   statistics
-   system status
-   coordinates
-   model legend

Do NOT copy:

-   neon-heavy styling
-   glowing UI
-   excessive futuristic effects
-   AI-generated visual treatment
-   decorative grids
-   excessive rounded cards

------------------------------------------------------------------------

# 49. Development Order

## Phase 1 --- Foundation

1.  Create Vite + React + TypeScript project.
2.  Configure Tailwind CSS.
3.  Add Lucide React.
4.  Add React Router.
5.  Add Zustand.
6.  Add Three.js / React Three Fiber / Drei.
7.  Add Recharts where useful.
8.  Create design tokens.
9.  Implement Light/Dark theme.
10. Implement AppShell.

## Phase 2 --- Layout

1.  TopBar
2.  Sidebar
3.  Main workspace
4.  Status bar
5.  Responsive behavior

## Phase 3 --- Dashboard

1.  Summary cards
2.  Project information
3.  Quick actions
4.  Recent reconstruction

## Phase 4 --- Upload

1.  Drag/drop
2.  Browse
3.  Preview
4.  Metadata
5.  Reset

## Phase 5 --- Reconstruction

1.  Configuration
2.  Start button
3.  Simulation
4.  Stage tracker
5.  Progress
6.  Logs
7.  Statistics

## Phase 6 --- 3D

1.  Three.js scene
2.  Terrain
3.  Buildings
4.  Roads
5.  Vegetation
6.  Point cloud
7.  Grid
8.  Viewer controls
9.  Layers
10. Legend

## Phase 7 --- Map

1.  Flight path
2.  Waypoints
3.  Location panel
4.  Coordinates
5.  Flight statistics

## Phase 8 --- Measurements

1.  Point-to-point
2.  Area
3.  Volume
4.  Results

## Phase 9 --- Export

1.  Format selection
2.  Export configuration
3.  Simulated export state

## Phase 10 --- Polish

1.  Accessibility
2.  Responsive behavior
3.  Loading states
4.  Empty states
5.  Error states
6.  Theme verification
7.  Performance
8.  UI consistency

------------------------------------------------------------------------

# 50. Acceptance Checklist

## Theme

-   [ ] Light theme works.
-   [ ] Dark theme works.
-   [ ] Theme toggle works.
-   [ ] Theme persists after refresh.
-   [ ] Light mode is white/off-white.
-   [ ] Dark mode is deep slate.
-   [ ] No emojis anywhere.
-   [ ] Professional icons are used.

## Layout

-   [ ] Top bar.
-   [ ] Sidebar.
-   [ ] Main workspace.
-   [ ] Status bar.
-   [ ] Responsive behavior.
-   [ ] Consistent typography.
-   [ ] Consistent spacing.

## Workflow

-   [ ] Upload UI works.
-   [ ] Mock video metadata appears.
-   [ ] Configuration works.
-   [ ] Reconstruction simulation works.
-   [ ] Progress updates.
-   [ ] Stages update.
-   [ ] Logs update.
-   [ ] Statistics update.
-   [ ] Completion state works.
-   [ ] Error/cancel/reset states work.

## 3D

-   [ ] Three.js viewer works.
-   [ ] Orbit works.
-   [ ] Pan works.
-   [ ] Zoom works.
-   [ ] Reset/Fit works.
-   [ ] Demo terrain exists.
-   [ ] Demo buildings exist.
-   [ ] Point cloud exists.
-   [ ] Layers can be toggled.
-   [ ] Mesh modes work.
-   [ ] Legend exists.

## Map

-   [ ] Flight path exists.
-   [ ] Waypoints exist.
-   [ ] Location panel exists.
-   [ ] Coordinates exist.

## Measurements

-   [ ] Point-to-point exists.
-   [ ] Area exists.
-   [ ] Volume exists.
-   [ ] Result panels exist.

## Export

-   [ ] OBJ
-   [ ] PLY
-   [ ] LAS
-   [ ] GLTF
-   [ ] GLB
-   [ ] FBX
-   [ ] Simulated export state

## Code

-   [ ] TypeScript throughout.
-   [ ] Reusable components.
-   [ ] Mock data separated.
-   [ ] State separated from presentation.
-   [ ] No backend.
-   [ ] No Python.
-   [ ] No OpenCV.
-   [ ] No COLMAP.
-   [ ] No OpenMVS.

------------------------------------------------------------------------

# 51. Final Instruction to Antigravity

Build this as a **professional geospatial engineering workstation for
single-pass drone photogrammetry**.

This is **FRONTEND ONLY**.

Use React + TypeScript + Vite + Tailwind CSS with Lucide React, React
Router, Zustand, Three.js, React Three Fiber, Drei, and Recharts where
appropriate.

Use realistic mock data and a frontend-only reconstruction simulation.

Implement the complete interface:

``` text
Dashboard
   ↓
Project
   ↓
Upload Video
   ↓
Configure Reconstruction
   ↓
Start Reconstruction
   ↓
Monitor Processing
   ↓
3D Model
   ↓
Map / Flight Path
   ↓
Measurements
   ↓
Export
```

Implement two polished themes:

``` text
LIGHT
White / Off-white / Slate / Professional Teal

DARK
Deep Slate / Cool Gray / Professional Teal
```

Provide a visible icon-based Light/Dark theme switcher and persist the
choice.

**STRICTLY NO EMOJIS.**

Use Lucide React icons.

**NO NEON UI.**

**NO AI-SLOP VISUAL STYLE.**

**NO EXCESSIVE GLOW.**

**NO GLASSMORPHISM-HEAVY DESIGN.**

**NO DECORATIVE FUTURISTIC EFFECTS.**

**NO BACKEND.**

**NO PYTHON.**

**NO OPENCV.**

**NO COLMAP.**

**NO OPENMVS.**

The final result should look credible as professional drone surveying /
GIS / computer-vision software and should be structured so the real
reconstruction backend can be integrated later without redesigning the
frontend.
