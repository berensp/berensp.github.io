---
layout: page
title: Email me
permalink: /email/
description: ⚰ Here lies Paul; he did email.
---
If you can promise you're not an evil AI bot posing as a human, feel free to drop me an electronic mail:

<form
  action="https://formspree.io/f/xknkengj"
  method="POST"
  style="display: flex; flex-direction: column; max-width: 500px; gap: 1rem;"
>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <input 
      type="email" 
      style=" 
       font-size: 1em;
       padding: 0.5rem; 
       border: 1px solid #ccc; 
       border-radius: 4px;
       "
      id="email" 
      name="email" 
      placeholder="Your email addie" 
      required 
      style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
    >
  </div>

  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <textarea 
      id="message" 
      name="message" 
      placeholder="Your remark or query or market dislocation tip here" 
      required 
      rows="5" 
      style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"
    ></textarea>
  </div>

  <button 
    type="submit" 
    style="
      font-size: 1em;
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