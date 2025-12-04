import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      
      {/* Newsletter / CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Plan your trip with Bharat Yatra and experience the magic of India like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-white/50 w-full"
              suppressHydrationWarning
            />
            <button 
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
              suppressHydrationWarning
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
