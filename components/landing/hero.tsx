export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(1.05) contrast(1.02)' }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
