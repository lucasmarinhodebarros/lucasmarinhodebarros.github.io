import { motion } from 'motion/react';
import { Footer } from './Footer';
import { LazyImage } from './LazyImage';

export function AboutPage() {
  return (
    <>
      <div className="min-h-screen px-4 md:px-9 pt-24 md:pt-32">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl md:text-4xl"
            style={{ color: '#000000' }}
          >
            sobre mim
          </motion.h1>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 md:mb-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl flex-shrink-0"
          >
            <LazyImage
              src="/images/lucas-marinho.jpg"
              alt="Lucas Marinho"
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 space-y-4"
          >
            {/*<h2 style={{ color: '#000000', fontWeight: 800 }}>Lucas Marinho</h2>*/}
            <p style={{ color: '#444444' }}>
              Lucas Marinho é um artista e estudante de Cinema e Audiovisual na ESPM. Apaixonado por produção em vídeo, começou a criar conteúdo para suas redes sociais desde novo, @lucasmarinho no Instagram e Tiktok. Lucas Marinho possui DRT de ator, modelo e dublador, e soma seus conhecimentos de interpretação com suas produções audiovisuais.
            </p>
            <p style={{ color: '#444444' }}>
              Explorando diferentes linguagens e estéticas, Lucas busca trazer uma sensibilidade criativa junto do marketing de influência nas mídias digitais.
            </p>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <h3 className="mb-6 text-center" style={{ color: '#000000' }}>o que eu faço</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "edição de vídeo", description: "conto histórias por meio de uma pós-produção de qualidade (color grading, motion graphics, montagem ou finalização)" },
              { title: "direção criativa", description: "conduzo visões criativas do conceito à execução final focado nos detalhes e voltado para a geração z" },
              { title: "fotografia", description: "capturo memórias por meio da fotografia e videomaking, seja um conteúdo para as redes ou linha editorial" }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-lg"
              >
                <h4 className="mb-2" style={{ color: '#000000' }}>{skill.title}</h4>
                <p style={{ color: '#444444' }}>{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
