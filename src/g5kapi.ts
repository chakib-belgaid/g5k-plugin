
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { USERNAME, PASSWORD } from './.credentials';
import { Site, Cluster } from './types';


// cast this parameters as string
const API_URL = vscode.workspace.getConfiguration('g5k-plugin').get<string>('url');
// TODO: Uncomment this line when you publish 
// const USERNAME: string = vscode.workspace.getConfiguration('g5k-plugin').get<string>('username')!;
// const PASSWORD: string = vscode.workspace.getConfiguration('g5k-plugin').get<string>('password')!;


const LISTFORMAT = "application/vnd.grid5000.collection+json";
const ITEMFORMAT = "application/vnd.grid5000.item+json";





async function Request(path: string, mediatype: string = ITEMFORMAT): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/${path}`, {
            auth: {

                username: USERNAME,
                password: PASSWORD
            },
            headers: {

                'Accept': mediatype
            }

        });
        if (response.status != 200) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {

        console.error(error);
    }
}

// create  a class that containes a tree composed of a sites and each side has clusters

export async function getSites(): Promise<Site[]> {
    try {
        const sites: Site[] = [];
        const response = await Request("sites", LISTFORMAT);
        for (const item of response.items) {
            let listClusters: Cluster[] = await getClusters(item.name.toLowerCase());

            let newsite = new Site(item.name.toLowerCase(), listClusters);
            sites.push(newsite);
        }
        return sites;
    } catch (error) {
        console.error(error);
        return [];
    }
}


// a function that create elements from the node tree for each site
async function getClusters(siteID: string): Promise<Cluster[]> {
    let clusters: Cluster[] = [];
    try {
        const response = await Request(`sites/${siteID}/clusters`, LISTFORMAT);

        response.items.forEach((item: any) => {
            if (item['type'] == 'cluster')
                clusters.push({ name: item['uid'] })
        });
        return clusters;

    } catch (error) {
        console.error(error);
        return clusters;
    }
}
