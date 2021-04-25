function calculateRoverPath(map) {

  var columns = map[0].length;
  var rows = map.length;

  function Node(parent = null, position = null) {
    this.parent = parent;
    this.position = position; //[y,x]
    this.id = position[0].toString() + position[1].toString();
    this.g = 0;
    this.h = 0;
    this.f = 0;
  }

  function search(maze, cost, start, end) {

    var startNode = new Node(null, start);
    var endNode = new Node(null, end);


    var yetToVisitList = [];

    var visitedList = [];

    yetToVisitList.push(startNode);

    var outerIterations = 0;

    var maxIterations = Math.pow((maze.length / 2), 4);

    var move = [
      [-1, 0], //up
      [0, -1], //left
      [1, 0], //down
      [0, 1] //right
    ];

    function chekChild(child, i) {

      function inVisitedList(visitedNode, i) {
        return visitedNode.id === child.id;
      }

      if (visitedList.some(inVisitedList)) {
        return
      }

      var xParentNode = child.parent.position[1];
      var yParentNode = child.parent.position[0];
      var hightParentNode = maze[yParentNode][xParentNode];

      var xChildNode = child.position[1];
      var yChildNode = child.position[0];
      var hightChildNode = maze[yChildNode][xChildNode];



      if (hightParentNode < hightChildNode) {
        child.g = curNode.g + (hightChildNode - hightParentNode) + cost;
      }

      if (hightParentNode > hightChildNode) {
        child.g = curNode.g + (hightParentNode - hightChildNode) + cost;

      }
      if (hightParentNode === hightChildNode) {
        child.g = curNode.g + cost;
      }

      child.h = (Math.pow((child.position[0] - endNode.position[0]), 2) +
        Math.pow((child.position[1] - endNode.position[1]), 2));

      child.f = child.g + child.h;

      function inYetToVisitedList(yetToVisitedNode, i) {
        return (yetToVisitedNode.id === child.id) && (child.g > yetToVisitedNode.g);
      }
      if (yetToVisitList.some(inYetToVisitedList)) {
        return
      }

      yetToVisitList.push(child);

    }

    while (yetToVisitList.length > 0) {
      outerIterations += 1;
      var curNode = yetToVisitList[0];
      var curIndex = 0;

      for (let j = 0; j < yetToVisitList.length; j++) {


        if (yetToVisitList[j].f < curNode.f) {

          curNode = yetToVisitList[j];
          curIndex = j;
        }

      }

      yetToVisitList.splice(curIndex, 1);


      visitedList.push(curNode);



      if (curNode.id === endNode.id) {
        var path = [];
        var current = curNode;
        while (current.parent) {
          path.unshift(current.id);
          current = current.parent;
        }
        path.unshift(startNode.id);

        console.log('ЭВРИКА!!!!!' + path);
        return path;
      }




      var children = [];


      for (let step of move) {
        var nodePosition = [(curNode.position[0] + step[0]),
          (curNode.position[1] + step[1])
        ];


        if ((nodePosition[0] > (rows - 1)) ||
          (nodePosition[0] < 0) ||
          (nodePosition[1] > (columns - 1)) ||
          (nodePosition[1] < 0)) {
          continue
        }

        if (curNode.parent && (nodePosition[0] === curNode.parent.position[0] && nodePosition[1] === curNode.parent.position[1])) {
          continue
        }

        var newNode = new Node(curNode, nodePosition);
        children.push(newNode);



        children.forEach(chekChild);
      }



    }


  }





  return search(map, 1, [0, 0], [rows - 1, columns - 1]);

}


var arr = [
  [1, 2, 6, 9, 9, 4, 6],
  [2, 3, 4, 5, 5, 1, 1],
  [5, 6, 3, 9, 1, 3, 5],
  [3, 1, 1, 1, 1, 3, 6],
  [4, 2, 1, 1, 6, 6, 5]
];

calculateRoverPath(arr);


//module.exports = {
//  calculateRoverPath,
//};
