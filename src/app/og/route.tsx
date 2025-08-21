import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hantao Zhou
      </div>
    ),
    size,
  )
}
