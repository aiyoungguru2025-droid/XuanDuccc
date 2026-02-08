// ==================== CAREER DETAIL MODAL HANDLER ====================

function showCareerDetail(careerId) {
    const career = careersDatabase[careerId];
    if (!career) {
        console.error('Career not found:', careerId);
        return;
    }
    
    // Create modal overlay if doesn't exist
    let modalOverlay = document.getElementById('careerModalOverlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'careerModalOverlay';
        modalOverlay.className = 'modal-overlay';
        document.body.appendChild(modalOverlay);
        
        // Close on overlay click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeCareerDetail();
            }
        });
    }
    
    // Build modal content
    modalOverlay.innerHTML = `
        <div class="modal-container">
            ${buildModalHeader(career)}
            ${buildModalBody(career)}
            ${buildModalCTA(career)}
        </div>
    `;
    
    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize tabs
    initializeTabs();
}

function closeCareerDetail() {
    const modalOverlay = document.getElementById('careerModalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function buildModalHeader(career) {
    return `
        <div class="modal-header">
            <div class="modal-header-bg" style="background-image: url('${career.image}')">
                <div class="modal-header-overlay">
                    <button class="modal-close-btn" onclick="closeCareerDetail()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-title-section">
                        <span class="modal-icon">${career.icon}</span>
                        <div>
                            <h2 class="modal-title">${career.name}</h2>
                            <p class="modal-subtitle">${career.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function buildModalBody(career) {
    return `
        <div class="modal-body">
            ${buildInfoCards(career)}
            ${buildSectionTabs(career)}
            ${buildTabContents(career)}
        </div>
    `;
}

function buildInfoCards(career) {
    return `
        <div class="info-cards-grid">
            <div class="info-card">
                <div class="info-card-icon">💰</div>
                <div class="info-card-label">Lương khởi điểm</div>
                <div class="info-card-value">${career.salary.entry}</div>
            </div>
            <div class="info-card">
                <div class="info-card-icon">📈</div>
                <div class="info-card-label">Tăng trưởng</div>
                <div class="info-card-value">${career.growth}</div>
            </div>
            <div class="info-card">
                <div class="info-card-icon">🎯</div>
                <div class="info-card-label">Nhu cầu việc làm</div>
                <div class="info-card-value">${career.jobDemand}</div>
            </div>
        </div>
    `;
}

function buildSectionTabs(career) {
    return `
        <div class="section-tabs">
            <button class="tab-btn active" data-tab="overview">
                <i class="fas fa-info-circle"></i> Tổng quan
            </button>
            <button class="tab-btn" data-tab="schools">
                <i class="fas fa-university"></i> Trường học
            </button>
            <button class="tab-btn" data-tab="salary">
                <i class="fas fa-money-bill-wave"></i> Thu nhập
            </button>
            <button class="tab-btn" data-tab="roadmap">
                <i class="fas fa-map"></i> Lộ trình
            </button>
            <button class="tab-btn" data-tab="skills">
                <i class="fas fa-tools"></i> Kỹ năng
            </button>
            <button class="tab-btn" data-tab="careers">
                <i class="fas fa-briefcase"></i> Vị trí công việc
            </button>
            <button class="tab-btn" data-tab="insights">
                <i class="fas fa-lightbulb"></i> Insights
            </button>
        </div>
    `;
}

function buildTabContents(career) {
    return `
        <!-- Overview Tab -->
        <div class="tab-content active" data-tab-content="overview">
            ${buildOverviewTab(career)}
        </div>
        
        <!-- Schools Tab -->
        <div class="tab-content" data-tab-content="schools">
            ${buildSchoolsTab(career)}
        </div>
        
        <!-- Salary Tab -->
        <div class="tab-content" data-tab-content="salary">
            ${buildSalaryTab(career)}
        </div>
        
        <!-- Roadmap Tab -->
        <div class="tab-content" data-tab-content="roadmap">
            ${buildRoadmapTab(career)}
        </div>
        
        <!-- Skills Tab -->
        <div class="tab-content" data-tab-content="skills">
            ${buildSkillsTab(career)}
        </div>
        
        <!-- Careers Tab -->
        <div class="tab-content" data-tab-content="careers">
            ${buildCareersTab(career)}
        </div>
        
        <!-- Insights Tab -->
        <div class="tab-content" data-tab-content="insights">
            ${buildInsightsTab(career)}
        </div>
    `;
}

function buildOverviewTab(career) {
    return `
        <div class="content-section">
            <h3 class="section-title">
                <i class="fas fa-info-circle"></i>
                Giới thiệu ngành
            </h3>
            <p class="section-desc">${career.detailedDesc}</p>
        </div>
        
        <div class="content-section">
            <h3 class="section-title">
                <i class="fas fa-briefcase"></i>
                Môi trường làm việc
            </h3>
            <div class="school-grid">
                <div class="school-card">
                    <div class="school-details">
                        <div class="school-detail-item">
                            <i class="fas fa-building"></i>
                            <span><strong>Nơi làm:</strong> ${career.workEnvironment.style}</span>
                        </div>
                        <div class="school-detail-item">
                            <i class="fas fa-clock"></i>
                            <span><strong>Giờ làm:</strong> ${career.workEnvironment.hours}</span>
                        </div>
                        <div class="school-detail-item">
                            <i class="fas fa-tshirt"></i>
                            <span><strong>Dress code:</strong> ${career.workEnvironment.dress}</span>
                        </div>
                        <div class="school-detail-item">
                            <i class="fas fa-users"></i>
                            <span><strong>Văn hóa:</strong> ${career.workEnvironment.culture}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        ${career.trends2026 ? `
        <div class="content-section">
            <h3 class="section-title">
                <i class="fas fa-chart-line"></i>
                Xu hướng 2026
            </h3>
            <p class="section-desc">${career.trends2026}</p>
        </div>
        ` : ''}
    `;
}

function buildSchoolsTab(career) {
    let html = '';
    
    if (career.universities && career.universities.length > 0) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-university"></i>
                    Đại học / Cao đẳng
                </h3>
                <div class="school-grid">
                    ${career.universities.map(uni => `
                        <div class="school-card">
                            <div class="school-name">${uni.name}</div>
                            <div class="school-details">
                                <div class="school-detail-item">
                                    <i class="fas fa-chart-line"></i>
                                    <span><strong>Điểm:</strong> ${uni.score}</span>
                                </div>
                                <div class="school-detail-item">
                                    <i class="fas fa-book"></i>
                                    <span><strong>Tổ hợp:</strong> ${uni.combo}</span>
                                </div>
                                <div class="school-detail-item">
                                    <i class="fas fa-money-bill"></i>
                                    <span><strong>Học phí:</strong> ${uni.tuition}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (career.vocational && career.vocational.length > 0) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-graduation-cap"></i>
                    Trung cấp / Dạy nghề
                </h3>
                <div class="school-grid">
                    ${career.vocational.map(voc => `
                        <div class="school-card">
                            <div class="school-name">${voc.name}</div>
                            <div class="school-details">
                                <div class="school-detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Thời gian:</strong> ${voc.duration}</span>
                                </div>
                                <div class="school-detail-item">
                                    <i class="fas fa-money-bill"></i>
                                    <span><strong>Chi phí:</strong> ${voc.cost}</span>
                                </div>
                                <div class="school-detail-item" style="grid-column: 1 / -1;">
                                    <i class="fas fa-star"></i>
                                    <span><strong>Ưu điểm:</strong> ${voc.strength}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (career.admissionScore) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-book-open"></i>
                    Yêu cầu đầu vào
                </h3>
                <div class="school-card">
                    <div class="school-details">
                        <div class="school-detail-item">
                            <i class="fas fa-chart-line"></i>
                            <span><strong>Điểm ĐH:</strong> ${career.admissionScore.university}</span>
                        </div>
                        <div class="school-detail-item">
                            <i class="fas fa-book"></i>
                            <span><strong>Môn thi:</strong> ${career.admissionScore.subjects}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return html;
}

function buildSalaryTab(career) {
    return `
        <div class="content-section">
            <h3 class="section-title">
                <i class="fas fa-money-bill-wave"></i>
                Thu nhập theo cấp độ
            </h3>
            <div class="salary-levels">
                <div class="salary-level">
                    <div class="salary-level-title">
                        <span class="salary-level-name">🌱 Entry Level (0-2 năm)</span>
                        <span class="salary-level-amount">${career.salary.entry}</span>
                    </div>
                    <p class="salary-level-desc">Mới ra trường, vị trí junior</p>
                </div>
                
                <div class="salary-level">
                    <div class="salary-level-title">
                        <span class="salary-level-name">🚀 Mid Level (3-5 năm)</span>
                        <span class="salary-level-amount">${career.salary.mid}</span>
                    </div>
                    <p class="salary-level-desc">Đã có kinh nghiệm, làm việc độc lập</p>
                </div>
                
                <div class="salary-level">
                    <div class="salary-level-title">
                        <span class="salary-level-name">⭐ Senior Level (5+ năm)</span>
                        <span class="salary-level-amount">${career.salary.senior}</span>
                    </div>
                    <p class="salary-level-desc">Chuyên gia, quản lý, leadership</p>
                </div>
            </div>
            
            ${career.salary.note ? `
                <div class="school-card" style="margin-top: 1rem; background: linear-gradient(135deg, #fef3c7, #fed6e3);">
                    <div style="display: flex; align-items: start; gap: 1rem;">
                        <i class="fas fa-info-circle" style="color: #f59e0b; font-size: 1.5rem;"></i>
                        <div>
                            <strong style="color: #92400e;">Lưu ý:</strong>
                            <p style="margin: 0.5rem 0 0; color: #78350f;">${career.salary.note}</p>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function buildRoadmapTab(career) {
    let html = `<div class="content-section">
        <h3 class="section-title">
            <i class="fas fa-map-marked-alt"></i>
            Lộ trình phát triển sự nghiệp
        </h3>
        <div class="roadmap-container">
    `;
    
    if (career.roadmap.thpt) {
        html += `
            <div class="roadmap-path">
                <div class="roadmap-path-title">
                    🎓 Lộ trình Đại học / Cao đẳng
                </div>
                ${career.roadmap.thpt.map(step => `
                    <div class="roadmap-step">
                        <span class="roadmap-emoji">${step.match(/^[^\s]+/)[0]}</span>
                        <div class="roadmap-text">${step.replace(/^[^\s]+\s*/, '')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (career.roadmap.vocational) {
        html += `
            <div class="roadmap-path">
                <div class="roadmap-path-title">
                    🛠️ Lộ trình Trung cấp / Dạy nghề
                </div>
                ${career.roadmap.vocational.map(step => `
                    <div class="roadmap-step">
                        <span class="roadmap-emoji">${step.match(/^[^\s]+/)[0]}</span>
                        <div class="roadmap-text">${step.replace(/^[^\s]+\s*/, '')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    html += `</div></div>`;
    return html;
}

function buildSkillsTab(career) {
    let html = '<div class="content-section">';
    
    if (career.skills) {
        html += `
            <h3 class="section-title">
                <i class="fas fa-graduation-cap"></i>
                Kỹ năng chuyên môn cần có
            </h3>
            <div class="tags-container">
                ${career.skills.map(skill => `
                    <span class="tag">
                        <i class="fas fa-check-circle"></i>
                        ${skill}
                    </span>
                `).join('')}
            </div>
        `;
    }
    
    if (career.softSkills) {
        html += `
            <h3 class="section-title" style="margin-top: 2rem;">
                <i class="fas fa-user-friends"></i>
                Kỹ năng mềm
            </h3>
            <div class="tags-container">
                ${career.softSkills.map(skill => `
                    <span class="tag">
                        <i class="fas fa-heart"></i>
                        ${skill}
                    </span>
                `).join('')}
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function buildCareersTab(career) {
    return `
        <div class="content-section">
            <h3 class="section-title">
                <i class="fas fa-briefcase"></i>
                Các vị trí công việc phổ biến
            </h3>
            <div class="positions-grid">
                ${career.positions.map(position => `
                    <div class="position-item">
                        <i class="fas fa-angle-right"></i>
                        ${position}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function buildInsightsTab(career) {
    let html = '';
    
    if (career.recommendations) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-lightbulb"></i>
                    Lời khuyên từ chuyên gia
                </h3>
                <div class="roadmap-container">
                    ${career.recommendations.map(rec => `
                        <div class="roadmap-step">
                            <span class="roadmap-emoji">${rec.match(/^[^\s]+/)[0]}</span>
                            <div class="roadmap-text">${rec.replace(/^[^\s]+\s*/, '')}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (career.challenges) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-exclamation-triangle"></i>
                    Thách thức cần lưu ý
                </h3>
                <div class="challenges-list">
                    ${career.challenges.map(challenge => `
                        <div class="challenge-item">
                            <span>${challenge.match(/^[^\s]+/)[0]}</span>
                            <div class="challenge-text">${challenge.replace(/^[^\s]+\s*/, '')}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (career.successStories) {
        html += `
            <div class="content-section">
                <h3 class="section-title">
                    <i class="fas fa-trophy"></i>
                    Câu chuyện thành công
                </h3>
                <div class="success-stories">
                    ${career.successStories.map(story => `
                        <div class="success-story">
                            <i class="fas fa-star"></i>
                            <div class="success-story-text">${story}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return html;
}

function buildModalCTA(career) {
    return `
        <div class="modal-cta">
            <button class="cta-btn cta-btn-primary" onclick="selectCareerFromModal('${career.id}')">
                <i class="fas fa-check-circle"></i>
                Chọn ngành này
            </button>
            <button class="cta-btn cta-btn-secondary" onclick="closeCareerDetail()">
                <i class="fas fa-arrow-left"></i>
                Xem thêm ngành khác
            </button>
        </div>
    `;
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to current
            this.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function selectCareerFromModal(careerId) {
    // Set selected career
    selectedCareer = careerId;
    
    // Update UI: Remove 'selected' from all cards, add to current
    document.querySelectorAll('.career-card').forEach(c => c.classList.remove('selected'));
    const selectedCard = document.querySelector(`.career-card[data-career="${careerId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Enable analyze button
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.disabled = false;
    }
    
    // Close modal
    closeCareerDetail();
    
    // Show confirmation
    const careerName = careersDatabase[careerId].name;
    
    // Create a nice notification instead of alert
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <div style="font-size: 1rem; margin-bottom: 0.25rem;">Đã chọn ngành!</div>
                <div style="font-size: 0.875rem; opacity: 0.9;">${careerName}</div>
            </div>
        </div>
    `;
    
    // Add animation style
    if (!document.getElementById('notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Scroll to career selection area
    const careerSelection = document.getElementById('careerSelection');
    if (careerSelection) {
        careerSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCareerDetail();
    }
});
