interface FooterProps {
  showSocial?: boolean;
}

export function Footer({ showSocial = true }: FooterProps) {
  const socialLinks = [
    { 
      name: 'TikTok', 
      iconUrl: '/images/@lucasmarinho_Tiktok.svg',
      url: 'https://tiktok.com/@lucasmarinho' 
    },
    { 
      name: 'Instagram', 
      iconUrl: '/images/@lucasmarinho_Instagram.svg',
      url: 'https://instagram.com/lucasmarinho' 
    },
    { 
      name: 'YouTube', 
      iconUrl: '/images/Lucas_Youtube.svg',
      url: 'https://youtube.com/@lucasmarinho1' 
    },
    { 
      name: 'Vimeo', 
      iconUrl: '/images/Lucas_Marinho_Vimeo.svg',
      url: 'https://vimeo.com/lucasmarinho' 
    },
  ];

  return (
    <footer className="py-16 md:py-24 px-4 md:px-9">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Contact Section */}
        <div>
          <h3 className="mb-6" style={{ color: '#000000' }}>
            e-mail para contato comercial:
          </h3>
          <a
            href="mailto:contato@lucasmarinho.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: '#000000', 
              color: '#ffffff',
              transformOrigin: 'center center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
              const icon = e.currentTarget.querySelector('.email-icon') as HTMLElement;
              if (icon) icon.style.filter = 'invert(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.color = '#ffffff';
              const icon = e.currentTarget.querySelector('.email-icon') as HTMLElement;
              if (icon) icon.style.filter = 'invert(0)';
            }}
          >
            <img 
              src="/images/Lucas_Marinho_Contato.svg"
              alt=""
              className="email-icon"
              draggable={false}
              style={{
                width: '25px',
                height: '25px',
                display: 'block',
                transition: 'filter 0.3s ease',
                filter: 'invert(0)',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            />
            <span style={{ display: 'block', lineHeight: '1.25rem' }}>contato@lucasmarinho.com</span>
          </a>
        </div>

        {/* Social Media Section */}
        {showSocial && (
        <div>
          <h3 className="mb-8" style={{ color: '#000000' }}>
            me encontre por aí
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social) => {
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: '#000000',
                    transformOrigin: 'center center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    width: '44px',
                    height: '44px',
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: 'scale(1)',
                    willChange: 'transform'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                    if (icon) icon.style.filter = 'invert(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.transform = 'scale(1)';
                    const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                    if (icon) icon.style.filter = 'invert(0)';
                  }}
                  aria-label={social.name}
                >
                  <img 
                    src={social.iconUrl} 
                    alt=""
                    className="social-icon"
                    draggable={false}
                    style={{
                      width: '20px',
                      height: '20px',
                      display: 'block',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'filter 0.3s ease',
                      filter: 'invert(0)',
                      margin: 0,
                      padding: 0,
                      border: 'none',
                      outline: 'none',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </footer>
  );
}
