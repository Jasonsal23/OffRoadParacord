import Image from 'next/image';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/tacoma.jpg"
          alt="Off Road Paracord - Jason"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-forest/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-offwhite tracking-widest drop-shadow-lg">OUR STORY</h1>
          <p className="mt-4 text-lg font-semibold text-offwhite bg-paracord/90 px-4 py-2 rounded-full tracking-wide">
            Veteran Owned & Operated
          </p>
          <div className="w-16 h-1 bg-offwhite mt-6 rounded shadow-lg" />
        </div>
      </section>

      {/* Story Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Intro */}
          <div className="text-center">
            <p className="text-sand text-sm uppercase tracking-widest mb-2">Handcrafted in</p>
            <h2 className="text-paracord font-bold text-2xl tracking-wider mb-4">
              Las Vegas, Nevada, USA
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/jason.png"
                alt="Jason - Owner of Off Road Paracord"
                width={100}
                height={100}
                className="rounded-full border-2 border-paracord object-cover"
              />
            </div>
            <p className="text-offwhite/90 leading-relaxed text-lg">
              Hello! I&apos;m Jason, the owner and craftsman behind Off Road Paracord. Our small
              business is driven by a dedication to quality, precision, and service—values
              that are at the core of everything we create.
            </p>
          </div>

          <div>
            <h2 className="text-paracord font-bold text-xl tracking-wider mb-4">
              FROM SERVICE TO CRAFTSMANSHIP
            </h2>
            <p className="text-offwhite/90 leading-relaxed">
              Our journey began not just from a love for off-roading, but from a deeper desire
              to make a tangible impact on people&apos;s daily lives. After serving in the military,
              I learned the profound importance of reliability and putting others&apos; needs first.
              When I transitioned out of service, I wanted to find a way to continue that mission.
            </p>
          </div>

          <div>
            <h2 className="text-paracord font-bold text-xl tracking-wider mb-4">
              OUR MISSION
            </h2>
            <p className="text-offwhite/90 leading-relaxed">
              That is why I founded Off Road Paracord: to provide custom, heavy-duty accessories
              that genuinely help simplify life and enhance the adventure for truck, Jeep, and
              SUV owners.
            </p>
          </div>

          {/* Veteran Badge */}
          <div className="bg-forest-light border border-sage rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-paracord rounded-full mb-4">
              <svg className="w-8 h-8 text-offwhite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-offwhite font-bold text-xl mb-2">Proudly Veteran Owned & Operated</h3>
            <p className="text-sand">
              Every single grab handle and accessory is hand-made with pride right here in Las Vegas.
            </p>
          </div>

          {/* Quote Section */}
          <blockquote className="bg-sage/30 p-8 rounded-xl border-l-4 border-paracord">
            <p className="text-offwhite text-lg italic leading-relaxed mb-4">
              &quot;When you purchase from us, you&apos;re not just getting a durable, custom
              product—you are supporting a veteran entrepreneur committed to bringing military-grade
              dedication and quality craftsmanship to your vehicle.&quot;
            </p>
            <cite className="text-sand font-semibold">— Jason, Founder</cite>
          </blockquote>

          <div>
            <h2 className="text-paracord font-bold text-xl tracking-wider mb-4">
              THANK YOU
            </h2>
            <p className="text-offwhite/90 leading-relaxed">
              Thank you for being a part of our story and allowing us to continue our mission
              of service, one paracord handle at a time!
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-offwhite tracking-wider">OUR VALUES</h2>
          <div className="w-16 h-1 bg-paracord mx-auto mt-4 mb-10 rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '01', title: 'Quality First', desc: 'Military-grade materials and craftsmanship in every product' },
              { num: '02', title: 'Made to Order', desc: 'Every item is custom handcrafted specifically for you' },
              { num: '03', title: 'Service Driven', desc: 'Putting your needs first, just like in the service' },
              { num: '04', title: 'Built to Last', desc: 'Heavy-duty accessories that withstand any adventure' },
            ].map((value) => (
              <div
                key={value.num}
                className="bg-forest-light p-6 rounded-xl border border-sage text-left"
              >
                <span className="text-paracord text-3xl font-bold">{value.num}</span>
                <h3 className="text-offwhite font-bold text-lg mt-2 mb-2">{value.title}</h3>
                <p className="text-sand text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-paracord rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-offwhite tracking-wider mb-4">
            READY TO UPGRADE YOUR RIG?
          </h2>
          <p className="text-offwhite/90 mb-6">
            Browse our collection of handcrafted paracord grab handles and accessories.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-forest hover:bg-forest-light text-offwhite font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Shop Our Collection
          </Link>
        </div>
      </section>
    </>
  );
}
