'use client';

interface HeroVideoProps {
  title?: string;
  subtitle?: string;
}

const HeroVideo = ({
  title = 'OFF-ROAD PARACORD',
  subtitle = 'Handcrafted Grab Handles for the Trail',
}: HeroVideoProps) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-forest m-0 p-0">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 1 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(45, 54, 46, 0.5)', zIndex: 2 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ zIndex: 3 }}>
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-offwhite tracking-widest drop-shadow-lg whitespace-nowrap">
          {title}
        </h1>
        <div className="w-20 h-1 bg-paracord my-6 rounded" />
        <p className="text-xs sm:text-lg md:text-xl text-sand font-semibold tracking-wider uppercase whitespace-nowrap">
          {subtitle}
        </p>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to top, #2D362E, transparent)', zIndex: 4 }}
      />
    </section>
  );
};

export default HeroVideo;
