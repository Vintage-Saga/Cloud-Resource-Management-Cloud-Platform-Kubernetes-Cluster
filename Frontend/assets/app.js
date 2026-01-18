// ================================================
// CLOUD RESOURCE MANAGEMENT - KUBERNETES PLATFORM
// Professional SaaS UI JavaScript
// ================================================

// ================================================
// THEME TOGGLE
// ================================================

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ================================================
// SIDEBAR NAVIGATION
// ================================================

function initSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// ================================================
// DROPDOWN MENU
// ================================================

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.user-profile') && !event.target.closest('.notification-icon')) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

// ================================================
// TOAST NOTIFICATIONS
// ================================================

function showToast(title, message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };
  
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// ================================================
// TABS
// ================================================

function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked button
  const clickedButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}

// ================================================
// CHARTS - CPU TREND
// ================================================

function renderCPUChart() {
  const chartData = [45, 52, 48, 65, 58, 72, 68, 75, 70, 82, 78, 85];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const chart = document.getElementById('cpu-chart');
  if (!chart) return;
  
  chart.innerHTML = '';
  
  chartData.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = `${value}%`;
    bar.setAttribute('data-value', `${value}%`);
    
    const label = document.createElement('div');
    label.className = 'chart-bar-label';
    label.textContent = chartLabels[index];
    bar.appendChild(label);
    
    // Add hover tooltip
    bar.title = `${chartLabels[index]}: ${value}%`;
    
    chart.appendChild(bar);
  });
}

// ================================================
// CHARTS - MEMORY TREND
// ================================================

function renderMemoryChart() {
  const chartData = [60, 58, 62, 70, 68, 75, 72, 78, 74, 80, 77, 82];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const chart = document.getElementById('memory-chart');
  if (!chart) return;
  
  chart.innerHTML = '';
  
  chartData.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = `${value}%`;
    bar.setAttribute('data-value', `${value}%`);
    
    const label = document.createElement('div');
    label.className = 'chart-bar-label';
    label.textContent = chartLabels[index];
    bar.appendChild(label);
    
    bar.title = `${chartLabels[index]}: ${value}%`;
    
    chart.appendChild(bar);
  });
}

// ================================================
// MONITORING CHARTS (Advanced)
// ================================================

function renderMonitoringCharts() {
  renderCPUChart();
  renderMemoryChart();
  
  // Network chart
  const networkData = [120, 145, 132, 168, 155, 182, 170, 195, 185, 210, 198, 225];
  const networkLabels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  const networkChart = document.getElementById('network-chart');
  if (networkChart) {
    networkChart.innerHTML = '';
    networkData.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = `${(value / 250) * 100}%`;
      
      const label = document.createElement('div');
      label.className = 'chart-bar-label';
      label.textContent = networkLabels[index];
      bar.appendChild(label);
      
      bar.title = `${networkLabels[index]}: ${value} MB/s`;
      
      networkChart.appendChild(bar);
    });
  }
}

// ================================================
// LOG VIEWER - SEARCH & HIGHLIGHT
// ================================================

function searchLogs() {
  const searchInput = document.getElementById('log-search');
  const logLines = document.querySelectorAll('.log-line');
  
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase();
  
  logLines.forEach(line => {
    line.classList.remove('highlight');
    
    if (searchTerm && line.textContent.toLowerCase().includes(searchTerm)) {
      line.classList.add('highlight');
    }
  });
}

// Export logs function
function exportLogs() {
  const logViewer = document.querySelector('.terminal');
  if (!logViewer) return;
  
  const logContent = logViewer.textContent;
  const blob = new Blob([logContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `kubernetes-logs-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Success', 'Logs exported successfully', 'success');
}

// ================================================
// CLUSTER ACTIONS
// ================================================

function scaleDeployment(deploymentName) {
  showToast('Processing', `Scaling deployment: ${deploymentName}`, 'info');
  
  setTimeout(() => {
    showToast('Success', `Deployment ${deploymentName} scaled successfully`, 'success');
  }, 1500);
}

function restartPod(podName) {
  showToast('Processing', `Restarting pod: ${podName}`, 'info');
  
  setTimeout(() => {
    showToast('Success', `Pod ${podName} restarted successfully`, 'success');
  }, 1500);
}

function applyLimits(resourceType) {
  showToast('Processing', `Applying ${resourceType} limits`, 'info');
  
  setTimeout(() => {
    showToast('Success', `${resourceType} limits applied successfully`, 'success');
  }, 1500);
}

// ================================================
// SETTINGS - SAVE CONFIGURATION
// ================================================

function saveSettings(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  showToast('Processing', 'Saving configuration...', 'info');
  
  // Simulate API call
  setTimeout(() => {
    showToast('Success', 'Settings saved successfully', 'success');
  }, 1000);
}

// ================================================
// PASSWORD VISIBILITY TOGGLE
// ================================================

function togglePassword(inputId, toggleId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);
  
  if (!input || !toggle) return;
  
  if (input.type === 'password') {
    input.type = 'text';
    toggle.textContent = '👁️';
  } else {
    input.type = 'password';
    toggle.textContent = '👁️‍🗨️';
  }
}

// ================================================
// REAL-TIME DATA UPDATES (Simulation)
// ================================================

function updateDashboardStats() {
  const cpuValue = document.getElementById('cpu-value');
  const memoryValue = document.getElementById('memory-value');
  const storageValue = document.getElementById('storage-value');
  
  if (cpuValue) {
    const currentCPU = parseFloat(cpuValue.textContent);
    const newCPU = Math.max(0, Math.min(100, currentCPU + (Math.random() - 0.5) * 5));
    cpuValue.textContent = newCPU.toFixed(1);
  }
  
  if (memoryValue) {
    const currentMemory = parseFloat(memoryValue.textContent);
    const newMemory = Math.max(0, Math.min(100, currentMemory + (Math.random() - 0.5) * 3));
    memoryValue.textContent = newMemory.toFixed(1);
  }
  
  if (storageValue) {
    const currentStorage = parseFloat(storageValue.textContent);
    const newStorage = Math.max(0, Math.min(100, currentStorage + (Math.random() - 0.5) * 2));
    storageValue.textContent = newStorage.toFixed(1);
  }
}

// Update stats every 5 seconds
setInterval(updateDashboardStats, 5000);

// ================================================
// FILTER CONTROLS
// ================================================

function applyFilters() {
  const timeRange = document.getElementById('time-range')?.value;
  const namespace = document.getElementById('namespace-filter')?.value;
  const node = document.getElementById('node-filter')?.value;
  
  showToast('Filters Applied', `Time: ${timeRange}, Namespace: ${namespace}, Node: ${node}`, 'info', 2000);
  
  // Re-render charts with new filters
  renderMonitoringCharts();
}

// ================================================
// NODE STATUS UPDATE
// ================================================

function updateNodeStatus(nodeId, status) {
  showToast('Processing', `Updating ${nodeId} status to ${status}`, 'info');
  
  setTimeout(() => {
    const nodeCard = document.querySelector(`[data-node="${nodeId}"]`);
    if (nodeCard) {
      const badge = nodeCard.querySelector('.badge');
      if (badge) {
        badge.className = `badge badge-${status}`;
        badge.textContent = status.toUpperCase();
      }
    }
    showToast('Success', `${nodeId} status updated`, 'success');
  }, 1000);
}

// ================================================
// SEARCH FUNCTIONALITY
// ================================================

function handleSearch(event) {
  if (event.key === 'Enter') {
    const searchTerm = event.target.value;
    if (searchTerm) {
      showToast('Search', `Searching for: ${searchTerm}`, 'info', 2000);
    }
  }
}

// ================================================
// ANIMATE NUMBERS ON LOAD
// ================================================

function animateValue(element, start, end, duration) {
  if (!element) return;
  
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = (progress * (end - start) + start).toFixed(1);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ================================================
// INITIALIZE ON PAGE LOAD
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Initialize sidebar active state
  initSidebar();
  
  // Render charts if present
  if (document.getElementById('cpu-chart')) {
    renderCPUChart();
  }
  
  if (document.getElementById('memory-chart')) {
    renderMemoryChart();
  }
  
  if (document.getElementById('network-chart')) {
    renderMonitoringCharts();
  }
  
  // Animate stat values on dashboard
  const cpuValue = document.getElementById('cpu-value');
  const memoryValue = document.getElementById('memory-value');
  const storageValue = document.getElementById('storage-value');
  
  if (cpuValue) animateValue(cpuValue, 0, parseFloat(cpuValue.textContent), 1000);
  if (memoryValue) animateValue(memoryValue, 0, parseFloat(memoryValue.textContent), 1000);
  if (storageValue) animateValue(storageValue, 0, parseFloat(storageValue.textContent), 1000);
  
  // Initialize first tab if on settings page
  const firstTabButton = document.querySelector('.tab-button');
  if (firstTabButton) {
    firstTabButton.click();
  }
});

// ================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Format bytes to human readable
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format timestamp
function formatTimestamp(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Get status color
function getStatusColor(status) {
  const colors = {
    healthy: 'success',
    running: 'success',
    warning: 'warning',
    pending: 'warning',
    critical: 'error',
    failed: 'error',
    error: 'error',
    info: 'info'
  };
  return colors[status.toLowerCase()] || 'info';
}

// ================================================
// MOBILE MENU TOGGLE
// ================================================

function toggleMobileMenu() {
  const navMenu = document.querySelector('.navbar-nav');
  if (navMenu) {
    navMenu.classList.toggle('mobile-active');
  }
}

// ================================================
// CONSOLE LOG (for debugging)
// ================================================

console.log('Kubernetes Cloud Resource Management Platform - Initialized');
console.log('Theme:', document.documentElement.getAttribute('data-theme'));
