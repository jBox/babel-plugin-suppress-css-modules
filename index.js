const identifierVisitor = {
    Identifier(path) {
        if (path.node.name === this.name) {
            this.exp.remove();
        }
    }
}

const callVisitor = {
    CallExpression(path) {
        const args = path.node.arguments || [];
        if (args.length === 1) {
            const ext = extensions(args[0].value);
            if (this.exts.indexOf(ext) > -1) {
                path.traverse(identifierVisitor, this);
            }
        }
    }
}

const extensions = (path) => {
    const m = /.*(\.\w+)$/ig.exec(path);
    if (m) {
        return m[1].toLocaleLowerCase();
    }

    return "";
};

module.exports = function ({ types: t }) {
    const EXTS = [".css", ".less", ".scss"];
    return {
        visitor: {

            CallExpression(path) {
                const args = path.node.arguments || [];
                if (args.length === 1) {
                    const ext = extensions(args[0].value);
                    const exts = this.extensions || EXTS;
                    if (exts.indexOf(ext) > -1) {
                        path.traverse(identifierVisitor, {
                            name: "require",
                            exp: path
                        });
                    }
                }
            },

            VariableDeclarator(path) {
                const exts = this.extensions || EXTS;
                path.traverse(callVisitor, {
                    exts,
                    name: "require",
                    exp: path
                });
            }
        }
    };
}