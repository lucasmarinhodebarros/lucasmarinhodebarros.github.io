import { useEffect, useState, memo, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RotatingText } from "./RotatingText";
import { VideoSection } from "./VideoSection";
import { Footer } from "./Footer";

interface HomePageProps {
  gradientPosition: number;
  scrollY: number;
}

export const HomePage = memo(function HomePage({
  gradientPosition,
  scrollY,
}: HomePageProps) {
  const phrases = useMemo(
    () => [
      "criador de conteúdo",
      "diretor criativo",
      "produtor audiovisual",
      "editor de vídeo",
    ],
    [],
  );

  const videos = useMemo(
    () => [
      {
        id: 1,
        videoUrl: "https://www.youtube.com/watch?v=hFjUTCV2yXU",
      },
      {
        id: 2,
        videoUrl: "https://www.youtube.com/watch?v=RsgQQdE1Iho",
      },
      {
        id: 3,
        videoUrl: "https://www.youtube.com/watch?v=aFTk0wbgp2g",
      },
      {
        id: 4,
        videoUrl: "https://vimeo.com/833324996",
      },
    ],
    [],
  );

  // Calculate scroll progress for name animation (0 to 1)
  const scrollProgress = Math.min(scrollY / 500, 1); // Animate over first 500px of scroll

  // Calculate transform values based on scroll
  const nameScale = 1 - scrollProgress * 0.85; // Scale from 1 to 0.15
  const nameOpacity =
    scrollProgress < 0.8 ? 1 : 1 - (scrollProgress - 0.8) / 0.2;

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-9">
        <div className="text-center space-y-4 md:space-y-6">
          {/* Main name - This will be hidden as it animates to navbar */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
            style={{
              opacity: nameOpacity,
              transform: `scale(${nameScale})`,
              color: "#000000",
            }}
          >
            Lucas Marinho
          </motion.h1>

          {/* Rotating phrases */}
          <motion.div
            className="text-xl"
            style={{
              opacity: nameOpacity,
              color: "#444444",
            }}
          >
            <RotatingText phrases={phrases} interval={2500} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="pt-12 md:pt-16 animate-bounce"
            style={{
              opacity: nameOpacity,
            }}
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 mx-auto"
              style={{ color: "#444444" }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Video Sections */}
      <VideoSection videoUrl={videos[0].videoUrl} index={0}>
        <h2 className="text-lg">showreel — 2025</h2>
        <p
          className="max-w-xl mx-auto text-sm"
          style={{ color: "rgba(68, 68, 68, 0.9)" }}
        >
          Coleção de diferentes projetos do qual participei, mostrando minhas principais habilidades em filmmaking, montagem e motion graphics.
        </p>
      </VideoSection>

      <VideoSection videoUrl={videos[1].videoUrl} index={1}>
        <h2 className="text-lg">maratona de criação — 2024</h2>
        <p
          className="max-w-xl mx-auto text-sm"
          style={{ color: "rgba(68, 68, 68, 0.9)" }}
        >
          Cobertura de um dos maiores eventos da ESPM que ocorre anualmente feito pelo antigo núcleo audiovisual Newronio ESPM, hub do Arenas ESPM.
        </p>
      </VideoSection>

      <VideoSection videoUrl={videos[2].videoUrl} index={2}>
        <h2 className="text-lg" style={{ color: "#000000" }}>
          por ela — 2024
        </h2>
        <p
          className="max-w-xl mx-auto text-sm"
          style={{ color: "rgba(68, 68, 68, 0.9)" }}
        >
          Curta-metragem de comédia sobre uma jovem tentando superar um término de uma forma inusitada.
        </p>
      </VideoSection>

      <VideoSection videoUrl={videos[3].videoUrl} index={3}>
        <h2
          className="text-lg"
          style={{ color: "#000000", fontWeight: 800 }}
        >
          outro qualquer — 2023
        </h2>
        <p
          className="max-w-xl mx-auto text-sm"
          style={{ color: "rgba(68, 68, 68, 0.9)" }}
        >
          Videoarte de animação 2D que retrata a repetição das tarefas cotidianas e o desgaste da criação.
        </p>
      </VideoSection>

      {/* Footer */}
      <Footer />
    </>
  );
});