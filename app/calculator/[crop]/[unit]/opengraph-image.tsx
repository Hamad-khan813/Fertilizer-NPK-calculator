import { ImageResponse } from 'next/og'

interface Props {
  params: Promise<{
    crop: string;
    unit: string;
  }>;
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function OGImage({ params }: Props) {
  const resolvedParams = await params;
  const { crop, unit } = resolvedParams;
  
  return new ImageResponse(
    (
      <div style={{ 
        background: '#166534', 
        width: '1200px', 
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '64px',
        fontWeight: 'bold'
      }}>
        <div>🌱 Ferti-Calc</div>
        <div style={{ fontSize: '36px', marginTop: '20px' }}>
          {slugToLabel(crop)} Calculator — {unit.toLowerCase()}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
