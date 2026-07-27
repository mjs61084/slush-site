type MarketingImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function AppScreenshot({
  src,
  alt,
  className,
  sizes = "(max-width: 650px) 68vw, 360px",
  priority = false,
}: MarketingImageProps) {
  const base = src.replace(/\.png$/, "");
  return <img className={className} src={`${base}.webp`} srcSet={`${base}-604.webp 604w, ${base}.webp 1206w`} sizes={sizes} width="1206" height="2622" alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}

export function BrixleyImage({
  alt,
  className,
  sizes = "160px",
  priority = false,
}: Omit<MarketingImageProps, "src">) {
  return <img className={className} src="/brixley.webp" srcSet="/brixley-512.webp 512w, /brixley.webp 1024w" sizes={sizes} width="1024" height="1024" alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
