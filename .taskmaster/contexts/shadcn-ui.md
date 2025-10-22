# shadcn/ui Integration Context

## Project UI System Integration Status

### Current State
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **Current UI**: Radix UI primitives with custom components
- **Forms**: React Hook Form + Zod validation
- **Theme**: Next.js Themes (dark/light mode)
- **Notifications**: Sonner toast system

### shadcn/ui Integration Plan

#### Core Components Being Integrated
- **Essential**: Button, Input, Card, Dialog, Form, Label, Select, Sheet, Table, Tabs
- **Advanced**: Data Table, Date Picker, Command, Navigation Menu, Accordion
- **Upgrades**: Existing Button, Input, Form, Label, Radio Group components

#### Technical Stack
- **CLI**: `npx shadcn@latest init`
- **Style**: New York style with custom brand colors
- **Base Color**: Slate with CSS variables
- **Typography**: Geist font family integration
- **Animation**: tailwindcss-animate for transitions

### Configuration Requirements
```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Migration Strategy
1. **Phase 1**: Setup + Core component upgrades
2. **Phase 2**: Essential components addition
3. **Phase 3**: Advanced features + custom extensions
4. **Phase 4**: Performance optimization + documentation

### Key Dependencies
- @radix-ui/react-icons
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react
- tailwindcss-animate

### Brand Customization Needs
- Maintain existing color scheme
- Preserve Geist typography
- Consistent spacing and border radius
- Subtle animations and micro-interactions