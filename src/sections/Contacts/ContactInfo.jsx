export default function ContactInfo() {
  const contactMethods = [
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Email Us",
      value: "genecraft001@gmail.com",
      action: "mailto:support@e-learn.com",
      description: "Get quick responses within 24 hours"
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: "Call Us",
      value: "+234 9034829264",
      action: "tel:+12345678900",
      description: "Mon-Fri, 9am-5pm EST"
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: "Visit Us",
      value: "Kemta, Idi-aba Abeokuta, Ogun State Nigeria",
      action: "https://www.google.com/maps/place/Idi-aba,+Abeokuta,+Ogun+State,+Nigeria/@7.1441448,3.3691281,1063m/data=!3m2!1e3!4b1!4m6!3m5!1s0x103a4bb62acf183d:0xd4fe4ebecaa2287f!8m2!3d7.1441448!4d3.3717084!16s%2Fg%2F11g_rs05h?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
      description: "Schedule a visit to our headquarters"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              Contact Information
              <span className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multiple ways to reach out to our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <a 
              key={index} 
              href={method.action} 
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.title}</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-3">{method.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{method.description}</p>
            </a>
          ))}
        </div>

      
      </div>
    </section>
  );
}