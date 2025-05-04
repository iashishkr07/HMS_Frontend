import React from 'react';
import '../index.css';

const Testimonials = () => {
  const testimonials = [
    { 
      name: "Shokil Hossain",
      quote: "Lorem ipsum dolor sit amet consectetur elit adipiscing. Aliquam nec suscipit turpis, vel pretium eros."
    },
    { 
      name: "Naimur Rahman",
      quote: "Lorem ipsum dolor sit amet consectetur elit adipiscing. Aliquam nec suscipit turpis, vel pretium eros."
    },
    { 
      name: "Ruhtayed Sokib",
      quote: "Lorem ipsum dolor sit c consecetur elet odipis noc suscipit turpis, vel pretium eros."
    },
    { 
      name: "Suspring Toni",
      quote: "Screented copied to clipboard automatically saved to screenplots folder."
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Patients Say About Our Medical Treatments</h2>
          <p>Lorem ipsum dolor sit amet consectetur elit adipiscing. Aliquam nec suscipit turpis, vel pretium eros.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;