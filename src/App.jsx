import React, { useState } from 'react';

export default function App(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function toggleMenu(){
    setMenuOpen(prev => !prev);
  }

  function handleKeyDown(e){
    if(e.key === 'Escape') setMenuOpen(false);
  }

  function handleSubmit(e){
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // POST to server; fallback to localStorage on error
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res=>{
      if(res.ok){
        setSent(true);
        form.reset();
        setTimeout(()=> setSent(false), 5000);
      } else {
        throw new Error('network');
      }
    }).catch(()=>{
      try{
        const key = 'pegasusContacts';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ id: Date.now(), ...data, createdAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
      }catch(e){ console.error(e) }
      setSent(true);
      form.reset();
      setTimeout(()=> setSent(false), 5000);
    });
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <a className="skip-link" href="#main">Перейти до контенту</a>

      <header className="header" role="banner">
        <div className="container navbar">
          <a href="#home" className="logo">Pegasus</a>

          <nav className="nav-links" id="desktop-menu" role="navigation" aria-label="Головне меню">
            <a href="#home">Головна</a>
            <a href="#history">Історія</a>
            <a href="#milestones">Філософія</a>
            <a href="#contact">Контакти</a>
          </nav>

          <button id="mobile-menu-button" className="mobile-menu-btn" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Відкрити меню" onClick={toggleMenu}>
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
          <div className="container mobile-menu-inner">
            <a href="#home" onClick={()=> setMenuOpen(false)}>Головна</a>
            <a href="#history" onClick={()=> setMenuOpen(false)}>Історія</a>
            <a href="#milestones" onClick={()=> setMenuOpen(false)}>Філософія</a>
            <a href="#contact" onClick={()=> setMenuOpen(false)}>Контакти</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero-section">
          <div className="container hero-content text-center">
            <h1 className="hero-title animate-fadeInUp">Спадщина швидкості. <span className="text-gradient">Інновації від Pegasus.</span></h1>
            <p className="hero-subtitle">Компанія, заснована на пристрасті до інженерії та бажанні переосмислити майбутнє автомобілебудування.</p>
            <div className="hero-actions">
              <a href="#history" className="pegasus-button">Дізнатися історію</a>
            </div>
          </div>
        </section>

        <section id="history" className="section-padding">
          <div className="container">
            <h2 className="section-title text-center">Наша Спадщина: Історія Заснування</h2>
            <div className="grid-3-cols">
              <article className="card" aria-labelledby="card1-title">
                <div className="card-icon" aria-hidden="true">🔆</div>
                <h3 id="card1-title" className="card-title">1940: Зародження Ідеї</h3>
                <p className="card-text">Геній-інженер Альфред Пегасі на задньому дворі своєї майстерні сформулював концепцію "ідеального автомобіля", поєднуючи продуктивність і елегантність.</p>
              </article>

              <article className="card" aria-labelledby="card2-title">
                <div className="card-icon" aria-hidden="true">⚙️</div>
                <h3 id="card2-title" className="card-title">1952: Народження Моделі "А"</h3>
                <p className="card-text">Після п'яти років таємних розробок, було представлено перший ходовий прототип Pegasus — зразок витонченої ручної роботи та передових для свого часу двигунів.</p>
              </article>

              <article className="card" aria-labelledby="card3-title">
                <div className="card-icon" aria-hidden="true">🏁</div>
                <h3 id="card3-title" className="card-title">1955: Офіційний Старт</h3>
                <p className="card-text">Компанія Pegasus була офіційно зареєстрована, розпочавши обмежене виробництво своєї першої серійної моделі та заявивши про себе як про гравця у світі розкоші та продуктивності.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="milestones" className="section-padding">
          <div className="container text-center">
            <h2 className="section-title">Філософія</h2>
            <p className="hero-subtitle"><strong>Ручна майстерність</strong>, <strong>технологічна перевага</strong> та <strong>увага до деталей</strong>.</p>
            <a href="#contact" className="pegasus-button">Обговорити майбутнє</a>
          </div>
        </section>

        <section id="contact" className="section-padding">
          <div className="container">
            <h2 className="section-title text-center">Зв'яжіться з Нами</h2>
            <div className="contact-form-wrapper card">
              <form onSubmit={handleSubmit} className="contact-form">
                <label className="form-label" htmlFor="name">Ваше Ім'я</label>
                <input id="name" name="name" required />

                <label className="form-label" htmlFor="email">Електронна Пошта</label>
                <input id="email" name="email" type="email" required />

                <label className="form-label" htmlFor="message">Повідомлення</label>
                <textarea id="message" name="message" rows={4} required />

                <button className="pegasus-button" type="submit">Надіслати Запит</button>

                <div id="contact-message" className="contact-message" role="status" aria-live="polite" hidden={!sent}>Дякуємо! Ваш запит щодо історії або співпраці отримано.</div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container footer-content">
          <div className="footer-logo">
            <span className="logo">Pegasus</span>
            <p className="muted">Крок уперед у світі автомобілебудування.</p>
          </div>
          <nav className="footer-links" aria-label="Посилання футера">
            <a href="#home">Головна</a>
            <a href="#history">Історія</a>
            <a href="#milestones">Філософія</a>
            <a href="#contact">Контакти</a>
            <a href="/messages.html">Переглянути повідомлення</a>
          </nav>
          <p className="copyright">&copy; 2025 Pegasus Automotive. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
