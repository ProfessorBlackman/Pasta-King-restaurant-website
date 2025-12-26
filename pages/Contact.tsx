
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center pb-0">
      {/* Hero */}
      <div className="w-full px-4 md:px-10 lg:px-40 py-5 flex justify-center max-w-[1200px] mx-auto">
        <div className="flex min-h-[320px] md:min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 relative overflow-hidden w-full"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLDQb_EFW_t8wxYRTsKg75ReoJ4bKNezCis9Z4INxQFA3tWI-mWI353craKeRzyGGC6V9gBBJMg6_fsgD2wT7jCRMvMuHaJwljPnSSa7jPzgDDeMARXw9gTVmxlaLz0lG5U88GVBpQsKX4Mj51D8Ein-SWl47e_TUkKwlgFI35n8WzRBNcb-piHpxFl94_f6TFK4A1orc5CvY3KzzHanqPL8mnOPnWLLUFsSgfQ4sRGVelHiUnyr0fPbVb4jCs5t_meNi-pFyuMq8O")` 
          }}
        >
          <div className="flex flex-col gap-4 text-center z-10 max-w-2xl">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">Get in Touch</h1>
            <p className="text-white/90 text-base md:text-lg font-medium leading-normal">
              Craving the best pasta in Ghana? We'd love to hear from you. Visit us or send us a message below.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-40 py-10 flex justify-center w-full">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-[#181411] text-[28px] font-bold leading-tight pb-6">Contact Information</h2>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Our Location', detail: '123 Osu Oxford Street\nAccra, Ghana', icon: 'location_on', link: 'Get Directions' },
                  { title: 'Phone Number', detail: '+233 55 555 5555', icon: 'call' },
                  { title: 'Email Address', detail: 'hello@pastaking.com.gh', icon: 'mail' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12">
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>
                    <div className="flex flex-col justify-center pt-1">
                      <p className="text-[#181411] text-base font-bold leading-normal">{item.title}</p>
                      <p className="text-[#897261] text-sm font-normal leading-normal mt-1 whitespace-pre-line">{item.detail}</p>
                      {item.link && (
                        <a href="#" className="text-primary text-sm font-semibold mt-2 hover:underline inline-flex items-center gap-1">
                          {item.link} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h3 className="text-lg font-bold">Operating Hours</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between"><span className="text-[#897261]">Monday - Saturday</span><span className="text-[#181411] font-bold">11:00 AM - 10:00 PM</span></li>
                <li className="flex justify-between"><span className="text-[#897261]">Sunday</span><span className="text-[#181411] font-bold">12:00 PM - 9:00 PM</span></li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-[#181411] text-[28px] font-bold leading-tight mb-2">Send us a Message</h2>
              <p className="text-[#897261] mb-8">We usually reply within 24 hours.</p>
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Your Name</label>
                    <input className="w-full bg-background-light border-transparent focus:border-primary focus:ring-primary rounded-lg h-12 px-4" placeholder="John Doe" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Email Address</label>
                    <input className="w-full bg-background-light border-transparent focus:border-primary focus:ring-primary rounded-lg h-12 px-4" placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Subject</label>
                  <select className="w-full bg-background-light border-transparent focus:border-primary focus:ring-primary rounded-lg h-12 px-4">
                    <option>General Inquiry</option>
                    <option>Reservation</option>
                    <option>Catering</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea className="w-full bg-background-light border-transparent focus:border-primary focus:ring-primary rounded-lg p-4 resize-none h-32" placeholder="How can we help you today?"></textarea>
                </div>
                <button className="mt-2 bg-primary hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Send Message <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="w-full h-[450px] mt-10 relative overflow-hidden">
        <iframe 
          title="Pasta King Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d3970.932230689456!2d-0.1834164!3d5.5555555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf90869165b4c5%3A0xc3f7a63d917f903a!2sOxford%20St%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1711234567890!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 pointer-events-none">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 leading-none mb-1">Visit Pasta King</span>
            <span className="text-xs text-gray-500 font-medium">Osu Oxford Street, Accra</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
