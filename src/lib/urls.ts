const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  `http://localhost:${process.env.PORT ?? 3000}`;

/**
 * Get the base URL of the application
 */
export function getBaseUrl(): string {
  return baseUrl;
}

/**
 * Get the URL of the image, if the image is a relative path, it will be prefixed with the base URL
 * @param image - The image URL
 * @returns The URL of the image
 */
export function getImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `${getBaseUrl()}${image}`;
  }
  return `${getBaseUrl()}/${image}`;
}
