import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Testimonial.css'

;

const testimonials = [
  {
    quote: "This bookstore has everything I need to fuel my passion for reading. Highly recommended!",
    name: "Alice Johnson",
    image: "https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M=",
  },
  {
    quote: "I love the curated selection of books here. The staff is also super friendly and helpful!",
    name: "John Doe",
    image: "https://www.zoho.com/inventory/case-study/images/maxime-loiselle.jpg",
  },
  {
    quote: "A wonderful experience! I always find hidden gems every time I visit this store.",
    name: "Emily Smith",
    image: "https://www.shutterstock.com/image-photo/realistic-photo-testimonial-image-person-260nw-2545006221.jpg",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="testimonial-slider">
      <h2 className="testimonial-title">What Our Readers Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s testimonial`}
              className="testimonial-image"
            />
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <h4 className="testimonial-name">- {testimonial.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
