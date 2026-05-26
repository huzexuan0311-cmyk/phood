// ========== 饭来 — Claude Edition ==========
// Design: Anthropic — Warm · Human · Minimal

const FOOD_WHEEL = [
  // 粉面
  { name: '麻辣烫', emoji: '🥘' }, { name: '兰州拉面', emoji: '🍜' }, { name: '螺蛳粉', emoji: '🍲' },
  { name: '过桥米线', emoji: '🍜' }, { name: '牛肉面', emoji: '🍝' }, { name: '炸酱面', emoji: '🍜' },
  { name: '重庆小面', emoji: '🌶️' }, { name: '热干面', emoji: '🍜' }, { name: '酸辣粉', emoji: '🍲' },
  { name: '担担面', emoji: '🍝' }, { name: '刀削面', emoji: '🍜' }, { name: '冷面', emoji: '🧊' },
  { name: '肉酱意面', emoji: '🍝' }, { name: '炒米粉', emoji: '🍜' }, { name: '粿条', emoji: '🍲' },
  { name: '车仔面', emoji: '🍜' }, { name: '乌冬面', emoji: '🍥' },
  // 米饭
  { name: '煲仔饭', emoji: '🍚' }, { name: '盖浇饭', emoji: '🍛' }, { name: '蛋炒饭', emoji: '🍳' },
  { name: '烤肉拌饭', emoji: '🥩' }, { name: '黄焖鸡米饭', emoji: '🍗' }, { name: '石锅拌饭', emoji: '🥘' },
  { name: '卤肉饭', emoji: '🍚' }, { name: '咖喱饭', emoji: '🍛' }, { name: '猪脚饭', emoji: '🐷' },
  { name: '烧腊饭', emoji: '🍖' }, { name: '扬州炒饭', emoji: '🍳' }, { name: '牛丼', emoji: '🥩' },
  { name: '鳗鱼饭', emoji: '🐟' }, { name: '叉烧饭', emoji: '🍖' },
  // 硬菜/炒菜
  { name: '酸菜鱼', emoji: '🐟' }, { name: '麻辣香锅', emoji: '🌶️' }, { name: '烤鱼', emoji: '🐠' },
  { name: '水煮肉片', emoji: '🥩' }, { name: '宫保鸡丁', emoji: '🥜' }, { name: '红烧排骨', emoji: '🦴' },
  { name: '回锅肉', emoji: '🥓' }, { name: '糖醋里脊', emoji: '🍖' }, { name: '鱼香肉丝', emoji: '🥕' },
  { name: '红烧肉', emoji: '🥩' }, { name: '地三鲜', emoji: '🍆' }, { name: '麻婆豆腐', emoji: '🧈' },
  { name: '京酱肉丝', emoji: '🥒' }, { name: '干煸四季豆', emoji: '🫛' }, { name: '辣子鸡', emoji: '🌶️' },
  { name: '葱爆羊肉', emoji: '🐑' }, { name: '东坡肉', emoji: '🍖' }, { name: '番茄牛腩', emoji: '🍅' },
  // 火锅/砂锅/汤
  { name: '小火锅', emoji: '🫕' }, { name: '串串香', emoji: '🍢' }, { name: '砂锅粥', emoji: '🥣' },
  { name: '酸汤肥牛', emoji: '🐮' }, { name: '毛血旺', emoji: '🩸' }, { name: '羊蝎子', emoji: '🐑' },
  { name: '寿喜锅', emoji: '🫕' }, { name: '部队锅', emoji: '🪖' }, { name: '疙瘩汤', emoji: '🥣' },
  // 小吃/点心
  { name: '饺子', emoji: '🥟' }, { name: '馄饨', emoji: '🥣' }, { name: '煎饼果子', emoji: '🥞' },
  { name: '生煎包', emoji: '🥟' }, { name: '小笼包', emoji: '🧆' }, { name: '肉夹馍', emoji: '🥙' },
  { name: '煎饼', emoji: '🫓' }, { name: '葱油饼', emoji: '🧅' }, { name: '鸡蛋灌饼', emoji: '🥚' },
  { name: '烤冷面', emoji: '🧊' }, { name: '关东煮', emoji: '🍢' }, { name: '肠粉', emoji: '🫔' },
  { name: '凉皮', emoji: '🥒' }, { name: '春卷', emoji: '🫔' }, { name: '烧卖', emoji: '🥟' },
  // 快餐/西式
  { name: '炸鸡汉堡', emoji: '🍔' }, { name: '披萨', emoji: '🍕' }, { name: '三明治', emoji: '🥪' },
  { name: '热狗', emoji: '🌭' }, { name: '薯条炸鸡', emoji: '🍗' }, { name: '塔可', emoji: '🌮' },
  { name: '卷饼', emoji: '🌯' }, { name: '芝士通心粉', emoji: '🧀' },
  // 日韩
  { name: '寿司', emoji: '🍣' }, { name: '拉面', emoji: '🍥' }, { name: '天妇罗', emoji: '🍤' },
  { name: '炸猪排', emoji: '🐷' }, { name: '韩式炸鸡', emoji: '🍗' }, { name: '辣炒年糕', emoji: '🫓' },
  { name: '大酱汤', emoji: '🫕' }, { name: '紫菜包饭', emoji: '🍙' },
  // 东南亚
  { name: '越南河粉', emoji: '🍜' }, { name: '冬阴功', emoji: '🦐' }, { name: '泰式炒河粉', emoji: '🍝' },
  { name: '海南鸡饭', emoji: '🐔' }, { name: '肉骨茶', emoji: '🍖' }, { name: '椰浆饭', emoji: '🥥' },
  // 轻食/健康
  { name: '轻食沙拉', emoji: '🥗' }, { name: '波奇饭', emoji: '🐟' }, { name: '藜麦碗', emoji: '🥬' },
  { name: '杂粮饭团', emoji: '🍙' }, { name: '酸奶碗', emoji: '🥣' },
  // 一日三餐
  { name: '豆浆油条', emoji: '🥖' }, { name: '豆腐脑', emoji: '🧈' }, { name: '粽子', emoji: '🫔' },
  { name: '沙县小吃', emoji: '🥟' },
];

const app = {
  currentPage: 'home',
  currentMode: 'recipe',
  currentData: null,
  currentCalorieData: null,
  selectedRecipes: new Set(),
  activePref: 'all',
  isSlotRolling: false,

  init() {
    this.bindElements();
    this.bindEvents();
    this.initTweaks();
    this.renderPage('home');
  },

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

      modeTabs: document.getElementById('modeTabs'),
      calorieLoadingState: document.getElementById('calorieLoadingState'),
      calorieResultContent: document.getElementById('calorieResultContent'),
      calorieSummary: document.getElementById('calorieSummary'),
      calorieItems: document.getElementById('calorieItems'),
      calorieAdvice: document.getElementById('calorieAdvice'),
      btnCalorieBack: document.getElementById('btnCalorieBack'),

      slotMachine: document.getElementById('slotMachine'),
      slotDisplay: document.getElementById('slotDisplay'),
      slotEmoji: document.getElementById('slotEmoji'),
      slotName: document.getElementById('slotName'),
      btnStartSlot: document.getElementById('btnStartSlot'),
      demos: document.querySelector('.demo-section'),
    };
  },

  bindEvents() {
    this.els.btnBack.addEventListener('click', () => this.goBack());
    this.els.uploadZone.addEventListener('click', () => this.els.fileInput.click());
    this.els.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    this.els.btnAnalyze.addEventListener('click', () => this.analyzeImage());

    this.els.demoCards.forEach((card) => {
      card.addEventListener('click', () => this.loadDemo(card.dataset.demo));
    });

    this.els.prefTags.addEventListener('click', (e) => {
      if (e.target.classList.contains('pref-tag')) this.setPref(e.target.dataset.pref);
    });

    this.els.recipeList.addEventListener('click', (e) => {
      const card = e.target.closest('.recipe-card');
      if (!card) return;
      if (!e.target.closest('.recipe-check-row')) card.classList.toggle('expanded');
    });

    this.els.recipeList.addEventListener('change', (e) => {
      if (e.target.classList.contains('recipe-check')) this.toggleRecipe(e.target.dataset.recipeId, e.target.checked);
    });

    this.els.btnShoppingList.addEventListener('click', () => this.goToShopping());
    this.els.btnGoBuy.addEventListener('click', () => this.goBuy());
    this.els.btnBackHome.addEventListener('click', () => { this.selectedRecipes.clear(); this.renderPage('home'); });

    this.els.modeTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.mode-tab');
      if (!tab) return;
      this.switchMode(tab.dataset.mode);
    });
    this.els.btnCalorieBack.addEventListener('click', () => this.renderPage('home'));

    this.els.btnStartSlot.addEventListener('click', () => this.startSlot());

    this.els.tweaksToggle.addEventListener('click', () => this.toggleTweaks());
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#tweaksPanel') && !e.target.closest('#tweaksToggle')) {
        this.els.tweaksPanel.classList.remove('open');
      }
    });
  },

  renderPage(pageName) {
    this.currentPage = pageName;
    this.els.pages.forEach((p) => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageName}`);
    if (target) target.classList.add('active');

    if (pageName === 'home') { this.els.btnBack.style.visibility = 'hidden'; this.els.navTitle.textContent = '饭来'; }
    else if (pageName === 'result') { this.els.btnBack.style.visibility = 'visible'; this.els.navTitle.textContent = '食材分析'; }
    else if (pageName === 'calorie') { this.els.btnBack.style.visibility = 'visible'; this.els.navTitle.textContent = '卡路里分析'; }
    else if (pageName === 'shopping') { this.els.btnBack.style.visibility = 'visible'; this.els.navTitle.textContent = '购物清单'; }
    this.els.pageContainer.scrollTop = 0;
  },

  goBack() {
    if (this.currentPage === 'result') { this.selectedRecipes.clear(); this.renderPage('home'); }
    else if (this.currentPage === 'calorie') this.renderPage('home');
    else if (this.currentPage === 'shopping') this.renderPage('result');
  },

  switchMode(mode) {
    this.currentMode = mode;
    const tabs = this.els.modeTabs.querySelectorAll('.mode-tab');
    tabs.forEach((t) => t.classList.remove('active'));
    const activeTab = this.els.modeTabs.querySelector(`[data-mode="${mode}"]`);
    if (activeTab) activeTab.classList.add('active');

    const isSlot = mode === 'slot';
    this.els.uploadZone.classList.toggle('hidden', isSlot);
    this.els.btnAnalyze.classList.toggle('hidden', isSlot);
    this.els.demos.classList.toggle('hidden', isSlot);
    this.els.slotMachine.classList.toggle('hidden', !isSlot);

    if (mode === 'calorie') this.els.btnAnalyze.textContent = '识别卡路里';
    else this.els.btnAnalyze.textContent = '识别食材';
  },

  startSlot() {
    if (this.isSlotRolling) return;
    this.isSlotRolling = true;
    const btn = this.els.btnStartSlot;
    btn.disabled = true;
    btn.textContent = '🎰 抽取中…';

    // Pick the winner first
    const winner = FOOD_WHEEL[Math.floor(Math.random() * FOOD_WHEEL.length)];

    // Build a sequence: random items then the winner at the end
    const totalSteps = 18 + Math.floor(Math.random() * 10);
    const sequence = [];
    for (let i = 0; i < totalSteps - 1; i++) {
      let item;
      do { item = FOOD_WHEEL[Math.floor(Math.random() * FOOD_WHEEL.length)]; } while (item === winner);
      sequence.push(item);
    }
    sequence.push(winner);

    // Spin with progressive deceleration
    let step = 0;
    const spin = () => {
      const item = sequence[step];
      this.els.slotEmoji.textContent = item.emoji;
      this.els.slotName.textContent = item.name;
      this.els.slotDisplay.classList.add('slot-spin');
      step++;

      if (step >= sequence.length) {
        // Done — reveal
        this.els.slotDisplay.classList.remove('slot-spin');
        this.els.slotDisplay.classList.add('slot-win');
        btn.textContent = '🎰 再抽一次';
        btn.disabled = false;
        this.isSlotRolling = false;
        setTimeout(() => this.els.slotDisplay.classList.remove('slot-win'), 600);
        return;
      }

      // Decelerating: start fast, get slower
      const progress = step / sequence.length;
      const delay = 50 + progress * progress * 350;
      setTimeout(spin, delay);
    };
    spin();
  },

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

  // 拍照识别 → 根据模式调用不同API
  async analyzeImage() {
    if (this.currentMode === 'calorie') {
      this.analyzeCalorie();
      return;
    }
    const hasPhoto = this.els.previewImage.src && !this.els.previewContainer.classList.contains('hidden');
    this.showResult();
    if (hasPhoto) {
      try {
        this.currentData = await this.callQwenAPI(this.els.previewImage.src);
      } catch (err) {
        console.error('API调用失败，降级模拟数据', err);
        const keys = Object.keys(MOCK_DATA);
        this.currentData = MOCK_DATA[keys[Math.floor(Math.random() * keys.length)]];
        this.showToast('AI识别超时，已为你推荐备选菜谱');
      }
      this.renderResult();
    } else {
      setTimeout(() => {
        const keys = Object.keys(MOCK_DATA);
        this.currentData = MOCK_DATA[keys[Math.floor(Math.random() * keys.length)]];
        this.renderResult();
      }, 1800 + Math.random() * 800);
    }
  },

  // 卡路里识别
  async analyzeCalorie() {
    this.renderPage('calorie');
    this.els.calorieLoadingState.classList.remove('hidden');
    this.els.calorieResultContent.classList.add('hidden');
    this.els.pageContainer.scrollTop = 0;

    const hasPhoto = this.els.previewImage.src && !this.els.previewContainer.classList.contains('hidden');
    if (hasPhoto) {
      try {
        this.currentCalorieData = await this.callQwenCalorieAPI(this.els.previewImage.src);
      } catch (err) {
        console.error('卡路里API失败，降级模拟', err);
        const keys = Object.keys(CALORIE_MOCK_DATA);
        this.currentCalorieData = CALORIE_MOCK_DATA[keys[Math.floor(Math.random() * keys.length)]];
        this.showToast('AI识别超时，已为你估算热量数据');
      }
    } else {
      await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800));
      const keys = Object.keys(CALORIE_MOCK_DATA);
      this.currentCalorieData = CALORIE_MOCK_DATA[keys[Math.floor(Math.random() * keys.length)]];
    }
    this.renderCalorie();
  },

  // 演示场景 → 使用模拟数据
  loadDemo(key) {
    this.currentData = MOCK_DATA[key];
    if (!this.currentData) return;
    this.showResult();
    setTimeout(() => this.renderResult(), 1800 + Math.random() * 800);
  },

  showResult() {
    this.renderPage('result');
    this.selectedRecipes.clear();
    this.activePref = 'all';
    this.els.loadingState.classList.remove('hidden');
    this.els.resultContent.classList.add('hidden');
    this.els.pageContainer.scrollTop = 0;
  },

  renderResult() {
    this.els.loadingState.classList.add('hidden');
    this.els.resultContent.classList.remove('hidden');
    this.renderIngredients();
    this.renderRecipes('all');
    this.resetPrefTags();
    this.els.btnShoppingList.disabled = false;
  },

  // ---------- 通用 Vision API 调用 ----------
  // 自动适配：Vercel → 代理格式；EdgeOne → 直连Qwen
  async callVisionAPI(imageBase64, prompt) {
    const cfg = API_CONFIG.vision;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let url, headers, body;
    if (cfg.isProxy) {
      url = cfg.endpoint;
      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify({ image: imageBase64, prompt });
    } else {
      url = cfg.endpoint;
      headers = {
        'Authorization': `Bearer ${cfg.apiKey}`,
        'Content-Type': 'application/json',
      };
      body = JSON.stringify({
        model: cfg.model,
        input: { messages: [{ role: 'user', content: [{ image: imageBase64 }, { text: prompt }] }] },
        parameters: { temperature: 0.4 },
      });
    }

    try {
      const res = await fetch(url, { method: 'POST', headers, body, signal: controller.signal });
      if (!res.ok) throw new Error(`API ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timeout);
    }
  },

  // ---------- 通义千问 VL API ----------
  async callQwenAPI(imageDataUrl) {
    const loadingText = document.querySelector('.loading-text');
    const loadingSub = document.querySelector('.loading-sub');
    if (loadingText) loadingText.textContent = '正在识别食材…';
    if (loadingSub) loadingSub.textContent = '分析搭配方案，生成推荐菜谱';

    const compressed = await this.compressImage(imageDataUrl, 768);
    const prompt = `你是一个专业的中餐厨师和营养师。请先仔细识别图片中实际可见的食材，然后基于这些食材推荐菜谱。

重要：只列出图中确实存在的食材，不要编造不存在的食材。缺少的调料可以列入missing。

为每个食材提供：名称、emoji、新鲜度（新鲜/需尽快食用/充足）、数量。
每道菜包含：id、菜名、emoji、烹饪时间、难度、卡路里、标签、match（已有食材）、missing（缺少食材）、steps（3-5步）。

纯JSON返回：
{
  "ingredients": [{"name": "鸡蛋", "emoji": "🥚", "freshness": "新鲜", "amount": "6个"}],
  "recipes": [{"id": "r1", "name": "西红柿炒鸡蛋", "emoji": "🍳", "time": "10分钟", "difficulty": "简单", "calories": "180千卡", "tags": ["快手菜"], "match": ["鸡蛋"], "missing": ["西红柿"], "steps": ["打散鸡蛋加盐搅匀", "热油倒入蛋液炒至凝固盛出", "翻炒西红柿出汁后倒回鸡蛋", "加盐调味出锅"]}]
}`;

    const data = await this.callVisionAPI(compressed, prompt);
    return this.parseAPIResponse(data);
  },

  parseAPIResponse(data) {
    const content = data?.output?.choices?.[0]?.message?.content;
    const text = Array.isArray(content)
      ? content.filter(c => c.text).map(c => c.text).join('')
      : (typeof content === 'string' ? content : '');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    if (!parsed.ingredients?.length || !parsed.recipes?.length) throw new Error('响应不完整');
    parsed.recipes = parsed.recipes.map((r, i) => ({ ...r, id: r.id || `r${i + 1}` }));
    return parsed;
  },

  compressImage(dataUrl, maxSize) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > height) { if (width > maxSize) { height *= maxSize / width; width = maxSize; } }
        else { if (height > maxSize) { width *= maxSize / height; height = maxSize; } }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = dataUrl;
    });
  },

  // ---------- 卡路里 API ----------
  async callQwenCalorieAPI(imageDataUrl) {
    const compressed = await this.compressImage(imageDataUrl, 768);
    const prompt = `你是一个专业的营养师。请识别这张照片中的所有食物，并为每种食物估算营养数据。

照片可能包含：一道或多道菜品、一顿正餐、外卖、沙拉、火锅、零食等。请逐一识别并估算。

为每种食物提供：名称、emoji、热量(千卡)、蛋白质(g)、碳水化合物(g)、脂肪(g)、份量描述。
同时计算总量并给出简短膳食建议（50字以内）。
不要编造不存在的食物，只列图中确实可见的。

纯JSON返回：
{
  "totalCalories": 850, "totalProtein": 42, "totalCarbs": 115, "totalFat": 28,
  "items": [{"name": "米饭", "emoji": "🍚", "calories": 280, "protein": 6, "carbs": 62, "fat": 1, "portion": "约200g"}],
  "advice": "碳水摄入偏高，建议米饭减半或替换为杂粮。"
}`;

    const data = await this.callVisionAPI(compressed, prompt);
    const content = data?.output?.choices?.[0]?.message?.content;
    const text = Array.isArray(content)
      ? content.filter(c => c.text).map(c => c.text).join('')
      : (typeof content === 'string' ? content : '');
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  },

  renderCalorie() {
    this.els.calorieLoadingState.classList.add('hidden');
    this.els.calorieResultContent.classList.remove('hidden');
    const d = this.currentCalorieData;

    // Summary
    this.els.calorieSummary.innerHTML = `
      <div class="calorie-total">${d.totalCalories}<span class="calorie-total-unit"> 千卡</span></div>
      <div class="calorie-macros">
        <div class="calorie-macro"><div class="calorie-macro-val">${d.totalProtein}g</div><div class="calorie-macro-label">蛋白质</div></div>
        <div class="calorie-macro"><div class="calorie-macro-val">${d.totalCarbs}g</div><div class="calorie-macro-label">碳水</div></div>
        <div class="calorie-macro"><div class="calorie-macro-val">${d.totalFat}g</div><div class="calorie-macro-label">脂肪</div></div>
      </div>`;

    // Items with bars
    const maxNutrient = Math.max(
      ...d.items.map((i) => Math.max(i.protein, i.carbs, i.fat)),
      1
    );
    const barColor = (type) => type === 'protein' ? '#6CB4A1' : type === 'carbs' ? '#E8B87C' : '#D9795B';
    const renderBar = (val, label, type) => `
      <div class="calorie-item-bar" title="${label}: ${val}g">
        <div class="calorie-item-bar-fill" style="width:${(val / maxNutrient) * 100}%;background:${barColor(type)};"></div>
      </div>
      <span style="font-size:11px;color:var(--claude-fg-secondary);">${label}</span>`;

    this.els.calorieItems.innerHTML = d.items.map((item) => `
      <div class="calorie-item">
        <div class="calorie-item-emoji">${item.emoji}</div>
        <div class="calorie-item-info">
          <div class="calorie-item-name">${item.name}<span style="font-weight:400;font-size:12px;color:var(--claude-fg-secondary);margin-left:6px;">${item.portion}</span></div>
          <div style="display:flex;gap:12px;">
            <div style="flex:1;">${renderBar(item.protein, '蛋白', 'protein')}</div>
            <div style="flex:1;">${renderBar(item.carbs, '碳水', 'carbs')}</div>
            <div style="flex:1;">${renderBar(item.fat, '脂肪', 'fat')}</div>
          </div>
        </div>
        <div class="calorie-item-cals">${item.calories}<small>千卡</small></div>
      </div>`).join('');

    // Advice
    this.els.calorieAdvice.innerHTML = `<h4>💡 膳食建议</h4><p>${d.advice}</p>`;
    this.els.pageContainer.scrollTop = 0;
  },

  renderIngredients() {
    const ingredients = this.currentData.ingredients;
    this.els.ingredientCount.textContent = `${ingredients.length}种`;
    const fc = (f) => { if (f === '新鲜') return 'fresh'; if (f.includes('尽快')) return 'soon'; return 'plenty'; };
    this.els.ingredientGrid.innerHTML = ingredients.map((item) => `
      <div class="ingredient-tag"><span class="emoji">${item.emoji}</span>${item.name}<span class="freshness ${fc(item.freshness)}">· ${item.freshness}</span></div>`).join('');
  },

  renderRecipes(pref) {
    let recipes = this.currentData.recipes;
    if (pref === 'quick') recipes = recipes.filter((r) => r.tags.includes('快手菜'));
    else if (pref === 'lowfat') recipes = recipes.filter((r) => r.tags.includes('减脂') || r.tags.includes('轻食'));
    else if (pref === 'soup') recipes = recipes.filter((r) => r.tags.includes('汤羹'));
    else if (pref === 'hearty') recipes = recipes.filter((r) => r.tags.includes('硬菜'));
    const mc = ['r1','r2','r3','r4']; let mi = 0;
    this.els.recipeList.innerHTML = recipes.map((r) => {
      const cls = mc[mi++ % 4]; const sel = this.selectedRecipes.has(r.id);
      return `<div class="recipe-card ${sel ? 'selected expanded' : ''}">
        <div class="recipe-media ${cls}">${r.emoji}</div>
        <div class="recipe-info">
          <div class="recipe-name">${r.name}</div>
          <div class="recipe-meta"><span class="meta-time">${r.time}</span><span class="meta-diff">${r.difficulty}</span><span class="meta-cal">${r.calories}</span></div>
          <div class="recipe-ingredients">
            <span class="recipe-match">已有：${r.match.join('、')}</span>
            ${r.missing.length ? `<br><span class="recipe-missing">缺少：${r.missing.join('、')}</span>` : `<br><span class="recipe-ok">食材齐全</span>`}
          </div>
          <div class="recipe-expand">
            <div class="recipe-steps"><ol>${r.steps.map((s) => `<li>${s}</li>`).join('')}</ol></div>
            <label class="recipe-check-row"><input type="checkbox" class="recipe-check" data-recipe-id="${r.id}" ${sel ? 'checked' : ''}>加入菜谱计划</label>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  setPref(pref) {
    this.activePref = pref;
    const tags = this.els.prefTags.querySelectorAll('.pref-tag');
    tags.forEach((t) => t.classList.remove('active'));
    const tgt = this.els.prefTags.querySelector(`[data-pref="${pref}"]`);
    if (tgt) tgt.classList.add('active');
    this.renderRecipes(pref);
  },

  resetPrefTags() {
    const tags = this.els.prefTags.querySelectorAll('.pref-tag');
    tags.forEach((t) => t.classList.remove('active'));
    const first = this.els.prefTags.querySelector('[data-pref="all"]');
    if (first) first.classList.add('active');
  },

  toggleRecipe(recipeId, checked) { if (checked) this.selectedRecipes.add(recipeId); else this.selectedRecipes.delete(recipeId); },

  goToShopping() {
    if (this.selectedRecipes.size === 0) this.currentData.recipes.forEach((r) => this.selectedRecipes.add(r.id));
    this.renderPage('shopping');
    this.renderShoppingList();
  },

  renderShoppingList() {
    const allRecipes = this.currentData.recipes;
    const missingMap = new Map(); const selectedRecipeList = [];
    allRecipes.forEach((r) => { if (this.selectedRecipes.has(r.id)) { selectedRecipeList.push(r); r.missing.forEach((m) => missingMap.set(m, (missingMap.get(m) || 0) + 1)); } });
    const missingArr = Array.from(missingMap.entries());
    this.els.missingCount.textContent = `${missingArr.length}种`;
    if (missingArr.length === 0) {
      this.els.shoppingList.innerHTML = '<div class="empty-state"><div class="empty-icon">🎉</div><div class="empty-text">食材齐全</div><div class="empty-hint">不需要额外购买，开始做饭吧</div></div>';
    } else {
      this.els.shoppingList.innerHTML = missingArr.map(([name, count]) => `
        <div class="shopping-item"><div class="shopping-icon missing">🛒</div><div class="shopping-info"><div class="shopping-name">${name}</div><div class="shopping-amount">${count}道菜需要</div></div><div class="shopping-check" data-item="${name}"></div></div>`).join('');
    }
    this.els.haveList.innerHTML = this.currentData.ingredients.map((item) => `
      <div class="shopping-item"><div class="shopping-icon have">${item.emoji}</div><div class="shopping-info"><div class="shopping-name">${item.name}</div><div class="shopping-amount">${item.amount} · ${item.freshness}</div></div></div>`).join('');
    this.els.selectedRecipesEl.innerHTML = selectedRecipeList.map((r) => `
      <div class="shopping-item"><div class="shopping-icon recipe">${r.emoji}</div><div class="shopping-info"><div class="shopping-name">${r.name}</div><div class="shopping-amount">${r.time} · ${r.difficulty} · ${r.calories}</div></div></div>`).join('');
    this.els.shoppingList.onclick = (e) => { const c = e.target.closest('.shopping-check'); if (c) c.classList.toggle('checked'); };
  },

  goBuy() {
    const allRecipes = this.currentData.recipes; const missingItems = [];
    allRecipes.forEach((r) => { if (this.selectedRecipes.has(r.id)) r.missing.forEach((m) => missingItems.push(m)); });
    if (missingItems.length === 0) { this.showToast('食材齐全，开始做饭吧'); return; }
    const query = missingItems.join(' ');
    const xiaoxiangUrl = `https://i.meituan.com/aisearch?keyword=${encodeURIComponent(query)}`;
    const pupuUrl = `https://m.pupumall.com/#/search/${encodeURIComponent(query)}`;
    const overlay = document.createElement('div'); overlay.className = 'sheet-overlay';
    overlay.innerHTML = `<div class="sheet"><div class="sheet-handle"></div><h4>选择买菜平台</h4><p class="sheet-subtitle">将搜索：${query}</p><button class="btn btn-accent" id="sheetXiaoxiang">小象超市</button><button class="btn btn-outline" id="sheetPupu">朴朴超市</button><button class="sheet-cancel" id="sheetCancel">取消</button></div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#sheetCancel').addEventListener('click', close);
    overlay.querySelector('#sheetXiaoxiang').addEventListener('click', () => { window.open(xiaoxiangUrl, '_blank'); close(); });
    overlay.querySelector('#sheetPupu').addEventListener('click', () => { window.open(pupuUrl, '_blank'); close(); });
  },

  showToast(msg) {
    const toast = document.createElement('div'); toast.className = 'toast-msg'; toast.textContent = msg;
    document.body.appendChild(toast); setTimeout(() => toast.remove(), 2200);
  },

  // ---------- Tweaks (Claude palette) ----------
  initTweaks() {
    const themeBtns = this.els.tweaksPanel.querySelectorAll('[data-theme]');
    themeBtns.forEach((btn) => { btn.addEventListener('click', () => { themeBtns.forEach((b) => b.classList.remove('active')); btn.classList.add('active'); this.applyTheme(btn.dataset.theme); }); });
    const radiusBtns = this.els.tweaksPanel.querySelectorAll('[data-radius]');
    radiusBtns.forEach((btn) => { btn.addEventListener('click', () => { radiusBtns.forEach((b) => b.classList.remove('active')); btn.classList.add('active'); this.applyRadius(btn.dataset.radius); }); });
  },

  toggleTweaks() { this.els.tweaksPanel.classList.toggle('open'); },

  applyTheme(theme) {
    const root = document.documentElement;
    const themes = {
      terracotta: { warm: '#D9795B', warmHover: '#C5684A', warmLight: '#FDF0EA', gold: '#E8B87C', goldLight: '#FEF8F0' },
      olive:      { warm: '#5C9E6D', warmHover: '#4A8A5A', warmLight: '#EDF6EF', gold: '#C4A86C', goldLight: '#FDF8F0' },
      plum:       { warm: '#8B5C7E', warmHover: '#7A4D6E', warmLight: '#F5EEF3', gold: '#D4A89C', goldLight: '#FDF6F4' },
    };
    const t = themes[theme] || themes.terracotta;
    root.style.setProperty('--claude-warm', t.warm);
    root.style.setProperty('--claude-warm-hover', t.warmHover);
    root.style.setProperty('--claude-warm-light', t.warmLight);
    root.style.setProperty('--claude-gold', t.gold);
    root.style.setProperty('--claude-gold-light', t.goldLight);
  },

  applyRadius(radius) {
    const root = document.documentElement;
    if (radius === 'sharp') {
      root.style.setProperty('--r-xs', '3px'); root.style.setProperty('--r-sm', '6px');
      root.style.setProperty('--r-md', '8px'); root.style.setProperty('--r-lg', '10px');
      root.style.setProperty('--r-xl', '12px');
    } else {
      root.style.setProperty('--r-xs', '8px'); root.style.setProperty('--r-sm', '12px');
      root.style.setProperty('--r-md', '16px'); root.style.setProperty('--r-lg', '20px');
      root.style.setProperty('--r-xl', '24px');
    }
  },
};

document.addEventListener('DOMContentLoaded', () => app.init());
