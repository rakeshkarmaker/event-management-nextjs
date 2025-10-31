import React from 'react'

const ContactForm = () => {
  return (
    <div className="max-w-4xl mx-auto sm:px-10 px-5 py-12">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-light-100">Contact Us</h1>
        <p className="text-sm text-light-200 mt-2">Have an idea or need help? Send us a message.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <aside className="lg:col-span-2 glass rounded-lg p-6 bg-dark-100">
          <h3 className="text-xl text-light-100 font-medium">Contact Information</h3>
          <p className="text-sm text-light-200 mt-2">We're happy to help — reach out using the details below.</p>

          <ul className="mt-6 space-y-4">
            <li className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-light-200 shrink-0" aria-hidden="true" focusable="false">
                <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" />
                <polygon points="3,8 12,14 21,8" fill="rgba(255,255,255,0.06)" />
              </svg>
              <a href="mailto:info@example.com" className="text-sm text-light-200">info@example.com</a>
            </li>

            <li className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-light-200 shrink-0" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9" fill="currentColor" />
                <rect x="10" y="7" width="2" height="6" fill="rgba(255,255,255,0.12)" />
              </svg>
              <a href="tel:+158996888" className="text-sm text-light-200">+158 996 888</a>
            </li>

            <li className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-light-200 shrink-0" aria-hidden="true" focusable="false">
                <circle cx="12" cy="9" r="3" fill="currentColor" />
                <rect x="11" y="12" width="2" height="6" fill="rgba(255,255,255,0.12)" />
              </svg>
              <span className="text-sm text-light-200">123 Street 256 House</span>
            </li>
          </ul>

          <div className="flex gap-3 mt-6">
            <a href="#" className="h-9 w-9 rounded-full bg-light-100/10 flex items-center justify-center text-light-100">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="h-9 w-9 rounded-full bg-light-100/10 flex items-center justify-center text-light-100">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="h-9 w-9 rounded-full bg-light-100/10 flex items-center justify-center text-light-100">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </a>
          </div>
        </aside>

        <main className="lg:col-span-3 bg-dark-100 glass rounded-lg p-6">
          <form>
            <div className="grid md:grid-cols-2 gap-4">
              <input aria-label="First Name" placeholder="First Name" className="px-3 py-2 bg-dark-200 text-light-100 rounded border border-dark-200 focus:ring-2 focus:ring-primary outline-none" />
              <input aria-label="Last Name" placeholder="Last Name" className="px-3 py-2 bg-dark-200 text-light-100 rounded border border-dark-200 focus:ring-2 focus:ring-primary outline-none" />
              <input aria-label="Phone" placeholder="Phone No." className="px-3 py-2 bg-dark-200 text-light-100 rounded border border-dark-200 focus:ring-2 focus:ring-primary outline-none" />
              <input aria-label="Email" placeholder="Email" className="px-3 py-2 bg-dark-200 text-light-100 rounded border border-dark-200 focus:ring-2 focus:ring-primary outline-none" />
              <textarea aria-label="Message" placeholder="Write Message" rows={5} className="col-span-full px-3 py-2 bg-dark-200 text-light-100 rounded border border-dark-200 focus:ring-2 focus:ring-primary outline-none"></textarea>
            </div>

            <div className="mt-4">
              <label className="text-sm text-light-100">Subject</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm text-light-200">
                  <input type="radio" name="subject" defaultChecked className="accent-primary" />
                  General Inquiry
                </label>
                <label className="flex items-center gap-2 text-sm text-light-200">
                  <input type="radio" name="subject" className="accent-primary" />
                  Technical Support
                </label>
                <label className="flex items-center gap-2 text-sm text-light-200">
                  <input type="radio" name="subject" className="accent-primary" />
                  Website Feedback
                </label>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded">
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" focusable="false">
                  <polygon points="2,12 22,2 13,22 9,13" fill="currentColor" />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default ContactForm