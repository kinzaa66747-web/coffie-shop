import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Coffee,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { galleryImages, products } from './data'

const money = (amount) => `Rs. ${amount.toLocaleString('en-PK')}`
const navigation = [
  ['Home', '#home'],
  ['Our story', '#about'],
  ['Menu', '#menu'],
  ['Our coffee', '#coffee'],
  ['Journal', '#gallery'],
  ['Visit us', '#contact'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function Logo({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#home" aria-label="Aroma Coffee home">
      <span className="brand-mark"><Coffee size={18} strokeWidth={1.6} /></span>
      <span className="brand-copy">
        <strong>AROMA</strong>
        <small>COFFEE HOUSE</small>
      </span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, copy, centered = false }) {
  return (
    <motion.div
      className={`section-heading ${centered ? 'text-center' : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <span className="eyebrow"><span />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  )
}

function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="announcement">
        <span>Small batch. Big-hearted.</span>
        <span className="announcement-divider" />
        <span>Complimentary delivery on orders over Rs. 2,500</span>
        <a href="#menu">Explore our menu <ArrowRight size={13} /></a>
      </div>
      <div className="nav-wrap">
        <a className="mobile-menu-toggle" href="#menu" onClick={(event) => {
          event.preventDefault()
          setMenuOpen((open) => !open)
        }} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <MenuIcon size={21} />}
        </a>
        <Logo />
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button cart-trigger" onClick={onOpenCart} aria-label={`Open cart, ${cartCount} items`}>
            <ShoppingBag size={19} strokeWidth={1.6} />
            <span className="cart-count">{cartCount}</span>
          </button>
          <a className="button button-dark nav-order" href="#menu">Order Now <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" role="img" aria-label="A fresh cup of coffee on a sunlit café table" />
      <div className="hero-grain" />
      <div className="hero-content">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="hero-kicker"><span className="kicker-line" /> A little ritual, a lot of heart</span>
          <h1>Where Every Sip<br />Tells a <em>Story</em></h1>
          <p>Thoughtfully sourced beans. Hands that know their craft.<br className="desktop-break" /> A slower, lovelier kind of coffee.</p>
          <div className="hero-actions">
            <a href="#menu" className="button button-light">Explore Menu <ArrowDownRight size={16} /></a>
            <a href="#about" className="text-link">Get to know us <ArrowRight size={15} /></a>
          </div>
        </motion.div>
      </div>
      <div className="hero-note">
        <span className="note-star"><Sparkles size={14} /></span>
        <span>Made slowly.<br />Loved daily.</span>
      </div>
      <a className="scroll-cue" href="#about"><span>Scroll to discover</span><ArrowDown size={15} /></a>
      <div className="hero-index">01 <span /> 04</div>
    </section>
  )
}

function Story() {
  return (
    <section className="story section-pad" id="about">
      <div className="story-visual">
        <motion.div
          className="story-main-image"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1100&q=85"
            alt="Our barista pouring a heart into every cup"
            loading="lazy"
          />
        </motion.div>
        <div className="story-stamp"><span>GOOD COFFEE</span><Coffee size={25} /><span>GOOD COMPANY</span></div>
        <div className="story-caption"><span>01 — The art of slowing down</span><ArrowDownRight size={17} /></div>
      </div>
      <div className="story-copy">
        <SectionHeading
          eyebrow="A little about us"
          title={<>Not just coffee.<br /><em>A feeling.</em></>}
          copy="Aroma began with one simple thought: what if your daily coffee felt like the best part of your day?"
        />
        <p className="story-body">In 2018, we opened a little corner café with a big love for good beans and good people. Today, that same love goes into every cup — from the farms we partner with to the last swirl of milk. No shortcuts. Just honest coffee, made with care.</p>
        <a href="#coffee" className="underlined-link">A little more about our craft <ArrowRight size={15} /></a>
        <div className="stats">
          <div><strong>12<span>k+</span></strong><small>happy hellos</small></div>
          <div><strong>18</strong><small>beautiful origins</small></div>
          <div><strong>06</strong><small>years of slow coffee</small></div>
        </div>
      </div>
      <div className="combo-note">
        <span className="combo-icon"><Coffee size={18} /></span>
        <span className="combo-copy"><strong>The slow morning duo</strong><small>Any two coffees + a freshly baked pastry</small></span>
        <span className="combo-saving">Save 15%</span>
        <a href="#menu" aria-label="Explore coffee for the slow morning duo">Find your favourites <ArrowRight size={14} /></a>
      </div>
    </section>
  )
}

function MenuSection({ onAddToCart }) {
  const [filter, setFilter] = useState('All coffee')
  const filters = ['All coffee', 'Hot Coffee', 'Cold Coffee', 'Special Drinks']
  const visibleProducts = filter === 'All coffee' ? products : products.filter((product) => product.category === filter)

  return (
    <section className="menu-section section-pad" id="menu">
      <div className="menu-top">
        <SectionHeading
          eyebrow="The good stuff"
          title={<>Made for your<br /><em>kind of day.</em></>}
          copy="Familiar favourites, new little obsessions. Every cup made to order, just for you."
        />
        <a className="menu-side-note" href="#contact"><span className="round-arrow"><ArrowUpRight size={17} /></span><span>Not sure what<br />to order? Say hello.</span></a>
      </div>
      <div className="filter-bar" role="group" aria-label="Filter coffee by category">
        <div className="filter-tabs">
          {filters.map((item) => (
            <button key={item} className={`filter-tab ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>
              {item}<span>{item === 'All coffee' ? products.length : products.filter((product) => product.category === item).length}</span>
            </button>
          ))}
        </div>
        <span className="filter-note"><Sparkles size={13} /> Always freshly made</span>
      </div>
      <motion.div className="product-grid" layout>
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((product) => (
            <motion.article className="product-card" key={product.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.28 }}>
              <div className="product-photo">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-info">
                <div className="product-title"><h3>{product.name}</h3><span>{money(product.price)}</span></div>
                <p>{product.description}</p>
                <button className="add-button" onClick={() => onAddToCart(product)}><span>Add to your day</span><span className="add-circle"><Plus size={16} /></span></button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="menu-footer"><span>Good things take time. So does our coffee.</span><a href="#contact">Come have a cup <ArrowRight size={15} /></a></div>
    </section>
  )
}

function CoffeeStory() {
  return (
    <section className="coffee-story" id="coffee">
      <div className="coffee-story-image" role="img" aria-label="Freshly roasted coffee beans" />
      <div className="coffee-story-content">
        <span className="eyebrow eyebrow-light"><span /> From the farm, with love</span>
        <h2>Good coffee<br />starts <em>somewhere.</em></h2>
        <p>With the people who grow it. We work with small farms who care for their land, their harvest, and the hands that pick every bean.</p>
        <div className="origin-note"><div className="origin-icon"><MapPin size={17} /></div><div><strong>Our current pour</strong><span>Huila, Colombia · 1,650m altitude</span></div><span className="origin-tasting">Caramel · Fig · Orange</span></div>
        <a href="#gallery" className="button button-outline-light">A look behind the cup <ArrowUpRight size={15} /></a>
      </div>
      <div className="coffee-story-number">02 / OUR ORIGINS</div>
    </section>
  )
}

function Offer() {
  return (
    <section className="offer section-pad">
      <div className="offer-card">
        <div className="offer-copy">
          <span className="eyebrow"><span /> A little something for you</span>
          <h2>Good coffee<br />is better <em>together.</em></h2>
          <p>Bring your favourite person. Your second cup is on us, every weekday from 2–5 pm.</p>
          <a href="#menu" className="button button-dark">Find your two cups <ArrowRight size={15} /></a>
          <small className="offer-terms">One complimentary drink with any drink purchase · Mon–Fri</small>
        </div>
        <div className="offer-art">
          <div className="offer-image"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85" alt="Two friends sharing a slow coffee moment" loading="lazy" /></div>
          <div className="offer-seal"><span>GOOD<br />THINGS</span><strong>2<small>×</small>1</strong><span>ARE BETTER<br />SHARED</span></div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="gallery-heading">
        <SectionHeading eyebrow="Little moments at Aroma" title={<>The lovely<br /><em>in-between.</em></>} copy="A peek into the everyday moments that make this place feel like yours." />
        <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow along <ArrowUpRight size={14} /></a>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <motion.a
            className={`gallery-tile ${image.className}`}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            key={image.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="gallery-overlay"><Instagram size={18} /> A little moment at Aroma</span>
          </motion.a>
        ))}
      </div>
      <div className="gallery-bottom"><span>Good coffee, in good company.</span><span>Est. 2018 · Lahore, Pakistan</span></div>
    </section>
  )
}

const reviews = [
  {
    quote: 'The kind of place that remembers your order — and somehow always makes your day a little better.',
    name: 'Ayesha R.',
    detail: 'Aroma regular since 2020',
    initials: 'AR',
    color: 'rose',
  },
  {
    quote: 'Their cold brew is a little too good. I came in for one and now I have a standing Thursday date.',
    name: 'Hamza K.',
    detail: 'Cold brew enthusiast',
    initials: 'HK',
    color: 'olive',
  },
  {
    quote: 'Beautiful coffee, thoughtful people, and the loveliest corner to spend a slow Sunday morning.',
    name: 'Maha S.',
    detail: 'Neighbourhood daydreamer',
    initials: 'MS',
    color: 'sand',
  },
]

function Reviews() {
  return (
    <section className="reviews section-pad">
      <SectionHeading eyebrow="Kind words, good people" title={<>A little love<br /><em>goes a long way.</em></>} centered />
      <div className="review-grid">
        {reviews.map((review, index) => (
          <motion.article className="review-card" key={review.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.12 }} viewport={{ once: true }}>
            <div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={13} fill="currentColor" strokeWidth={1} />)}</div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="review-person"><span className={`avatar avatar-${review.color}`}>{review.initials}</span><span><strong>{review.name}</strong><small>{review.detail}</small></span><span className="verified"><Check size={10} /> Regular</span></div>
          </motion.article>
        ))}
      </div>
      <div className="review-footnote"><span><span className="review-dot" /> A whole lot of love in every cup</span><a href="#contact">Come see for yourself <ArrowRight size={14} /></a></div>
    </section>
  )
}

function Contact() {
  const [emailDraft, setEmailDraft] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone') || 'Not provided'}`,
      '',
      formData.get('message'),
    ].join('\n')
    setEmailDraft(`mailto:hello@aromacoffee.pk?subject=${encodeURIComponent('A note for Aroma Coffee')}&body=${encodeURIComponent(message)}`)
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-main">
        <SectionHeading eyebrow="Come on over" title={<>Your table<br />is <em>waiting.</em></>} copy="Whether it's a quick pick-me-up or a long catch-up, we'd love to see you." />
        <div className="contact-details">
          <div><span className="contact-icon"><MapPin size={16} /></span><span><strong>Find our little corner</strong><small>12 Main Boulevard, Gulberg III<br />Lahore, Pakistan</small></span><ArrowUpRight size={15} /></div>
          <div><span className="contact-icon"><Coffee size={16} /></span><span><strong>Come by anytime</strong><small>Mon – Fri, 8 am – 10 pm<br />Sat – Sun, 9 am – 11 pm</small></span></div>
        </div>
        <a className="map-placeholder" href="https://maps.google.com/?q=Gulberg+III+Lahore" target="_blank" rel="noreferrer" aria-label="Find Aroma Coffee on Google Maps">
          <div className="map-grid" /><span className="map-pin"><MapPin size={19} fill="currentColor" /></span><span className="map-label">AROMA COFFEE <small>GULBERG III, LAHORE</small></span><span className="map-open">Open in maps <ArrowUpRight size={13} /></span>
        </a>
      </div>
      <div className="contact-form-wrap">
        <span className="eyebrow"><span /> Drop us a little note</span>
        <h3>We'd love to<br /><em>hear from you.</em></h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Your name<input name="name" type="text" placeholder="How should we call you?" required /></label>
            <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
          </div>
          <label>Phone number <span className="optional">(optional)</span><input name="phone" type="tel" placeholder="+92 300 0000000" /></label>
          <label>Your message<textarea name="message" rows="3" placeholder="Tell us what's on your mind..." required /></label>
          <button className="button button-dark form-submit" type="submit">Prepare your note <ArrowUpRight size={15} /></button>
          {emailDraft ? (
            <div className="email-draft" role="status">
              <span>Your note is ready. Open your email app to send it to our team.</span>
              <a href={emailDraft}>Open email draft <ArrowUpRight size={14} /></a>
            </div>
          ) : <span className="form-note">We'll prepare a message in your email app so you can send it directly.</span>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand"><Logo light /><p>A slower, lovelier kind of coffee.<br />Made with care in Lahore, Pakistan.</p><div className="footer-socials"><a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Aroma Coffee on Instagram"><Instagram size={17} /></a><a className="footer-social" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Aroma Coffee on Facebook"><span>f</span></a></div></div>
        <div className="footer-column"><strong>Find your way</strong><a href="#about">Our story</a><a href="#menu">The menu</a><a href="#coffee">Our coffee</a><a href="#gallery">Little moments</a></div>
        <div className="footer-column"><strong>Come on over</strong><span>12 Main Boulevard, Gulberg III</span><span>Lahore, Pakistan</span><a href="tel:+9242111000000">+92 42 111 000 000</a><a href="mailto:hello@aromacoffee.pk">hello@aromacoffee.pk</a></div>
        <div className="footer-column footer-hours"><strong>Doors are open</strong><span>Monday — Friday <small>8 am – 10 pm</small></span><span>Saturday — Sunday <small>9 am – 11 pm</small></span><span className="footer-note"><span /> Your table's waiting.</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Aroma Coffee House. Made with care & a little caffeine.</span><a href="#home">Back to the top <ChevronDown size={13} /></a><span>LAHORE · PAKISTAN</span></div>
    </footer>
  )
}

function CartDrawer({ cart, onClose, onQuantity, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal === 0 || subtotal >= 2500 ? 0 : 200
  const [orderEmail, setOrderEmail] = useState('')

  useEffect(() => {
    const handleEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div className="cart-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your shopping bag" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.28 }} onClick={(event) => event.stopPropagation()}>
          <div className="cart-header"><span><ShoppingBag size={18} /> Your little order</span><button className="icon-button" onClick={onClose} aria-label="Close shopping cart"><X size={20} /></button></div>
          {orderEmail ? (
            <div className="cart-empty order-success"><span className="empty-icon"><Check size={24} /></span><h3>Your order is ready.</h3><p>Open your email app to send this request to our team. Your order isn't placed until we receive it.</p><a className="button button-dark" href={orderEmail}>Email your order request <ArrowRight size={15} /></a><button className="text-link edit-order" onClick={() => setOrderEmail('')}>Back to your order</button></div>
          ) : cart.length === 0 ? (
            <div className="cart-empty"><span className="empty-icon"><Coffee size={22} /></span><h3>It's a little quiet in here.</h3><p>Your next favourite cup is just a little scroll away.</p><button className="button button-dark" onClick={onClose}>Find your cup <ArrowDown size={15} /></button></div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt="" />
                    <div className="cart-item-info"><strong>{item.name}</strong><small>{money(item.price)}</small><div className="quantity-control"><button onClick={() => onQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={12} /></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={12} /></button></div></div>
                    <div className="cart-item-end"><strong>{money(item.price * item.quantity)}</strong><button className="remove-item" onClick={() => onRemove(item.id)}>Remove</button></div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <span className="delivery-message">{subtotal >= 2500 ? 'Your delivery is on us. Lovely choice!' : `Add ${money(2500 - subtotal)} for complimentary delivery.`}</span>
                <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div><span>Delivery</span><strong>{delivery === 0 ? 'On us' : money(delivery)}</strong></div>
                <div className="cart-total"><span>Total</span><strong>{money(subtotal + delivery)}</strong></div>
                <button className="button button-dark checkout-button" onClick={() => {
                  const orderLines = cart.map((item) => `${item.quantity} × ${item.name} — ${money(item.price * item.quantity)}`).join('\n')
                  const message = `Hello Aroma Coffee,\n\nI'd like to request this order:\n${orderLines}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${delivery === 0 ? 'On us' : money(delivery)}\nTotal: ${money(subtotal + delivery)}\n\nPlease contact me to confirm.`
                  setOrderEmail(`mailto:hello@aromacoffee.pk?subject=${encodeURIComponent('Coffee order request')}&body=${encodeURIComponent(message)}`)
                }}>Prepare order request <ArrowRight size={15} /></button>
                <small className="checkout-note">Your email app will open with the order details. Payment on delivery.</small>
              </div>
            </>
          )}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('aroma-coffee-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Unable to load saved cart:', error)
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('aroma-coffee-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Unable to save cart:', error)
    }
  }, [cart])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Story />
        <MenuSection onAddToCart={addToCart} />
        <CoffeeStory />
        <Offer />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>{cartOpen && <CartDrawer key="cart" cart={cart} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} onRemove={removeFromCart} />}</AnimatePresence>
    </>
  )
}
