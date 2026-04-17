export function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-video {
          animation: hero-fade-in 1.2s ease-out forwards;
        }
      `}</style>

      <section className="relative w-full h-screen min-h-screen overflow-hidden">
        {/* Full-screen video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero-video absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(1.1) contrast(1.02)' }}
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Bottom fade — blends into page background, doesn't dim the video */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0A0E27)' }}
        />
      </section>
    </>
  );
}
