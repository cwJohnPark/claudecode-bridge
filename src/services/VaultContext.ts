import { App, MarkdownView } from 'obsidian';

// Vault 경로 및 파일 컨텍스트 제공
export class VaultContext {
	constructor(private readonly app: App) {}

	// Vault의 절대 경로 반환
	getVaultBasePath(): string {
		const adapter = this.app.vault.adapter as { getBasePath?: () => string };
		return adapter.getBasePath?.() ?? '';
	}

	// 현재 활성 파일의 절대 경로 반환
	getActiveFilePath(): string | null {
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) {
			return null;
		}

		const basePath = this.getVaultBasePath();
		return `${basePath}/${activeFile.path}`;
	}

	// 에디터에서 선택된 텍스트 반환
	getSelectedText(): string | null {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			return null;
		}

		const editor = activeView.editor;
		const selection = editor.getSelection();
		return selection || null;
	}
}
