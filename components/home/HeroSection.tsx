export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: 'url(/uploads/HR.jpeg)' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Join Our Mission
        </h1>
        <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
          We're building the future of technology, and we need passionate people like you to help us make it happen.
        </p>
      </div>
    </section>
  );
}