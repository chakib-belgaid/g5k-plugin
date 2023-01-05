

abstract class TreeNode<T> {
    value!: T;
    children!: TreeNode<T>[];
}

export class Tree<T> extends TreeNode<T> {
    root!: TreeNode<T>;
}

export interface Machine {
    name: string;
    address?: string;
}
export interface Cluster {
    name: string;
    machines?: Machine[];
}

export class Site implements Machine {
    public name!: string;
    public clusters?: Cluster[];

    constructor(name: string, clusters: Cluster[]) {
        this.name = name;
        this.clusters = clusters;

    }
    public addCluster(cluster: Cluster) {
        if (this.clusters === undefined)
            this.clusters = [];
        this.clusters.push(cluster);
    }
}