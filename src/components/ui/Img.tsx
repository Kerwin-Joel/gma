import { useState, type ImgHTMLAttributes } from "react";

const EO = "cubic-bezier(0.16,1,0.3,1)";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  duration?: number;
  /** Si se provee, la imagen solo se muestra cuando está cargada Y visible=true */
  visible?: boolean;
}

export function Img({ style, duration = 600, visible, loading = "lazy", decoding = "async", ...props }: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const show = visible !== undefined ? (loaded && visible) : loaded;
  return (
    <img
      loading={loading}
      decoding={decoding}
      {...props}
      onLoad={() => setLoaded(true)}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms ${EO}`,
      }}
    />
  );
}
