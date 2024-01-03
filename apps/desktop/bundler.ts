// from: https://gist.github.com/robin-hartmann/ad6ffc19091c9e661542fbf178647047
// issue: https://github.com/electron/forge/issues/2306
// A bundler for locating local packages from workspaces, because Electron Forge does not support NPM workspaces out of the box

// Tried migrating to Yarn, both classic and latest stable version, but also does not work out of the box. 
// Found a solution for NPM, so we are sticking with NPM.

const fs = require('fs/promises');
const path = require('path');
const { findRoot } = require('@manypkg/find-root');
const arborist = require('@npmcli/arborist');

const DEBUG = false;

interface Edge {
    workspace: boolean,
    type: 'prod' | 'dev' | 'peer' | 'optional',
    to: Node
}

interface Node {
    isLink: boolean,
    isWorkspace: boolean,
    packageName: string
    location: string,
    realpath: string,
    target: Node,
    edgesOut: Map<string, Edge>,
}

const resolveLink = (node: Node): Node => {

    if (DEBUG) {
        console.error("resolving Link...");
        console.error(node);
    }

    return node.isLink ? resolveLink(node.target) : node;
}

const getWorkspaceByPath = (node: Node, realPath: string): Node | undefined => {

    if (DEBUG) {
        console.error("Getting workspace by path...");
        console.error(node.edgesOut);
    }

    return [...node.edgesOut.values()]
        .filter((depEdge) => {
            console.log(`filtering... ${depEdge.workspace === true}`);
            console.log(depEdge);


            return depEdge.workspace;
        })
        .map((depEdge) => {
            console.log("mapping...");
            console.log(depEdge);

            return resolveLink(depEdge.to)
        })
        .find((depNode) => depNode.realpath === realPath);
}

const collectProdDeps = (node: Node): Node[] =>
    [...node.edgesOut.values()]
        .filter((depEdge) => depEdge.type === 'prod')
        .map((depEdge) => resolveLink(depEdge.to))
        .flatMap((depNode) => [depNode, ...collectProdDeps(depNode)]);

export const bundle = async (source: string, destination: string): Promise<void> => {

    const root = await findRoot(source);
    const rootNode = await new arborist({ path: root.rootDir }).loadActual();
    const sourceNode = getWorkspaceByPath(rootNode, source);

    if (!sourceNode) {
        throw new Error(`Couldn't find source node. [Debug Info] source: ${source} `);
    }

    const prodDeps = collectProdDeps(sourceNode);

    // for (const dep of prodDeps) {
    //     const dest = path.join(destination, dep.location);

    //     await fs.cp(dep.realpath, dest, {
    //         recursive: true,
    //         errorOnExist: false,
    //     });
    // }

    /*
    Thank you @robin-hartmann !
    I needed to add recursive: true to fs.cp.
    Also, in order to copy modules from workspaces I wrote:
    */
    for (const dep of prodDeps) {
        const dest = dep.isWorkspace
            ? path.join(destination, `node_modules / ${dep.packageName} `)
            : path.join(destination, dep.location)

        await fs.cp(dep.realpath, dest, {
            recursive: true,
            errorOnExist: false,
            dereference: true,
        })
    }
};