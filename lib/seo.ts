import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const fullUrl = `${baseUrl}${url}`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const metadata: Metadata = {
    title: title || 'Servido - Ta plateforme de services',
    description: description || 'Découvrez Servido, votre plateforme de services moderne et innovante.',
    keywords: keywords.length > 0 ? keywords : ['servido', 'services', 'plateforme'],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: type || 'website',
      url: fullUrl,
      title: title ? `${title} | Servido` : 'Servido - Ta plateforme de services',
      description: description || 'Découvrez Servido, votre plateforme de services moderne et innovante.',
      siteName: 'Servido',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'Servido',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Servido` : 'Servido - Ta plateforme de services',
      description: description || 'Découvrez Servido, votre plateforme de services moderne et innovante.',
      images: [imageUrl],
    },
  }

  return metadata
}

