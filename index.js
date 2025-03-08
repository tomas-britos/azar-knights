let knightDataBase = {
  health: 100,
  attack: 25,
  defense: 25,
  spell: 25
};

let lastMove = {
  player1: null,
  player2: null
};

let playerHealth = {
  player1: knightDataBase.health,
  player2: knightDataBase.health
};

// Guarda el último movimiento realizado por el jugador
function saveLastMove(player, action) {
  lastMove[player] = action;
  console.log(`Último movimiento de ${player}: ${action}`);
}

// Funciones de las acciones de los caballeros
function attack(player) {
  console.log(`${player} atacó`);
  saveLastMove(player, "attack");
}

function defense(player) {
  console.log(`${player} defendió`);
  saveLastMove(player, "defense");
}

function spell(player) {
  console.log(`${player} lanzó un hechizo`);
  saveLastMove(player, "spell");
}

// Función para calcular daño
function applyDamage(player, damage) {
  playerHealth[player] -= damage;
  if (playerHealth[player] < 0) {
    playerHealth[player] = 0;
  }

  // Actualizamos la barra de salud
  updateHealthBar(player);
}

// Función para actualizar la barra de salud
function updateHealthBar(player) {
  const healthBar = document.getElementById(`healthBar${capitalizeFirstLetter(player)}`);
  const healthPercentage = (playerHealth[player] / knightDataBase.health) * 100;

  // Actualiza el ancho de la barra de salud
  healthBar.style.width = `${healthPercentage}%`;
  healthBar.textContent = `${Math.round(healthPercentage)}%`;  // Muestra el porcentaje de salud

  // Cambiar la clase de la barra de salud según el porcentaje de vida
  const healthClasses = healthBar.classList;

  // Elimina cualquier clase de salud anterior
  healthClasses.forEach(className => {
    if (className.startsWith('health-bar-')) {
      healthClasses.remove(className);
    }
  });

  // Añade la nueva clase correspondiente al porcentaje de vida
  if (healthPercentage === 100) {
    healthClasses.add('health-bar-100');
  } else if (healthPercentage === 75) {
    healthClasses.add('health-bar-75');
  } else if (healthPercentage === 50) {
    healthClasses.add('health-bar-50');
  } else if (healthPercentage === 25) {
    healthClasses.add('health-bar-25');
  } else {
    healthClasses.add('health-bar-0');
  }
}


// Función para determinar el resultado de la batalla
function battle(player1, player2) {
  let result = "";
  let damage = knightDataBase.attack; // Puedes ajustar el daño aquí si es necesario.

  // Posibilidades de batalla
  function battlePosibilities() {
    if (lastMove[player1] === "attack" && lastMove[player2] === "spell") {
      result = `${player1} devuelve el hechizo y ${player2} recibe daño mágico`;
      applyDamage(player2, damage);
    }

    else if (lastMove[player1] === "spell" && lastMove[player2] === "defense") {
      result = `${player2} recibe daño mágico del hechizo de ${player1}`;
      applyDamage(player2, damage);
    }

    else if (lastMove[player1] === "defense" && lastMove[player2] === "attack") {
      result = `${player1} se defiende y daña a ${player2}`;
      applyDamage(player2, damage);
    }

    else if (lastMove[player2] === "attack" && lastMove[player1] === "spell") {
      result = `${player2} devuelve el hechizo y ${player1} recibe daño mágico`;
      applyDamage(player1, damage);
    }

    else if (lastMove[player2] === "spell" && lastMove[player1] === "defense") {
      result = `${player1} recibe daño mágico del hechizo de ${player2}`;
      applyDamage(player1, damage);
    }

    else if (lastMove[player2] === "defense" && lastMove[player1] === "attack") {
      result = `${player2} se defiende y daña a ${player1}`;
      applyDamage(player1, damage);
    }

    else if (lastMove[player1] === lastMove[player2]) {
      result = `Ambos hicieron la misma acción`;
    }
  }

  battlePosibilities(); // Llamar a la función que determina el resultado

  // Mostrar el resultado en la consola
  console.log(result);
  alert(result); // También lo mostramos como alerta para que el jugador lo vea.
}

// Función auxiliar para capitalizar el primer carácter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
