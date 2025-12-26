
import React, { useState } from 'react';

const Reservations: React.FC = () => {
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState('5');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });

  const times = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

  const days = [
    { d: 'S', n: '29', disabled: true },
    { d: 'M', n: '30', disabled: true },
    { d: 'T', n: '1' },
    { d: 'W', n: '2' },
    { d: 'T', n: '3' },
    { d: 'F', n: '4' },
    { d: 'S', n: '5' },
    { d: 'S', n: '6' },
    { d: 'M', n: '7' },
  ];

  const handleSubmit = () => {
    const reservation = { guests, selectedDate, selectedTime, ...formData };
    localStorage.setItem('lastReservation', JSON.stringify(reservation));
    alert('Reservation Confirmed!');
  };

  return (
    <div className="w-full bg-[#f8f7f6] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Info and Perks */}
        <div className="lg:w-[320px] shrink-0">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 mb-8">
            <div className="relative aspect-square">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVyjOxlM8kKFWtHdIAze-YJeA-8Xy7ryl-fcWr_Rc6Z68-zWo7kMpFba5oC09ttYXu8efjxU4fPB65GeCssCZhzbwb4fQA5stpWIFx4O5Ia5MGZSIX6LhgWxLeHTZRdY8opm7scrkm3Tjp0uIm73TIzEtyBWUn-QG0Hq8PkVaxKP4_0jySpIGnsjl8r8gwjYd7EsYA7WCgFEBjii715laEGoadcvR_q9ZENUUJfp6AbUL63gU7lp_Ue1X3j2Bc1gzVCQz1MJlRSdky" className="w-full h-full object-cover" alt="Reserve" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h1 className="text-white text-3xl font-black mb-1">Reserve Your Throne</h1>
                <p className="text-white/80 text-xs font-medium uppercase tracking-widest">Experience the best fusion pasta in Ghana.</p>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <h3 className="flex items-center gap-2 font-black text-primary text-xs uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-[20px]">restaurant</span> Why Book Direct?
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Instant confirmation via email & SMS',
                  'Special seating requests priority',
                  'Direct modification of booking'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                    <span className="text-sm text-gray-600 font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400">Need help? Call us at +233 55 123 4567</p>
        </div>

        {/* Right Side: Flow */}
        <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-12">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between mb-16 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -translate-y-1/2 z-0"></div>
            {[
              { n: '1', l: 'Details' },
              { n: '2', l: 'Time' },
              { n: '3', l: 'Info' }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 relative z-10 bg-white px-4">
                <div className={`size-8 rounded-full flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {s.n}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-primary' : 'text-gray-400'}`}>{s.l}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            {/* Step 1 */}
            <section className="flex flex-col gap-6">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">1. Date & Guests</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-gray-50 rounded-2xl p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 block">Party Size</span>
                  <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="material-symbols-outlined">group</span>
                      <span className="font-bold text-sm text-gray-900">Guests</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="size-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="text-xl font-black text-gray-900 w-4 text-center">{guests}</span>
                      <button onClick={() => setGuests(guests + 1)} className="size-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 border border-gray-100 rounded-2xl p-6">
                   <div className="flex items-center justify-between mb-6">
                     <button className="text-gray-400"><span className="material-symbols-outlined">chevron_left</span></button>
                     <p className="font-black text-sm uppercase tracking-widest">October 2023</p>
                     <button className="text-gray-400"><span className="material-symbols-outlined">chevron_right</span></button>
                   </div>
                   <div className="grid grid-cols-7 gap-2 text-center">
                     {days.map((day, idx) => (
                       <div key={idx} className="flex flex-col gap-3 items-center">
                         <span className="text-[10px] font-bold text-gray-300 uppercase">{day.d}</span>
                         <button 
                          disabled={day.disabled}
                          onClick={() => setSelectedDate(day.n)}
                          className={`size-10 rounded-full flex items-center justify-center text-sm font-black transition-all ${day.disabled ? 'text-gray-200 cursor-not-allowed' : selectedDate === day.n ? 'bg-primary text-white shadow-lg' : 'text-gray-900 hover:bg-gray-50'}`}
                         >
                           {day.n}
                         </button>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </section>

            {/* Step 2 */}
            <section className="flex flex-col gap-6">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">2. Select Time</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="material-symbols-outlined text-[16px]">wb_twilight</span> Dinner Service
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`h-12 rounded-xl border-2 font-black text-sm transition-all ${selectedTime === t ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                  <button disabled className="h-12 rounded-xl border-2 border-dashed border-gray-100 text-gray-200 font-black text-sm cursor-not-allowed">20:30</button>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section className="flex flex-col gap-8">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">3. Contact Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">First Name</label>
                  <input type="text" placeholder="Kwame" className="h-14 rounded-xl bg-gray-50 border-gray-100 focus:ring-primary focus:border-primary px-6 font-medium" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Last Name</label>
                  <input type="text" placeholder="Mensah" className="h-14 rounded-xl bg-gray-50 border-gray-100 focus:ring-primary focus:border-primary px-6 font-medium" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                    <input type="email" placeholder="kwame@example.com" className="w-full h-14 rounded-xl bg-gray-50 border-gray-100 focus:ring-primary focus:border-primary pl-14 pr-6 font-medium" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">call</span>
                    <input type="tel" placeholder="+233 20 123 4567" className="w-full h-14 rounded-xl bg-gray-50 border-gray-100 focus:ring-primary focus:border-primary pl-14 pr-6 font-medium" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Special Requests (Optional)</label>
                  <textarea placeholder="Allergies, high chair needed, anniversary..." className="w-full h-32 rounded-xl bg-gray-50 border-gray-100 focus:ring-primary focus:border-primary p-6 font-medium resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Confirmation */}
            <div className="mt-8 bg-gray-50 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
              <div className="flex flex-col gap-1 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reservation Summary</span>
                <p className="text-2xl font-black text-gray-900">
                  {guests} Guests <span className="text-gray-200 mx-2">•</span> Oct {selectedDate}, 2023 <span className="text-gray-200 mx-2">•</span> {selectedTime}
                </p>
              </div>
              <button 
                onClick={handleSubmit}
                className="bg-primary text-white h-16 px-10 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
              >
                Confirm Reservation <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
