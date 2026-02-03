# Tagline Editor

An interactive React editor for configuring Tagline elements with a live preview and comprehensive settings panel.

## 🚀 Features

- **Live Preview**: See changes instantly as you edit
- **Tag Management**: Add, edit, and delete tags
- **Style Customization**: 
  - 4 visual style variants
  - 5 size options (XL, L, M, S, XS)
  - 5 border radius options (0, 4, 8, 12, 100)
  - 3 alignment options (left, center, right)
- **State Management**: Built with MobX for reactive state management
- **Smooth Animations**: Panel transitions and hover effects
- **Type Safety**: Full TypeScript support

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **MobX** - State management
- **Vite** - Build tool
- **CSS Modules** - Scoped styling

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tagline
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗 Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── PreviewArea/    # Live preview of tags
│   ├── EditorArea/    # Container for settings panels
│   ├── MainPanel/      # Main tag management panel
│   ├── ItemPanel/      # Create/edit tag panel
│   ├── StylesPanel/    # Style customization panel
│   └── Panel/          # Reusable panel component
├── stores/             # MobX stores
│   └── taglineStore.ts # Main application store
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Architecture

The application follows a scalable architecture:

- **Store Pattern**: Centralized state management with MobX
- **Component Composition**: Reusable, focused components
- **Type Safety**: Comprehensive TypeScript types
- **Separation of Concerns**: Clear boundaries between UI and logic

### Adding New Element Types

To add a new element type (e.g., "Button element"):

1. Create a new store in `src/stores/` (e.g., `buttonStore.ts`)
2. Create new components in `src/components/`
3. Extend the `PanelType` union type in `src/types/index.ts`
4. Add routing logic in `EditorArea` component

### Adding New Controls

To add new controls to the settings panel:

1. Add new properties to the store
2. Add new action methods to the store
3. Create UI controls in the appropriate panel component
4. Update TypeScript types as needed

## 🔄 Data Persistence

The application simulates server communication by logging configuration changes to the console. When you:

- Add or edit a tag
- Change style settings

The current configuration is logged as:
```
POST http://api/tagline { ... }
```

In a real application, you would replace the `saveToServer()` method in `taglineStore.ts` with an actual API call.

## 🎯 Usage

1. **View Tags**: The preview area shows all current tags
2. **Add Tag**: Click "+ Add item" in the Main Panel
3. **Edit Tag**: Click on any tag in the Main Panel list
4. **Delete Tag**: Click the × button next to a tag
5. **Customize Styles**: Click "Styles" button to open the Styles Panel
6. **Change Settings**: All changes are reflected instantly in the preview

## 📝 Notes

- The design uses a dark theme (#1a1a1a background)
- Tags wrap automatically into multiple rows
- All panels include smooth slide-in animations
- The editor area is sticky and scrollable for long content

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and configure the build

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📄 License

MIT
