
export const useChildren = (node_data, chosenNode) => {
	function prepareNodes(nodeList) {
		let nodesTree = [];

		return (node) => {
			nodesTree = [...nodesTree, node];

			if (node.adjList && node.adjList.length) {
				node.adjList.forEach((nodeName) => {
					const nextNode = nodeList[nodeName];

					if (nextNode.adjList && node.adjList.length) {
						buildNodeGraph(nextNode);
					}
				});
			}

			return nodesTree;
		};
	}

	const buildNodeGraph = prepareNodes(node_data);

	return chosenNode ? buildNodeGraph(node_data[chosenNode]) : []
}