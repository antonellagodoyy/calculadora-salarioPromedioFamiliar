function calculaSalarioMensual(salarioAnual) {
  let salarioMensual = salarioAnual / 12;
  return salarioMensual;
}

function calculaSalarioPromedio(salario, contador) {
  let salarioPromedio = salario / contador;
  return salarioPromedio;
}

function trunc(x, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf(".") + 1;

  if (l - decimalLength <= posiciones) {
    return x;
  }
  // Parte decimal del número
  var isNeg = x < 0;
  var decimal = x % 1;
  var entera = isNeg ? Math.ceil(x) : Math.floor(x);
  // Parte decimal como número entero
  // Ejemplo: parte decimal = 0.77
  // decimalFormated = 0.77 * (10^posiciones)
  // si posiciones es 2 ==> 0.77 * 100
  // si posiciones es 3 ==> 0.77 * 1000
  var decimalFormated = Math.floor(
    Math.abs(decimal) * Math.pow(10, posiciones)
  );
  // Sustraemos del número original la parte decimal
  // y le sumamos la parte decimal que hemos formateado
  var finalNum =
    entera + (decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1);

  return finalNum;
}

function agregarBotonQuitar() {
  const botonQuitar = document.createElement("button");
  nodoHijo.appendChild(botonQuitar);
  botonQuitar.textContent = "Quitar";

  botonQuitar.addEventListener("click", function (e) {
    let padreBotonQuitar = botonQuitar.parentElement;
    nodoPadre.removeChild(padreBotonQuitar);

    e.preventDefault();
  });
}

function validarNumeroFamiliares(numeroFamiliares) {
  if (numeroFamiliares === "") {
    return "El campo 'Numero de familiares' debe tener al menos 1 caracter";
  }

  if (numeroFamiliares === 0) {
    return "El campo 'Numero de familiares' debe tener al menos 1 numero";
  }

  if (numeroFamiliares < 0) {
    return "El campo 'Numero de familiares' solo puede contener numeros enteros positivos.";
  }

  if (!/^[0-9]+$/.test(numeroFamiliares)) {
    return "El campo 'Numero de familiares' solo puede contener caracteres numericos.";
  }

  return "";
}

function validarSalarioAnual(salarioAnual) {
  if (salarioAnual === 0) {
    return "El campo 'Salario anual' debe contener caracteres numericos positivos.";
  }

  if (salarioAnual < 0) {
    return "El campo 'Salario anual' debe contener caracteres numericos positivos.";
  }

  return "";
}

// Referencia al nodo padre donde se van a agregar todos los elementos.

const nodoPadre = document.querySelector("form");

// Se crea el parrafo que contendra los resultados de los calculos.

const nodoBody = document.querySelector("body");
const nuevoParrafo = document.createElement("p");
nodoBody.appendChild(nuevoParrafo);

const botonSubmit = document.createElement("input");
nodoPadre.appendChild(botonSubmit);
botonSubmit.type = "submit";
botonSubmit.value = "Calcular";

const botonAgregar = document.createElement("button");
nodoPadre.appendChild(botonAgregar);
botonAgregar.textContent = "Agregar miembro";

const botonComenzar = document.querySelector("#comenzar");

let nodoHijo, nuevaLabel, nuevoInput;

botonComenzar.addEventListener("click", function (e) {
  nuevoParrafo.textContent = "";

  if (document.querySelectorAll(".input").length !== 0) {
    const inputsExistentes = document.querySelectorAll(".input");
    for (let input of inputsExistentes) {
      nodoPadre.removeChild(input);
    }
  }

  const numeroFamiliares = Number(nodoPadre["numero-familiares"].value);

  const errorNumeroFamiliares = validarNumeroFamiliares(numeroFamiliares);

  if (errorNumeroFamiliares) {
    nodoPadre["numero-familiares"].className = "error";
    nuevoParrafo.textContent = errorNumeroFamiliares;
  } else {
    nodoPadre["numero-familiares"].className = "";
  }

  for (let i = 0; i < numeroFamiliares; i++) {
    nodoHijo = document.createElement("div");
    nuevaLabel = document.createElement("label");
    nuevoInput = document.createElement("input");

    nodoHijo.className = "input";
    nuevoInput.className = "margin";
    nuevaLabel.textContent = "Ingresa el salario bruto anual del integrante";
    nuevoInput.type = "number";
    nuevoInput.min = "0";
    nuevoInput.placeholder = "$00,000.0";

    nodoPadre.appendChild(nodoHijo);
    nodoHijo.appendChild(nuevaLabel);
    nodoHijo.appendChild(nuevoInput);

    agregarBotonQuitar();
  }

  e.preventDefault();
});

// Se agregan miembros al hacer click en el boton 'Agregar'.

botonAgregar.addEventListener("click", function (e) {
  nuevoParrafo.textContent = "";

  nodoHijo = document.createElement("div");
  nuevaLabel = document.createElement("label");
  nuevoInput = document.createElement("input");

  nodoPadre.appendChild(nodoHijo);
  nodoHijo.appendChild(nuevaLabel);
  nodoHijo.appendChild(nuevoInput);

  nodoHijo.className = "input";
  nuevoInput.className = "margin";
  nuevaLabel.textContent = "Ingresa el salario bruto anual del integrante";
  nuevoInput.type = "number";
  nuevoInput.min = "0";
  nuevoInput.placeholder = "$00,000.0";

  agregarBotonQuitar();

  e.preventDefault();
});

botonSubmit.addEventListener("click", function (e) {
  nuevoParrafo.textContent = "";
  let acumuladorSalarioAnual = 0;
  let acumuladorSalarioMensual = 0;
  let minSalario = 0;
  let maxSalario = 0;

  let arraySalarioAnual = document.querySelectorAll('input[type="number"]');

  const errorSalarioAnual = [];
  for (let i = 0; i < arraySalarioAnual.length; i++) {
    errorSalarioAnual[i] = validarSalarioAnual(
      Number(arraySalarioAnual[i].value)
    );
  }

  let huboError;

  for (let i = 0; i < errorSalarioAnual.length; i++) {
    if (errorSalarioAnual[i]) {
      arraySalarioAnual[i].className = "error";
      huboError = true;
    } else {
      arraySalarioAnual[i].className = "";
      huboError = false;
    }
  }

  // Calculos.

  if (arraySalarioAnual.length === 0) {
    nuevoParrafo.textContent = "No se ingresaron datos.";
    e.preventDefault();
  }

  minSalario = Number(arraySalarioAnual[0].value);
  maxSalario = Number(arraySalarioAnual[0].value);

  for (let i = 0; i < arraySalarioAnual.length; i++) {
    acumuladorSalarioAnual += Number(arraySalarioAnual[i].value);

    acumuladorSalarioMensual += calculaSalarioMensual(
      Number(arraySalarioAnual[i].value)
    );

    if (Number(arraySalarioAnual[i].value) < minSalario) {
      minSalario = Number(arraySalarioAnual[i].value);
    } else if (Number(arraySalarioAnual[i].value) > maxSalario) {
      maxSalario = Number(arraySalarioAnual[i].value);
    }
  }

  let promedioAnual = calculaSalarioPromedio(
    acumuladorSalarioAnual,
    arraySalarioAnual.length
  );
  let promedioMensual = calculaSalarioPromedio(
    acumuladorSalarioMensual,
    arraySalarioAnual.length
  );

  if (huboError) {
    nuevoParrafo.textContent = errorSalarioAnual[0];
  }

  if (nuevoParrafo.innerHTML === "") {
    nuevoParrafo.textContent = `El salario anual promedio es: ${trunc(
      promedioAnual,
      2
    )}, el salario mensual promedio es: ${trunc(
      promedioMensual,
      2
    )}, el salario minimo es: ${trunc(
      minSalario,
      2
    )} y el salario maximo es ${trunc(maxSalario, 2)}.`;
  }

  e.preventDefault();
});
