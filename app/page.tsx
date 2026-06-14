'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const revealRefsMap = useRef<Map<Element, boolean>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal')
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observerRef.current?.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealEls.forEach((el) => observerRef.current?.observe(el))

    return () => {
      revealEls.forEach((el) => observerRef.current?.unobserve(el))
    }
  }, [])

  useEffect(() => {
    // Typewriter for hero question
    const question = 'ماذا لو رفعت السعر 10%؟'
    const typedEl = document.getElementById('typedQuestion')
    if (!typedEl) return

    let i = 0
    const type = () => {
      if (i <= question.length) {
        typedEl.textContent = question.slice(0, i)
        i++
        setTimeout(type, 65)
      } else {
        setTimeout(animateChart, 400)
      }
    }

    // Animate chart + stats after typing completes
    const animateChart = () => {
      const line = document.getElementById('projLine')
      const area = document.getElementById('projArea')
      const dot = document.getElementById('projDot')
      const reco = document.getElementById('recoBox')

      if (line) {
        line.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)'
        line.style.strokeDashoffset = '0'
      }

      if (area) {
        area.style.transition = 'opacity 1s ease'
        area.style.opacity = '1'
      }

      setTimeout(() => {
        if (dot) {
          dot.style.transition = 'r 0.4s ease'
          dot.setAttribute('r', '5')
        }
      }, 1300)

      animateStat('statRevenue', 0, 4.5, '+', '%', 1300)
      animateStat('statDemand', 0, -1.5, '', '%', 1300)
      animateStat('statMargin', 0, 6.2, '+', '%', 1300)

      setTimeout(() => {
        if (reco) {
          reco.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          reco.style.transform = 'translateY(0)'
          reco.style.opacity = '1'
        }
      }, 1500)

      // reset cycle
      setTimeout(resetSim, 6000)
    }

    const animateStat = (id: string, from: number, to: number, prefix: string, suffix: string, duration: number) => {
      const el = document.getElementById(id)
      if (!el) return
      const start = performance.now()
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        const val = (from + (to - from) * eased).toFixed(1)
        el.textContent = prefix + val + suffix
        if (t < 1) requestAnimationFrame(frame)
        else el.textContent = (to > 0 ? '+' : '') + to + suffix
      }
      requestAnimationFrame(frame)
    }

    const resetSim = () => {
      const line = document.getElementById('projLine')
      const area = document.getElementById('projArea')
      const dot = document.getElementById('projDot')
      const reco = document.getElementById('recoBox')

      if (line) {
        line.style.transition = 'none'
        line.style.strokeDashoffset = '500'
      }
      if (area) {
        area.style.transition = 'none'
        area.style.opacity = '0'
      }
      if (dot) {
        dot.style.transition = 'none'
        dot.setAttribute('r', '0')
      }
      if (reco) {
        reco.style.transition = 'none'
        reco.style.opacity = '0'
        reco.style.transform = 'translateY(8px)'
      }

      const revenueStat = document.getElementById('statRevenue')
      const demandStat = document.getElementById('statDemand')
      const marginStat = document.getElementById('statMargin')

      if (revenueStat) revenueStat.textContent = '+0%'
      if (demandStat) demandStat.textContent = '0%'
      if (marginStat) marginStat.textContent = '+0%'

      setTimeout(type, 500)
    }

    type()
  }, [])

  return (
    <>
      <nav>
        <div className="wrap">
          <div className="brand">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17L9 11L13 15L21 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 7H15M21 7V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            محاكي
          </div>
          <ul>
            <li>
              <a href="#scenarios">السيناريوهات</a>
            </li>
            <li>
              <a href="#how">كيف يعمل</a>
            </li>
            <li>
              <a href="#features">المزايا</a>
            </li>
            <li>
              <a href="#pricing">الأسعار</a>
            </li>
          </ul>
          <a href="#cta" className="nav-cta">
            جرّب مجانًا
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot"></span> مدعوم بالذكاء الاصطناعي · صُنع لأصحاب المشاريع الصغيرة
            </div>
            <h1>
              اتخذ قرارك التجاري
              <br />
              وأنت ترى <span className="accent">المستقبل</span> أولًا
            </h1>
            <p className="hero-sub">
              منصة محاكي تحوّل بياناتك المالية إلى إجابات. اسأل بأي سؤال {`"`}ماذا لو{`"`}، واحصل على توقع دقيق لتأثيره على إيراداتك وأرباحك خلال ثوانٍ.
            </p>
            <div className="hero-actions">
              <a href="#cta" className="btn-primary">
                ابدأ المحاكاة مجانًا
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#how" className="btn-secondary">
                شاهد كيف يعمل
              </a>
            </div>
            <div className="trust-row">
              <span>
                <strong className="num">+1,200</strong> سيناريو يُحلَّل أسبوعيًا
              </span>
              <span>
                <strong className="num">94%</strong> دقة في التوقعات قصيرة المدى
              </span>
            </div>
          </div>

          {/* Signature: Live simulator widget */}
          <div className="sim-card reveal visible">
            <div className="sim-card-head">
              <span className="label">محاكاة جديدة</span>
              <div className="sim-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="sim-question">
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 13.295 5.8762 14.5029 6.5 15.5L5.5 18.5L8.61 17.6C9.61 18.16 10.77 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 9V12.5L14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span id="typedQuestion" className="sim-typed"></span>
              <span className="cursor-blink"></span>
            </div>
            <div className="sim-chart-area">
              <svg viewBox="0 0 380 170" preserveAspectRatio="none" aria-label="رسم بياني يوضح تأثير القرار على الإيرادات">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2FAE6B" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#2FAE6B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* baseline dashed */}
                <path d="M10,120 C70,118 130,116 190,112 C250,108 310,104 370,100" fill="none" stroke="#C9CFCB" strokeWidth="2" strokeDasharray="4 6" />
                {/* projected area */}
                <path id="projArea" d="M10,120 C70,114 130,96 190,80 C250,62 310,46 370,30 L370,170 L10,170 Z" fill="url(#areaFill)" opacity="0"></path>
                {/* projected line */}
                <path id="projLine" d="M10,120 C70,114 130,96 190,80 C250,62 310,46 370,30" fill="none" stroke="#1f8a52" strokeWidth="3" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" />
                <circle id="projDot" cx="370" cy="30" r="0" fill="#1f8a52" />
              </svg>
            </div>
            <div className="sim-stats">
              <div className="sim-stat">
                <div className="v pos num" id="statRevenue">
                  +0%
                </div>
                <div className="l">الإيرادات</div>
              </div>
              <div className="sim-stat">
                <div className="v num" id="statDemand">
                  0%
                </div>
                <div className="l">الطلب</div>
              </div>
              <div className="sim-stat">
                <div className="v pos num" id="statMargin">
                  +0%
                </div>
                <div className="l">هامش الربح</div>
              </div>
            </div>
            <div className="sim-reco" id="recoBox" style={{ opacity: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ minWidth: '18px', marginTop: '2px' }}>
                <path d="M9 18H15M10 21H14M12 3C8.5 3 6 5.5 6 9C6 11.5 7.5 13 8.5 14C9 14.5 9 15 9 15.5V16H15V15.5C15 15 15 14.5 15.5 14C16.5 13 18 11.5 18 9C18 5.5 15.5 3 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>التوصية: رفع السعر 10% يزيد الإيرادات الصافية بنسبة 4.5% خلال 3 أشهر، مع انخفاض طلب طفيف. نقترح تجربة على شريحة عملاء أولًا.</span>
            </div>
          </div>
        </div>
      </header>

      {/* LOGOS */}
      <section className="logos">
        <div className="wrap">
          <span className="tag">موثوق من أصحاب المشاريع في</span>
          <div className="logo-items">
            <span>مقاهي ومطاعم</span>
            <span>متاجر تجزئة</span>
            <span>وكالات تسويق</span>
            <span>عيادات وصالونات</span>
            <span>شركات SaaS ناشئة</span>
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="section" id="scenarios">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="dot"></span> أمثلة حقيقية
            </div>
            <h2>أسئلة يطرحها أصحاب المشاريع كل يوم</h2>
            <p>محاكي يحوّل القلق من القرار إلى رقم واضح، مبني على بياناتك الفعلية لا على التخمين.</p>
          </div>
          <div className="scenarios">
            <div className="scn-card reveal">
              <div className="scn-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2V22M17 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>ماذا لو رفعت السعر 10%؟</h3>
              <p>يحسب محاكي التأثير المتوقع على الطلب بناءً على مرونة السعر في قطاعك، ثم يقارن الإيرادات والهامش قبل وبعد.</p>
              <div className="scn-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                +4.5% صافي الإيرادات
              </div>
            </div>

            <div className="scn-card reveal">
              <div className="scn-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3>ماذا لو وظّفت موظف مبيعات؟</h3>
              <p>يبني محاكي نموذج التعادل (Break-even) ويوضح متى تتحول هذه الوظيفة من تكلفة إلى استثمار رابح ضمن جدول زمني واضح.</p>
              <div className="scn-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                التعادل في 5.2 أشهر
              </div>
            </div>

            <div className="scn-card reveal">
              <div className="scn-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="10" y="6" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="17" y="3" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3>ماذا لو خفّضت التسويق 30%؟</h3>
              <p>يتنبأ محاكي بعدد العملاء الجدد المتوقع فقدانه بناءً على بيانات الأداء التاريخية، ويقترح بدائل لتقليل الأثر.</p>
              <div className="scn-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 7L15 13L11 9L3 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                −18% عملاء جدد
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="dot"></span> العملية
            </div>
            <h2>من سؤالك إلى القرار، في ثلاث خطوات</h2>
            <p>لا حاجة لمحلل مالي أو جداول معقدة. محاكي يتولى الحسابات، وأنت تتولى القرار.</p>
          </div>
          <div className="steps reveal">
            <div className="step">
              <span className="step-no">الخطوة الأولى</span>
              <h3>اربط بياناتك</h3>
              <p>ارفع ملف مبيعاتك، أو اربط حسابك في Stripe أو ملف Excel — محاكي يفهم بياناتك تلقائيًا دون إعداد معقد.</p>
            </div>
            <div className="step">
              <span className="step-no">الخطوة الثانية</span>
              <h3>اسأل بلغتك</h3>
              <p>اكتب سؤالك بشكل طبيعي تمامًا كما تفكر: {`"`}ماذا لو فتحت فرعًا ثانيًا؟{`"`} — بدون معادلات أو مصطلحات محاسبية.</p>
            </div>
            <div className="step">
              <span className="step-no">الخطوة الثالثة</span>
              <h3>شاهد النتيجة</h3>
              <p>احصل على رسم بياني تفاعلي، أرقام واضحة، وتوصية مكتوبة بلغة بسيطة تساعدك على الحسم بثقة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="wrap">
          <div className="feature-row reveal">
            <div className="feature-visual">
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '18px', fontWeight: '500' }}>مقارنة السيناريوهات: تأثير زيادة السعر على الطلب والإيراد</div>
              <div className="bar-row">
                <div className="bar" style={{ height: '55%' }}>
                  <span className="pct">100%</span>
                </div>
                <div className="bar" style={{ height: '48%' }}>
                  <span className="pct">−12%</span>
                </div>
                <div className="bar on" style={{ height: '68%' }}>
                  <span className="pct">+22%</span>
                </div>
                <div className="bar" style={{ height: '50%' }}>
                  <span className="pct">−5%</span>
                </div>
                <div className="bar on" style={{ height: '75%' }}>
                  <span className="pct">+30%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                <span>الحالي</span>
                <span>−10%</span>
                <span>+10%</span>
                <span>−5%</span>
                <span>+15%</span>
              </div>
            </div>
            <div className="feature-text">
              <h3>قارن عدة سيناريوهات جنبًا إلى جنب</h3>
              <p>لا تكتفِ بإجابة واحدة. محاكي يعرض لك عدة تغييرات محتملة معًا، لترى أيها يحقق التوازن الأفضل بين النمو والمخاطرة قبل أن تتحرك.</p>
              <ul className="feature-list">
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  تحليل فوري لأي نسبة تغيير تختارها
                </li>
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  درجة ثقة لكل توقع، حتى تعرف مدى موثوقيته
                </li>
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  حفظ السيناريوهات للرجوع إليها مع شريكك أو فريقك
                </li>
              </ul>
            </div>
          </div>

          <div className="feature-row reverse reveal">
            <div className="feature-visual">
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '8px', fontWeight: '500' }}>التدفق النقدي المتوقع — 6 أشهر</div>
              <div className="cf-row">
                <span className="name">الإيرادات الحالية</span>
                <span className="val num">42,000 د.م</span>
              </div>
              <div className="cf-row">
                <span className="name">بعد التغيير المقترح</span>
                <span className="val up num">48,300 د.م</span>
              </div>
              <div className="cf-row">
                <span className="name">التكاليف التشغيلية</span>
                <span className="val num">19,500 د.م</span>
              </div>
              <div className="cf-row">
                <span className="name">صافي الربح المتوقع</span>
                <span className="val up num">28,800 د.م</span>
              </div>
              <div className="cf-row">
                <span className="name">نقطة التعادل</span>
                <span className="val num">الشهر 2</span>
              </div>
            </div>
            <div className="feature-text">
              <h3>توقعات تدفق نقدي تفهمها فورًا</h3>
              <p>كل قرار يُترجم إلى أرقام التدفق النقدي التي تهمك يوميًا: الإيرادات، التكاليف، ونقطة التعادل — معروضة بوضوح دون أي تعقيد محاسبي.</p>
              <ul className="feature-list">
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  توقعات شهرية لمدة تصل إلى 12 شهرًا
                </li>
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  تنبيهات عند اقتراب نقاط حرجة في السيولة
                </li>
                <li>
                  <span className="chk">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  تصدير التقرير كملف PDF لمشاركته مع شركائك
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="section-head center reveal">
            <div className="eyebrow">
              <span className="dot"></span> الأسعار
            </div>
            <h2>خطة تناسب حجم مشروعك</h2>
            <p>ابدأ مجانًا، وارتقِ عندما يكبر مشروعك. بدون عقود طويلة، وبإمكانك الإلغاء في أي وقت.</p>
          </div>
          <div className="pricing">
            <div className="price-card reveal">
              <div className="price-tier">أساسي</div>
              <div className="price-tier-sub">للمشاريع الفردية والناشئة الصغيرة</div>
              <div className="price-amount num">
                0 <span>د.م / شهريًا</span>
              </div>
              <ul className="feature-list2">
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  5 محاكاة شهريًا
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  رفع ملف CSV واحد
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  توقعات لمدة 3 أشهر
                </li>
              </ul>
              <a href="#" className="price-cta">
                ابدأ مجانًا
              </a>
            </div>

            <div className="price-card featured reveal">
              <div className="price-badge">الأكثر اختيارًا</div>
              <div className="price-tier">نمو</div>
              <div className="price-tier-sub">للمشاريع المتوسعة والفرق الصغيرة</div>
              <div className="price-amount num">
                249 <span>د.م / شهريًا</span>
              </div>
              <ul className="feature-list2">
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  محاكاة غير محدودة
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  ربط مباشر مع Stripe وQuickBooks
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  توقعات لمدة 12 شهرًا
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  مقارنة سيناريوهات متعددة
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  تصدير تقارير PDF
                </li>
              </ul>
              <a href="#" className="price-cta">
                ابدأ الإصدار التجريبي
              </a>
            </div>

            <div className="price-card reveal">
              <div className="price-tier">أعمال</div>
              <div className="price-tier-sub">للشركات متعددة الفروع والفرق الكبيرة</div>
              <div className="price-amount num">
                699 <span>د.م / شهريًا</span>
              </div>
              <ul className="feature-list2">
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  كل مزايا خطة نمو
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  دعم متعدد الفروع والفرق
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  وصول API للتكامل المخصص
                </li>
                <li>
                  <span className="chk">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  مدير حساب مخصص
                </li>
              </ul>
              <a href="#" className="price-cta">
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" id="cta" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <h2>أوقف التخمين. ابدأ في رؤية أرقامك المستقبلية اليوم.</h2>
            <p>لا حاجة لبطاقة ائتمانية. أول 5 محاكاة مجانية بالكامل.</p>
            <a href="#" className="btn-primary">
              جرّب محاكي الآن
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="brand">
            <span className="brand-mark" style={{ width: '28px', height: '28px', borderRadius: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path d="M3 17L9 11L13 15L21 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 7H15M21 7V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontSize: '1.05rem' }}>محاكي</span>
          </div>
          <ul className="footer-links">
            <li>
              <a href="#scenarios">السيناريوهات</a>
            </li>
            <li>
              <a href="#how">كيف يعمل</a>
            </li>
            <li>
              <a href="#pricing">الأسعار</a>
            </li>
            <li>
              <a href="#">الخصوصية</a>
            </li>
          </ul>
          <div className="footer-copy">© 2026 محاكي. جميع الحقوق محفوظة.</div>
        </div>
      </footer>
    </>
  )
}
