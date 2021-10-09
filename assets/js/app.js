const options = {
	0: 'piedra',
	1: 'papel',
	2: 'tijeras',
};

let times;
let jugando = false;
let jugadas = 0;
let resultadoPartida;

function compara(seleccion) {
	let cpu = Math.floor(Math.random() * 3);
	let txtCpu = options[cpu];
	// console.log('Maquina ' + txtCpu);
	// console.log('User ' + seleccion);
	if (txtCpu === seleccion) {
		// console.log('Empate');
		resultado = 'Empate';
	} else if (txtCpu === 'tijeras' && seleccion === 'papel') {
		// console.log('Perdiste');
		resultado = 'Perdiste';
	} else if (txtCpu === 'piedra' && seleccion === 'tijeras') {
		// console.log('Perdiste');
		resultado = 'Perdiste';
	} else if (txtCpu === 'papel' && seleccion === 'piedra') {
		// console.log('Perdiste');
		resultado = 'Perdiste';
	} else {
		// console.log('Ganaste');
		resultado = 'Ganaste';
	}

	// RETORNAR VARIOS VALORES
	// https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
	return [txtCpu, seleccion, resultado];
}

function desbloqueaOpciones() {
	document.getElementById('piedra').disabled = false;
	document.getElementById('papel').disabled = false;
	document.getElementById('tijeras').disabled = false;
}

function bloqueaOpciones() {
	document.getElementById('piedra').disabled = true;
	document.getElementById('papel').disabled = true;
	document.getElementById('tijeras').disabled = true;
}

const botonJugar = document.getElementById('jugar-ahora');
botonJugar.addEventListener('click', (b) => {
	times = parseInt(
		prompt('Jugar al mejor de cuantas veces ? (Ingrese un numero)')
	);
	// AL QUERER JUGAR REINICIO LAS VARIABLES PARA EL JUEGO
	jugando = true;
	jugadas = 1;
	console.clear();
	desbloqueaOpciones();
});

// CAPTURO LA SELECCION DEL USUARIO
// RECURSO https://www.youtube.com/watch?v=GUTt0qKUDyU
const contenedorBtns = document.getElementById('botones');
contenedorBtns.addEventListener('click', (e) => {
	const tabla = document.getElementById('resultados');
	let seleccion;

	if (jugando) {
		if (e.target && e.target.tagName === 'BUTTON') {
			seleccion = e.target.id;
		}
		// INCLUI EL SIGUIENTE IF YA QUE ME DABA PROBLEMAS AL HACER CLICK EN EL ELEMENTO "I" Y NO SOBRE EL BUTTON
		else if (e.target && e.target.tagName === 'I') {
			seleccion = e.target.parentElement.id;
		}

		let op = compara(seleccion);
		// op[0] SELECCION DE LA CPU
		// op[1] SELECCION DEL USUARIO
		// op[2] RESULTADO
		console.log(
			`Seleccion USUARIO ${op[1]} | Seleccion CPU ${op[0]} | ${op[2]}`
		);
		// ESTA CONDICION INDICA QUE CUANDO HAY UN EMPATE NO SE CONSIDERA ESA RONDA
		// SIEMPRE HABRA UN GANADOR O UN PERDEDOR
		// SERA EL MEJOR DE N CANTIDAD - SI GANA 2 DE 3 - SI GANA 3 DE 5 ETC
		if (op[2] === 'Empate') {
			jugadas--;
		}
		if (op[2] === 'Ganaste') {
			resultadoPartida++;
		}
		// const tabla = document.getElementById('resultados');
		// const registro = `
		// <table class="table">
		// 	<tbody>
		// 		<tr>
		// 			<td class="text-center">${op[0]}</td>
		// 			<td class="text-center">${op[1]}</td>
		// 			<td class="text-center">${op[2]}</td>
		// 		</tr>
		// 	</tbody>
		// </table>
		// 	`;
		// tabla.innerHTML += registro;
	}

	if (jugadas === times) {
		bloqueaOpciones();
		jugando = false;

		if (Math.floor(times / resultadoPartida) === 1) {
			alert(`Ganaste ${resultadoPartida} de ${times} partidas`);
		} else {
			alert(`Perdiste ${resultadoPartida} de ${times} partidas`);
		}
	}

	jugadas++;
});
