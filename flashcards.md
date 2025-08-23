---
layout: page
title: Flashcards
permalink: /flashcards/
---

<div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-family: 'Inter', sans-serif; color: #333; margin-bottom: 10px;">Study Your Drugs!</h2>
    <p style="font-family: 'Inter', sans-serif; color: #555;">Interact with our simple flashcard application below.</p>
</div>

<div style="width: 100%; height: 800px; max-width: 1200px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <iframe
        src="{{ "/flashcards-app.html" | relative_url }}"
        style="width: 100%; height: 100%; border: none;"
        title="Drug Flashcards App"
        allowfullscreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    ></iframe>
</div>

<style>
  @media (max-width: 768px) {
    div[style*="height: 800px"] {
      height: 600px !important;
    }
  }
</style>
