---
layout: page
title: Email
permalink: /email/
description: He lies Paul; he did email
---
<form
  action="https://formspree.io/f/xknkengj"
  method="POST"
  style="display: flex; flex-direction: column; max-width: 500px; gap: 1rem;"
>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label for="email">Your Email:</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
    >
  </div>

  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label for="subject">Subject:</label>
    <input 
      type="text" 
      id="subject" 
      name="subject" 
      required 
      style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
    >
  </div>

  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label for="message">Your Message:</label>
    <textarea 
      id="message" 
      name="message" 
      required 
      rows="5" 
      style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"
    ></textarea>
  </div>

  <button 
    type="submit" 
    style="
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    "
    onmouseover="this.style.backgroundColor='#0056b3'"
    onmouseout="this.style.backgroundColor='#007bff'"
  >
    Send Message
  </button>
</form>