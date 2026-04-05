# DNASecure - Clinical DNA Encryption for Medical Imaging

A monorepo project containing a Next.js 14 web application and FastAPI backend for DNA-based medical image encryption.

## Project Structure

```
├── apps/
│   ├── web/                 # Next.js 14 web application
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities and stores
│   │   └── public/         # Static assets
│   └── api/                # FastAPI backend
│       ├── core/           # Encryption modules
│       │   ├── dna_encoder.py
│       │   ├── roi_detector.py
│       │   ├── chaos_map.py
│       │   └── metrics.py
│       ├── routes/         # API endpoints
│       │   ├── encrypt.py
│       │   └── decrypt.py
│       └── main.py         # FastAPI app
├── packages/
│   └── types/              # Shared TypeScript types
└── turbo.json             # TurboRepo configuration
```

## Features

- **DNA-Based Encryption**: 8 different DNA encoding protocols
- **ROI Detection**: Automatic region-of-interest detection with sensitivity control
- **Chaotic Scrambling**: Arnold cat map and logistic sequence-based encryption
- **Security Metrics**: PSNR, SSIM, NPCR, UACI calculation
- **Real-time Streaming**: Server-Sent Events for encryption progress
- **Medical Image Support**: DICOM, NIFTI, TIFF formats
- **Persistent Storage**: Zustand with localStorage integration
- **Beautiful UI**: Design system with glassmorphism and custom styling

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.9+
- Docker (optional)

### Installation

1. **Install Node dependencies**:
```bash
pnpm install
```

2. **Set up Python backend**:
```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Development

1. **Start the backend** (in one terminal):
```bash
cd apps/api
source venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. **Start the frontend** (in another terminal):
```bash
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Building

```bash
pnpm build
```

## Pages

- **Landing** (`/`): Hero section with feature overview
- **Upload** (`/encrypt/upload`): Medical image upload
- **Configure** (`/encrypt/configure`): DNA protocol and ROI sensitivity selection
- **Processing** (`/encrypt/processing`): Real-time encryption progress
- **Result** (`/encrypt/result`): Encrypted image and metrics
- **Analysis** (`/analysis`): Detailed security metrics and histograms
- **History** (`/history`): Encryption history and statistics
- **Decrypt** (`/decrypt/upload`, `/decrypt/result`): Image decryption workflow
- **Settings** (`/settings`): User preferences and configuration

## API Endpoints

### Encryption
- `POST /api/encrypt` - Encrypt image with configuration
- `GET /api/encrypt/stream` - Stream encryption progress (SSE)

### Decryption
- `POST /api/decrypt` - Decrypt encrypted image with key
- `POST /api/decrypt/validate` - Validate decryption key
- `GET /api/history` - Get encryption/decryption history

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State**: Zustand with localStorage persistence
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Fonts**: Newsreader, Inter, JetBrains Mono (via next/font/google)
- **Icons**: Material Symbols Outlined

### Backend
- **Framework**: FastAPI
- **Image Processing**: OpenCV, Pillow, scikit-image
- **Numerics**: NumPy
- **Async**: asyncio, Python async/await
- **CORS**: fastapi.middleware.cors

## Design System

### Colors
- **Primary**: #894d14 (Burnt Amber)
- **Secondary**: #395f94 (Deep Blue)
- **Tertiary**: #29674a (Forest Green)
- **Background**: #fff8f4 (Warm Off-white)
- **Surface**: Multiple surface variants
- **Error**: #ba1a1a

### Typography
- **Headlines**: Newsreader (serif, italic)
- **Body**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

### Shadows & Effects
- **Editorial Shadow**: 0px 24px 48px rgba(30, 27, 24, 0.06)
- **Warm Shadow**: 0 1px 3px rgba(26, 23, 20, 0.06)
- **Glassmorphism**: backdrop-blur with semi-transparent white
- **Scanline Effect**: CSS repeating-linear-gradient

## DNA Encoding Protocols

The system supports 8 different DNA encoding protocols:

1. **Standard Huffman**: {00:A, 01:C, 10:G, 11:T}
2. **Gray Coding**: {00:G, 01:T, 10:C, 11:A}
3. **Rotation-3**: {00:T, 01:A, 10:C, 11:G}
4. **Inverted Parity**: {00:C, 01:G, 10:T, 11:A}
5. **L-System Bio**: {00:A, 01:T, 10:C, 11:G}
6. **Recursive Map**: {00:G, 01:C, 10:A, 11:T}
7. **Chaotic Delta**: {00:T, 01:G, 10:C, 11:A}
8. **Entropy Pivot**: {00:C, 01:A, 10:G, 11:T}

## Security Metrics

- **PSNR** (Peak Signal-to-Noise Ratio): Measures fidelity
- **SSIM** (Structural Similarity): Measures visual quality
- **NPCR** (Number of Changing Pixel Rate): Encryption effectiveness
- **UACI** (Unified Average Changing Intensity): Sensitivity to key changes

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
FASTAPI_ENV=development
LOG_LEVEL=INFO
```

## Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy

### Backend Deployment
The FastAPI backend can be deployed to:
- Heroku
- Railway
- PythonAnywhere
- AWS Lambda (with serverless framework)
- Google Cloud Run
- Azure Container Apps

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checks: `pnpm type-check`
4. Run lint: `pnpm lint`
5. Submit a pull request

## License

Academic Research License - See LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub or contact support.

---

**DNASecure** - Securing medical imaging through biometric encryption
