# Design Guidelines: Hologram Scanner Kiosk

## Design Approach
**Reference-Based Approach**: Futuristic holographic kiosk inspired by sci-fi interfaces (Iron Man's JARVIS, Minority Report, modern museum kiosks) combined with approachable educational design for school settings.

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (holographic theme):
- Background: 220 25% 8% (deep navy-black)
- Surface: 220 20% 12% (elevated dark surface)
- Hologram Primary: 190 85% 55% (cyan-blue glow)
- Hologram Accent: 280 70% 60% (purple highlight)
- Success/Scan: 150 75% 50% (green confirmation)
- Text Primary: 0 0% 95%
- Text Secondary: 220 15% 70%

**Light Mode** (subtle secondary mode):
- Background: 210 30% 98%
- Surface: 0 0% 100%
- Primary: 210 80% 50%
- Accent: 280 60% 55%

### B. Typography

**Font Families**:
- Primary: "Space Grotesk" (futuristic, tech-forward for headings)
- Interface: "Inter" (clean, readable for body text and UI)
- Monospace: "JetBrains Mono" (data displays, scan results)

**Hierarchy**:
- Kiosk Title: 4xl-5xl, bold, Space Grotesk with subtle text-glow
- Section Headers: 2xl-3xl, semibold
- Body Text: lg, regular (large for touchscreen readability)
- AI Responses: base-lg, Inter
- Scanner Status: xl, monospace

### C. Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16 for consistency
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Touch targets: minimum h-16 (64px for finger interaction)
- Container: max-w-6xl for main content area

**Kiosk Layout**:
- Fullscreen viewport (100vh) container
- Fixed header with branding and status
- Main content area with scanner + chat interface
- Footer with help instructions

### D. Component Library

**Scanner Interface**:
- Large circular scanning area (400-500px) with animated holographic border
- Pulsing glow effect when active
- Camera preview or upload zone with drag-and-drop
- Scan button: Large, rounded-full, cyan gradient with glow effect
- Status indicators with color-coded feedback

**AI Chat Interface**:
- Message bubbles with subtle backdrop-blur and borders
- User messages: Right-aligned, subtle purple tint
- AI responses: Left-aligned, cyan accent border
- Typing indicator: Animated dots with holographic glow
- Input field: Large (h-16), rounded-2xl, with holographic focus ring

**Navigation & Controls**:
- Minimal top bar with school logo/name and "Hologram Assistant" branding
- Reset/New Session button: Always visible, subtle but accessible
- Help icon: Bottom-right floating button with tooltip

**Cards & Surfaces**:
- Glass-morphism effect: backdrop-blur-lg with semi-transparent backgrounds
- Subtle border with holographic gradient (cyan to purple)
- Rounded-2xl corners throughout
- Shadow: Multiple layers for depth (shadow-lg + colored glow)

**Buttons**:
- Primary (Scan/Submit): bg-gradient from cyan to blue, h-14, text-lg, rounded-xl, with shadow-glow
- Secondary (Cancel/Reset): Outline with blur background, h-12
- Icon buttons: rounded-full, h-12 w-12, hover glow effect

**Data Displays**:
- Scan results: Monospace font in elevated card with green accent
- School info cards: Grid layout with icon, title, and description
- Status badges: Rounded-full, small caps, with appropriate color coding

### E. Visual Effects & Animations

**Holographic Effects**:
- Scanner border: Animated rotating gradient (cyan → purple → cyan)
- Active state glow: Pulsing shadow with color shift
- Scan animation: Expanding rings from center
- Background: Subtle animated grid pattern or particles

**Transitions**:
- Message appearances: Fade-in with slide-up (300ms)
- Scanner activation: Scale and glow transition (400ms)
- Screen changes: Smooth crossfade (200ms)

**Interactive Feedback**:
- Touch ripple effect on all buttons (Tailwind active states)
- Hover glow on interactive elements (desktop fallback)
- Success scan: Brief full-screen green flash overlay
- Error states: Gentle red pulse on affected component

### F. Special Kiosk Considerations

**Touch Optimization**:
- All interactive elements minimum 48x48px
- Generous spacing between touch targets (gap-4 minimum)
- No hover-dependent interactions
- Visual feedback on all touches

**Accessibility**:
- High contrast mode available
- Large text throughout
- Clear visual hierarchy
- Screen reader support for AI responses
- Timeout warnings with extension option

**Content Restrictions UI**:
- Friendly boundary message when non-school query detected
- Visual cue: Amber warning icon with message
- Suggested school topics displayed as quick-select buttons
- Clear "Ask about school topics only" reminder in input placeholder

## Images

**Hero/Scanner Section**:
- Background: Abstract holographic grid pattern (can be CSS gradient + SVG pattern, no image needed)
- Scanner icon: Futuristic camera/QR symbol in holographic style (icon library)

**Decorative Elements**:
- Floating particle effects (CSS animation)
- Grid overlay for tech aesthetic (SVG pattern)
- School mascot/logo in header (actual school asset)

No large photographic hero image required - the interface itself IS the visual centerpiece with holographic effects and animations creating the "wow" factor.

## Layout Structure

1. **Header Bar** (h-20): School branding + "Hologram Assistant" title
2. **Main Scanner Area** (flex-1): Circular scanner with camera/upload interface
3. **Chat Interface** (flex-1, max-h-[60vh]): Scrollable message history
4. **Input Bar** (h-24): Large text input + send button
5. **Footer** (h-16): Quick help text + reset session

**Responsive**: Single-column, fullscreen on all devices (kiosk is primary use case)