export default function ContactForm() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Send Us a Message</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg"
              >
                Send Message
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block relative h-full rounded-xl overflow-hidden shadow-xl">
          <img 
            src="https://cdn.pixabay.com/photo/2025/08/04/05/50/ai-generated-9753235_1280.jpg" 
            alt="Customer support team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 to-blue-400/30 flex items-end p-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Our Support Team</h3>
              <p className="text-white/90">
                Our dedicated team is ready to assist you with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}