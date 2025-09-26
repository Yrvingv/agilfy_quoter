import React from "react";

const WA_PHONE = "5493813594194"; // internacional sin "+"
const waText = (label = "cotizador") =>
  `Hola Agilfy, quiero ver la demo del Cotizador (AAgroQuoter). [${label}]`;
const waHref = (label) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waText(label))}`;

function Rotator({ items, interval = 1600 }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items, interval]);
  return <span className="rotator">{items[i]}</span>;
}

// ----- Carousel -----
const CARDS = [
  { src: `${import.meta.env.BASE_URL}img1.webp`, caption: "Bandejas por rol" },
  { src: `${import.meta.env.BASE_URL}img2.webp`, caption: "Aprobaciones claras" },
  { src: `${import.meta.env.BASE_URL}img3.webp`, caption: "Importar desde Excel" },
  { src: `${import.meta.env.BASE_URL}img4.webp`, caption: "PDF listo para enviar" },
];
function Carousel(){
  const [idx, setIdx] = React.useState(0);
  const next = React.useCallback(()=> setIdx(v => (v+1)%CARDS.length), []);
  const prev = React.useCallback(()=> setIdx(v => (v-1+CARDS.length)%CARDS.length), []);
  React.useEffect(()=>{
    const id = setInterval(next, 2600);
    return ()=> clearInterval(id);
  }, [next]);
  return (
    <section className="section carousel">
      <div className="track" style={{transform:`translateX(calc(50% - ${(idx+0.5)*320}px))`}}>
        {CARDS.map((c,i)=> (
          <article className="card floaty" key={i} style={{animationDelay:`${i*0.3}s`}}>
            <img src={c.src} alt={c.caption} />
            <div className="cap">
              <b>{c.caption}</b>
              <p style={{color:"var(--muted)", margin:"6px 0 0"}}>Vista previa de la funcionalidad.</p>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-cta">
        <button className="btn btn-ghost" onClick={prev}>◀</button>
        <button className="btn btn-ghost" onClick={next}>▶</button>
      </div>
    </section>
  )
}

// ----- Steps -----
const STEPS = [
  { n: 1, title: "Estimador crea", desc: "Carga ítems, cantidades y precios." },
  { n: 2, title: "Entra en bandeja", desc: "La cotización queda EN PROCESO." },
  { n: 3, title: "Aprobador revisa", desc: "Aprueba o rechaza con comentarios." },
  { n: 4, title: "Envío al cliente", desc: "PDF ordenado + registro del estado." },
];
function AnimatedSteps() {
  const total = STEPS.length;
  const [visible, setVisible] = React.useState(1);
  React.useEffect(() => {
    const id = setInterval(() => setVisible((v) => (v >= total ? 1 : v + 1)), 1100);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="steps">
      {STEPS.map((s, idx) => {
        const isShown = idx < visible;
        const just = idx === visible - 1;
        return (
          <div
            key={s.n}
            className="step"
            style={{
              opacity: isShown ? 1 : 0.35,
              borderColor: just ? "var(--blue)" : "var(--line)",
              boxShadow: just ? "0 0 26px rgba(79,125,255,.25)" : "none",
              transition: "all .3s ease",
              minHeight: 160,
            }}
          >
            <div className="step-num">{s.n}</div>
            <h4 style={{ margin: "0 0 6px" }}>{s.title}</h4>
            <p style={{ margin: 0, color: "var(--muted)" }}>{s.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ----- Plan card -----
function Plan({ badge, name, price, period="/mes", bullets, ctaLabel, ctaTag }) {
  return (
    <div className="plan">
      {badge ? <div className="badge">{badge}</div> : null}
      <h4>{name}</h4>
      <div className="price">USD {price} <span className="period">{period}</span></div>
      <ul className="features">
        {bullets.map((b,i)=>(<li key={i}>{b}</li>))}
      </ul>
      <a className="btn btn-primary" href={waHref(ctaTag)} target="_blank" rel="noreferrer">{ctaLabel}</a>
    </div>
  );
}

export default function App(){
  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="page wrap">
          <div className="brand"><span className="bolt" />Agilfy — Cotizador</div>
          <div className="menu">
            <a className="btn btn-ghost" href="#video">Video</a>
            <a className="btn btn-ghost" href="#flujo">Flujo</a>
            <a className="btn btn-ghost" href="#precios">Precios</a>
            <a className="btn btn-primary" href={waHref("nav_demo")} target="_blank" rel="noreferrer">Probar demo</a>
          </div>
        </div>
      </nav>

      <header className="page hero">
        <p className="kicker">¿Te pasa que <Rotator items={["se mezclan versiones?", "perdés horas refaccionando?", "las aprobaciones se frenan?", "no queda registro de cambios?"]} /> </p>
        <h1 className="title">SaaS de <span className="accent">cotizaciones</span> para obras y servicios técnicos</h1>
        <p className="subtitle">
          De Excel a enviado en minutos. Flujo simple Estimador → Aprobador → Cliente. 
          <b> Instancia dedicada en VPS por cliente.</b> Vendemos primero; migrás después.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary btn-lg" href={waHref("hero_cta")} target="_blank" rel="noreferrer">Quiero la demo</a>
          <a className="btn btn-ghost btn-lg" href="#precios">Ver precios</a>
        </div>

        <div className="strip">
          <div className="kpi"><span className="kpi-num">-60%</span><span className="kpi-label">tiempo armando cotizaciones</span></div>
          <div className="kpi"><span className="kpi-num">+100%</span><span className="kpi-label">trazabilidad de cambios</span></div>
          <div className="kpi"><span className="kpi-num">24 h</span><span className="kpi-label">de Excel a la 1ra cotización</span></div>
        </div>
      </header>

      {/* Carousel */}
      <div className="page">
        <Carousel/>
      </div>

      {/* Founder video — NOT full width; side content */}
      <section id="video" className="page section">
        <div className="twocol">
          <div className="media">
            <video controls playsInline poster={`${import.meta.env.BASE_URL}poster-founder.png`}>
              <source src={`${import.meta.env.BASE_URL}founder-video.mp4`} type="video/mp4" />
            </video>
          </div>
          <div className="bullets">
            <h3>Lo que vas a ver en el video</h3>
            <ul>
              <li>Cómo pasás de Excel a cotizaciones ordenadas.</li>
              <li>Flujo Estimador → Aprobador → Cliente.</li>
              <li>Qué incluye cada plan y cómo arrancar hoy.</li>
            </ul>
            <div style={{marginTop:12}}>
              <a className="btn btn-primary" href={waHref("video_agendar")} target="_blank" rel="noreferrer">Agendar demo 1:1</a>
              <a className="btn btn-outline" href="#precios" style={{marginLeft:8}}>Ir a precios</a>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo + bullets */}
      <section id="flujo" className="page section">
        <div className="twocol" style={{gridTemplateColumns:".9fr 1.1fr"}}>
          <div className="bullets">
            <h3>¿Qué resuelve?</h3>
            <ul>
              <li>Bandejas por rol: <b>Estimador</b> y <b>Aprobador</b>.</li>
              <li>Estado claro: EN PROCESO → APROBADA → ENVIADA.</li>
              <li>Importación desde Excel: productos, clientes, proveedores.</li>
              <li>Control de stock (alertas de faltantes).</li>
              <li>PDF ordenado para enviar al cliente.</li>
            </ul>
            <h3 style={{marginTop:14}}>Beneficios</h3>
            <ul>
              <li>Velocidad: plantilla tipo Excel sin complicaciones.</li>
              <li>Orden: historial y trazabilidad.</li>
              <li>Colaboración: comentarios al aprobar o rechazar.</li>
            </ul>
          </div>
          <div className="media">
            <img src={`${import.meta.env.BASE_URL}cotizador-flujo.png`} alt="Flujo Estimador → Aprobador → Cliente" />
          </div>
        </div>
      </section>

      {/* Proceso animado */}
      <section className="page section process">
        <h2>Así funciona</h2>
        <AnimatedSteps />
        <div style={{display:"flex",justifyContent:"center",marginTop:16,gap:8}}>
          <a className="btn btn-primary btn-lg" href={waHref("proceso_reservar")} target="_blank" rel="noreferrer">Reservar demo</a>
          <a className="btn btn-ghost btn-lg" href="#precios">Ver precios</a>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="page section">
        <h2 style={{textAlign:"center",marginBottom:10}}>Precios simples</h2>
        <p className="subtitle" style={{marginBottom:16}}>
          14 días de prueba sin tarjeta. -20% pagando anual. Instancia dedicada en VPS por cliente.
        </p>
        <div className="pricing">
          <Plan
            name="Starter"
            price="19"
            badge="Entrada fácil"
            bullets={[
              "1 empresa, 2 usuarios",
              "50 cotizaciones/mes",
              "Hasta 1.000 productos",
              "PDF con marca Agilfy",
              "Soporte por email"
            ]}
            ctaLabel="Comenzar prueba"
            ctaTag="pricing_starter"
          />
          <Plan
            name="Pro"
            price="49"
            badge="Más vendido"
            bullets={[
              "1 empresa, 5 usuarios",
              "Cotizaciones ilimitadas",
              "Plantillas por rubro",
              "Historial + bandeja Aprobador",
              "Exportar Excel/CSV, WhatsApp/Email",
              "PDF sin marca"
            ]}
            ctaLabel="Probar Pro"
            ctaTag="pricing_pro"
          />
          <Plan
            name="Team"
            price="99"
            bullets={[
              "3 sucursales, 15 usuarios",
              "Aprobaciones en 2 niveles",
              "Listas de precios por cliente",
              "Estados/etiquetas personalizadas",
              "API básica"
            ]}
            ctaLabel="Solicitar Team"
            ctaTag="pricing_team"
          />
          <Plan
            name="White-label / Partner"
            price="199"
            period="/mes + USD 400 onboarding"
            bullets={[
              "Dominio propio y branding",
              "Ocultar marca Agilfy",
              "Límites ampliados",
              "SLA 99,5%",
              "Ideal para estudios/contratistas"
            ]}
            ctaLabel="Hablar con ventas"
            ctaTag="pricing_partner"
          />
        </div>
      </section>

      {/* FAQ extendida */}
      <section className="page section faq">
        <h2>Preguntas frecuentes</h2>
        <div className="faq-grid">
          <details open>
            <summary>¿Cómo es el despliegue si compro?</summary>
            <p>Te damos una <b>instancia dedicada en VPS</b> con tu dominio opcional. Onboarding express y quedás operando en 24–48 h.</p>
          </details>
          <details>
            <summary>¿Puedo importar Excel?</summary>
            <p>Sí. Productos, clientes y proveedores se cargan desde Excel y luego podés actualizar precios.</p>
          </details>
          <details>
            <summary>¿Qué roles existen?</summary>
            <p>Estimador crea/edita; Aprobador revisa y aprueba/rechaza. El envío al cliente queda registrado.</p>
          </details>
          <details>
            <summary>¿Puedo personalizar el PDF?</summary>
            <p>Sí, se admite logo y formato de tabla. Seguiremos mejorando estilos y alineaciones.</p>
          </details>
          <details>
            <summary>¿Y si quiero mi instancia fuera del multi-tenant?</summary>
            <p>Este modelo ya es instancia dedicada por cliente. Si querés migrar a infraestructura propia, ofrecemos plan de transición con fee único.</p>
          </details>
          <details>
            <summary>¿Tienen integración con facturación/ERP?</summary>
            <p>No en V1. Exportás CSV/Excel y conectamos por API básica en el plan Team o superior.</p>
          </details>
        </div>
      </section>

      {/* CTA final */}
      <section className="page section" style={{textAlign:"center"}}>
        <h3 style={{marginBottom:8}}>Listo para dejar el Excel atrás</h3>
        <p className="subtitle" style={{margin:"0 auto 14px"}}>Arrancá con la prueba gratis y te migramos el catálogo básico.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <a className="btn btn-primary btn-lg" href={waHref("cta_final")} target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
          <a className="btn btn-ghost btn-lg" href="#video">Ver video</a>
        </div>
      </section>

      <footer className="page footer">
        <span>© {new Date().getFullYear()} Agilfy</span>
        <a href="https://yrvingv.github.io/agilfy_ai/" target="_blank" rel="noreferrer">
          <img className="footer-logo" src={`${import.meta.env.BASE_URL}logo-agilfy.svg`} alt="Agilfy" />
        </a>
      </footer>
    </div>
  )
}
