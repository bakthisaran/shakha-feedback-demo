/**
 * nav.js — Shakha shared navigation bar
 * Drop this file alongside your HTML pages and include it with:
 *   <script src="nav.js"></script>
 * Call renderNav(user) once Firebase auth resolves.
 * Call destroyNav() on sign-out / unauthorised.
 */

const NAV_PAGES = [
  { label: "Analytics",   icon: "📊", href: "analytics.html" },
  { label: "Reviews",     icon: "💬", href: "viewReviews.html" },
  { label: "Admin",       icon: "⚙️", href: "admin.html" },
];

const NAV_STYLES = `
  #shkNav {
    max-width: 960px;
    margin: 0 auto 24px;
    padding: 10px 14px;
    background: #fffdf8;
    border-radius: 12px;
    border: 1px solid #e8e0d0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #8a7e6e;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  #shkNav .nav-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex-shrink: 1;
  }
  #shkNav .nav-wordmark {
    font-family: 'Noto Serif', serif;
    font-size: 15px;
    font-weight: 600;
    color: #FF6B1A;
    white-space: nowrap;
    padding-right: 10px;
    border-right: 1px solid #e8e0d0;
    flex-shrink: 0;
  }
  #shkNav .nav-links {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  #shkNav .nav-link {
    padding: 6px 13px;
    border-radius: 7px;
    border: 1.5px solid #e8e0d0;
    background: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #8a7e6e;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  #shkNav .nav-link:hover {
    border-color: #FF6B1A;
    color: #FF6B1A;
  }
  #shkNav .nav-link.active {
    border-color: #FF6B1A;
    color: #FF6B1A;
    background: #fff5ee;
  }
  #shkNav .nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  #shkNav .nav-user {
    font-size: 12px;
    color: #8a7e6e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
  #shkNav .nav-user strong {
    color: #1a1207;
  }
  #shkNav .nav-signout {
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid #e8e0d0;
    background: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #8a7e6e;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
  }
  #shkNav .nav-signout:hover {
    border-color: #c0392b;
    color: #c0392b;
  }

  @media (max-width: 560px) {
    #shkNav { flex-wrap: wrap; gap: 8px; }
    #shkNav .nav-wordmark { border-right: none; padding-right: 0; }
    #shkNav .nav-user { max-width: 120px; }
    #shkNav .nav-link span.nav-label { display: none; }
    #shkNav .nav-link { padding: 6px 10px; }
  }
`;

function _navActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = NAV_PAGES.find(p => p.href === path);
  return page ? page.href : null;
}

function renderNav(user) {
  // Inject styles once
  if (!document.getElementById('shkNavStyles')) {
    const style = document.createElement('style');
    style.id = 'shkNavStyles';
    style.textContent = NAV_STYLES;
    document.head.appendChild(style);
  }

  // Remove existing nav if re-rendering
  const existing = document.getElementById('shkNav');
  if (existing) existing.remove();

  const activePage = _navActivePage();
  const email = user?.email || '';

  const linksHtml = NAV_PAGES.map(p => `
    <a class="nav-link${p.href === activePage ? ' active' : ''}" href="${p.href}">
      <span>${p.icon}</span><span class="nav-label">${p.label}</span>
    </a>
  `).join('');

  const nav = document.createElement('div');
  nav.id = 'shkNav';
  nav.innerHTML = `
    <div class="nav-left">
      <span class="nav-wordmark">🔱 Shakha</span>
      <div class="nav-links">${linksHtml}</div>
    </div>
    <div class="nav-right">
      <span class="nav-user">Signed in as <strong>${email}</strong></span>
      <button class="nav-signout" onclick="signOut()">Sign out</button>
    </div>
  `;

  // Insert as first child of body (before any other content)
  document.body.insertBefore(nav, document.body.firstChild);
}

function destroyNav() {
  const nav = document.getElementById('shkNav');
  if (nav) nav.remove();
}

window.renderNav  = renderNav;
window.destroyNav = destroyNav;
