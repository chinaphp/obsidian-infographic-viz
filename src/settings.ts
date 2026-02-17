import { PluginSettingTab, App, DropdownComponent, ToggleComponent, Setting } from 'obsidian';
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

        // 主题选择
        new Setting(containerEl)
            .setName('Default theme')
            .setDesc('Choose the default theme for infographics.')
            .addDropdown((dropdown: DropdownComponent) => {
                // 添加 "Auto" 选项
                dropdown.addOption('', 'Auto (use infographic default)');
                
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
            .setName('Editable mode')
            .setDesc('Enable inline editing of infographics.')
            .addToggle((toggle: ToggleComponent) => {
                toggle.setValue(this.plugin.settings.editable);
                toggle.onChange(async (value: boolean) => {
                    this.plugin.settings.editable = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Export')
            .setHeading();

        const exportDiv = containerEl.createDiv({ cls: 'setting-item-description' });
        const exportP = exportDiv.createEl('p');
        exportP.textContent = 'Right-click on any infographic to access export options:';

        const exportUl = exportDiv.createEl('ul', { cls: 'infographic-settings-export-list' });

        const exportLi1 = exportUl.createEl('li');
        const exportStrong1 = exportLi1.createEl('strong');
        exportStrong1.textContent = 'Copy to clipboard';
        exportLi1.appendText(' - Copy PNG image to clipboard for pasting');

        const exportLi2 = exportUl.createEl('li');
        const exportStrong2 = exportLi2.createEl('strong');
        exportStrong2.textContent = 'Export as PNG';
        exportLi2.appendText(' - Download infographic as PNG file');

        const exportLi3 = exportUl.createEl('li');
        const exportStrong3 = exportLi3.createEl('strong');
        exportStrong3.textContent = 'Export as SVG';
        exportLi3.appendText(' - Download infographic as SVG vector file');

        new Setting(containerEl)
            .setName('Usage')
            .setHeading();

        const usageDiv = containerEl.createDiv({ cls: 'setting-item-description' });
        const usageP = usageDiv.createEl('p');
        const usageCode = usageP.createEl('code');
        usageCode.textContent = 'Infographic';
        usageP.prependText('Use ');
        usageP.appendText(' code blocks to create infographics');

        const usagePre = usageDiv.createEl('pre', { cls: 'infographic-settings-code-block' });

        const usageCodeBlock = usagePre.createEl('code');
        usageCodeBlock.textContent = '```infographic\ninfographic sequence-zigzag-steps-underline-text\ndata\n  title Process Flow\n  items\n    - label phase 1\n      desc Initial setup\n    - label phase 2\n      desc Development\n    - label phase 3\n      desc Testing\n```';
    }
}
