// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { TreeItemNode, TreeProvider } from './treeview';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "g5k-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('g5k-plugin.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let data = await listSites();
		vscode.window.showInformationMessage('Hello World from g5k-plugin!');
	});

	context.subscriptions.push(disposable);

	const treeProvider = new TreeProvider();
	treeProvider.addItem(new TreeItemNode('Item 1', vscode.TreeItemCollapsibleState.None));
	treeProvider.addItem(new TreeItemNode('Item 2', vscode.TreeItemCollapsibleState.Collapsed));
	treeProvider.addItem(new TreeItemNode('Item 3', vscode.TreeItemCollapsibleState.Expanded));
	vscode.window.createTreeView('myTreeView', { treeDataProvider: treeProvider });

}





const API_URL = 'https://api.grid5000.fr/stable';
const USERNAME = 'mbelgaid';
const PASSWORD = '001010CH@k!b++';

async function listSites(): Promise<any> {
	try {
		const response = await axios.get(`${API_URL}/sites`, {
			auth: {
				username: USERNAME,
				password: PASSWORD
			},
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Accept': 'application/vnd.grid5000.item+json'
			}

		});
		// return response.data;
		return response.data.items.map((site: any) => site.name);
	} catch (error) {

		console.error(error);
	}
}


// a function that create elements from the node tree for each site
function detailsSite(site: any): any {


}


// This method is called when your extension is deactivated
export function deactivate() { }
