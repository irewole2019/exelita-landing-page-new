# PDF.js Setup Guide for Exelita

## Overview
This guide explains how to set up the secure PDF viewer for the Exelita Success Toolkit using PDF.js.

## Implementation Details

### Current Setup
The PDF viewer is implemented in `/app/toolkit/guide-viewer/page.tsx` with the following features:

1. **CDN-based PDF.js** (no npm installation needed)
   - Loads PDF.js v3.11.174 from CDN
   - Automatic worker setup
   - Zero build configuration

2. **Security Features**
   - Right-click disabled (prevents "Save Image As")
   - Ctrl+S and Ctrl+P disabled (prevents save/print shortcuts)
   - Canvas-based rendering (harder to extract than iframe)
   - No download button provided
   - No print functionality

3. **User Experience**
   - Page navigation (prev/next buttons + arrow keys)
   - Zoom controls (zoom in/out)
   - Page counter
   - Loading states
   - Error handling
   - Responsive design

## Setting Up Your PDF

### Step 1: Prepare Your PDF
Place your PDF file here:
\`\`\`
public/pdfs/exelita-eb1a-guide.pdf
\`\`\`

### Step 2: PDF Security Best Practices

While the viewer disables download/print, consider these additional protections:

1. **Watermarking**: Add user-specific watermarks to each PDF
2. **DRM**: Use a service like Adobe DRM for enterprise-level protection
3. **Server-side rendering**: For maximum security, render PDFs server-side
4. **Authentication**: Verify purchase before allowing access (recommended next step)

### Step 3: Testing Locally

1. Add your PDF to `/public/pdfs/exelita-eb1a-guide.pdf`
2. Run `npm run dev`
3. Navigate to `http://localhost:3000/toolkit/guide-viewer`
4. Test the following:
   - Pages load correctly
   - Navigation works (buttons + arrow keys)
   - Zoom functions properly
   - Right-click is disabled
   - Ctrl+S and Ctrl+P don't work

## Advanced Configuration

### Custom PDF.js Build (Optional)
For more control, you can install PDF.js via npm:

\`\`\`bash
npm install pdfjs-dist
\`\`\`

Then modify the viewer to import from the package instead of CDN.

### Authentication Integration (Recommended)

Add authentication to verify purchase before showing the PDF:

\`\`\`typescript
// Example middleware or component check
useEffect(() => {
  const verifyAccess = async () => {
    const response = await fetch('/api/verify-toolkit-access')
    if (!response.ok) {
      router.push('/toolkit?error=unauthorized')
    }
  }
  verifyAccess()
}, [])
\`\`\`

## Limitations & Trade-offs

**Current Approach (CDN-based):**
- ✅ Easy to implement
- ✅ No build configuration
- ✅ Smaller bundle size
- ❌ Requires internet connection
- ❌ Less control over caching

**Alternative (npm package):**
- ✅ Works offline
- ✅ Full control
- ✅ Better caching
- ❌ Larger bundle size
- ❌ More complex setup

## Security Note

⚠️ **Important**: No client-side solution is 100% secure. Determined users can:
- Use browser dev tools to access the canvas
- Take screenshots
- Use screen recording

For truly sensitive content, consider:
1. Server-side rendering with session-based authentication
2. Time-limited access tokens
3. User-specific watermarks
4. DRM solutions

## Troubleshooting

### PDF Not Loading
- Check that the file exists at `/public/pdfs/exelita-eb1a-guide.pdf`
- Verify the file is a valid PDF
- Check browser console for errors
- Ensure the file isn't too large (>50MB may cause issues)

### Rendering Issues
- Try reducing the PDF file size
- Optimize images within the PDF
- Consider splitting into multiple files if very large

### Performance
- Large PDFs (>100 pages) may be slow
- Consider implementing page preloading
- Add a page range selector for very large documents

## Next Steps

1. ✅ Place your PDF in the correct location
2. ✅ Test the viewer thoroughly
3. 🔲 Add purchase verification (recommended)
4. 🔲 Add user-specific watermarking (optional)
5. 🔲 Set up analytics tracking (optional)
6. 🔲 Consider email delivery as backup access method

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify PDF file integrity
3. Test with a simple sample PDF first
4. Review the PDF.js documentation: https://mozilla.github.io/pdf.js/
