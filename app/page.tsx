import HeroSection from "@/components/home/HeroSection";
import { Card } from "@/components/ui/card";
import { Code2, Users2, Rocket, Shield, Building2, HandshakeIcon } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Trusted Protection",
      description: "Providing comprehensive insurance solutions across Europe for over 25 years."
    },
    {
      icon: Users2,
      title: "Customer First",
      description: "Dedicated team of experts committed to exceptional service and support."
    },
    {
      icon: Building2,
      title: "European Coverage",
      description: "Present in 15+ European countries with localized insurance solutions."
    }
  ];

  return (
    <main>
      <HeroSection />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About EuroSecure Insurance</h2>
            <p className="text-lg text-muted-foreground">
              Since 1998, EuroSecure Insurance has been at the forefront of providing innovative insurance solutions across Europe. 
              Our commitment to excellence and customer satisfaction has made us one of the most trusted names in the industry.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We strive to provide peace of mind through comprehensive insurance solutions that protect what matters most to our clients. 
                Our innovative approach combines traditional insurance expertise with modern technology to deliver superior service.
              </p>
              <ul className="space-y-4">
                {[
                  "Comprehensive coverage across personal and business insurance",
                  "24/7 customer support in multiple languages",
                  "Fast and fair claims processing",
                  "Innovative digital solutions for policy management"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/uploads/office-building.jpeg"
                alt="EuroSecure Insurance Headquarters"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Our Presence</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <p>European Countries</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <p>Satisfied Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}