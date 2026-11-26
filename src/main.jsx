import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight,
  Camera, GraduationCap, MapPin, Menu, MessageCircle, Phone,
  Quote, Sparkles, Users, X
} from 'lucide-react'
import './styles.css'

const heroImage = '/fachada-paripe.jpeg'
const schoolImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85'

const navItems = [
  ['Início', '#inicio'], ['Sobre a escola', '#sobre'], ['Ensino', '#ensino'],
  ['Calendário', '#calendario'], ['Comunicados', '#comunicados'],
  ['Galeria', '#galeria'], ['Contato', '#contato'], ['Mural do aluno', '#mural']
]

const shortcuts = [
  { icon: Users, title: 'Sobre a escola', text: 'Nossa história e propósito', href: '#sobre' },
  { icon: Sparkles, title: 'Educação Infantil', text: 'Descobertas para crescer', href: '#ensino' },
  { icon: GraduationCap, title: 'Ensino Fundamental', text: 'Aprender para transformar', href: '#ensino' },
  { icon: CalendarDays, title: 'Calendário escolar', text: 'Datas e momentos importantes', href: '#calendario' },
  { icon: BookOpen, title: 'Galeria de fotos', text: 'Um pouco da nossa rotina', href: '#galeria' },
  { icon: MessageCircle, title: 'Fale conosco', text: 'Estamos aqui para ouvir', href: '#contato' },
]

const events = [
  { date: '20', month: 'NOV', title: 'Feriado nacional', text: 'Não haverá aula em virtude do feriado.' },
  { date: '03', month: 'DEZ', title: 'Encontro com as famílias', text: 'Um momento para compartilhar vivências e aprendizados.' },
  { date: '16', month: 'DEZ', title: 'Encerramento do ano letivo', text: 'Celebração das conquistas e do caminho percorrido.' },
]

const calendarEvents = {
  '2026-11-20': { title: 'Feriado nacional', type: 'feriado' },
  '2026-12-03': { title: 'Encontro com as famílias', type: 'familias' },
  '2026-12-16': { title: 'Encerramento do ano letivo', type: 'escola' },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNotice, setActiveNotice] = useState(0)
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)
  const [enrollmentSent, setEnrollmentSent] = useState(false)
  const [studentPortalOpen, setStudentPortalOpen] = useState(false)
  const [studentMode, setStudentMode] = useState('login')
  const [studentSent, setStudentSent] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 10, 1))

  const calendarYear = calendarDate.getFullYear()
  const calendarMonth = calendarDate.getMonth()
  const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay()
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
  const calendarCells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : index - firstWeekday + 1)
  const calendarLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(calendarDate)

  const changeMonth = (offset) => setCalendarDate(new Date(calendarYear, calendarMonth + offset, 1))
  const openEnrollment = (event) => {
    event.preventDefault()
    setEnrollmentSent(false)
    setEnrollmentOpen(true)
  }
  const openStudentPortal = (event) => {
    event.preventDefault()
    setMenuOpen(false)
    setStudentSent(false)
    setStudentPortalOpen(true)
  }

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Núcleo de Educação Paripe, início">
          <img className="brand-logo" src="/logo-neb.jpeg" alt="Logo do Núcleo de Educação Básica Paripe" />
          <span className="brand-name">Núcleo de<br /><strong>Educação Paripe</strong></span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          {navItems.map(([label, href], index) => <a className={index === 0 ? 'active' : ''} href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="header-contact" href="#mural">Mural do aluno <ArrowUpRight size={15} /></a>
          <button className="menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio" style={{ '--hero-image': `url(${heroImage})` }}>
          <div className="hero-content reveal">
            <p className="eyebrow light"><span className="eyebrow-line" />Bem-vindos ao Paripe</p>
            <h1>Educar é transformar<br /><em>o futuro.</em></h1>
            <p className="hero-subtitle">Um novo dia de descobertas começa aqui, com amor, respeito e muito aprendizado.</p>
            <a className="button button-light" href="#sobre">Conheça nossa escola <ArrowUpRight size={17} /></a>
          </div>
          <div className="hero-foot"><span>01</span><span className="hero-progress"><i /></span><span>Institucional</span></div>
        </section>

        <section className="notice-wrap" id="comunicados" aria-label="Comunicado importante">
          <div className="notice-icon"><CalendarDays size={19} /></div>
          <div className="notice-copy"><p>Comunicado importante</p><strong>{activeNotice === 0 ? 'Dia 20 de novembro não haverá aula em virtude do feriado.' : 'Confira os próximos momentos importantes da nossa comunidade.'}</strong></div>
          <a className="text-link" href="#calendario">Ver todos <ChevronRight size={17} /></a>
          <div className="notice-dots" aria-label="Navegar entre comunicados">
            {[0, 1].map((item) => <button key={item} className={activeNotice === item ? 'selected' : ''} aria-label={`Comunicado ${item + 1}`} onClick={() => setActiveNotice(item)} />)}
          </div>
        </section>

        <section className="section shortcuts-section" id="ensino">
          <div className="section-heading"><div><p className="eyebrow">Explore o Paripe</p><h2>Caminhos para<br /><em>cada descoberta.</em></h2></div><p className="heading-note">Tudo o que você precisa saber sobre a nossa escola, em um só lugar.</p></div>
          <div className="shortcut-grid">{shortcuts.map(({ icon: Icon, title, text, href }) => { const isEnrollment = title.includes('Infantil') || title.includes('Fundamental'); return <a className="shortcut-card" href={href} key={title} onClick={isEnrollment ? openEnrollment : undefined} aria-label={isEnrollment ? `${title}: abrir matrícula online` : title}><span className="card-icon"><Icon size={20} strokeWidth={1.6} /></span><span><strong>{title}</strong><small>{isEnrollment ? 'Acesse a matrícula online' : text}</small></span><ArrowUpRight className="card-arrow" size={17} /></a> })}</div>
        </section>

        <section className="section student-wall-section" id="mural">
          <div className="student-wall-intro"><p className="eyebrow">Área do estudante</p><h2>Seu espaço para<br /><em>acompanhar.</em></h2><p>Um mural pensado para aproximar o aluno da escola. Acesse seus comunicados e novidades com um cadastro simples e seguro.</p><span className="wall-note"><span className="wall-note-dot" />Acesso exclusivo para estudantes</span></div>
          <div className="student-wall-card">{studentSent ? <div className="wall-success"><span className="success-mark">✓</span><p className="eyebrow">Tudo certo</p><h3>{studentMode === 'login' ? 'Acesso recebido.' : 'Cadastro recebido.'}</h3><p>{studentMode === 'login' ? 'A autenticação será conectada ao sistema escolar quando o servidor estiver configurado.' : 'Seu cadastro foi registrado neste ambiente de demonstração.'}</p><button className="button button-dark" onClick={() => setStudentSent(false)}>Voltar ao acesso <ArrowUpRight size={17} /></button></div> : <><div className="wall-card-head"><div><span className="wall-kicker">Mural do aluno</span><h3>{studentMode === 'login' ? 'Boas-vindas de volta.' : 'Crie seu acesso.'}</h3></div><span className="wall-card-icon"><GraduationCap size={20} /></span></div><div className="portal-tabs" role="tablist"><button className={studentMode === 'login' ? 'active' : ''} role="tab" aria-selected={studentMode === 'login'} onClick={() => setStudentMode('login')}>Entrar</button><button className={studentMode === 'register' ? 'active' : ''} role="tab" aria-selected={studentMode === 'register'} onClick={() => setStudentMode('register')}>Cadastrar-se</button></div><form onSubmit={(event) => { event.preventDefault(); setStudentSent(true) }}><label>Nome completo<input required name="mural-nome" placeholder="Digite seu nome" /></label><label>Número de matrícula <span className="optional">(se houver)</span><input name="mural-matricula" placeholder="Ex.: 202600123" /></label><label>Senha<input required type="password" name="mural-senha" minLength="4" placeholder="Digite sua senha" /></label>{studentMode === 'register' && <label>Confirmar senha<input required type="password" name="mural-senha-confirmacao" minLength="4" placeholder="Repita sua senha" /></label>}<button className="button button-dark" type="submit">{studentMode === 'login' ? 'Entrar no mural' : 'Criar meu acesso'} <ArrowUpRight size={17} /></button></form></>}</div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="about-image-wrap"><img src={schoolImage} alt="Espaço acolhedor de uma escola" /><span className="image-label">Nossa escola<br /><strong>Um lugar para pertencer</strong></span></div>
          <div className="about-copy"><p className="eyebrow">Sobre o Núcleo</p><h2>Onde aprender<br />faz <em>sentido.</em></h2><p>O Núcleo de Educação Paripe acredita que a educação acontece no encontro: entre pessoas, ideias e possibilidades. Aqui, cada etapa é vivida com atenção, respeito e o cuidado que torna o aprendizado significativo.</p><p>Um espaço para desenvolver autonomia, curiosidade e confiança — todos os dias.</p><a className="button button-dark" href="#contato">Conheça nossa escola <ArrowUpRight size={17} /></a></div>
        </section>

        <section className="events-section" id="calendario">
          <div className="section events-inner"><div className="section-heading events-heading"><div><p className="eyebrow">Agenda Paripe</p><h2>Próximos<br /><em>momentos.</em></h2></div><div className="calendar-controls"><button aria-label="Mês anterior" onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button><strong>{calendarLabel}</strong><button aria-label="Próximo mês" onClick={() => changeMonth(1)}><ChevronRight size={16} /></button></div></div><div className="calendar-panel"><div className="calendar-weekdays">{['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{calendarCells.map((day, index) => { const key = day ? `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : `empty-${index}`; const dayEvent = day ? calendarEvents[key] : null; return <div className={`calendar-day ${dayEvent ? 'has-event' : ''}`} key={key}>{day && <><span className="day-number">{day}</span>{dayEvent && <span className={`day-event ${dayEvent.type}`}>{dayEvent.title}</span>}</>}</div> })}</div><div className="calendar-legend"><span><i className="legend-dot feriado" /> Feriado</span><span><i className="legend-dot familias" /> Família</span><span><i className="legend-dot escola" /> Escola</span></div></div><div className="events-list">{events.map((event) => <article className="event" key={event.date}><div className="event-date"><strong>{event.date}</strong><span>{event.month}</span></div><div className="event-info"><h3>{event.title}</h3><p>{event.text}</p></div><ChevronRight size={19} /></article>)}</div></div>
        </section>

        <section className="quote-section" id="galeria"><div className="quote-mark"><Quote size={22} /></div><blockquote>“A educação não transforma o mundo.<br />Educação muda as pessoas. Pessoas transformam o mundo.”</blockquote><p>— Paulo Freire</p></section>
      {enrollmentOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEnrollmentOpen(false)}><section className="enrollment-modal" role="dialog" aria-modal="true" aria-labelledby="enrollment-title"><button className="modal-close" aria-label="Fechar matrícula online" onClick={() => setEnrollmentOpen(false)}><X size={19} /></button>{enrollmentSent ? <div className="form-success"><span className="success-mark">✓</span><p className="eyebrow">Recebemos seu interesse</p><h2>Obrigado por escolher<br /><em>o Paripe.</em></h2><p>Em breve, nossa equipe entrará em contato para orientar os próximos passos da matrícula.</p><button className="button button-dark" onClick={() => setEnrollmentOpen(false)}>Voltar para o site <ArrowUpRight size={17} /></button></div> : <><p className="eyebrow">Primeiro passo</p><h2 id="enrollment-title">Matrícula<br /><em>online.</em></h2><p className="modal-intro">Preencha seus dados e conte para qual etapa você deseja receber informações.</p><form onSubmit={(event) => { event.preventDefault(); setEnrollmentSent(true) }}><label>Nome do responsável<input required name="responsavel" placeholder="Como podemos chamar você?" /></label><label>E-mail<input required type="email" name="email" placeholder="seuemail@exemplo.com" /></label><label>Etapa de interesse<select required name="etapa" defaultValue=""><option value="" disabled>Selecione uma etapa</option><option>Educação Infantil</option><option>Ensino Fundamental</option></select></label><label>Mensagem<textarea name="mensagem" rows="3" placeholder="Escreva uma dúvida ou observação (opcional)" /></label><button className="button button-dark" type="submit">Enviar interesse <ArrowUpRight size={17} /></button></form></>}</section></div>}
      {studentPortalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setStudentPortalOpen(false)}><section className="enrollment-modal student-modal" role="dialog" aria-modal="true" aria-labelledby="student-portal-title"><button className="modal-close" aria-label="Fechar mural do aluno" onClick={() => setStudentPortalOpen(false)}><X size={19} /></button>{studentSent ? <div className="form-success"><span className="success-mark">✓</span><p className="eyebrow">Tudo certo</p><h2>{studentMode === 'login' ? 'Acesso recebido.' : 'Cadastro recebido.'}</h2><p>{studentMode === 'login' ? 'A autenticação será conectada ao sistema escolar quando o servidor estiver configurado.' : 'Seu cadastro foi registrado neste ambiente de demonstração.'}</p><button className="button button-dark" onClick={() => setStudentPortalOpen(false)}>Voltar para o site <ArrowUpRight size={17} /></button></div> : <><p className="eyebrow">Área do estudante</p><h2 id="student-portal-title">Mural do<br /><em>aluno.</em></h2><div className="portal-tabs" role="tablist"><button className={studentMode === 'login' ? 'active' : ''} role="tab" aria-selected={studentMode === 'login'} onClick={() => setStudentMode('login')}>Entrar</button><button className={studentMode === 'register' ? 'active' : ''} role="tab" aria-selected={studentMode === 'register'} onClick={() => setStudentMode('register')}>Cadastrar-se</button></div><p className="modal-intro">{studentMode === 'login' ? 'Acesse o mural com seus dados de estudante.' : 'Crie seu acesso para acompanhar as novidades da escola.'}</p><form onSubmit={(event) => { event.preventDefault(); setStudentSent(true) }}><label>Nome completo<input required name="aluno-nome" placeholder="Digite seu nome" /></label><label>Número de matrícula <span className="optional">(se houver)</span><input name="aluno-matricula" placeholder="Ex.: 202600123" /></label><label>Senha<input required type="password" name="aluno-senha" minLength="4" placeholder="Digite sua senha" /></label>{studentMode === 'register' && <label>Confirmar senha<input required type="password" name="aluno-senha-confirmacao" minLength="4" placeholder="Repita sua senha" /></label>}<button className="button button-dark" type="submit">{studentMode === 'login' ? 'Entrar no mural' : 'Criar meu acesso'} <ArrowUpRight size={17} /></button></form></>}</section></div>}
      </main>

      <footer className="footer" id="contato"><div className="footer-top"><div className="footer-brand"><a className="brand brand-footer" href="#inicio"><img className="brand-logo" src="/logo-neb.jpeg" alt="Logo do Núcleo de Educação Básica Paripe" /><span className="brand-name">Núcleo de<br /><strong>Educação Paripe</strong></span></a><p>Um novo dia de descobertas<br />começa aqui.</p></div><div className="footer-column"><p className="footer-label">Navegue</p>{navItems.slice(1, 4).map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><div className="footer-column"><p className="footer-label">Fale conosco</p><a href="https://instagram.com" target="_blank" rel="noreferrer"><Camera size={15} /> Instagram</a><a href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a><a href="tel:+550000000000"><Phone size={15} /> Telefone</a></div><div className="footer-column"><p className="footer-label">Onde estamos</p><a href="#contato"><MapPin size={15} /> Localização da escola</a><p className="footer-muted">Entre em contato para<br />mais informações.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Núcleo de Educação Paripe</span><span>Feito com cuidado para educar.</span></div></footer>
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)

