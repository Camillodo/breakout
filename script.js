/*------------------------------------------------------------------GENERAL------------------------------------------------------------------*/
//Mieux vaut utiliser width et height en HTML pour dimensionner le canvas

//canvas est la variable dans laquel on stock l'element canvas par son id
const canvas = document.getElementById("myCanvas");

//get context permet de stocker le contexte de rendu 2D 
const ctx = canvas.getContext("2d");


//IMPORTANT, x y et dx et dy doivent etre des lets
//x est le point de depart de la boule sur l'axe ici la moitié du canvas
let x = canvas.width/2;
//y a canvas.height fait démarrer tout simplement la boule au bout de l'axe Y donc en bas pour nous
let y = canvas.height-30;

//dx et dy determine l'increment des coordonnées de la boule
//elle vont changer les axes et y en temps réél de tant toute les 20ms grace a set interval
let dx = 2;
//dy doit etre negatif pour aller vers le haut
let dy = -2;

//ballRadius contient le rayon de la balle pour faciliter les calculs
const ballRadius = 15

//definition de la taille de la raquette
const racketWidth = 100;
const racketHeight = 25;
//pour la position de la racket sur l'axe x, meme idee que pour la balle, on la place au milieu donc on divise par 2 la taille du canvas moins la largeur de la raquette
let racketX = (canvas.width-racketWidth)/2;
//position y meme principe sauf que la position est tout en bas de l'axe y- la hauteur de la raquette pour que celle ci soit visible
const racketY = (canvas.height-racketHeight);
//on cible la div cachée par queryselector pour changer sa classe et la faire apparaitre qand la partie est perdue
const gameOverNotify = document.querySelector('.game-over-notify');


//definition des éléments briques
//nombre de rangées
const brickRowCount = 6;
//nombre de colonnes
const brickColumnCount = 6;
//largeur d'un brique
const brickWidth = 120;
//hauteur d'un brique
const brickHeight = 30;

const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

//on créé le tableau de bicques qui est un tableau dans un tableau
// on y stocke les coordonnees de depart du dessin des briques qu'on incrementera plus tard
// on indique de base le isTouched a 1 pour que la brique apparaisse
let bricks = [];
for(let col=0; col<brickColumnCount; col++) {
  bricks[col] = [];
  for(let row=0; row<brickRowCount; row++) {
    bricks[col][row] = { x: 0, y: 0, isTouched: 1 };
  }
}

/*------------------------------------------------------------------EVENT LISTENERS------------------------------------------------------------------*/
let rightPressed = false;
let leftPressed = false;

//si la touche gauche ou droite est préssée, la valeur de chaque variable change. le motion est géré plus bas la fonction principale

const keyDownHandler = (event)=>{
  if (event.keyCode == 39){
    rightPressed=true;
    console.log('prout')
  }
  else if (event.keyCode == 37){
    leftPressed = true;
    console.log('prout')
  }
};

const keyUpHandler = (event)=>{
  if (event.keyCode == 39){
    rightPressed = false;
  }
  else if (event.keyCode == 37){
    leftPressed = false
  }
};

const mouseMoveHandler = (event)=>{
  //relative x est la position de la souris dans sur l'axe X(clientX) moins la distance entre le bord gauche du canvas et le bord gauche de la fenetre
  let relativeX = event.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    racketX = relativeX - racketWidth/2;
    
  }
}

//les deux events listener pour les mouvements de clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//l'event listener pour detecter le mouvement de la souris
document.addEventListener("mousemove", mouseMoveHandler, false);

/*------------------------------------------------------------------FONCTIONNEMENT------------------------------------------------------------------*/

//collisionDetection permet savoir si un brique a été touchée par la boucles
//On définit un statut istouched, si il est a 1 la brique est en place
//cependant si la position x et y dela boule est superieur a la position x et y de la brique
// on fait alors comme pour les murs on inverse la direction de la balle et on passe le statut de la brique a 0 donc touché
collisionDetection = ()=> {
  for(let col=0; col<brickColumnCount; col++) {
    for(let row=0; row<brickRowCount; row++) {
      let brick = bricks[col][row];
      if(brick.isTouched == 1) {
        if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight) {
          dy = -dy;
          brick.isTouched = 0;
        }
      }
    }
  }
}

const drawRacket = ()=>{
  ctx.beginPath();
  ctx.rect(racketX, racketY, racketWidth, racketHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

//une fonction qui ne fait que dessiner la boule
const drawBall = (color)=> {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = `${color}`;
  ctx.fill();
  ctx.closePath();
}

//fonction pour dessiner les briques

//meme principe que pour le tableau de données briques en haut on boucles les rangées dans les colonnes
function drawBricks() {
  for(let col=0; col<brickColumnCount; col++) {
    for(let row=0; row<brickRowCount; row++) {
      if(bricks[col][row].isTouched == 1) {
        let brickX = (row*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (col*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// fonction principales du jeu
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall("blue");
  drawRacket();
  collisionDetection();
  x += dx;
  y += dy;
  
  //Si la valeur x de la position de la balle est inférieure à zéro, on change la direction du mouvement sur l'axe x en le rendant égal à son inverse
  //Si la position en x de la balle est supérieure à  la largeur du canvas, on inverse encore la vitesse de la balle.
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  };
  //meme principe pour l'axe y a la difference qu'on implemente un game over
  //on garde la meme condition générale si la position de la balle sur y est inferieur a la taille de la balle on inverse sa courbe et la balle rebondit
  if(y + dy < ballRadius) {
    dy = -dy;
    //Seulement, si la position est superieur a la hauteur du canvas moins la taille de la balle :
    //ON OUBLIE PAS QUE LE CANVAS COMMENCE EN HAUT A GAUCHE
  } else if(y + dy > canvas.height-ballRadius) {
    //pour simuler le rebond sur la raquette il faut vérifier si le centre de la balle se trouve dans la zone de la raquette
    //si la position de x est superieure au début de la position de la raquette  et qu'elle est inferieure la longueur de la raquette c'est qu'ell est dans la bonne zone
    if(x > racketX && x < racketX + racketWidth) {
      dy = -dy;
    }
    //sinon c'est que la position y de la balle est superieure a la hauteur de canvas c'est qu'elle sorti du canvas donc la partie est perdue, on alerte game over et on reload
    else {
      //on rend visible le texte game over avant le rechargement de la page en agissant sur son display directement
      gameOverNotify.style.display="flex";
      location.reload();
      //clearInterval(interval);
    }
  }
  
  //si la touche droite est préssée la position de la raquette (a la base au milieu de l'axe X) bouge vers la droite de sa taille divisée par 10, on ajoute une condition à la condition
  //si la taille de la raquette et sa position est superieure à la largeur du canvas donc si elle sort du canvas on lui assigne sa position max comme etant la la largeur du canvas moins la taille de la raquette
  if(rightPressed) {
    //gere la velocité
    racketX += racketWidth/10;
    if (racketX + racketWidth > canvas.width){
      racketX = canvas.width - racketWidth;
    }
  }
  //pareil pour la gauche
  else if(leftPressed) {
    racketX -= racketWidth/10;
    if (racketX < 0){
      racketX = 0;
    }
  }
};


const interval = setInterval(draw, 8);


