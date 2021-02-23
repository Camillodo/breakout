
//Mieux vaut utiliser width et height en HTML pour dimensionner le canvas

//canvas est la letiable dans laquel on stock l'element canvas par son id
//const canvas = document.getElementById("myCanvas");

//get context permet de stocker le contexte de rendu 2D 
//const ctx = canvas.getContext("2d");

// //création d'un carré rouge
// //début du trait grace a beginpath
// ctx.beginPath();
// // ici on dessine dans le contexte 2d grace à la methode rect qui prend 4 arguments (axe X du bord droit,axe y du haut,largeur, longueur  )
// ctx.rect(20, 40, 50, 50);
// //choix de la couleur de remplissage
// ctx.fillStyle = "#FF0000";
// //remplissage
// ctx.fill()
// //fin du trait grace à closepath
// ctx.closePath();


// //meme chose pour faire un cercle
// ctx.beginPath();
// //meme chose que pour rect, les 2 premiers arguments sont x et y puis le rayon du cercle
//0 equivaut a l'angle de départ
// //la derniere permet de calculer le perimetre du cercle 360deg =2PI radian soit son angle de fin
// ctx.arc(440, 160, 20, 0, Math.PI*2); 
// // on peut ajouter du rgba pour mettre de la transparence en derniere valeur
// ctx.fillStyle= "rgba(0, 0, 255, 0.5)";
// ctx.fill();
// ctx.closePath()

// ctx.beginPath();
// ctx.arc(440,160,20,0,Math.PI*2);
// ctx.fillStyle='pink';
// ctx.fill();
// ctx.closePath();