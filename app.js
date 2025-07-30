// Complete Stock & Mutual Fund Analyzer Application
class SMFAnalyzer {
  constructor() {
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
      {"symbol": "BAJFINANCE.NS", "name": "Bajaj Finance Limited", "sector": "NBFC"},
      {"symbol": "M&M.NS", "name": "Mahindra & Mahindra Limited", "sector": "Auto"},
      {"symbol": "WIPRO.NS", "name": "Wipro Limited", "sector": "IT"},
      {"symbol": "NTPC.NS", "name": "NTPC Limited", "sector": "Power"},
      {"symbol": "TECHM.NS", "name": "Tech Mahindra Limited", "sector": "IT"},
      {"symbol": "POWERGRID.NS", "name": "Power Grid Corporation", "sector": "Power"},
      {"symbol": "ULTRACEMCO.NS", "name": "UltraTech Cement Limited", "sector": "Cement"},
      {"symbol": "TITAN.NS", "name": "Titan Company Limited", "sector": "Jewellery"},
      {"symbol": "SUNPHARMA.NS", "name": "Sun Pharmaceutical Industries", "sector": "Pharma"},
      {"symbol": "JSWSTEEL.NS", "name": "JSW Steel Limited", "sector": "Steel"},
      {"symbol": "TATASTEEL.NS", "name": "Tata Steel Limited", "sector": "Steel"},
      {"symbol": "ADANIPORTS.NS", "name": "Adani Ports and SEZ Limited", "sector": "Infrastructure"},
      {"symbol": "HINDALCO.NS", "name": "Hindalco Industries Limited", "sector": "Metals"},
      {"symbol": "COALINDIA.NS", "name": "Coal India Limited", "sector": "Mining"},
      {"symbol": "BRITANNIA.NS", "name": "Britannia Industries Limited", "sector": "FMCG"},
      {"symbol": "ONGC.NS", "name": "Oil & Natural Gas Corporation", "sector": "Oil & Gas"},
      {"symbol": "HEROMOTOCO.NS", "name": "Hero MotoCorp Limited", "sector": "Auto"},
      {"symbol": "BAJAJ-AUTO.NS", "name": "Bajaj Auto Limited", "sector": "Auto"},
      {"symbol": "GRASIM.NS", "name": "Grasim Industries Limited", "sector": "Textiles"},
      {"symbol": "CIPLA.NS", "name": "Cipla Limited", "sector": "Pharma"},
      {"symbol": "DRREDDY.NS", "name": "Dr. Reddy's Laboratories", "sector": "Pharma"},
      {"symbol": "NESTLEIND.NS", "name": "Nestle India Limited", "sector": "FMCG"},
      {"symbol": "DIVISLAB.NS", "name": "Divi's Laboratories Limited", "sector": "Pharma"},
      {"symbol": "EICHERMOT.NS", "name": "Eicher Motors Limited", "sector": "Auto"},
      {"symbol": "TATACONSUM.NS", "name": "Tata Consumer Products", "sector": "FMCG"},
      {"symbol": "ADANIENT.NS", "name": "Adani Enterprises Limited", "sector": "Conglomerate"},
      {"symbol": "APOLLOHOSP.NS", "name": "Apollo Hospitals Enterprise", "sector": "Healthcare"},
      {"symbol": "SHREECEM.NS", "name": "Shree Cement Limited", "sector": "Cement"},
      {"symbol": "HINDUNILVR.NS", "name": "Hindustan Unilever Limited", "sector": "FMCG"},
      {"symbol": "BAJAJFINSV.NS", "name": "Bajaj Finserv Limited", "sector": "Financial Services"},
      {"symbol": "BPCL.NS", "name": "Bharat Petroleum Corporation", "sector": "Oil & Gas"},
      {"symbol": "IOC.NS", "name": "Indian Oil Corporation", "sector": "Oil & Gas"},
      {"symbol": "INDUSINDBK.NS", "name": "IndusInd Bank Limited", "sector": "Banking"},
      {"symbol": "TATAMOTORS.NS", "name": "Tata Motors Limited", "sector": "Auto"},
      {"symbol": "SBILIFE.NS", "name": "SBI Life Insurance Company", "sector": "Insurance"},
      {"symbol": "HDFCLIFE.NS", "name": "HDFC Life Insurance Company", "sector": "Insurance"},
      {"symbol": "GODREJCP.NS", "name": "Godrej Consumer Products", "sector": "FMCG"}
    ];

    this.selectedFunds = [];
    this.currentStock = null;
    this.stockData = null;
    this.scanResults = [];
    
    this.init();
  }

  init() {
    console.log('Initializing SMF Analyzer...');
    this.setupEventListeners();
    this.showToast('Application loaded successfully', 'success');
  }

  setupEventListeners() {
    // Main tab switching
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        this.switchMainTab(tabName);
      });
    });

    // Stock search and suggestions
    const stockSearch = document.getElementById('stockSearch');
    if (stockSearch) {
      stockSearch.addEventListener('input', (e) => {
        this.handleStockSuggestions(e.target.value);
      });

      // Handle enter key
      stockSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = e.target.value.trim();
          if (query) {
            this.fetchStockByQuery(query);
          }
        }
      });
    }

    // Stock fetch button
    const stockFetchBtn = document.getElementById('stockFetchBtn');
    if (stockFetchBtn) {
      stockFetchBtn.addEventListener('click', () => {
        const query = stockSearch.value.trim();
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
      fundSearch.addEventListener('input', (e) => {
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

    // Export buttons
    const exportCSV = document.getElementById('exportCSV');
    if (exportCSV) {
      exportCSV.addEventListener('click', () => {
        this.exportData('csv');
      });
    }

    const exportJSON = document.getElementById('exportJSON');
    if (exportJSON) {
      exportJSON.addEventListener('click', () => {
        this.exportData('json');
      });
    }

    // Filter range sliders
    ['fundScoreFilter', 'techScoreFilter', 'aiScoreFilter'].forEach(id => {
      const slider = document.getElementById(id);
      const display = document.getElementById(id.replace('Filter', 'Value'));
      if (slider && display) {
        slider.addEventListener('input', (e) => {
          display.textContent = e.target.value;
        });
      }
    });

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
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active-tab');

    // Show/hide content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    document.getElementById(tabName).classList.remove('hidden');
  }

  switchSubTab(subtabName) {
    console.log('Switching to subtab:', subtabName);
    
    // Update sub-tab buttons
    document.querySelectorAll('.sub-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-subtab="${subtabName}"]`).classList.add('active');

    // Show/hide panels
    document.querySelectorAll('.subtab-panel').forEach(panel => {
      panel.classList.add('hidden');
    });
    document.getElementById(subtabName).classList.remove('hidden');

    // Load data based on subtab
    if (this.currentStock) {
      this.loadSubTabData(subtabName);
    }
  }

  handleStockSuggestions(query) {
    const suggestionsList = document.getElementById('stockSuggestions');
    
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
          <strong>${stock.symbol}</strong> - ${stock.name}
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
    // Try to find exact match first
    let stock = this.stockSymbols.find(s => 
      s.symbol.toLowerCase() === query.toLowerCase() ||
      s.name.toLowerCase() === query.toLowerCase()
    );

    // If not found, try partial match
    if (!stock) {
      stock = this.stockSymbols.find(s => 
        s.symbol.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // If still not found, create a generic entry
    if (!stock) {
      const symbol = query.toUpperCase().includes('.NS') ? query.toUpperCase() : query.toUpperCase() + '.NS';
      stock = { symbol, name: query, sector: 'Unknown' };
    }

    this.selectStock(stock);
  }

  async selectStock(stock) {
    console.log('Selecting stock:', stock);
    
    this.currentStock = stock;
    document.getElementById('stockSearch').value = `${stock.symbol} - ${stock.name}`;
    
    // Show selected stock info
    const selectedStock = document.getElementById('selectedStock');
    selectedStock.querySelector('.stock-name').textContent = `${stock.symbol} - ${stock.name}`;
    selectedStock.classList.remove('hidden');

    // Show analysis section
    document.getElementById('stockAnalysis').classList.remove('hidden');

    // Generate mock stock data
    this.generateMockStockData(stock.symbol);
  }

  generateMockStockData(symbol) {
    console.log('Generating mock data for:', symbol);
    
    // Generate realistic mock data for demonstration
    const basePrice = 100 + Math.random() * 900;
    const candles = [];
    const now = new Date();
    
    for (let i = 252; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const price = basePrice + (Math.random() - 0.5) * basePrice * 0.1;
      const open = price + (Math.random() - 0.5) * price * 0.02;
      const close = price + (Math.random() - 0.5) * price * 0.02;
      const high = Math.max(open, close) + Math.random() * price * 0.01;
      const low = Math.min(open, close) - Math.random() * price * 0.01;
      
      candles.push({
        t: date,
        o: Math.round(open * 100) / 100,
        h: Math.round(high * 100) / 100,
        l: Math.round(low * 100) / 100,
        c: Math.round(close * 100) / 100,
        v: Math.floor(Math.random() * 1000000)
      });
    }

    this.stockData = {
      symbol: symbol,
      currentPrice: candles[candles.length - 1].c,
      previousClose: candles[candles.length - 2].c,
      candles: candles,
      meta: { symbol: symbol }
    };

    this.showToast('Stock data loaded successfully', 'success');
    this.updateAllScores();
    this.loadSubTabData('fundamentals');
  }

  loadSubTabData(subtabName) {
    const panel = document.getElementById(subtabName);
    
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
    
    // Generate mock fundamental data
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
    if (!this.stockData) return;

    const indicators = [
      { name: 'RSI (14)', value: '45.2', signal: 'neutral' },
      { name: 'MACD', value: '2.15', signal: 'bullish' },
      { name: 'Moving Avg (20)', value: `₹ ${this.stockData.currentPrice.toFixed(2)}`, signal: 'bullish' },
      { name: 'Moving Avg (50)', value: `₹ ${(this.stockData.currentPrice * 0.96).toFixed(2)}`, signal: 'bearish' },
      { name: 'Bollinger Bands', value: 'Mid', signal: 'neutral' },
      { name: 'Volume Trend', value: 'High', signal: 'bullish' }
    ];

    panel.innerHTML = `
      <div class="technical-grid">
        <div class="technical-indicators">
          ${indicators.map(indicator => `
            <div class="indicator-card">
              <div>
                <div class="indicator-main">${indicator.name}</div>
                <div class="indicator-value">${indicator.value}</div>
              </div>
              <span class="signal-badge signal-${indicator.signal}">${indicator.signal.toUpperCase()}</span>
            </div>
          `).join('')}
        </div>
        <div class="chart-container" style="height: 400px;">
          <canvas id="priceChart"></canvas>
        </div>
      </div>
    `;

    // Draw technical chart
    setTimeout(() => this.drawTechnicalChart(), 100);
  }

  drawTechnicalChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas || !this.stockData) return;

    const ctx = canvas.getContext('2d');
    const chartData = this.stockData.candles.slice(-60); // Last 60 days

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map(d => d.t.toLocaleDateString()),
        datasets: [{
          label: 'Price',
          data: chartData.map(d => d.c),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'var(--color-border)'
            }
          },
          x: {
            grid: {
              color: 'var(--color-border)'
            }
          }
        }
      }
    });
  }

  renderShareholding(panel) {
    panel.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px;">
        <div>
          <h4>Shareholding Pattern</h4>
          <div class="chart-container" style="height: 300px;">
            <canvas id="shareholdingChart"></canvas>
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

    setTimeout(() => {
      const canvas = document.getElementById('shareholdingChart');
      if (!canvas) return;

      new Chart(canvas, {
        type: 'pie',
        data: {
          labels: ['Promoters', 'FII', 'DII', 'Public'],
          datasets: [{
            data: [68.5, 18.2, 8.7, 4.6],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }, 100);
  }

  renderCompanyBook(panel) {
    panel.innerHTML = `
      <div class="ai-analysis-grid">
        <div class="card">
          <h4>Revenue Trend (₹ Cr)</h4>
          <div class="chart-container" style="height: 200px;">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
        <div class="card">
          <h4>Profit Trend (₹ Cr)</h4>
          <div class="chart-container" style="height: 200px;">
            <canvas id="profitChart"></canvas>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      // Revenue Chart
      const revenueCanvas = document.getElementById('revenueChart');
      if (revenueCanvas) {
        new Chart(revenueCanvas, {
          type: 'bar',
          data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
              label: 'Revenue',
              data: [12000, 14500, 16200, 18900, 21500],
              backgroundColor: '#1FB8CD'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }

      // Profit Chart
      const profitCanvas = document.getElementById('profitChart');
      if (profitCanvas) {
        new Chart(profitCanvas, {
          type: 'bar',
          data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
              label: 'Profit',
              data: [1800, 2100, 2400, 2850, 3200],
              backgroundColor: '#B4413C'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }
    }, 100);
  }

  renderAIAnalysis(panel) {
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
      
      <div class="strategy-card">
        <h4>AI Trading Strategy</h4>
        <p class="strategy-text">
          Based on comprehensive analysis of technical indicators, fundamental metrics, and market sentiment, 
          the AI recommends a graduated investment approach. Consider accumulating positions on dips below 
          ₹${(this.stockData.currentPrice * 0.95).toFixed(2)} levels while maintaining stop-loss at ₹${(this.stockData.currentPrice * 0.90).toFixed(2)}. The stock shows strong potential for 
          outperformance in the medium to long term.
        </p>
      </div>
    `;
  }

  calculateAllScores() {
    if (!this.stockData) {
      return { fundamental: 0, technical: 0, ai: 0, overall: 0 };
    }

    // Mock scoring logic - in real app, this would use actual calculations
    const fundamental = 60 + Math.random() * 30;
    const technical = 50 + Math.random() * 40;
    const ai = 65 + Math.random() * 25;
    const overall = (fundamental + technical + ai) / 3;

    return {
      fundamental: Math.round(fundamental),
      technical: Math.round(technical),
      ai: Math.round(ai),
      overall: Math.round(overall)
    };
  }

  updateAllScores() {
    const scores = this.calculateAllScores();
    
    // Update score badges
    this.updateScoreBadge('fundamentalsScore', scores.fundamental);
    this.updateScoreBadge('technicalsScore', scores.technical);
    this.updateScoreBadge('aiScore', scores.ai);
    
    // Update overall score
    const overallScore = document.querySelector('.overall-score');
    if (overallScore) {
      overallScore.textContent = `Overall: ${scores.overall}%`;
      overallScore.className = `overall-score status ${this.getScoreClass(scores.overall, 'status')}`;
    }

    // Mock scores for other tabs
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

  // FIXED MUTUAL FUNDS FUNCTIONALITY
  async searchMutualFunds(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    try {
      // Method 1: Use direct search API
      let directResults = [];
      try {
        const searchResponse = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(searchTerm)}`);
        if (searchResponse.ok) {
          directResults = await searchResponse.json();
        }
      } catch (error) {
        console.log('Direct search API failed, continuing with local search');
      }
      
      // Method 2: Filter from complete fund list (cached)
      if (!window.allMutualFunds) {
        try {
          const allFundsResponse = await fetch('https://api.mfapi.in/mf');
          if (allFundsResponse.ok) {
            window.allMutualFunds = await allFundsResponse.json();
          }
        } catch (error) {
          console.log('Failed to fetch all funds, using empty array');
          window.allMutualFunds = [];
        }
      }
      
      // Filter local results
      const localResults = window.allMutualFunds ? window.allMutualFunds.filter(fund => 
        fund.schemeName && fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
      ) : [];
      
      // Combine and deduplicate results
      const combinedResults = [...directResults, ...localResults];
      const uniqueResults = combinedResults.filter((fund, index, self) => 
        index === self.findIndex(f => f.schemeCode === fund.schemeCode)
      );
      
      return uniqueResults.slice(0, 50); // Limit to 50 results for performance
    } catch (error) {
      console.error('MF Search Error:', error);
      return [];
    }
  }

  async handleFundSuggestions(query) {
    const suggestionsList = document.getElementById('fundSuggestions');
    
    if (query.length < 2) {
      suggestionsList.classList.add('hidden');
      return;
    }

    // Show loading state
    suggestionsList.innerHTML = '<li class="suggestion-item">Searching funds...</li>';
    suggestionsList.classList.remove('hidden');

    try {
      const matches = await this.searchMutualFunds(query);

      if (matches.length === 0) {
        suggestionsList.innerHTML = '<li class="suggestion-item">No funds found</li>';
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
    } catch (error) {
      console.error('Error in handleFundSuggestions:', error);
      suggestionsList.innerHTML = '<li class="suggestion-item">Error searching funds</li>';
    }
  }

  addFund(fund) {
    if (!this.selectedFunds.find(f => f.schemeCode === fund.schemeCode)) {
      this.selectedFunds.push(fund);
      this.updateSelectedFundsDisplay();
      
      if (this.selectedFunds.length === 1) {
        document.getElementById('fundAnalysis').classList.remove('hidden');
        this.switchFundView('single');
      }
      
      // Show toast to confirm fund added
      this.showToast(`Added: ${fund.schemeName.substring(0, 40)}...`, 'success');
    }
  }

  removeFund(schemeCode) {
    const fundToRemove = this.selectedFunds.find(f => f.schemeCode === schemeCode);
    this.selectedFunds = this.selectedFunds.filter(f => f.schemeCode !== schemeCode);
    this.updateSelectedFundsDisplay();
    
    if (this.selectedFunds.length === 0) {
      document.getElementById('fundAnalysis').classList.add('hidden');
    }
    
    // Show toast to confirm fund removed
    if (fundToRemove) {
      this.showToast(`Removed: ${fundToRemove.schemeName.substring(0, 40)}...`, 'info');
    }
  }

  updateSelectedFundsDisplay() {
    const container = document.getElementById('selectedFunds');
    const chipsContainer = container.querySelector('.fund-chips');
    
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
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Show/hide views
    document.querySelectorAll('.fund-view').forEach(v => {
      v.classList.add('hidden');
    });
    document.getElementById(view === 'single' ? 'singleFund' : 'fundComparison').classList.remove('hidden');

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
          <canvas id="navChart"></canvas>
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
              <div class="fundamental-value">John Doe</div>
            </div>
            <div class="fundamental-card">
              <div class="fundamental-label">Risk Level</div>
              <div class="fundamental-value score-neutral">Medium</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Draw NAV chart
    setTimeout(() => {
      const canvas = document.getElementById('navChart');
      if (!canvas) return;

      const navData = Array.from({length: 30}, (_, i) => 40 + Math.sin(i/5) * 5 + Math.random() * 2);
      
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: Array.from({length: 30}, (_, i) => `Day ${i+1}`),
          datasets: [{
            label: 'NAV',
            data: navData,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            fill: true,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }, 100);
  }

  renderFundComparison() {
    const container = document.getElementById('fundComparison');
    
    container.innerHTML = `
      <h3>Fund Comparison (${this.selectedFunds.length} funds)</h3>
      
      <div class="chart-container" style="height: 400px; margin: 24px 0;">
        <canvas id="comparisonChart"></canvas>
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

    // Draw comparison chart
    setTimeout(() => {
      const canvas = document.getElementById('comparisonChart');
      if (!canvas) return;

      const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
      const datasets = this.selectedFunds.slice(0, 5).map((fund, index) => ({
        label: `Fund ${index + 1}`,
        data: Array.from({length: 12}, () => Math.random() * 20 + 5),
        borderColor: colors[index],
        backgroundColor: colors[index] + '20',
        fill: false
      }));

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Return %'
              }
            }
          }
        }
      });
    }, 100);
  }

  // Scanner functionality
  async runStockScan() {
    const fundScore = parseInt(document.getElementById('fundScoreFilter').value);
    const techScore = parseInt(document.getElementById('techScoreFilter').value);
    const aiScore = parseInt(document.getElementById('aiScoreFilter').value);
    const mcMin = parseFloat(document.getElementById('mcMin').value) || 0;
    const mcMax = parseFloat(document.getElementById('mcMax').value) || Infinity;
    const sector = document.getElementById('sectorFilter').value;

    this.showToast('Running stock scan...', 'info');

    // Generate scan results
    this.scanResults = this.stockSymbols.map(stock => {
      const fundamental = Math.floor(Math.random() * 100);
      const technical = Math.floor(Math.random() * 100);
      const ai = Math.floor(Math.random() * 100);
      const overall = Math.floor((fundamental + technical + ai) / 3);
      const marketCap = Math.floor(Math.random() * 500000) + 1000;

      return {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        fundamental,
        technical,
        ai,
        overall,
        marketCap
      };
    }).filter(stock => {
      return stock.fundamental >= fundScore &&
             stock.technical >= techScore &&
             stock.ai >= aiScore &&
             stock.marketCap >= mcMin &&
             stock.marketCap <= mcMax &&
             (sector === '' || stock.sector === sector);
    }).sort((a, b) => b.overall - a.overall);

    this.renderScanResults();
    this.showToast(`Found ${this.scanResults.length} stocks matching criteria`, 'success');
  }

  renderScanResults() {
    const tbody = document.querySelector('#scanResults tbody');
    
    if (this.scanResults.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-16">No stocks match the selected criteria</td></tr>';
      return;
    }

    tbody.innerHTML = this.scanResults.map(stock => `
      <tr>
        <td><strong>${stock.symbol}</strong></td>
        <td>${stock.name}</td>
        <td>${stock.sector}</td>
        <td><span class="score-badge ${this.getScoreClass(stock.fundamental)}">${stock.fundamental}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.technical)}">${stock.technical}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.ai)}">${stock.ai}%</span></td>
        <td><span class="score-badge ${this.getScoreClass(stock.overall)}">${stock.overall}%</span></td>
      </tr>
    `).join('');
  }

  exportData(format) {
    if (this.scanResults.length === 0) {
      this.showToast('No data to export. Run a scan first.', 'warning');
      return;
    }

    let content, filename, mimeType;

    if (format === 'csv') {
      const headers = ['Symbol', 'Company', 'Sector', 'Fundamental', 'Technical', 'AI Score', 'Overall'];
      const csvContent = [
        headers.join(','),
        ...this.scanResults.map(stock => [
          stock.symbol,
          `"${stock.name}"`,
          stock.sector,
          stock.fundamental,
          stock.technical,
          stock.ai,
          stock.overall
        ].join(','))
      ].join('\n');
      
      content = csvContent;
      filename = 'stock_scan_results.csv';
      mimeType = 'text/csv';
    } else {
      content = JSON.stringify(this.scanResults, null, 2);
      filename = 'stock_scan_results.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast(`Exported ${this.scanResults.length} records as ${format.toUpperCase()}`, 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast--${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing SMF Analyzer...');
  window.smfAnalyzer = new SMFAnalyzer();
});