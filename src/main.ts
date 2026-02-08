import { Menu, Notice, Plugin } from 'obsidian';
import { Infographic, InfographicOptions } from '@antv/infographic';
import { DEFAULT_SETTINGS, InfographicSettings, InfographicSettingTab } from './settings';

export default class InfographicPlugin extends Plugin {
    settings: InfographicSettings;
    instances: WeakMap<HTMLElement, Infographic> = new WeakMap();

    async onload() {
        console.log('Loading Infographic Viz plugin...');
        await this.loadSettings();

        // 添加设置选项卡
        this.addSettingTab(new InfographicSettingTab(this.app, this));

        // 注册 infographic 代码块处理器
        this.registerMarkdownCodeBlockProcessor('infographic', (content, el, ctx) => {
            this.renderInfographic(content, el);
        });

        console.log('Infographic Viz plugin loaded successfully');
    }

    onunload() {
        // 清理工作由 Obsidian 自动处理
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<InfographicSettings>);
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    private renderInfographic(content: string, containerEl: HTMLElement) {
        // 清空容器
        containerEl.empty();

        // 创建包装容器元素
        const wrapper = containerEl.createDiv('infographic-wrapper');

        try {
            // 创建 Infographic 实例
            const instance = new Infographic({
                container: wrapper,
                ...this.settingsToOptions(),
            });

            // 渲染内容
            instance.render(content);

            // 保存实例引用以便后续使用
            this.instances.set(wrapper, instance);

            // 在包装容器上添加右键菜单
            this.registerDomEvent(wrapper, 'contextmenu', (event: MouseEvent) => {
                event.preventDefault();
                this.showContextMenu(instance, event);
            });
        } catch (error) {
            // 错误处理
            console.error('Infographic render error:', error);
            wrapper.createDiv({
                cls: 'infographic-error',
                text: `渲染失败: ${error instanceof Error ? error.message : String(error)}`
            });
        }
    }

    private showContextMenu(instance: Infographic, event: MouseEvent) {
        const menu = new Menu();

        // 复制图表到剪贴板
        menu.addItem((item) =>
            item
                .setTitle('Copy to Clipboard (PNG)')
                .setIcon('copy')
                .onClick(async () => {
                    await this.copyToClipboard(instance);
                })
        );

        // 导出为 PNG
        menu.addItem((item) =>
            item
                .setTitle('Export as PNG')
                .setIcon('image-file')
                .onClick(async () => {
                    await this.exportAsPNG(instance);
                })
        );

        // 导出为 SVG
        menu.addItem((item) =>
            item
                .setTitle('Export as SVG')
                .setIcon('image-file')
                .onClick(async () => {
                    await this.exportAsSVG(instance);
                })
        );

        menu.showAtMouseEvent(event);
    }

    private async copyToClipboard(instance: Infographic) {
        try {
            const dataUrl = await instance.toDataURL();
            const blob = this.dataUrlToBlob(dataUrl);

            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]);

            new Notice('Copied to clipboard as PNG');
        } catch (error) {
            console.error('Copy error:', error);
            new Notice('Failed to copy: ' + (error instanceof Error ? error.message : String(error)));
        }
    }

    private async exportAsPNG(instance: Infographic) {
        try {
            const dataUrl = await instance.toDataURL();

            // 创建下载链接
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `infographic-${Date.now()}.png`;
            link.click();

            new Notice('Exported as PNG');
        } catch (error) {
            console.error('Export error:', error);
            new Notice('Export failed: ' + (error instanceof Error ? error.message : String(error)));
        }
    }

    private async exportAsSVG(instance: Infographic) {
        try {
            const dataUrl = await instance.toDataURL({
                type: 'svg',
                embedResources: true,
                removeIds: false
            });

            // 创建下载链接
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `infographic-${Date.now()}.svg`;
            link.click();

            new Notice('Exported as SVG');
        } catch (error) {
            console.error('Export error:', error);
            new Notice('Export failed: ' + (error instanceof Error ? error.message : String(error)));
        }
    }

    // 辅助函数：将 data URL 转换为 Blob
    private dataUrlToBlob(dataUrl: string): Blob {
        const arr = dataUrl.split(',');
        if (arr.length < 2 || !arr[0] || !arr[1]) {
            throw new Error('Invalid data URL');
        }

        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    // 将设置转换为 Infographic 选项
    private settingsToOptions(): Partial<InfographicOptions> {
        const options: Partial<InfographicOptions> = {};

        // 如果设置了默认主题，则应用
        if (this.settings.defaultTheme) {
            options.theme = this.settings.defaultTheme;
        }

        // 如果启用了编辑模式
        if (this.settings.editable) {
            options.editable = true;
        }

        return options;
    }
}
