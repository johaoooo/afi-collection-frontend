import React from 'react';

function PageHero({ title, subtitle, description, bgImage, bgColor }) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div 
        className={`relative rounded-3xl overflow-hidden shadow-xl min-h-[280px] flex items-center justify-center ${bgColor || 'bg-gradient-to-br from-afi-green/20 to-afi-green/5'}`}
        style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className={`absolute inset-0 ${bgImage ? 'bg-black/40' : ''} rounded-3xl`}></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-4">
            <span>Accueil</span><span>/</span><span className="text-afi-yellow">{title}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-afi-yellow italic text-xl md:text-2xl mb-4">{subtitle}</p>
          )}
          {description && (
            <p className="text-white/90 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHero;
