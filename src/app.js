// ========== 饭来 v3 ==========
// Design: "Aesop × NYT Cooking" — Glass + Texture + Warmth

const app = {
  currentPage: 'home',
  currentData: null,
  selectedRecipes: new Set(),
  activePref: 'all',

  init() {
    this.bindElements();
    this.bindEvents();
    this.initTweaks();
    this.renderPage('home');
  },

  // ---------- DOM ----------
  bindElements() {
    this.els = {
      navTitle: document.getElementById('navTitle'),
      btnBack: document.getElementById('btnBack'),
      pageContainer: document.getElementById('pageContainer'),
      pages: document.querySelectorAll('.page'),

      uploadZone: document.getElementById('uploadZone'),
      uploadPlaceholder: document.getElementById('uploadPlaceholder'),
      previewContainer: document.getElementById('previewContainer'),
      previewImage: document.getElementById('previewImage'),
      fileInput: document.getElementById('fileInput'),
      btnAnalyze: document.getElementById('btnAnalyze'),
      demoCards: document.querySelectorAll('.demo-card'),

      loadingState: document.getElementById('loadingState'),
      resultContent: document.getElementById('resultContent'),
      ingredientGrid: document.getElementById('ingredientGrid'),
      ingredientCount: document.getElementById('ingredientCount'),
      prefTags: document.getElementById('prefTags'),
      recipeList: document.getElementById('recipeList'),
      btnShoppingList: document.getElementById('btnShoppingList'),

      shoppingList: document.getElementById('shoppingList'),
      haveList: document.getElementById('haveList'),
      selectedRecipesEl: document.getElementById('selectedRecipes'),
      missingCount: document.getElementById('missingCount'),
      btnGoBuy: document.getElementById('btnGoBuy'),
      btnBackHome: document.getElementById('btnBackHome'),

      tweaksToggle: document.getElementById('tweaksToggle'),
      tweaksPanel: document.getElementById('tweaksPanel'),
    };
  },

  // ---------- Events ----------
  bindEvents() {
    this.els.btnBack.addEventListener('click', () => this.goBack());
    this.els.uploadZone.addEventListener('click', () => this.els.fileInput.click());
    this.els.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    this.els.btnAnalyze.addEventListener('click', () => this.analyzeImage());

    this.els.demoCards.forEach((card) => {
      card.addEventListener('click', () => this.loadDemo(card.dataset.demo));
    });

    this.els.prefTags.addEventListener('click', (e) => {
      if (e.target.classList.contains('pref-tag')) {
        this.setPref(e.target.dataset.pref);
      }
    });

    this.els.recipeList.addEventListener('click', (e) => {
      const card = e.target.closest('.recipe-card');
      if (!card) return;
      if (!e.target.closest('.recipe-check-row')) {
        card.classList.toggle('expanded');
      }
    });

    this.els.recipeList.addEventListener('change', (e) => {
      if (e.target.classList.contains('recipe-check')) {
        this.toggleRecipe(e.target.dataset.recipeId, e.target.checked);
      }
    });

    this.els.btnShoppingList.addEventListener('click', () => this.goToShopping());
    this.els.btnGoBuy.addEventListener('click', () => this.goBuy());
    this.els.btnBackHome.addEventListener('click', () => {
      this.selectedRecipes.clear();
      this.renderPage('home');
    });

    this.els.tweaksToggle.addEventListener('click', () => this.toggleTweaks());
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#tweaksPanel') && !e.target.closest('#tweaksToggle')) {
        this.els.tweaksPanel.classList.remove('open');
      }
    });
  },

  // ---------- Navigation ----------
  renderPage(pageName) {
    this.currentPage = pageName;
    this.els.pages.forEach((p) => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageName}`);
    if (target) target.classList.add('active');

    if (pageName === 'home') {
      this.els.btnBack.style.visibility = 'hidden';
      this.els.navTitle.textContent = '饭来';
    } else if (pageName === 'result') {
      this.els.btnBack.style.visibility = 'visible';
      this.els.navTitle.textContent = '食材分析';
    } else if (pageName === 'shopping') {
      this.els.btnBack.style.visibility = 'visible';
      this.els.navTitle.textContent = '购物清单';
    }

    this.els.pageContainer.scrollTop = 0;
  },

  goBack() {
    if (this.currentPage === 'result') {
      this.selectedRecipes.clear();
      this.renderPage('home');
    } else if (this.currentPage === 'shopping') {
      this.renderPage('result');
    }
  },

  // ---------- File ----------
  handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = this.els.previewImage;
      img.onload = () => {
        img.style.display = 'block';
        this.els.previewContainer.classList.remove('hidden');
        this.els.uploadPlaceholder.classList.add('hidden');
        this.els.uploadZone.classList.add('has-image');
      };
      img.src = ev.target.result;
      this.els.btnAnalyze.disabled = false;
    };
    reader.readAsDataURL(file);
  },

  // ---------- Analyze ----------
  analyzeImage() {
    const keys = Object.keys(MOCK_DATA);
    const key = keys[Math.floor(Math.random() * keys.length)];
    this.currentData = MOCK_DATA[key];
    this.showResult();
  },

  loadDemo(key) {
    this.currentData = MOCK_DATA[key];
    if (!this.currentData) return;
    this.showResult();
  },

  // ---------- Result ----------
  showResult() {
    this.renderPage('result');
    this.selectedRecipes.clear();
    this.activePref = 'all';

    this.els.loadingState.classList.remove('hidden');
    this.els.resultContent.classList.add('hidden');
    this.els.pageContainer.scrollTop = 0;

    setTimeout(() => {
      this.els.loadingState.classList.add('hidden');
      this.els.resultContent.classList.remove('hidden');
      this.renderIngredients();
      this.renderRecipes('all');
      this.resetPrefTags();
      this.els.btnShoppingList.disabled = false;
    }, 1800 + Math.random() * 800);
  },

  // ---------- Ingredients ----------
  renderIngredients() {
    const ingredients = this.currentData.ingredients;
    this.els.ingredientCount.textContent = `${ingredients.length}种`;

    const freshnessClass = (f) => {
      if (f === '新鲜') return 'fresh';
      if (f.includes('尽快') || f.includes('不新鲜')) return 'soon';
      return 'plenty';
    };

    this.els.ingredientGrid.innerHTML = ingredients
      .map(
        (item) => `
        <div class="ingredient-tag">
          <span class="emoji">${item.emoji}</span>
          ${item.name}
          <span class="freshness ${freshnessClass(item.freshness)}">· ${item.freshness}</span>
        </div>`
      )
      .join('');
  },

  // ---------- Recipes ----------
  renderRecipes(pref) {
    let recipes = this.currentData.recipes;

    if (pref === 'quick') recipes = recipes.filter((r) => r.tags.includes('快手菜'));
    else if (pref === 'lowfat') recipes = recipes.filter((r) => r.tags.includes('减脂') || r.tags.includes('轻食'));
    else if (pref === 'soup') recipes = recipes.filter((r) => r.tags.includes('汤羹'));
    else if (pref === 'hearty') recipes = recipes.filter((r) => r.tags.includes('硬菜'));

    const mediaClasses = ['r1', 'r2', 'r3', 'r4'];
    let mi = 0;

    this.els.recipeList.innerHTML = recipes
      .map((r) => {
        const mc = mediaClasses[mi % mediaClasses.length]; mi++;
        const sel = this.selectedRecipes.has(r.id);

        return `
        <div class="recipe-card ${sel ? 'selected expanded' : ''}">
          <div class="recipe-media ${mc}">${r.emoji}</div>
          <div class="recipe-info">
            <div class="recipe-name">${r.name}</div>
            <div class="recipe-meta">
              <span class="meta-time">${r.time}</span>
              <span class="meta-diff">${r.difficulty}</span>
              <span class="meta-cal">${r.calories}</span>
            </div>
            <div class="recipe-ingredients">
              <span class="recipe-match">已有：${r.match.join('、')}</span>
              ${r.missing.length
                ? `<br><span class="recipe-missing">缺少：${r.missing.join('、')}</span>`
                : `<br><span class="recipe-ok">食材齐全</span>`}
            </div>
            <div class="recipe-expand">
              <div class="recipe-steps">
                <ol>${r.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
              </div>
              <label class="recipe-check-row">
                <input type="checkbox" class="recipe-check" data-recipe-id="${r.id}" ${sel ? 'checked' : ''}>
                加入菜谱计划
              </label>
            </div>
          </div>
        </div>`;
      })
      .join('');
  },

  // ---------- Pref ----------
  setPref(pref) {
    this.activePref = pref;
    const tags = this.els.prefTags.querySelectorAll('.pref-tag');
    tags.forEach((t) => t.classList.remove('active'));
    const target = this.els.prefTags.querySelector(`[data-pref="${pref}"]`);
    if (target) target.classList.add('active');
    this.renderRecipes(pref);
  },

  resetPrefTags() {
    const tags = this.els.prefTags.querySelectorAll('.pref-tag');
    tags.forEach((t) => t.classList.remove('active'));
    const first = this.els.prefTags.querySelector('[data-pref="all"]');
    if (first) first.classList.add('active');
  },

  toggleRecipe(recipeId, checked) {
    if (checked) this.selectedRecipes.add(recipeId);
    else this.selectedRecipes.delete(recipeId);
  },

  // ---------- Shopping ----------
  goToShopping() {
    if (this.selectedRecipes.size === 0) {
      this.currentData.recipes.forEach((r) => this.selectedRecipes.add(r.id));
    }
    this.renderPage('shopping');
    this.renderShoppingList();
  },

  renderShoppingList() {
    const allRecipes = this.currentData.recipes;
    const missingMap = new Map();
    const selectedRecipeList = [];

    allRecipes.forEach((r) => {
      if (this.selectedRecipes.has(r.id)) {
        selectedRecipeList.push(r);
        r.missing.forEach((m) => missingMap.set(m, (missingMap.get(m) || 0) + 1));
      }
    });

    const missingArr = Array.from(missingMap.entries());
    this.els.missingCount.textContent = `${missingArr.length}种`;

    if (missingArr.length === 0) {
      this.els.shoppingList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-text">食材齐全</div>
          <div class="empty-hint">不需要额外购买，开始做饭吧</div>
        </div>`;
    } else {
      this.els.shoppingList.innerHTML = missingArr
        .map(
          ([name, count]) => `
          <div class="shopping-item">
            <div class="shopping-icon missing">🛒</div>
            <div class="shopping-info">
              <div class="shopping-name">${name}</div>
              <div class="shopping-amount">${count}道菜需要</div>
            </div>
            <div class="shopping-check" data-item="${name}"></div>
          </div>`
        )
        .join('');
    }

    this.els.haveList.innerHTML = this.currentData.ingredients
      .map(
        (item) => `
        <div class="shopping-item">
          <div class="shopping-icon have">${item.emoji}</div>
          <div class="shopping-info">
            <div class="shopping-name">${item.name}</div>
            <div class="shopping-amount">${item.amount} · ${item.freshness}</div>
          </div>
        </div>`
      )
      .join('');

    this.els.selectedRecipesEl.innerHTML = selectedRecipeList
      .map(
        (r) => `
        <div class="shopping-item">
          <div class="shopping-icon recipe">${r.emoji}</div>
          <div class="shopping-info">
            <div class="shopping-name">${r.name}</div>
            <div class="shopping-amount">${r.time} · ${r.difficulty} · ${r.calories}</div>
          </div>
        </div>`
      )
      .join('');

    this.els.shoppingList.onclick = (e) => {
      const check = e.target.closest('.shopping-check');
      if (check) check.classList.toggle('checked');
    };
  },

  // ---------- Buy Sheet ----------
  goBuy() {
    const allRecipes = this.currentData.recipes;
    const missingItems = [];
    allRecipes.forEach((r) => {
      if (this.selectedRecipes.has(r.id)) {
        r.missing.forEach((m) => missingItems.push(m));
      }
    });

    if (missingItems.length === 0) {
      this.showToast('食材齐全，开始做饭吧');
      return;
    }

    const query = missingItems.join(' ');
    const xiaoxiangUrl = `https://i.meituan.com/aisearch?keyword=${encodeURIComponent(query)}`;
    const pupuUrl = `https://m.pupumall.com/#/search/${encodeURIComponent(query)}`;

    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';

    overlay.innerHTML = `
      <div class="sheet">
        <div class="sheet-handle"></div>
        <h4>选择买菜平台</h4>
        <p class="sheet-subtitle">将搜索：${query}</p>
        <button class="btn btn-accent" id="sheetXiaoxiang">小象超市</button>
        <button class="btn btn-outline" id="sheetPupu">朴朴超市</button>
        <button class="sheet-cancel" id="sheetCancel">取消</button>
      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#sheetCancel').addEventListener('click', close);
    overlay.querySelector('#sheetXiaoxiang').addEventListener('click', () => {
      window.open(xiaoxiangUrl, '_blank'); close();
    });
    overlay.querySelector('#sheetPupu').addEventListener('click', () => {
      window.open(pupuUrl, '_blank'); close();
    });
  },

  // ---------- Toast ----------
  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  },

  // ---------- Tweaks ----------
  initTweaks() {
    const themeBtns = this.els.tweaksPanel.querySelectorAll('[data-theme]');
    themeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        themeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.applyTheme(btn.dataset.theme);
      });
    });

    const radiusBtns = this.els.tweaksPanel.querySelectorAll('[data-radius]');
    radiusBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        radiusBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.applyRadius(btn.dataset.radius);
      });
    });
  },

  toggleTweaks() { this.els.tweaksPanel.classList.toggle('open'); },

  applyTheme(theme) {
    const root = document.documentElement;
    const themes = {
      espresso:  { primary: '#3C2A1E', soft: '#5C4A3E', accent: '#7A9A7E', accentSoft: '#A8C4AB', accentMist: '#E8F0E6', warm: '#C2653A', warmSoft: '#E8A080', warmMist: '#FDF4ED' },
      sage:      { primary: '#4A6741', soft: '#5C7A52', accent: '#C67B5C', accentSoft: '#E0A890', accentMist: '#F5E8E2', warm: '#E8A838', warmSoft: '#F0C870', warmMist: '#FEF7EE' },
      slate:     { primary: '#455A64', soft: '#607D8B', accent: '#78909C', accentSoft: '#B0BEC5', accentMist: '#ECEFF1', warm: '#E57373', warmSoft: '#EF9A9A', warmMist: '#FFEBEE' },
    };
    const t = themes[theme] || themes.espresso;
    root.style.setProperty('--espresso', t.primary);
    root.style.setProperty('--espresso-soft', t.soft);
    root.style.setProperty('--sage', t.accent);
    root.style.setProperty('--sage-soft', t.accentSoft);
    root.style.setProperty('--sage-mist', t.accentMist);
    root.style.setProperty('--terracotta', t.warm);
    root.style.setProperty('--terracotta-soft', t.warmSoft);
    root.style.setProperty('--terracotta-mist', t.warmMist);
  },

  applyRadius(radius) {
    const root = document.documentElement;
    if (radius === 'sharp') {
      root.style.setProperty('--radius-sm', '4px');
      root.style.setProperty('--radius-md', '8px');
      root.style.setProperty('--radius-lg', '12px');
      root.style.setProperty('--radius-xl', '16px');
    } else {
      root.style.setProperty('--radius-sm', '12px');
      root.style.setProperty('--radius-md', '18px');
      root.style.setProperty('--radius-lg', '24px');
      root.style.setProperty('--radius-xl', '28px');
    }
  },
};

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', () => app.init());
