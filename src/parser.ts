/**
 * Infographic DSL Parser
 * Parses the custom infographic syntax into structured data
 */

export interface InfographicItem {
    label: string;
    value?: number | string;
    desc?: string;
    icon?: string;
    children?: InfographicItem[];
}

export interface InfographicData {
    template: string;
    title?: string;
    items: InfographicItem[];
    theme?: string;
}

interface ParseContext {
    lines: string[];
    currentIndex: number;
    baseIndent: number;
}

/**
 * Parse infographic DSL source into structured data
 */
export function parseInfographic(source: string): InfographicData {
    const lines = source.split('\n');
    
    let template = '';
    let title: string | undefined;
    let theme: string | undefined;
    let items: InfographicItem[] = [];
    
    // First line should be: infographic <template-name>
    const firstLine = lines[0]?.trim() || '';
    if (firstLine.startsWith('infographic ')) {
        template = firstLine.substring('infographic '.length).trim();
    } else {
        throw new Error('First line must be: infographic <template-name>');
    }
    
    // Parse the rest using indentation-based parsing
    const ctx: ParseContext = {
        lines: lines.slice(1),
        currentIndex: 0,
        baseIndent: 0
    };
    
    while (ctx.currentIndex < ctx.lines.length) {
        const line = ctx.lines[ctx.currentIndex];
        const trimmed = line.trim();
        
        if (!trimmed) {
            ctx.currentIndex++;
            continue;
        }
        
        // Parse top-level keywords
        if (trimmed === 'data') {
            ctx.currentIndex++;
            const dataContent = parseDataBlock(ctx);
            title = dataContent.title;
            items = dataContent.items;
        } else if (trimmed.startsWith('theme')) {
            // theme can be at root level or inside data
            const themeMatch = trimmed.match(/^theme\s+(.+)$/);
            if (themeMatch) {
                theme = themeMatch[1].trim();
            }
            ctx.currentIndex++;
        } else {
            ctx.currentIndex++;
        }
    }
    
    return {
        template,
        title,
        items,
        theme
    };
}

interface DataBlockResult {
    title?: string;
    items: InfographicItem[];
}

function parseDataBlock(ctx: ParseContext): DataBlockResult {
    let title: string | undefined;
    let items: InfographicItem[] = [];
    
    // Determine the indent level for data block content
    const dataIndent = getIndent(ctx.lines[ctx.currentIndex] || '');
    
    while (ctx.currentIndex < ctx.lines.length) {
        const line = ctx.lines[ctx.currentIndex];
        const trimmed = line.trim();
        const indent = getIndent(line);
        
        // Empty line - skip
        if (!trimmed) {
            ctx.currentIndex++;
            continue;
        }
        
        // If we've gone back to a lower indent, we're done with data block
        if (indent < dataIndent && trimmed) {
            break;
        }
        
        // Parse title
        if (trimmed.startsWith('title ')) {
            title = trimmed.substring('title '.length).trim();
            ctx.currentIndex++;
            continue;
        }
        
        // Parse items
        if (trimmed === 'items') {
            ctx.currentIndex++;
            items = parseItems(ctx, indent + 2);
            continue;
        }
        
        ctx.currentIndex++;
    }
    
    return { title, items };
}

function parseItems(ctx: ParseContext, baseIndent: number): InfographicItem[] {
    const items: InfographicItem[] = [];
    
    while (ctx.currentIndex < ctx.lines.length) {
        const line = ctx.lines[ctx.currentIndex];
        const trimmed = line.trim();
        const indent = getIndent(line);
        
        // Empty line - skip
        if (!trimmed) {
            ctx.currentIndex++;
            continue;
        }
        
        // If indent is less than base, we're done with this items block
        if (indent < baseIndent && trimmed) {
            break;
        }
        
        // New item starts with "- "
        if (trimmed.startsWith('- ')) {
            const item = parseItem(ctx, indent);
            items.push(item);
            continue;
        }
        
        ctx.currentIndex++;
    }
    
    return items;
}

function parseItem(ctx: ParseContext, itemIndent: number): InfographicItem {
    const line = ctx.lines[ctx.currentIndex];
    const trimmed = line.trim();
    
    // Parse the first line: "- label <value>" or "- label"
    let label = '';
    const itemContent = trimmed.substring(2).trim(); // Remove "- "
    
    // Check if it's "label <value>" format
    if (itemContent.startsWith('label ')) {
        label = itemContent.substring('label '.length).trim();
    } else {
        label = itemContent;
    }
    
    ctx.currentIndex++;

    const item: InfographicItem = { label };

    // Parse item properties (value, desc, icon, children)
    while (ctx.currentIndex < ctx.lines.length) {
        const propLine = ctx.lines[ctx.currentIndex];
        const propTrimmed = propLine.trim();
        const propCurrentIndent = getIndent(propLine);
        
        // Empty line - skip
        if (!propTrimmed) {
            ctx.currentIndex++;
            continue;
        }
        
        // If we're at the same or lower indent, or a new item, stop
        if (propCurrentIndent <= itemIndent) {
            break;
        }
        
        // New item at same level
        if (propTrimmed.startsWith('- ') && propCurrentIndent === itemIndent) {
            break;
        }
        
        // Parse property
        if (propTrimmed.startsWith('label ')) {
            item.label = propTrimmed.substring('label '.length).trim();
            ctx.currentIndex++;
        } else if (propTrimmed.startsWith('value ')) {
            const valueStr = propTrimmed.substring('value '.length).trim();
            // Try to parse as number
            const numValue = parseFloat(valueStr);
            item.value = isNaN(numValue) ? valueStr : numValue;
            ctx.currentIndex++;
        } else if (propTrimmed.startsWith('desc ')) {
            item.desc = propTrimmed.substring('desc '.length).trim();
            ctx.currentIndex++;
        } else if (propTrimmed.startsWith('icon ')) {
            item.icon = propTrimmed.substring('icon '.length).trim();
            ctx.currentIndex++;
        } else if (propTrimmed === 'children') {
            ctx.currentIndex++;
            item.children = parseItems(ctx, propCurrentIndent + 2);
        } else {
            ctx.currentIndex++;
        }
    }
    
    return item;
}

function getIndent(line: string): number {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
}

/**
 * Validate template name
 */
export function isValidTemplate(template: string): boolean {
    const validTemplates = [
        'list-row-simple-horizontal-arrow',
        'list-grid-badge-card',
        'list-grid-compact-card',
        'list-column-done-list',
        'sequence-steps-simple',
        'sequence-timeline-simple',
        'sequence-snake-steps-simple',
        'sequence-ascending-steps',
        'sequence-zigzag-steps-underline-text',
        'hierarchy-tree-curved-line-rounded-rect-node',
        'hierarchy-mindmap-curved-line-compact-card',
        'chart-pie-plain-text',
        'chart-bar-plain-text',
        'chart-column-simple',
        'compare-swot',
        'compare-binary-horizontal-simple-fold',
        'quadrant-quarter-simple-card'
    ];
    
    return validTemplates.includes(template);
}

/**
 * Get template category
 */
export function getTemplateCategory(template: string): string {
    if (template.startsWith('list-')) return 'list';
    if (template.startsWith('sequence-')) return 'sequence';
    if (template.startsWith('hierarchy-')) return 'hierarchy';
    if (template.startsWith('chart-')) return 'chart';
    if (template.startsWith('compare-')) return 'compare';
    if (template.startsWith('quadrant-')) return 'quadrant';
    return 'unknown';
}
