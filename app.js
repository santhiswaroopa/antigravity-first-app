// Page navigation
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(5,8,16,0.98)';
  } else {
    nav.style.background = 'rgba(5,8,16,0.85)';
  }
});

// Supabase Config
const SUPABASE_URL = 'https://oxqfnkqrvxvbasebsyrw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cWZua3Fydnh2YmFzZWJzeXJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODEyNTk1NSwiZXhwIjoyMDkzNzAxOTU1fQ.CRf3OYbYUqVBTq9leZDRdO_xrm9hLFg6GC22YP9JtlA';

// Contact form
async function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('form-success');
  
  const formData = {
    name: document.getElementById('fname').value,
    email: document.getElementById('femail').value,
    subject: document.getElementById('fsubject').value,
    message: document.getElementById('fmessage').value
  };

  btn.textContent = 'Sending...';
  btn.disabled = true;
  successMsg.style.display = 'none';

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send message');
    }

    successMsg.style.display = 'block';
    successMsg.textContent = '✅ Message sent! We\'ll get back to you soon.';
    successMsg.style.color = '#4ade80';
    e.target.reset();
  } catch (error) {
    console.error('Error:', error);
    successMsg.style.display = 'block';
    successMsg.textContent = '❌ Error: ' + error.message;
    successMsg.style.color = '#f87171';
  } finally {
    btn.textContent = 'Send Message 🚀';
    btn.disabled = false;
  }
}

// Animate cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .team-card, .service-card, .about-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
