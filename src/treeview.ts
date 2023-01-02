import * as vscode from 'vscode';


export class TreeItemNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}

export class TreeProvider implements vscode.TreeDataProvider<TreeItemNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItemNode | undefined> = new vscode.EventEmitter<TreeItemNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<TreeItemNode | undefined> = this._onDidChangeTreeData.event;

    private items: TreeItemNode[] = [];

    constructor() { }

    addItem(item: TreeItemNode): void {
        this.items.push(item);
        this.refresh();
    }

    getTreeItem(element: TreeItemNode): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeItemNode): Thenable<TreeItemNode[]> {
        if (!element) {
            return Promise.resolve(this.items);
        }
        return Promise.resolve([]);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }
}

