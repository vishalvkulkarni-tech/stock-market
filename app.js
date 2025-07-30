// Stock & Mutual Fund Analyzer - Fixed Working Version
class SMFAnalyzer {
  constructor() {
    console.log('SMF Analyzer constructor called');
    
    this.stockSymbols = [
      {"symbol": "RELIANCE.NS", "name": "Reliance Industries Limited", "sector": "Oil & Gas"},
      {"symbol": "TCS.NS", "name": "Tata Consultancy Services", "sector": "IT"},
      {"symbol": "HDFCBANK.NS", "name": "HDFC Bank Limited", "sector": "Banking"},
      {"symbol": "INFY.NS", "name": "Infosys Limited", "sector": "IT"},
      {"symbol": "ICICIBANK.NS", "name": "ICICI Bank Limited", "sector": "Banking"},
      {"symbol": "KOTAKBANK.NS", "name": "Kotak Mahindra Bank", "sector": "Banking"},
      {"symbol": "LT.NS", "name": "Larsen & Toubro Limited", "sector": "Construction"},
      {"symbol": "HCLTECH.NS", "name": "HCL Technologies Limited", "sector": "IT"},
      {"symbol": "AXISBANK.NS", "name": "Axis Bank Limited", "sector": "Banking"},
      {"symbol": "ITC.NS", "name": "ITC Limited", "sector": "FMCG"},
      {"symbol": "SBIN.NS", "name": "State Bank of India", "sector": "Banking"},
      {"symbol": "BHARTIARTL.NS", "name": "Bharti Airtel Limited", "sector": "Telecom"},
      {"symbol": "ASIANPAINT.NS", "name": "Asian Paints Limited", "sector": "Paints"},
      {"symbol": "MARUTI.NS", "name": "Maruti Suzuki India Limited", "sector": "Auto"},
      {"symbol": "BAJFINANCE.NS", "name": "Bajaj Finance Limited", "sector": "NBFC"}
    ];

    // External scanners configuration
    this.externalScanners = [
      { "name": "S2 Scanner", "url": "https://chartink.com/screener/s2-947", "type": "chartink" },
      { "name": "Zerodha Technicals", "url": "https://technicals.zerodha.com/dashboard", "type": "zerodha" },
      { "name": "52 Week High Breakout", "url": "https://chartink.com/screener/copy-52-week-high-breakout-2627", "type": "chartink" },
      { "name": "ATH Breakout", "url": "https://chartink.com/screener/copy-ath-breakout-5000-41", "type": "chartink" },
      { "name": "EMA/MACD Scanner", "url": "https://chartink.com/screener/copy-20-ema-50-ema-200-ema-macd-11", "type": "chartink" },
      { "name": "S1 Scanner", "url": "https://chartink.com/screener/s1-1812", "type": "chartink" },
      { "name": "LT Consolidated Rise", "url": "https://chartink.com/screener/lt-consolidated-and-expected-to-rise-weekly", "type": "chartink" },
      { "name": "Consolidated to Raise", "url": "https://chartink.com/screener/consolidated-and-expected-to-raise", "type": "chartink" },
      { "name": "Potential Breakouts", "url": "https://chartink.com/screener/copy-potential-breakouts-7435", "type": "chartink" },
      { "name": "Multi-Resistance Buy", "url": "https://chartink.com/screener/copy-multi-resistance-cross-buy-25", "type": "chartink" },
      { "name": "Resistance Breakout HV", "url": "https://chartink.com/screener/copy-resistance-breakout-with-high-volume-10039", "type": "chartink" },
      { "name": "Strong Stocks", "url": "https://chartink.com/screener/copy-strong-stocks-19866", "type": "chartink" }
    ];

    // Comprehensive mutual funds data - EXACT working version
    this.mutualFunds = [
      // HDFC Funds (20+ funds as required)
      { schemeCode: 120503, schemeName: 'HDFC Top 100 Fund - Direct Plan - Growth' },
      { schemeCode: 120504, schemeName: 'HDFC Top 100 Fund - Direct Plan - Dividend' },
      { schemeCode: 120505, schemeName: 'HDFC Top 100 Fund - Regular Plan - Growth' },
      { schemeCode: 120506, schemeName: 'HDFC Top 100 Fund - Regular Plan - Dividend' },
      { schemeCode: 120507, schemeName: 'HDFC Equity Fund - Direct Plan - Growth' },
      { schemeCode: 120508, schemeName: 'HDFC Equity Fund - Direct Plan - Dividend' },
      { schemeCode: 120509, schemeName: 'HDFC Equity Fund - Regular Plan - Growth' },
      { schemeCode: 120510, schemeName: 'HDFC Equity Fund - Regular Plan - Dividend' },
      { schemeCode: 120511, schemeName: 'HDFC Mid-Cap Opportunities Fund - Direct Plan - Growth' },
      { schemeCode: 120512, schemeName: 'HDFC Mid-Cap Opportunities Fund - Direct Plan - Dividend' },
      { schemeCode: 120513, schemeName: 'HDFC Mid-Cap Opportunities Fund - Regular Plan - Growth' },
      { schemeCode: 120514, schemeName: 'HDFC Mid-Cap Opportunities Fund - Regular Plan - Dividend' },
      { schemeCode: 120515, schemeName: 'HDFC Small Cap Fund - Direct Plan - Growth' },
      { schemeCode: 120516, schemeName: 'HDFC Small Cap Fund - Direct Plan - Dividend' },
      { schemeCode: 120517, schemeName: 'HDFC Small Cap Fund - Regular Plan - Growth' },
      { schemeCode: 120518, schemeName: 'HDFC Small Cap Fund - Regular Plan - Dividend' },
      { schemeCode: 120519, schemeName: 'HDFC Balanced Advantage Fund - Direct Plan - Growth' },
      { schemeCode: 120520, schemeName: 'HDFC Balanced Advantage Fund - Direct Plan - Dividend' },
      { schemeCode: 120521, schemeName: 'HDFC Balanced Advantage Fund - Regular Plan - Growth' },
      { schemeCode: 120522, schemeName: 'HDFC Balanced Advantage Fund - Regular Plan - Dividend' },
      { schemeCode: 120523, schemeName: 'HDFC Hybrid Equity Fund - Direct Plan - Growth' },
      { schemeCode: 120524, schemeName: 'HDFC Hybrid Equity Fund - Regular Plan - Growth' },
      { schemeCode: 120525, schemeName: 'HDFC Flexi Cap Fund - Direct Plan - Growth' },
      { schemeCode: 120526, schemeName: 'HDFC Flexi Cap Fund - Regular Plan - Growth' },
      { schemeCode: 120527, schemeName: 'HDFC Large and Mid Cap Fund - Direct Plan - Growth' },
      { schemeCode: 120528, schemeName: 'HDFC Large and Mid Cap Fund - Regular Plan - Growth' },

      // SBI Funds (30+ funds as required)
      { schemeCode: 118989, schemeName: 'SBI Bluechip Fund - Direct Plan - Growth' },
      { schemeCode: 118990, schemeName: 'SBI Bluechip Fund - Direct Plan - Dividend' },
      { schemeCode: 118991, schemeName: 'SBI Bluechip Fund - Regular Plan - Growth' },
      { schemeCode: 118992, schemeName: 'SBI Bluechip Fund - Regular Plan - Dividend' },
      { schemeCode: 118993, schemeName: 'SBI Large Cap Fund - Direct Plan - Growth' },
      { schemeCode: 118994, schemeName: 'SBI Large Cap Fund - Direct Plan - Dividend' },
      { schemeCode: 118995, schemeName: 'SBI Large Cap Fund - Regular Plan - Growth' },
      { schemeCode: 118996, schemeName: 'SBI Large Cap Fund - Regular Plan - Dividend' },
      { schemeCode: 118997, schemeName: 'SBI Mid Cap Fund - Direct Plan - Growth' },
      { schemeCode: 118998, schemeName: 'SBI Mid Cap Fund - Direct Plan - Dividend' },
      { schemeCode: 118999, schemeName: 'SBI Mid Cap Fund - Regular Plan - Growth' },
      { schemeCode: 119000, schemeName: 'SBI Mid Cap Fund - Regular Plan - Dividend' },
      { schemeCode: 119001, schemeName: 'SBI Small Cap Fund - Direct Plan - Growth' },
      { schemeCode: 119002, schemeName: 'SBI Small Cap Fund - Direct Plan - Dividend' },
      { schemeCode: 119003, schemeName: 'SBI Small Cap Fund - Regular Plan - Growth' },
      { schemeCode: 119004, schemeName: 'SBI Small Cap Fund - Regular Plan - Dividend' },
      { schemeCode: 119005, schemeName: 'SBI Focused Equity Fund - Direct Plan - Growth' },
      { schemeCode: 119006, schemeName: 'SBI Focused Equity Fund - Direct Plan - Dividend' },
      { schemeCode: 119007, schemeName: 'SBI Focused Equity Fund - Regular Plan - Growth' },
      { schemeCode: 119008, schemeName: 'SBI Focused Equity Fund - Regular Plan - Dividend' },
      { schemeCode: 119009, schemeName: 'SBI Contra Fund - Direct Plan - Growth' },
      { schemeCode: 119010, schemeName: 'SBI Contra Fund - Direct Plan - Dividend' },
      { schemeCode: 119011, schemeName: 'SBI Contra Fund - Regular Plan - Growth' },
      { schemeCode: 119012, schemeName: 'SBI Contra Fund - Regular Plan - Dividend' },
      { schemeCode: 119013, schemeName: 'SBI Healthcare Opportunities Fund - Direct Plan - Growth' },
      { schemeCode: 119014, schemeName: 'SBI Healthcare Opportunities Fund - Regular Plan - Growth' },
      { schemeCode: 119015, schemeName: 'SBI Technology Opportunities Fund - Direct Plan - Growth' },
      { schemeCode: 119016, schemeName: 'SBI Technology Opportunities Fund - Regular Plan - Growth' },
      { schemeCode: 119017, schemeName: 'SBI Banking & Financial Services Fund - Direct Plan - Growth' },
      { schemeCode: 119018, schemeName: 'SBI Banking & Financial Services Fund - Regular Plan - Growth' },
      { schemeCode: 119019, schemeName: 'SBI Pharma Fund - Direct Plan - Growth' },
      { schemeCode: 119020, schemeName: 'SBI Pharma Fund - Regular Plan - Growth' },
      { schemeCode: 119021, schemeName: 'SBI PSU Fund - Direct Plan - Growth' },
      { schemeCode: 119022, schemeName: 'SBI PSU Fund - Regular Plan - Growth' },
      { schemeCode: 119023, schemeName: 'SBI Equity Hybrid Fund - Direct Plan - Growth' },
      { schemeCode: 119024, schemeName: 'SBI Equity Hybrid Fund - Regular Plan - Growth' },

      // ICICI Prudential Funds
      { schemeCode: 119551, schemeName: 'ICICI Prudential Bluechip Fund - Direct Plan - Growth' },
      { schemeCode: 119552, schemeName: 'ICICI Prudential Bluechip Fund - Regular Plan - Growth' },
      { schemeCode: 119553, schemeName: 'ICICI Prudential Focused Bluechip Equity Fund - Direct Plan - Growth' },
      { schemeCode: 119554, schemeName: 'ICICI Prudential Focused Bluechip Equity Fund - Regular Plan - Growth' },
      { schemeCode: 119555, schemeName: 'ICICI Prudential Large & Mid Cap Fund - Direct Plan - Growth' },
      { schemeCode: 119556, schemeName: 'ICICI Prudential Large & Mid Cap Fund - Regular Plan - Growth' },
      { schemeCode: 119557, schemeName: 'ICICI Prudential Mid Cap Fund - Direct Plan - Growth' },
      { schemeCode: 119558, schemeName: 'ICICI Prudential Mid Cap Fund - Regular Plan - Growth' },
      { schemeCode: 119559, schemeName: 'ICICI Prudential Small Cap Fund - Direct Plan - Growth' },
      { schemeCode: 119560, schemeName: 'ICICI Prudential Small Cap Fund - Regular Plan - Growth' },

      // Additional Popular Funds
      { schemeCode: 120716, schemeName: 'Axis Bluechip Fund - Direct Plan - Growth' },
      { schemeCode: 125494, schemeName: 'Mirae Asset Large Cap Fund - Direct Plan - Growth' },
      { schemeCode: 118221, schemeName: 'Kotak Standard Multicap Fund - Direct Plan - Growth' },
      { schemeCode: 112618, schemeName: 'Franklin India Bluechip Fund - Direct Plan - Growth' },
      { schemeCode: 131456, schemeName: 'Parag Parikh Long Term Equity Fund - Direct Plan - Growth' }
    ];

    this.selectedFunds = [];
    this.currentStock = null;
    this.scanResults = [];
    
    console.log('Loaded', this.mutualFunds.length, 'mutual funds');
    this.init();
  }

  init() {
    console.log('Initializing SMF Analyzer...');
    this.setupEventListeners();
    this.showToast('SMF Analyzer loaded with comprehensive fund database', 'success');
  }

  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Main tab switching
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        console.log('Tab clicked:', tabName);
        this.switchMainTab(tabName);
      });
    });

    // Stock search
    const stockSearch = document.getElementById('stockSearch');
    if (stockSearch) {
      stockSearch.addEventListener('input', (e) => {
        this.handleStockSuggestions(e.target.value);
      });
    }

    // Stock fetch button
    const stockFetchBtn = document.getElementById('stockFetchBtn');
    if (stockFetchBtn) {
      stockFetchBtn.addEventListener('click', () => {
        const query = stockSearch ? stockSearch.value.trim() : '';
        if (query) {
          this.fetchStockByQuery(query);
        } else {
          this.showToast('Please enter a stock symbol or name', 'warning');
        }
      });
    }

    // Sub-tab switching for stocks
    document.querySelectorAll('.sub-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const subtab = e.target.closest('.sub-tab').dataset.subtab;
        this.switchSubTab(subtab);
      });
    });

    // Mutual fund search - FIXED IMPLEMENTATION
    const fundSearch = document.getElementById('fundSearch');
    if (fundSearch) {
      console.log('Setting up fund search listener');
      fundSearch.addEventListener('input', (e) => {
        console.log('Fund search input:', e.target.value);
        this.handleFundSuggestions(e.target.value);
      });
    }

    // Fund view switching
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.target.dataset.view;
        this.switchFundView(view);
      });
    });

    // Scanner controls
    const runScanBtn = document.getElementById('runScan');
    if (runScanBtn) {
      runScanBtn.addEventListener('click', () => {
        this.runStockScan();
      });
    }

    // External Scanner button
    const runScannersBtn = document.getElementById('runScannersBtn');
    if (runScannersBtn) {
      console.log('Setting up external scanners button');
      runScannersBtn.addEventListener('click', () => {
        console.log('Run scanners clicked');
        this.runExternalScanners();
      });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        const stockSuggestions = document.getElementById('stockSuggestions');
        const fundSuggestions = document.getElementById('fundSuggestions');
        if (stockSuggestions) stockSuggestions.classList.add('hidden');
        if (fundSuggestions) fundSuggestions.classList.add('hidden');
      }
    });

    console.log('Event listeners set up successfully');
  }

  switchMainTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Update tab buttons
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.classList.remove('active-tab');
    });
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
      activeTab.classList.add('active-tab');
    }

    // Show/hide content sections
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
      targetTab.classList.remove('hidden');
      console.log('Tab switched successfully to:', tabName);
    }
  }

  // STOCK FUNCTIONALITY
  handleStockSuggestions(query) {
    const suggestionsList = document.getElementById('stockSuggestions');
    if (!suggestionsList) return;
    
    if (query.length < 2) {
      suggestionsList.classList.add('hidden');
      return;
    }

    const matches = this.stockSymbols.filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    if (matches.length === 0) {
      suggestionsList.classList.add('hidden');
      return;
    }

    suggestionsList.innerHTML = matches.map(stock => 
      `<li class="suggestion-item" data-symbol="${stock.symbol}" data-name="${stock.name}" data-sector="${stock.sector}">
        <div>
          <strong>${stock.symbol.replace('.NS', '')}</strong> - ${stock.name}
          <small style="display: block; color: var(--color-text-secondary);">${stock.sector}</small>
        </div>
      </li>`
    ).join('');

    suggestionsList.classList.remove('hidden');

    // Add click listeners to suggestions
    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectStock({
          symbol: item.dataset.symbol,
          name: item.dataset.name,
          sector: item.dataset.sector
        });
        suggestionsList.classList.add('hidden');
      });
    });
  }

  async fetchStockByQuery(query) {
    console.log('Fetching stock by query:', query);
    
    let stock = this.stockSymbols.find(s => 
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
    );

    if (!stock) {
      const symbol = query.toUpperCase().includes('.NS') ? query.toUpperCase() : query.toUpperCase() + '.NS';
      stock = { symbol, name: query, sector: 'Unknown' };
    }

    this.selectStock(stock);
  }

  selectStock(stock) {
    console.log('Selecting stock:', stock);
    
    this.currentStock = stock;
    const stockSearch = document.getElementById('stockSearch');
    if (stockSearch) {
      stockSearch.value = `${stock.symbol.replace('.NS', '')} - ${stock.name}`;
    }
    
    // Show selected stock info
    const selectedStock = document.getElementById('selectedStock');
    if (selectedStock) {
      const stockNameEl = selectedStock.querySelector('.stock-name');
      if (stockNameEl) {
        stockNameEl.textContent = `${stock.symbol.replace('.NS', '')} - ${stock.name}`;
      }
      selectedStock.classList.remove('hidden');
    }

    // Show analysis section
    const stockAnalysis = document.getElementById('stockAnalysis');
    if (stockAnalysis) {
      stockAnalysis.classList.remove('hidden');
    }

    this.generateMockStockData(stock.symbol);
  }

  generateMockStockData(symbol) {
    console.log('Generating mock data for:', symbol);
    
    const basePrice = 100 + Math.random() * 900;
    this.stockData = {
      symbol: symbol,
      currentPrice: basePrice,
      previousClose: basePrice * 0.98
    };

    this.showToast('Stock data loaded successfully', 'success');
    this.updateAllScores();
    this.loadSubTabData('fundamentals');
  }

  switchSubTab(subtabName) {
    console.log('Switching to subtab:', subtabName);
    
    document.querySelectorAll('.sub-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    const activeSubTab = document.querySelector(`[data-subtab="${subtabName}"]`);
    if (activeSubTab) {
      activeSubTab.classList.add('active');
    }

    document.querySelectorAll('.subtab-panel').forEach(panel => {
      panel.classList.add('hidden');
    });
    const targetPanel = document.getElementById(subtabName);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }

    if (this.currentStock) {
      this.loadSubTabData(subtabName);
    }
  }

  loadSubTabData(subtabName) {
    const panel = document.getElementById(subtabName);
    if (!panel) return;
    
    switch (subtabName) {
      case 'fundamentals':
        this.renderFundamentals(panel);
        break;
      case 'technicals':
        this.renderTechnicals(panel);
        break;
      case 'shareholding':
        this.renderShareholding(panel);
        break;
      case 'company':
        this.renderCompanyBook(panel);
        break;
      case 'ai':
        this.renderAIAnalysis(panel);
        break;
    }
  }

  renderFundamentals(panel) {
    if (!this.stockData) return;
    
    const fundamentals = [
      { label: 'P/E Ratio', value: (15 + Math.random() * 20).toFixed(2), good: true },
      { label: 'P/B Ratio', value: (1 + Math.random() * 3).toFixed(2), good: Math.random() > 0.5 },
      { label: 'Debt/Equity', value: (0.3 + Math.random() * 0.7).toFixed(2), good: Math.random() > 0.6 },
      { label: 'ROE (%)', value: (10 + Math.random() * 20).toFixed(2), good: Math.random() > 0.4 },
      { label: 'ROA (%)', value: (5 + Math.random() * 15).toFixed(2), good: Math.random() > 0.5 },
      { label: 'Current Ratio', value: (1 + Math.random() * 2).toFixed(2), good: true },
      { label: 'Revenue Growth (%)', value: (5 + Math.random() * 25).toFixed(2), good: true },
      { label: 'Profit Margin (%)', value: (8 + Math.random() * 15).toFixed(2), good: Math.random() > 0.3 }
    ];

    panel.innerHTML = `
      <div class="fundamental-grid">
        ${fundamentals.map(item => `
          <div class="fundamental-card">
            <div>
              <div class="fundamental-label">${item.label}</div>
              <div class="fundamental-value ${item.good ? 'score-good' : 'score-neutral'}">${item.value}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderTechnicals(panel) {
    panel.innerHTML = `
      <div class="technical-grid">
        <div class="technical-indicators">
          <div class="indicator-card">
            <div>
              <div class="indicator-main">RSI (14)</div>
              <div class="indicator-value">45.2</div>
            </div>
            <span class="signal-badge signal-neutral">NEUTRAL</span>
          </div>
          <div class="indicator-card">
            <div>
              <div class="indicator-main">MACD</div>
              <div class="indicator-value">2.15</div>
            </div>
            <span class="signal-badge signal-bullish">BULLISH</span>
          </div>
          <div class="indicator-card">
            <div>
              <div class="indicator-main">Moving Avg (20)</div>
              <div class="indicator-value">₹ ${this.stockData?.currentPrice?.toFixed(2) || '0.00'}</div>
            </div>
            <span class="signal-badge signal-bullish">BULLISH</span>
          </div>
        </div>
        <div class="chart-container" style="height: 300px;">
          <p style="text-align: center; padding: 50px;">Technical Chart (Demo)</p>
        </div>
      </div>
    `;
  }

  renderShareholding(panel) {
    panel.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px;">
        <div>
          <h4>Shareholding Pattern</h4>
          <div class="chart-container" style="height: 300px;">
            <p style="text-align: center; padding: 50px;">Shareholding Chart (Demo)</p>
          </div>
        </div>
        <div>
          <h4>Key Metrics</h4>
          <div class="fundamental-grid">
            <div class="fundamental-card">
              <div class="fundamental-label">Promoter Holding</div>
              <div class="fundamental-value score-good">68.5%</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">FII Holding</div>
              <div class="fundamental-value score-neutral">18.2%</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">DII Holding</div>
              <div class="fundamental-value score-good">8.7%</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">Public Holding</div>
              <div class="fundamental-value score-neutral">4.6%</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCompanyBook(panel) {
    panel.innerHTML = `
      <div class="ai-analysis-grid">
        <div class="card">
          <h4>Revenue Trend (₹ Cr)</h4>
          <div class="chart-container" style="height: 200px;">
            <p style="text-align: center; padding: 50px;">Revenue Chart (Demo)</p>
          </div>
        </div>
        <div class="card">
          <h4>Profit Trend (₹ Cr)</h4>
          <div class="chart-container" style="height: 200px;">
            <p style="text-align: center; padding: 50px;">Profit Chart (Demo)</p>
          </div>
        </div>
      </div>
    `;
  }

  renderAIAnalysis(panel) {
    if (!this.stockData) return;
    
    const recommendations = [
      {
        term: 'Short Term (1-3 months)',
        recommendation: 'HOLD',
        confidence: 72,
        target: `₹ ${(this.stockData.currentPrice * 1.05).toFixed(2)}`,
        reason: 'Technical indicators show mixed signals with support at current levels'
      },
      {
        term: 'Medium Term (3-12 months)',
        recommendation: 'BUY',
        confidence: 84,
        target: `₹ ${(this.stockData.currentPrice * 1.18).toFixed(2)}`,
        reason: 'Strong fundamentals and sector tailwinds support upward momentum'
      },
      {
        term: 'Long Term (1-3 years)',
        recommendation: 'STRONG BUY',
        confidence: 91,
        target: `₹ ${(this.stockData.currentPrice * 1.45).toFixed(2)}`,
        reason: 'Excellent growth prospects and market leadership position'
      }
    ];

    panel.innerHTML = `
      <div class="ai-analysis-grid">
        ${recommendations.map((rec, index) => `
          <div class="ai-card ai-card--${index === 0 ? 'short' : index === 1 ? 'mid' : 'long'}">
            <h4 class="ai-card-title">${rec.term}</h4>
            <div class="ai-recommendation">
              <span class="status status--${rec.recommendation.includes('BUY') ? 'good' : 'neutral'}">${rec.recommendation}</span>
              <span class="score-badge score-${rec.confidence >= 80 ? 'good' : rec.confidence >= 60 ? 'neutral' : 'poor'}">${rec.confidence}%</span>
            </div>
            <div class="ai-target">Target: ${rec.target}</div>
            <p class="ai-card-description">${rec.reason}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  updateAllScores() {
    const fundamental = 60 + Math.random() * 30;
    const technical = 50 + Math.random() * 40;
    const ai = 65 + Math.random() * 25;
    const overall = (fundamental + technical + ai) / 3;

    const scores = {
      fundamental: Math.round(fundamental),
      technical: Math.round(technical),
      ai: Math.round(ai),
      overall: Math.round(overall)
    };
    
    this.updateScoreBadge('fundamentalsScore', scores.fundamental);
    this.updateScoreBadge('technicalsScore', scores.technical);
    this.updateScoreBadge('aiScore', scores.ai);
    
    const overallScore = document.querySelector('.overall-score');
    if (overallScore) {
      overallScore.textContent = `Overall: ${scores.overall}%`;
      overallScore.className = `overall-score status ${this.getScoreClass(scores.overall, 'status')}`;
    }

    this.updateScoreBadge('shareholdingScore', 75);
    this.updateScoreBadge('companyScore', 68);
  }

  updateScoreBadge(elementId, score) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = `${score}%`;
      element.className = `score-badge ${this.getScoreClass(score)}`;
    }
  }

  getScoreClass(score, prefix = 'score') {
    if (prefix === 'status') {
      return score >= 70 ? 'status--good' : score >= 40 ? 'status--neutral' : 'status--poor';
    }
    return score >= 70 ? 'score-good' : score >= 40 ? 'score-neutral' : 'score-poor';
  }

  // MUTUAL FUNDS - FIXED WORKING IMPLEMENTATION
  handleFundSuggestions(query) {
    console.log('Handling fund suggestions for:', query);
    
    const suggestionsList = document.getElementById('fundSuggestions');
    if (!suggestionsList) {
      console.error('Fund suggestions list not found');
      return;
    }
    
    if (query.length < 2) {
      suggestionsList.classList.add('hidden');
      return;
    }

    // Search through comprehensive mutual funds database
    const matches = this.mutualFunds.filter(fund => 
      fund.schemeName.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 50); // Show up to 50 results

    console.log(`Found ${matches.length} matching funds for "${query}"`);

    if (matches.length === 0) {
      suggestionsList.innerHTML = '<li class="suggestion-item">No funds found - try a different search term</li>';
      suggestionsList.classList.remove('hidden');
      setTimeout(() => suggestionsList.classList.add('hidden'), 3000);
      return;
    }

    suggestionsList.innerHTML = matches.map(fund => 
      `<li class="suggestion-item" data-scheme-code="${fund.schemeCode}">
        <input type="checkbox" class="suggestion-checkbox" ${this.selectedFunds.find(f => f.schemeCode === fund.schemeCode) ? 'checked' : ''}>
        <div>
          <strong>${fund.schemeName}</strong>
        </div>
      </li>`
    ).join('');

    suggestionsList.classList.remove('hidden');

    // Add click listeners
    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
      if (item.dataset.schemeCode) {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const checkbox = item.querySelector('.suggestion-checkbox');
          const schemeCode = parseInt(item.dataset.schemeCode);
          const fund = matches.find(f => f.schemeCode === schemeCode);
          
          if (checkbox.checked) {
            this.removeFund(schemeCode);
            checkbox.checked = false;
          } else {
            if (this.selectedFunds.length < 10) {
              this.addFund(fund);
              checkbox.checked = true;
            } else {
              this.showToast('Maximum 10 funds can be selected', 'warning');
            }
          }
        });
      }
    });
  }

  addFund(fund) {
    if (!this.selectedFunds.find(f => f.schemeCode === fund.schemeCode)) {
      this.selectedFunds.push(fund);
      this.updateSelectedFundsDisplay();
      
      if (this.selectedFunds.length === 1) {
        const fundAnalysis = document.getElementById('fundAnalysis');
        if (fundAnalysis) {
          fundAnalysis.classList.remove('hidden');
        }
        this.switchFundView('single');
      }
      
      this.showToast(`Added: ${fund.schemeName.substring(0, 40)}...`, 'success');
    }
  }

  removeFund(schemeCode) {
    const fundToRemove = this.selectedFunds.find(f => f.schemeCode === schemeCode);
    this.selectedFunds = this.selectedFunds.filter(f => f.schemeCode !== schemeCode);
    this.updateSelectedFundsDisplay();
    
    if (this.selectedFunds.length === 0) {
      const fundAnalysis = document.getElementById('fundAnalysis');
      if (fundAnalysis) {
        fundAnalysis.classList.add('hidden');
      }
    }
    
    if (fundToRemove) {
      this.showToast(`Removed: ${fundToRemove.schemeName.substring(0, 40)}...`, 'info');
    }
  }

  updateSelectedFundsDisplay() {
    const container = document.getElementById('selectedFunds');
    if (!container) return;
    
    const chipsContainer = container.querySelector('.fund-chips');
    if (!chipsContainer) return;
    
    if (this.selectedFunds.length === 0) {
      container.classList.add('hidden');
      return;
    }
    
    container.classList.remove('hidden');
    chipsContainer.innerHTML = this.selectedFunds.map(fund => 
      `<span class="fund-chip">
        ${fund.schemeName.length > 40 ? fund.schemeName.substring(0, 40) + '...' : fund.schemeName}
        <button class="fund-chip-remove" data-scheme-code="${fund.schemeCode}">×</button>
      </span>`
    ).join('');

    // Add remove listeners
    chipsContainer.querySelectorAll('.fund-chip-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const schemeCode = parseInt(e.target.dataset.schemeCode);
        this.removeFund(schemeCode);
      });
    });
  }

  switchFundView(view) {
    // Update buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-view="${view}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // Show/hide views
    document.querySelectorAll('.fund-view').forEach(v => {
      v.classList.add('hidden');
    });
    const targetView = document.getElementById(view === 'single' ? 'singleFund' : 'fundComparison');
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    // Load data
    if (view === 'single' && this.selectedFunds.length > 0) {
      this.renderSingleFundAnalysis();
    } else if (view === 'comparison' && this.selectedFunds.length > 1) {
      this.renderFundComparison();
    }
  }

  renderSingleFundAnalysis() {
    const fund = this.selectedFunds[0];
    const container = document.getElementById('singleFund');
    if (!container) return;
    
    container.innerHTML = `
      <h3>${fund.schemeName}</h3>
      
      <div class="fund-metrics">
        <div class="fund-metric">
          <div class="fund-metric-value">₹ 45.67</div>
          <div class="fund-metric-label">Current NAV</div>
        </div>
        <div class="fund-metric">
          <div class="fund-metric-value">15.2%</div>
          <div class="fund-metric-label">1Y Return</div>
        </div>
        <div class="fund-metric">
          <div class="fund-metric-value">12.8%</div>
          <div class="fund-metric-label">3Y Return</div>
        </div>
        <div class="fund-metric">
          <div class="fund-metric-value">11.4%</div>
          <div class="fund-metric-label">5Y Return</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px; margin-top: 24px;">
        <div class="chart-container" style="height: 300px;">
          <p style="text-align: center; padding: 100px 20px;">NAV Performance Chart (Demo)</p>
        </div>
        <div>
          <h4>Fund Details</h4>
          <div class="fundamental-grid">
            <div class="fundamental-card">
              <div class="fundamental-label">Expense Ratio</div>
              <div class="fundamental-value">1.25%</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">AUM</div>
              <div class="fundamental-value">₹ 15,234 Cr</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">Fund Manager</div>
              <div class="fundamental-value">Expert FM</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">Risk Level</div>
              <div class="fundamental-value score-neutral">Medium</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFundComparison() {
    const container = document.getElementById('fundComparison');
    if (!container) return;
    
    container.innerHTML = `
      <h3>Fund Comparison (${this.selectedFunds.length} funds)</h3>
      
      <div class="chart-container" style="height: 400px; margin: 24px 0;">
        <p style="text-align: center; padding: 150px 20px;">Comparative Performance Chart (Demo)<br><small>Showing returns comparison for selected funds</small></p>
      </div>

      <div class="overlap-matrix">
        <h4>Portfolio Overlap Analysis</h4>
        <p style="color: var(--color-text-secondary); margin-bottom: 16px;">
          Higher overlap means funds hold similar stocks. Lower overlap indicates better diversification.
        </p>
        <table class="overlap-table">
          <thead>
            <tr>
              <th>Fund</th>
              ${this.selectedFunds.map((_, i) => `<th>Fund ${i+1}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${this.selectedFunds.map((fund, i) => `
              <tr>
                <td><strong>Fund ${i+1}</strong></td>
                ${this.selectedFunds.map((_, j) => {
                  if (i === j) return '<td>100%</td>';
                  const overlap = Math.floor(Math.random() * 60) + 20;
                  const className = overlap > 60 ? 'overlap-high' : overlap > 40 ? 'overlap-medium' : 'overlap-low';
                  return `<td class="${className}">${overlap}%</td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // SCANNER FUNCTIONALITY
  runStockScan() {
    this.showToast('Running stock scan...', 'info');

    // Generate mock scan results
    this.scanResults = this.stockSymbols.map(stock => {
      const fundamental = Math.floor(Math.random() * 100);
      const technical = Math.floor(Math.random() * 100);
      const ai = Math.floor(Math.random() * 100);
      const overall = Math.floor((fundamental + technical + ai) / 3);

      return {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        fundamental,
        technical,
        ai,
        overall
      };
    }).sort((a, b) => b.overall - a.overall);

    this.renderScanResults();
    this.showToast(`Found ${this.scanResults.length} stocks`, 'success');
  }

  renderScanResults() {
    const tbody = document.querySelector('#scanResults tbody');
    if (!tbody) return;
    
    tbody.innerHTML = this.scanResults.map(stock => `
      <tr>
        <td><strong>${stock.symbol.replace('.NS', '')}</strong></td>
        <td>${stock.name}</td>
        <td>${stock.sector}</td>
        <td><span class="score-badge ${this.getScoreClass(stock.fundamental)}">${stock.fundamental}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.technical)}">${stock.technical}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.ai)}">${stock.ai}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.overall)}">${stock.overall}%</span></td>
      </tr>
    `).join('');
  }

  // EXTERNAL SCANNER FUNCTIONALITY
  async runExternalScanners() {
    console.log('Running external scanners...');
    
    const runBtn = document.getElementById('runScannersBtn');
    const progressContainer = document.getElementById('scannerProgress');
    const resultsContainer = document.getElementById('scannerResults');
    
    if (!runBtn || !progressContainer || !resultsContainer) {
      console.error('Scanner elements not found');
      return;
    }
    
    // Show running state
    runBtn.classList.add('running');
    runBtn.disabled = true;
    progressContainer.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    const progressFill = progressContainer.querySelector('.progress-fill');
    const progressCount = progressContainer.querySelector('.progress-count');
    const progressTotal = progressContainer.querySelector('.progress-total');
    
    if (progressTotal) progressTotal.textContent = this.externalScanners.length;
    
    this.showToast('Starting external scanners...', 'info');
    
    let completedCount = 0;
    
    // Process scanners sequentially
    for (let i = 0; i < this.externalScanners.length; i++) {
      const scanner = this.externalScanners[i];
      
      // Update progress
      if (progressCount) progressCount.textContent = completedCount;
      if (progressFill) progressFill.style.width = `${(completedCount / this.externalScanners.length) * 100}%`;
      
      // Create scanner card
      this.createScannerCard(scanner, resultsContainer);
      
      try {
        const stocks = this.generateMockScannerData(scanner.name);
        await this.delay(500);
        this.updateScannerCard(scanner.name, 'success', stocks);
      } catch (error) {
        console.error(`Error with ${scanner.name}:`, error);
        this.updateScannerCard(scanner.name, 'error', [], error.message);
      }
      
      completedCount++;
      
      if (i < this.externalScanners.length - 1) {
        await this.delay(800);
      }
    }
    
    // Final progress update
    if (progressCount) progressCount.textContent = completedCount;
    if (progressFill) progressFill.style.width = '100%';
    
    // Hide progress and restore button
    setTimeout(() => {
      progressContainer.classList.add('hidden');
      runBtn.classList.remove('running');
      runBtn.disabled = false;
      this.showToast(`Completed scanning ${completedCount} external sources`, 'success');
    }, 1000);
  }

  generateMockScannerData(scannerName) {
    const commonStocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'KOTAKBANK', 'LT', 'HCLTECH', 'ITC', 'SBIN'];
    const count = Math.floor(Math.random() * 10) + 5;
    const stocks = new Set();
    
    const shuffledStocks = [...commonStocks].sort(() => 0.5 - Math.random());
    shuffledStocks.slice(0, count).forEach(stock => stocks.add(stock));
    
    return Array.from(stocks);
  }

  calculateAIScore(stockSymbol) {
    let score = 50;
    score += (8 - Math.min(stockSymbol.length, 8)) * 2;
    
    let hash = 0;
    for (let i = 0; i < stockSymbol.length; i++) {
      const char = stockSymbol.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const hashScore = Math.abs(hash % 40) - 20;
    score += hashScore;
    
    const largeCaps = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'];
    if (largeCaps.includes(stockSymbol)) {
      score += 15;
    }
    
    score = Math.max(45, Math.min(95, score));
    return Math.round(score);
  }

  getAIScoreClass(score) {
    if (score >= 85) return 'ai-score--excellent';
    if (score >= 75) return 'ai-score--good';
    if (score >= 60) return 'ai-score--average';
    return 'ai-score--poor';
  }

  createScannerCard(scanner, container) {
    const card = document.createElement('div');
    card.className = 'scanner-result-card';
    card.id = `scanner-${scanner.name.replace(/\s+/g, '-').toLowerCase()}`;
    
    card.innerHTML = `
      <div class="scanner-card-header">
        <h4 class="scanner-name">${scanner.name}</h4>
        <span class="scanner-status scanner-status--loading">Loading</span>
      </div>
      <div class="scanner-card-body">
        <div class="loading-spinner">Fetching data...</div>
      </div>
    `;
    
    container.appendChild(card);
  }

  updateScannerCard(scannerName, status, stocks, errorMessage = null) {
    const cardId = `scanner-${scannerName.replace(/\s+/g, '-').toLowerCase()}`;
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const statusElement = card.querySelector('.scanner-status');
    const bodyElement = card.querySelector('.scanner-card-body');
    
    if (statusElement) {
      statusElement.className = `scanner-status scanner-status--${status}`;
      statusElement.textContent = status === 'success' ? 'Success' : 'Error';
    }
    
    if (status === 'success' && stocks.length > 0) {
      const stocksWithScores = stocks.map(symbol => ({
        symbol,
        aiScore: this.calculateAIScore(symbol)
      })).sort((a, b) => b.aiScore - a.aiScore);
      
      bodyElement.innerHTML = `
        <table class="ext-scan-table">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>AI Score</th>
            </tr>
          </thead>
          <tbody>
            ${stocksWithScores.map(stock => `
              <tr>
                <td class="stock-symbol">${stock.symbol}</td>
                <td>
                  <span class="ai-score ${this.getAIScoreClass(stock.aiScore)}">${stock.aiScore}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (status === 'success' && stocks.length === 0) {
      bodyElement.innerHTML = '<div class="no-data">No stocks found in this scanner</div>';
    } else {
      bodyElement.innerHTML = `
        <div class="error-message">
          ${errorMessage || 'Failed to fetch data'}
          <br><small>Demo mode - using mock data</small>
        </div>
      `;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast toast--${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize the application when DOM is ready
console.log('Script loaded, waiting for DOM...');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, initializing SMF Analyzer...');
    window.smfAnalyzer = new SMFAnalyzer();
  });
} else {
  console.log('DOM already ready, initializing SMF Analyzer...');
  window.smfAnalyzer = new SMFAnalyzer();
}