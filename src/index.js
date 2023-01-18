const Node = require("./scripts/node.js");
const Path = require("./scripts/path.js");
const Graph = require("./scripts/graph.js")
const Algorithm = require("./scripts/algorithm.js")


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  canvas.width = 970;
  canvas.height = 600;

  const ctx = canvas.getContext("2d");

    window.ctx = ctx;

  ctx.fillStyle = "#F5FCFF";
  ctx.fillRect(0, 0, 970, 600);
  ctx.font = "20px Courier New"

  g = new Graph
  g.draw(ctx)
  
  const startButton = document.getElementById('startbutton')
  const resetButton = document.getElementById('resetbutton')
  
  startButton.addEventListener('click', e => {
    e.preventDefault()
    algo = new Algorithm
    algo.determinePathing()
    algo.animateNodes(ctx)
    algo.animatePath(ctx)
    startButton.disabled = true;
      setTimeout(function(){startButton.disabled = false;}, g.delay *8)
    resetButton.disabled = true;
      setTimeout(function(){resetButton.disabled = false;}, g.delay *8)
  })
  
  resetButton.addEventListener('click', e => {
    e.preventDefault()
    algo.nodes.forEach (function(el){
      el.status = "unvisited"
    })
    algo.paths.forEach(function(el){
      el.status = "none"
    })
    g.clearSelected()
    algo.graph.draw(ctx)
  })

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x,y]
  }
  
  canvas.addEventListener("click", function(e){
    let pos = getMousePosition(canvas, e);
    Object.keys(g.nodeHitBoxes).forEach (function (el){
      let hitbox = g.nodeHitBoxes[el]
      if (pos[0] > hitbox[2] && pos[0] < hitbox[3] && pos[1] > hitbox[0] && pos[1] < hitbox[1]){
        let found = g.nodes.find(node => node.name === el)
        let result = selectedSpaceship()
        if (result === -1){
          found.selected = 'start'
        } else if (result === 0 && found.selected !== 'start'){
          found.selected = 'end'
        } else{
          g.clearSelected()
        }
        g.draw(ctx)
      }
    })
  });

  function selectedSpaceship(){
    let start = 0
    let end = 0
    Object.keys(g.nodes).forEach (function(element){
      let newVar = g.nodes[element]
      if (newVar.selected === 'start'){
        start +=1
      } else if (newVar.selected === 'end'){
        end +=1
      }
    })
    return start === 0 && end === 0 ? -1: start === 1 && end === 0 ? 0 : 1 
  }

  var slider = document.getElementById("myRange")
  slider.oninput = function() {
    g.delay = 1000 - this.value 
  }


})








window.Node = Node;
window.Path = Path;
window.Graph = Graph;
window.Algorithm = Algorithm;