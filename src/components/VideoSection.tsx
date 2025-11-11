import { useEffect, useRef, useState, memo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Skeleton } from "./ui/skeleton";

interface VideoSectionProps {
  videoUrl: string;
  index: number;
  children: React.ReactNode;
}

// Helper function to extract video ID and platform from URL
function parseVideoUrl(url: string): { embedUrl: string; videoId: string; platform: "youtube" | "vimeo" } | null {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        embedUrl: `https://www.youtube.com/embed/${match[1]}`,
        videoId: match[1],
        platform: "youtube"
      };
    }
  }
  
  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/
  ];
  
  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        embedUrl: `https://player.vimeo.com/video/${match[1]}`,
        videoId: match[1],
        platform: "vimeo"
      };
    }
  }
  
  return null;
}

export const VideoSection = memo(function VideoSection({
  videoUrl,
  index,
  children,
}: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  // Parse the video URL to get embed URL
  const videoData = parseVideoUrl(videoUrl);
  const embedUrl = videoData?.embedUrl || "";
  const videoId = videoData?.videoId || "";
  const platform = videoData?.platform || "youtube";

  // Get high-quality thumbnail
  useEffect(() => {
    if (!videoId) return;

    if (platform === "youtube") {
      // Use a cascade approach to get the best quality thumbnail
      const tryThumbnail = (urls: string[], index = 0) => {
        if (index >= urls.length) {
          setThumbnailUrl(urls[0]); // Fallback to first URL
          return;
        }

        const img = new Image();
        img.onload = () => {
          // Check if it's a valid high-res image (width > 120px means it's not the placeholder)
          if (img.naturalWidth > 120) {
            setThumbnailUrl(urls[index]);
          } else {
            tryThumbnail(urls, index + 1);
          }
        };
        img.onerror = () => {
          tryThumbnail(urls, index + 1);
        };
        img.src = urls[index];
      };

      // Try in order: maxresdefault (1920x1080), sddefault (640x480), hqdefault (480x360)
      tryThumbnail([
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      ]);
    } else if (platform === "vimeo") {
      // Use oembed API for better quality
      fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=1920`)
        .then(res => res.json())
        .then(data => {
          if (data && data.thumbnail_url) {
            // Vimeo oembed returns high quality thumbnails
            // Replace size parameters to get maximum quality
            const highQualityUrl = data.thumbnail_url.replace(/_\d+x\d+/, '_1920x1080');
            setThumbnailUrl(highQualityUrl);
          }
        })
        .catch(() => {
          // Fallback to old API
          fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
            .then(res => res.json())
            .then(data => {
              if (data && data[0]) {
                // Try to get the largest available thumbnail
                const thumb = data[0].thumbnail_large || data[0].thumbnail_medium || data[0].thumbnail_small;
                if (thumb) {
                  setThumbnailUrl(thumb);
                }
              }
            })
            .catch(() => setThumbnailUrl(""));
        });
    }
  }, [videoId, platform]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different animation values based on index for variety
  const isEven = index % 2 === 0;

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isEven ? -3 : 3, 0, isEven ? 3 : -3],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.0, 0.8],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-[40vh] md:min-h-[80vh] flex items-center justify-center px-8 md:px-8 py-1 md:py-12"
    >
      <motion.div
        className="w-full max-w-3xl md:max-w-3xl space-y-4 md:space-y-6"
        style={{ y, opacity }}
      >
        <motion.div
          className="space-y-2 md:space-y-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>

        <motion.div
          className="aspect-video w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl relative"
          style={{ rotate, scale }}
          whileHover={{ scale: 1.02, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        >
          {/* High-quality thumbnail with loading state */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-10">
              {thumbnailUrl ? (
                <>
                  <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                    onLoad={() => setThumbnailLoaded(true)}
                    style={{
                      opacity: thumbnailLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                      imageRendering: 'high-quality'
                    }}
                    loading="eager"
                    decoding="async"
                  />
                  {!thumbnailLoaded && (
                    <Skeleton className="w-full h-full rounded-none absolute inset-0" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      <p className="text-sm text-white drop-shadow-lg">Carregando vídeo...</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0">
                  <Skeleton className="w-full h-full rounded-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      <p className="text-sm" style={{ color: '#666666' }}>Carregando vídeo...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <iframe
            src={embedUrl}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            onLoad={() => setIsVideoLoaded(true)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
});
