// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { TreeItemNode, TreeProvider } from './treeview';
import { getSites } from './g5kapi';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "g5k-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('g5k-plugin.helloWorld', async () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user

	// 	vscode.window.showInformationMessage('Hello World from g5k-plugin!');
	// });

	// context.subscriptions.push(disposable);

	const treeProvider = new TreeProvider();
	getSites().then((sites) => {

		for (const site of sites) {
			let node = new TreeItemNode(site.name, vscode.TreeItemCollapsibleState.Collapsed);
			if (site.clusters) {
				for (const cluster of site.clusters) {
					node.children.push(new TreeItemNode(cluster.name, vscode.TreeItemCollapsibleState.None));
				}
			}
			treeProvider.addItem(node);
		}
		vscode.window.createTreeView('g5ksitesView', { treeDataProvider: treeProvider });
	});



}




// This method is called when your extension is deactivated
export function deactivate() { }
