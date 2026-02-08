/**
 * Infographic Renderer
 * Renders parsed infographic data into beautiful visualizations
 */

import { InfographicData, InfographicItem, getTemplateCategory } from './parser';

export interface RenderOptions {
    theme: 'light' | 'dark';
    enableAnimations: boolean;
    colorScheme: 'default' | 'antv' | 'catppuccin' | 'github' | 'dracula' | 'nord';
}

// Theme color definitions with multiple color schemes
const COLOR_SCHEMES = {
    default: {
        light: {
            bg: '#ffffff',
            surface: '#f8fafc',
            border: '#e2e8f0',
            text: '#1e293b',
            textMuted: '#64748b',
            accent: '#3b82f6',
            accentLight: '#dbeafe',
            success: '#22c55e',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#06b6d4'
        },
        dark: {
            bg: '#1e1e2e',
            surface: '#313244',
            border: '#45475a',
            text: '#cdd6f4',
            textMuted: '#a6adc8',
            accent: '#89b4fa',
            accentLight: '#313244',
            success: '#a6e3a1',
            warning: '#f9e2af',
            error: '#f38ba8',
            info: '#89dceb'
        }
    },
    antv: {
        light: {
            bg: '#ffffff',
            surface: '#fafafa',
            border: '#e8e8e8',
            text: '#2c3e50',
            textMuted: '#7f8c8d',
            accent: '#5b8ff9',
            accentLight: '#e6f7ff',
            success: '#52c41a',
            warning: '#faad14',
            error: '#ff4d4f',
            info: '#1890ff'
        },
        dark: {
            bg: '#1f1f1f',
            surface: '#2c2c2c',
            border: '#383838',
            text: '#e8e8e8',
            textMuted: '#a0a0a0',
            accent: '#5b8ff9',
            accentLight: '#262626',
            success: '#52c41a',
            warning: '#faad14',
            error: '#ff4d4f',
            info: '#1890ff'
        }
    },
    catppuccin: {
        light: {
            bg: '#eff1f5',
            surface: '#e6e9ef',
            border: '#ccd0da',
            text: '#4c4f69',
            textMuted: '#6c6f85',
            accent: '#1e66f5',
            accentLight: '#dce0f8',
            success: '#40a02b',
            warning: '#df8e1d',
            error: '#d20f39',
            info: '#04a5e5'
        },
        dark: {
            bg: '#1e1e2e',
            surface: '#313244',
            border: '#45475a',
            text: '#cdd6f4',
            textMuted: '#a6adc8',
            accent: '#89b4fa',
            accentLight: '#313244',
            success: '#a6e3a1',
            warning: '#f9e2af',
            error: '#f38ba8',
            info: '#89dceb'
        }
    },
    github: {
        light: {
            bg: '#ffffff',
            surface: '#f6f8fa',
            border: '#e1e4e8',
            text: '#24292f',
            textMuted: '#586069',
            accent: '#0366d6',
            accentLight: '#f1f8ff',
            success: '#2ea44f',
            warning: '#d29922',
            error: '#cf222e',
            info: '#1f883d'
        },
        dark: {
            bg: '#0d1117',
            surface: '#161b22',
            border: '#30363d',
            text: '#c9d1d9',
            textMuted: '#8b949e',
            accent: '#58a6ff',
            accentLight: '#161b22',
            success: '#3fb950',
            warning: '#d29922',
            error: '#f85149',
            info: '#2f81f7'
        }
    },
    dracula: {
        light: {
            bg: '#ffffff',
            surface: '#f8f8fa',
            border: '#e0e0e0',
            text: '#282a36',
            textMuted: '#6272a4',
            accent: '#bd93f9',
            accentLight: '#f3f3f3',
            success: '#50fa7b',
            warning: '#ffb86c',
            error: '#ff5555',
            info: '#8be9fd'
        },
        dark: {
            bg: '#282a36',
            surface: '#44475a',
            border: '#6272a4',
            text: '#f8f8f2',
            textMuted: '#bd93f9',
            accent: '#ff79c6',
            accentLight: '#44475a',
            success: '#50fa7b',
            warning: '#ffb86c',
            error: '#ff5555',
            info: '#8be9fd'
        }
    },
    nord: {
        light: {
            bg: '#eceff4',
            surface: '#e5e9f0',
            border: '#d8dee9',
            text: '#2e3440',
            textMuted: '#4c566a',
            accent: '#5e81ac',
            accentLight: '#eceff4',
            success: '#a3be8c',
            warning: '#ebcb8b',
            error: '#bf616a',
            info: '#88c0d0'
        },
        dark: {
            bg: '#2e3440',
            surface: '#3b4252',
            border: '#4c566a',
            text: '#d8dee9',
            textMuted: '#aeb8c1',
            accent: '#88c0d0',
            accentLight: '#3b4252',
            success: '#a3be8c',
            warning: '#ebcb8b',
            error: '#bf616a',
            info: '#81a1c1'
        }
    }
};

function getThemeColors(theme: 'light' | 'dark', scheme: string): any {
    const schemeKey = scheme as keyof typeof COLOR_SCHEMES;
    const themeKey = theme as 'light' | 'dark';
    return COLOR_SCHEMES[schemeKey]?.[themeKey] || COLOR_SCHEMES.default[themeKey];
}

// Pie chart colors
const PIE_COLORS = {
    light: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'],
    dark: ['#89b4fa', '#a6e3a1', '#f9e2af', '#f38ba8', '#cba6f7', '#89dceb', '#f5c2e7', '#a6e3a1']
};

/**
 * Main render function
 */
export async function renderInfographic(
    data: InfographicData,
    container: HTMLElement,
    options: RenderOptions
): Promise<void> {
    const theme = getThemeColors(options.theme, options.colorScheme);
    const category = getTemplateCategory(data.template);
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = `infographic-wrapper infographic-${options.theme} infographic-scheme-${options.colorScheme}`;
    if (options.enableAnimations) {
        wrapper.classList.add('infographic-animated');
    }
    
    // Apply theme CSS variables
    wrapper.style.setProperty('--ig-bg', theme.bg);
    wrapper.style.setProperty('--ig-surface', theme.surface);
    wrapper.style.setProperty('--ig-border', theme.border);
    wrapper.style.setProperty('--ig-text', theme.text);
    wrapper.style.setProperty('--ig-text-muted', theme.textMuted);
    wrapper.style.setProperty('--ig-accent', theme.accent);
    wrapper.style.setProperty('--ig-accent-light', theme.accentLight);
    wrapper.style.setProperty('--ig-success', theme.success);
    wrapper.style.setProperty('--ig-warning', theme.warning);
    wrapper.style.setProperty('--ig-error', theme.error);
    wrapper.style.setProperty('--ig-info', theme.info);
    
    // Add title if present
    if (data.title) {
        const titleEl = document.createElement('div');
        titleEl.className = 'infographic-title';
        titleEl.textContent = data.title;
        wrapper.appendChild(titleEl);
    }
    
    // Create content based on template category
    const content = document.createElement('div');
    content.className = `infographic-content infographic-${category}`;
    
    switch (category) {
        case 'list':
            renderList(data, content, options);
            break;
        case 'sequence':
            renderSequence(data, content, options);
            break;
        case 'hierarchy':
            renderHierarchy(data, content, options);
            break;
        case 'chart':
            renderChart(data, content, options);
            break;
        case 'compare':
            renderCompare(data, content, options);
            break;
        case 'quadrant':
            renderQuadrant(data, content, options);
            break;
        default:
            renderList(data, content, options);
    }
    
    wrapper.appendChild(content);
    container.appendChild(wrapper);
}

/**
 * Render list templates
 */
function renderList(data: InfographicData, container: HTMLElement, options: RenderOptions): void {
    const template = data.template;
    container.classList.add(`infographic-${template}`);
    
    if (template === 'list-row-simple-horizontal-arrow') {
        renderHorizontalArrowList(data.items, container, options);
    } else if (template === 'list-grid-badge-card' || template === 'list-grid-compact-card') {
        renderGridList(data.items, container, options, template);
    } else if (template === 'list-column-done-list') {
        renderDoneList(data.items, container, options);
    } else {
        renderGridList(data.items, container, options, template);
    }
}

function renderHorizontalArrowList(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const listEl = document.createElement('div');
    listEl.className = 'ig-horizontal-arrow-list';
    
    items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'ig-arrow-item';
        
        // Step number
        const stepNum = document.createElement('div');
        stepNum.className = 'ig-step-number';
        stepNum.textContent = String(index + 1);
        itemEl.appendChild(stepNum);
        
        // Content
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-item-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-item-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-item-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        itemEl.appendChild(contentEl);
        
        // Arrow (except for last item)
        if (index < items.length - 1) {
            const arrowEl = document.createElement('div');
            arrowEl.className = 'ig-arrow';
            arrowEl.innerHTML = '→';
            itemEl.appendChild(arrowEl);
        }
        
        listEl.appendChild(itemEl);
    });
    
    container.appendChild(listEl);
}

function renderGridList(items: InfographicItem[], container: HTMLElement, _options: RenderOptions, template: string): void {
    const gridEl = document.createElement('div');
    gridEl.className = 'ig-grid-list';
    
    const isCompact = template.includes('compact');
    
    items.forEach((item) => {
        const cardEl = document.createElement('div');
        cardEl.className = isCompact ? 'ig-compact-card' : 'ig-badge-card';
        
        // Icon
        if (item.icon) {
            const iconEl = document.createElement('div');
            iconEl.className = 'ig-card-icon';
            iconEl.innerHTML = renderIcon(item.icon);
            cardEl.appendChild(iconEl);
        }
        
        // Label
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-card-label';
        labelEl.textContent = item.label;
        cardEl.appendChild(labelEl);
        
        // Description
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-card-desc';
            descEl.textContent = item.desc;
            cardEl.appendChild(descEl);
        }
        
        // Value badge
        if (item.value !== undefined) {
            const valueEl = document.createElement('div');
            valueEl.className = 'ig-card-value';
            valueEl.textContent = String(item.value);
            cardEl.appendChild(valueEl);
        }
        
        gridEl.appendChild(cardEl);
    });
    
    container.appendChild(gridEl);
}

function renderDoneList(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const listEl = document.createElement('div');
    listEl.className = 'ig-done-list';
    
    items.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'ig-done-item';
        
        const checkEl = document.createElement('div');
        checkEl.className = 'ig-check';
        checkEl.innerHTML = '✓';
        itemEl.appendChild(checkEl);
        
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-done-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-done-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-done-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        itemEl.appendChild(contentEl);
        listEl.appendChild(itemEl);
    });
    
    container.appendChild(listEl);
}

/**
 * Render sequence templates
 */
function renderSequence(data: InfographicData, container: HTMLElement, options: RenderOptions): void {
    const template = data.template;
    container.classList.add(`infographic-${template}`);
    
    if (template === 'sequence-timeline-simple') {
        renderTimeline(data.items, container, options);
    } else if (template === 'sequence-snake-steps-simple') {
        renderSnakeSteps(data.items, container, options);
    } else if (template === 'sequence-ascending-steps') {
        renderAscendingSteps(data.items, container, options);
    } else if (template === 'sequence-zigzag-steps-underline-text') {
        renderZigzagSteps(data.items, container, options);
    } else {
        renderSimpleSteps(data.items, container, options);
    }
}

function renderSimpleSteps(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const stepsEl = document.createElement('div');
    stepsEl.className = 'ig-simple-steps';
    
    items.forEach((item, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'ig-step';
        
        const numEl = document.createElement('div');
        numEl.className = 'ig-step-num';
        numEl.textContent = String(index + 1);
        stepEl.appendChild(numEl);
        
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-step-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-step-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-step-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        stepEl.appendChild(contentEl);
        
        // Connector line
        if (index < items.length - 1) {
            const lineEl = document.createElement('div');
            lineEl.className = 'ig-step-line';
            stepEl.appendChild(lineEl);
        }
        
        stepsEl.appendChild(stepEl);
    });
    
    container.appendChild(stepsEl);
}

function renderTimeline(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const timelineEl = document.createElement('div');
    timelineEl.className = 'ig-timeline';
    
    items.forEach((item, index) => {
        const entryEl = document.createElement('div');
        entryEl.className = 'ig-timeline-entry';
        entryEl.classList.add(index % 2 === 0 ? 'ig-timeline-left' : 'ig-timeline-right');
        
        const dotEl = document.createElement('div');
        dotEl.className = 'ig-timeline-dot';
        entryEl.appendChild(dotEl);
        
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-timeline-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-timeline-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-timeline-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        entryEl.appendChild(contentEl);
        timelineEl.appendChild(entryEl);
    });
    
    container.appendChild(timelineEl);
}

function renderSnakeSteps(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const snakeEl = document.createElement('div');
    snakeEl.className = 'ig-snake-steps';
    
    items.forEach((item, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'ig-snake-step';
        stepEl.classList.add(index % 2 === 0 ? 'ig-snake-left' : 'ig-snake-right');
        
        const numEl = document.createElement('div');
        numEl.className = 'ig-snake-num';
        numEl.textContent = String(index + 1);
        stepEl.appendChild(numEl);
        
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-snake-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-snake-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-snake-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        stepEl.appendChild(contentEl);
        snakeEl.appendChild(stepEl);
    });
    
    container.appendChild(snakeEl);
}

function renderAscendingSteps(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const stairsEl = document.createElement('div');
    stairsEl.className = 'ig-ascending-steps';
    
    items.forEach((item, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'ig-ascending-step';
        stepEl.style.setProperty('--step-index', String(index));
        
        const numEl = document.createElement('div');
        numEl.className = 'ig-ascending-num';
        numEl.textContent = String(index + 1);
        stepEl.appendChild(numEl);
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-ascending-label';
        labelEl.textContent = item.label;
        stepEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-ascending-desc';
            descEl.textContent = item.desc;
            stepEl.appendChild(descEl);
        }
        
        stairsEl.appendChild(stepEl);
    });
    
    container.appendChild(stairsEl);
}

/**
 * Render zigzag steps with underline (AntV style)
 */
function renderZigzagSteps(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const zigzagEl = document.createElement('div');
    zigzagEl.className = 'ig-zigzag-steps';
    
    items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const stepEl = document.createElement('div');
        stepEl.className = `ig-zigzag-step ${isEven ? 'ig-zigzag-left' : 'ig-zigzag-right'}`;
        
        const numEl = document.createElement('div');
        numEl.className = 'ig-zigzag-num';
        numEl.textContent = String(index + 1);
        stepEl.appendChild(numEl);
        
        const contentEl = document.createElement('div');
        contentEl.className = 'ig-zigzag-content';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-zigzag-label';
        labelEl.textContent = item.label;
        contentEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-zigzag-desc';
            descEl.textContent = item.desc;
            contentEl.appendChild(descEl);
        }
        
        // Add underline decoration
        const underlineEl = document.createElement('div');
        underlineEl.className = 'ig-zigzag-underline';
        contentEl.appendChild(underlineEl);
        
        stepEl.appendChild(contentEl);
        zigzagEl.appendChild(stepEl);
    });
    
    container.appendChild(zigzagEl);
}

/**
 * Render hierarchy templates
 */
function renderHierarchy(data: InfographicData, container: HTMLElement, _options: RenderOptions): void {
    const template = data.template;
    container.classList.add(`infographic-${template}`);
    
    const treeEl = document.createElement('div');
    treeEl.className = template.includes('mindmap') ? 'ig-mindmap' : 'ig-tree';
    
    renderTreeNodes(data.items, treeEl, 0);
    
    container.appendChild(treeEl);
}

function renderTreeNodes(items: InfographicItem[], container: HTMLElement, level: number): void {
    items.forEach((item) => {
        const nodeWrapper = document.createElement('div');
        nodeWrapper.className = 'ig-tree-node-wrapper';
        nodeWrapper.style.setProperty('--level', String(level));
        
        const nodeEl = document.createElement('div');
        nodeEl.className = 'ig-tree-node';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-tree-label';
        labelEl.textContent = item.label;
        nodeEl.appendChild(labelEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-tree-desc';
            descEl.textContent = item.desc;
            nodeEl.appendChild(descEl);
        }
        
        nodeWrapper.appendChild(nodeEl);
        
        // Render children
        if (item.children && item.children.length > 0) {
            const childrenEl = document.createElement('div');
            childrenEl.className = 'ig-tree-children';
            renderTreeNodes(item.children, childrenEl, level + 1);
            nodeWrapper.appendChild(childrenEl);
        }
        
        container.appendChild(nodeWrapper);
    });
}

/**
 * Render chart templates
 */
function renderChart(data: InfographicData, container: HTMLElement, options: RenderOptions): void {
    const template = data.template;
    container.classList.add(`infographic-${template}`);
    
    if (template === 'chart-pie-plain-text') {
        renderPieChart(data.items, container, options);
    } else if (template === 'chart-bar-plain-text') {
        renderBarChart(data.items, container, options);
    } else if (template === 'chart-column-simple') {
        renderColumnChart(data.items, container, options);
    } else {
        renderBarChart(data.items, container, options);
    }
}

function renderPieChart(items: InfographicItem[], container: HTMLElement, options: RenderOptions): void {
    const chartEl = document.createElement('div');
    chartEl.className = 'ig-pie-chart';
    
    const colors = PIE_COLORS[options.theme];
    const total = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
    
    // Create SVG pie chart
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '-1 -1 2 2');
    svg.setAttribute('class', 'ig-pie-svg');
    
    let currentAngle = -Math.PI / 2;
    
    items.forEach((item, index) => {
        const value = Number(item.value) || 0;
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        const x1 = Math.cos(currentAngle);
        const y1 = Math.sin(currentAngle);
        const x2 = Math.cos(currentAngle + sliceAngle);
        const y2 = Math.sin(currentAngle + sliceAngle);
        
        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
        
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`);
        path.setAttribute('fill', colors[index % colors.length]);
        path.setAttribute('class', 'ig-pie-slice');
        
        svg.appendChild(path);
        currentAngle += sliceAngle;
    });
    
    chartEl.appendChild(svg);
    
    // Legend
    const legendEl = document.createElement('div');
    legendEl.className = 'ig-pie-legend';
    
    items.forEach((item, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'ig-legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'ig-legend-color';
        colorBox.style.backgroundColor = colors[index % colors.length];
        legendItem.appendChild(colorBox);
        
        const labelEl = document.createElement('span');
        labelEl.className = 'ig-legend-label';
        const percentage = total > 0 ? ((Number(item.value) || 0) / total * 100).toFixed(1) : 0;
        labelEl.textContent = `${item.label} (${percentage}%)`;
        legendItem.appendChild(labelEl);
        
        legendEl.appendChild(legendItem);
    });
    
    chartEl.appendChild(legendEl);
    container.appendChild(chartEl);
}

function renderBarChart(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const chartEl = document.createElement('div');
    chartEl.className = 'ig-bar-chart';
    
    const maxValue = Math.max(...items.map(item => Number(item.value) || 0));
    
    items.forEach((item) => {
        const barRow = document.createElement('div');
        barRow.className = 'ig-bar-row';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-bar-label';
        labelEl.textContent = item.label;
        barRow.appendChild(labelEl);
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'ig-bar-wrapper';
        
        const barEl = document.createElement('div');
        barEl.className = 'ig-bar';
        const percentage = maxValue > 0 ? ((Number(item.value) || 0) / maxValue * 100) : 0;
        barEl.style.width = `${percentage}%`;
        barWrapper.appendChild(barEl);
        
        const valueEl = document.createElement('div');
        valueEl.className = 'ig-bar-value';
        valueEl.textContent = String(item.value ?? '');
        barWrapper.appendChild(valueEl);
        
        barRow.appendChild(barWrapper);
        chartEl.appendChild(barRow);
    });
    
    container.appendChild(chartEl);
}

function renderColumnChart(items: InfographicItem[], container: HTMLElement, _options: RenderOptions): void {
    const chartEl = document.createElement('div');
    chartEl.className = 'ig-column-chart';
    
    const maxValue = Math.max(...items.map(item => Number(item.value) || 0));
    
    const columnsEl = document.createElement('div');
    columnsEl.className = 'ig-columns';
    
    items.forEach((item) => {
        const columnWrapper = document.createElement('div');
        columnWrapper.className = 'ig-column-wrapper';
        
        const columnEl = document.createElement('div');
        columnEl.className = 'ig-column';
        const percentage = maxValue > 0 ? ((Number(item.value) || 0) / maxValue * 100) : 0;
        columnEl.style.height = `${percentage}%`;
        
        const valueEl = document.createElement('div');
        valueEl.className = 'ig-column-value';
        valueEl.textContent = String(item.value ?? '');
        columnEl.appendChild(valueEl);
        
        columnWrapper.appendChild(columnEl);
        
        const labelEl = document.createElement('div');
        labelEl.className = 'ig-column-label';
        labelEl.textContent = item.label;
        columnWrapper.appendChild(labelEl);
        
        columnsEl.appendChild(columnWrapper);
    });
    
    chartEl.appendChild(columnsEl);
    container.appendChild(chartEl);
}

/**
 * Render compare templates
 */
function renderCompare(data: InfographicData, container: HTMLElement, _options: RenderOptions): void {
    const template = data.template;
    container.classList.add(`infographic-${template}`);
    
    if (template === 'compare-swot') {
        renderSwot(data.items, container);
    } else {
        renderBinaryCompare(data.items, container);
    }
}

function renderSwot(items: InfographicItem[], container: HTMLElement): void {
    const swotEl = document.createElement('div');
    swotEl.className = 'ig-swot';
    
    const labels = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
    const classes = ['ig-swot-s', 'ig-swot-w', 'ig-swot-o', 'ig-swot-t'];
    
    items.slice(0, 4).forEach((item, index) => {
        const quadrant = document.createElement('div');
        quadrant.className = `ig-swot-quadrant ${classes[index]}`;
        
        const headerEl = document.createElement('div');
        headerEl.className = 'ig-swot-header';
        headerEl.textContent = item.label || labels[index];
        quadrant.appendChild(headerEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-swot-content';
            descEl.textContent = item.desc;
            quadrant.appendChild(descEl);
        }
        
        if (item.children) {
            const listEl = document.createElement('ul');
            listEl.className = 'ig-swot-list';
            item.children.forEach(child => {
                const li = document.createElement('li');
                li.textContent = child.label;
                listEl.appendChild(li);
            });
            quadrant.appendChild(listEl);
        }
        
        swotEl.appendChild(quadrant);
    });
    
    container.appendChild(swotEl);
}

function renderBinaryCompare(items: InfographicItem[], container: HTMLElement): void {
    const compareEl = document.createElement('div');
    compareEl.className = 'ig-binary-compare';
    
    items.slice(0, 2).forEach((item, index) => {
        const sideEl = document.createElement('div');
        sideEl.className = `ig-compare-side ${index === 0 ? 'ig-compare-left' : 'ig-compare-right'}`;
        
        const headerEl = document.createElement('div');
        headerEl.className = 'ig-compare-header';
        headerEl.textContent = item.label;
        sideEl.appendChild(headerEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-compare-desc';
            descEl.textContent = item.desc;
            sideEl.appendChild(descEl);
        }
        
        if (item.children) {
            const listEl = document.createElement('ul');
            listEl.className = 'ig-compare-list';
            item.children.forEach(child => {
                const li = document.createElement('li');
                li.textContent = child.label;
                if (child.desc) {
                    const desc = document.createElement('span');
                    desc.className = 'ig-compare-item-desc';
                    desc.textContent = ` - ${child.desc}`;
                    li.appendChild(desc);
                }
                listEl.appendChild(li);
            });
            sideEl.appendChild(listEl);
        }
        
        compareEl.appendChild(sideEl);
    });
    
    container.appendChild(compareEl);
}

/**
 * Render quadrant templates
 */
function renderQuadrant(data: InfographicData, container: HTMLElement, _options: RenderOptions): void {
    container.classList.add(`infographic-${data.template}`);
    
    const quadrantEl = document.createElement('div');
    quadrantEl.className = 'ig-quadrant';
    
    data.items.slice(0, 4).forEach((item, index) => {
        const cellEl = document.createElement('div');
        cellEl.className = `ig-quadrant-cell ig-quadrant-${index + 1}`;
        
        const headerEl = document.createElement('div');
        headerEl.className = 'ig-quadrant-header';
        headerEl.textContent = item.label;
        cellEl.appendChild(headerEl);
        
        if (item.desc) {
            const descEl = document.createElement('div');
            descEl.className = 'ig-quadrant-desc';
            descEl.textContent = item.desc;
            cellEl.appendChild(descEl);
        }
        
        if (item.children) {
            const listEl = document.createElement('ul');
            listEl.className = 'ig-quadrant-list';
            item.children.forEach(child => {
                const li = document.createElement('li');
                li.textContent = child.label;
                listEl.appendChild(li);
            });
            cellEl.appendChild(listEl);
        }
        
        quadrantEl.appendChild(cellEl);
    });
    
    container.appendChild(quadrantEl);
}

/**
 * Render icon from Iconify format (mdi:icon-name)
 */
function renderIcon(iconStr: string): string {
    // Parse icon format: mdi:icon-name
    const [prefix, name] = iconStr.split(':');
    if (!prefix || !name) {
        return `<span class="ig-icon-fallback">●</span>`;
    }
    
    // Use Iconify CDN for icons
    return `<span class="iconify" data-icon="${iconStr}"></span>`;
}
