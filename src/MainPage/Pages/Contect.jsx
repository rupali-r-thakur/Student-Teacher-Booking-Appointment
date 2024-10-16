import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import "./Contect.css";

function Contect() {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      emailjs.sendForm('service_yszqelc', 'template_5czy3s7', form.current, 'G-iSEQ80ZF0Tn1p0W')
        .then(
          () => {
            console.log('SUCCESS!');
            setFormData({
              name: "",
              email: "",
              message: ""
            });
            setErrors({});
          },
          (error) => {
            console.error('FAILED...', error.text);
          }
        );
    }
  };

  return (
    <div id="contact" className="contact_page_main_container">
      <div className="contact_content">
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us using the form below.
        </p>
        <form ref={form} onSubmit={handleSubmit} className="contact_form">
          <div className="form_group">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error_message">{errors.name}</span>}
          </div>
          <div className="form_group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error_message">{errors.email}</span>}
          </div>
          <div className="form_group">
            <label htmlFor="message">Message : </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
            />
            {errors.message && <span className="error_message">{errors.message}</span>}
          </div>
          <button type="submit" className="submit_button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contect;
