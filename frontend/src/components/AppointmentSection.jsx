import React from 'react'

function AppointmentSection() {
    return (
        <section className="bg-gray-100 py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                {/* LEFT BIG CARD */}
                <div className="bg-[#e7c8b2] rounded-2xl p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Simple & easy way to find your dream Appointment
                    </h2>

                    <p className="text-gray-700 mb-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-lg w-fit">
                        Get Started
                    </button>
                </div>

                {/* RIGHT GRID */}
                <div className="grid grid-cols-2 gap-4">

                    {/* CARD 1 */}
                    <div className="bg-[#e9d7cc] p-6 rounded-xl">
                        <div className="text-orange-500 text-2xl mb-3">⟳</div>
                        <h3 className="font-semibold text-lg">Search your location</h3>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-[#e9d7cc] p-6 rounded-xl">
                        <div className="text-orange-500 text-2xl mb-3">👁</div>
                        <h3 className="font-semibold text-lg">Visit Appointment</h3>
                    </div>

                    {/* CARD 3 */}
                    <div className="bg-[#e9d7cc] p-6 rounded-xl">
                        <div className="text-orange-500 text-2xl mb-3">🏠</div>
                        <h3 className="font-semibold text-lg">Get your dream house</h3>
                    </div>

                    {/* CARD 4 */}
                    <div className="bg-[#e9d7cc] p-6 rounded-xl">
                        <div className="text-orange-500 text-2xl mb-3">😊</div>
                        <h3 className="font-semibold text-lg">Enjoy your Appointment</h3>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AppointmentSection