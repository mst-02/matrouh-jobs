/**
 * YachtFlow Interactive Controller & Figma Prototype Engine
 * App 02 - D:\AI mouse\app_02
 */

// State
const state = {
  activeScreen: 'login', // 'login' | 'explore' | 'scan' | 'ticket' | 'profile'
  currentView: 'flow',   // 'flow' | 'interactive'
  adults: 2,
  child: 1,
  adultPrice: 140,
  childPrice: 70,
  selectedTrip: 'yacht',
  paymentMethod: 'card',
  bookingRef: 'YF-26001482'
};

const screenTitles = {
  login: '01. شاشة تسجيل الدخول (Login & Welcome)',
  explore: '02. استكشاف الرحلات (Explore Yachts & Safari)',
  scan: '03. مسح كود QR وتحديد الحجز (Scan & Booking Sheet)',
  ticket: '04. التذكرة والبوردنج باص (Boarding Pass & QR Ticket)',
  profile: '05. الملف الشخصي وقائمة الحجوزات (User Profile & Bookings)'
};

document.addEventListener('DOMContentLoaded', () => {
  setupViewSwitcher();
  setupFigmaModal();
  updateCalculation();
});

// View switcher
function setupViewSwitcher() {
  const btnFlow = document.getElementById('btn-flow-view');
  const btnInteractive = document.getElementById('btn-interactive-view');
  const flowBoard = document.getElementById('figma-board');
  const deviceView = document.getElementById('interactive-device-view');

  btnFlow.addEventListener('click', () => {
    btnFlow.classList.add('active');
    btnInteractive.classList.remove('active');
    flowBoard.classList.add('visible');
    deviceView.classList.remove('visible');
    state.currentView = 'flow';
  });

  btnInteractive.addEventListener('click', () => {
    btnInteractive.classList.add('active');
    btnFlow.classList.remove('active');
    flowBoard.classList.remove('visible');
    deviceView.classList.add('visible');
    state.currentView = 'interactive';
    renderInteractiveDevice();
  });

  const btnReset = document.getElementById('btn-reset-flow');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      appGoTo('login');
      alert('تم إعادة تعيين مسار التطبيق إلى نقطة البداية (شاشة تسجيل الدخول)');
    });
  }
}

// Navigation router
window.appGoTo = function(screenName) {
  state.activeScreen = screenName;

  // Highlight corresponding frame in Flow view
  const frames = ['frame-1', 'frame-2', 'frame-3', 'frame-4', 'frame-5'];
  const screenMap = {
    login: 'frame-1',
    explore: 'frame-2',
    scan: 'frame-3',
    ticket: 'frame-4',
    profile: 'frame-5'
  };

  frames.forEach(fId => {
    const el = document.getElementById(fId);
    if (el) {
      if (fId === screenMap[screenName]) {
        el.querySelector('.iphone-shell').style.borderColor = 'var(--color-accent-gold)';
        el.querySelector('.iphone-shell').style.boxShadow = '0 0 25px rgba(197, 164, 109, 0.6)';
        if (state.currentView === 'flow') {
          el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      } else {
        el.querySelector('.iphone-shell').style.borderColor = '#D1D5DB';
        el.querySelector('.iphone-shell').style.boxShadow = 'var(--shadow-phone)';
      }
    }
  });

  // If in interactive view, render single active frame
  if (state.currentView === 'interactive') {
    renderInteractiveDevice();
  }

  // Update badge title
  const titleBadge = document.getElementById('current-screen-name');
  if (titleBadge) {
    titleBadge.textContent = screenTitles[screenName] || screenName;
  }

  // Update pill buttons in simulator
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const pillIndexMap = { login: 0, explore: 1, scan: 2, ticket: 3, profile: 4 };
  const targetPill = document.querySelectorAll('.pill-btn')[pillIndexMap[screenName]];
  if (targetPill) targetPill.classList.add('active');
};

// Render interactive single device view
function renderInteractiveDevice() {
  const container = document.getElementById('simulator-target');
  const frameMap = {
    login: 'frame-1',
    explore: 'frame-2',
    scan: 'frame-3',
    ticket: 'frame-4',
    profile: 'frame-5'
  };
  const sourceFrame = document.getElementById(frameMap[state.activeScreen]);
  if (!sourceFrame || !container) return;

  const shellClone = sourceFrame.querySelector('.iphone-shell').cloneNode(true);
  shellClone.style.borderColor = '#111827';
  shellClone.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4)';
  container.innerHTML = '';
  container.appendChild(shellClone);

  const titleBadge = document.getElementById('current-screen-name');
  if (titleBadge) {
    titleBadge.textContent = screenTitles[state.activeScreen];
  }
}

// Open booking for specific trip
window.openBooking = function(tripType) {
  state.selectedTrip = tripType;
  if (tripType === 'yacht') {
    state.adultPrice = 140;
    state.childPrice = 70;
  } else {
    state.adultPrice = 75;
    state.childPrice = 40;
  }
  updateCalculation();
  appGoTo('scan');
};

// Adjust count of persons
window.adjustCount = function(type, delta) {
  if (type === 'adults') {
    state.adults = Math.max(1, state.adults + delta);
    const el = document.getElementById('adults-count');
    if (el) el.textContent = `${state.adults} Adults 👤`;
  } else if (type === 'child') {
    state.child = Math.max(0, state.child + delta);
    const el = document.getElementById('child-count');
    if (el) el.textContent = `${state.child} Child 🧒`;
  }
  updateCalculation();
};

function updateCalculation() {
  const total = (state.adults * state.adultPrice) + (state.child * state.childPrice);
  const totalEl = document.getElementById('total-price');
  if (totalEl) {
    totalEl.textContent = `$${total} USD`;
  }
}

// Payment selector
window.setPayment = function(method) {
  state.paymentMethod = method;
  const cashBtn = document.getElementById('pay-cash');
  const cardBtn = document.getElementById('pay-card');
  if (method === 'cash') {
    cashBtn.classList.add('active');
    cardBtn.classList.remove('active');
  } else {
    cardBtn.classList.add('active');
    cashBtn.classList.remove('active');
  }
};

// Scan button trigger
window.triggerScanSuccess = function() {
  const btn = document.querySelector('.gold-capsule-btn');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارِ القراءة...';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> تم المسح بنجاح!';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-bolt"></i> SCAN';
      }, 1500);
    }, 700);
  }
};

// Figma modal handlers
function setupFigmaModal() {
  const btnOpen = document.getElementById('btn-open-figma-guide');
  const modal = document.getElementById('figma-modal');
  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => {
      modal.classList.add('open');
    });
  }
}

window.closeFigmaModal = function() {
  const modal = document.getElementById('figma-modal');
  if (modal) modal.classList.remove('open');
};
