export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">ACCESSIBILITY</h1>
      <div className="w-16 h-1 bg-paracord mb-10 rounded" />

      <div className="space-y-8 text-offwhite/90">
        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Our Commitment</h2>
          <p className="leading-relaxed">
            Off Road Paracord is committed to ensuring digital accessibility for people of all
            abilities. We are continually improving the user experience for everyone and applying
            the relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Accessibility Standards</h2>
          <p className="leading-relaxed">
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
            standards. These guidelines explain how to make web content more accessible for
            people with disabilities and more user-friendly for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Accessibility Features</h2>
          <p className="leading-relaxed mb-4">Our website includes the following accessibility features:</p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li>Clear and consistent navigation</li>
            <li>Descriptive alt text for images</li>
            <li>Sufficient color contrast for readability</li>
            <li>Keyboard-accessible interactive elements</li>
            <li>Responsive design for various devices and screen sizes</li>
            <li>Clear heading structure for screen readers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Assistive Technology</h2>
          <p className="leading-relaxed">
            Our website is designed to be compatible with assistive technologies, including
            screen readers, screen magnifiers, and voice recognition software. We regularly
            test our site with various assistive technologies to ensure compatibility.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Ongoing Efforts</h2>
          <p className="leading-relaxed">
            We are constantly working to improve the accessibility of our website. As we
            identify areas for improvement or receive feedback, we will make updates to
            enhance the experience for all users.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Feedback</h2>
          <p className="leading-relaxed">
            We welcome your feedback on the accessibility of our website. If you encounter
            any accessibility barriers or have suggestions for improvement, please let us know:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sand mt-4">
            <li>
              Email:{' '}
              <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">
                contactoffroadparacord@gmail.com
              </a>
            </li>
          </ul>
          <p className="leading-relaxed mt-4">
            We try to respond to feedback within 2 business days.
          </p>
        </section>

        <section className="bg-forest-light p-6 rounded-xl border border-sage">
          <h2 className="text-offwhite font-bold text-lg mb-2">Need Assistance?</h2>
          <p className="text-sand">
            If you need assistance with any part of our website or ordering process,
            please don&apos;t hesitate to contact us. We&apos;re here to help.
          </p>
        </section>

        <p className="text-sand text-sm pt-4">
          Last updated: February 2026
        </p>
      </div>
    </div>
  );
}
