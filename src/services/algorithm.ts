class Node {
  value: string;
  priority: number;

  constructor(value: string, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: Node[];

  constructor() {
    this.values = [];
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const element = this.values[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];

      if (element.priority >= parent.priority) break;

      this.values[parentIndex] = element;
      this.values[index] = parent;

      index = parentIndex;
    }
  }

  enqueue(value: string, priority: number) {
    let newNode = new Node(value, priority);

    this.values.push(newNode);
    this.bubbleUp();
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild: Node, rightChild: Node;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];

        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];

        if (
          (swap === null && rightChild.priority < element.priority) ||
          // @ts-ignore
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      // @ts-ignore
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }
}

interface AdjacencyList {
  [vertex: string]: {
    node: string;
    weight: number;
  }[];
}

interface SupportType {
  [vertex: string]: number | string | null;
}

class WeigthtedGraph {
  adjacencyList: AdjacencyList;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1: string, vertex2: string, weight: number) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  Dijkstra(start: string, finish: string) {
    const nodes = new PriorityQueue();
    const distances: SupportType = {};
    const previous: SupportType = {};
    let path: string[] = [];
    let smallest: string;

    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }

      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().value;

      if (smallest === finish) {
        // @ts-ignore
        while (previous[smallest]) {
          // @ts-ignore
          path.push(smallest);
          // @ts-ignore
          smallest = previous[smallest];
        }

        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = Number(distances[smallest]) + nextNode.weight;
          let nextNeighbor = nextNode.node;

          if (candidate < Number(distances[nextNeighbor])) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;

            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    // @ts-ignore
    return path.concat(smallest).reverse();
  }
}

export default WeigthtedGraph;

// var graph = new WeightedGraph();
// graph.addVertex("A"); -> HOUSES
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");

// graph.addEdge("A", "B", 4); -> WAYS
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("C", "F", 4);
// graph.addEdge("D", "E", 3);
// graph.addEdge("D", "F", 1);
// graph.addEdge("E", "F", 1);

// console.log(graph.Dijkstra("A", "E"));
