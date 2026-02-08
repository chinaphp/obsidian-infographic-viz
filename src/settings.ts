import { PluginSettingTab, App, DropdownComponent, ToggleComponent } from 'obsidian';
import { InfographicPlugin } from './main';
import { getThemes } from '@antv/infographic';

export interface InfographicSettings {
    defaultTheme: string;
    editable: boolean;
}

export const DEFAULT_SETTINGS: InfographicSettings = {
    defaultTheme: '',
    editable: false
};

export class InfographicSettingTab extends PluginSettingTab {
    plugin: InfographicPlugin;

    constructor(app: App, plugin: InfographicPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Infographic Viz Settings' });

        // 主题选择
        new Setting(containerEl)
            .setName('Default Theme')
            .setDesc('Choose the default theme for infographics.')
            .addDropdown((dropdown: DropdownComponent) => {
                // 添加 "Auto" 选项
                dropdown.addOption('', 'Auto (Use Infographic Default)');
                
                // 获取所有可用的主题
                const themes = getThemes();
                themes.forEach((theme) => {
                    dropdown.addOption(theme, theme);
                });

                dropdown.setValue(this.plugin.settings.defaultTheme || '');
                dropdown.onChange(async (value: string) => {
                    this.plugin.settings.defaultTheme = value;
                    await this.plugin.saveSettings();
                });
            });

        // 可编辑模式
        new Setting(containerEl)
            .setName('Editable Mode')
            .setDesc('Enable inline editing of infographics.')
            .addToggle((toggle: ToggleComponent) => {
                toggle.setValue(this.plugin.settings.editable);
                toggle.onChange(async (value: boolean) => {
                    this.plugin.settings.editable = value;
                    await this.plugin.saveSettings();
                });
            });

        containerEl.createEl('h3', { text: 'Export Options' });
        
        const exportDiv = containerEl.createDiv({ cls: 'setting-item-description' });
        exportDiv.innerHTML = `
            <p>Right-click on any infographic to access export options:</p>
            <ul style="margin-top: 8px; padding-left: 20px;">
                <li><strong>Copy to Clipboard (PNG)</strong> - Copy PNG image to clipboard for pasting</li>
                <li><strong>Export as PNG</strong> - Download infographic as PNG file</li>
                <li><strong>Export as SVG</strong> - Download infographic as SVG vector file</li>
            </ul>
        `;

        containerEl.createEl('h3', { text: 'Usage' });
        
        const usageDiv = containerEl.createDiv({ cls: 'setting-item-description' });
        usageDiv.innerHTML = `
            <p>Use <code>infographic</code> code blocks to create infographics:</p>
            <pre style="margin-top: 8px; padding: 8px; background: var(--background-secondary); border-radius: 4px; overflow-x: auto;"><code>\`\`\`infographic
infographic sequence-zigzag-steps-underline-text
data
  title Process Flow
  items
    - label Phase 1
      desc Initial setup
    - label Phase 2
      desc Development
    - label Phase 3
      desc Testing
\`\`\`</code></pre>
        `;
    }
}
