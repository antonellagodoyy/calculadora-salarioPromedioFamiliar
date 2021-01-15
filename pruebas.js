function probarValidarNumeroFamiliares() {
  console.assert(
    validarNumeroFamiliares("") ===
      "El campo 'Numero de familiares' debe tener al menos 1 caracter",
    "validarNumeroFamiliares no valido que el campo no este vacio."
  );

  console.assert(
    validarNumeroFamiliares(0) ===
      "El campo 'Numero de familiares' debe tener al menos 1 numero",
    "validarNumeroFamiliares no valido que el campo no tenga cero."
  );

  console.assert(
    validarNumeroFamiliares(-1) ===
      "El campo 'Numero de familiares' solo puede contener numeros enteros positivos.",
    "validarNumeroFamiliares no valido que el campo solo contenga numeros positivos."
  );

  console.assert(
    validarNumeroFamiliares("aaaaa") ===
      "El campo 'Numero de familiares' solo puede contener caracteres numericos.",
    "validarNumeroFamiliares no valido que el campo solo contenga caracteres numericos."
  );

  console.assert(
    validarNumeroFamiliares(2) === "",
    "validarNumeroFamiliares no valido con un numero valido."
  );
}

function probarValidarSalarioAnual() {
  console.assert(
    validarSalarioAnual(0) ===
      "El campo 'Salario anual' debe contener caracteres numericos positivos.",
    "validarSalarioAnual no valido que el campo no este vacio."
  );

  console.assert(
    validarSalarioAnual(-1) ===
      "El campo 'Salario anual' debe contener caracteres numericos positivos.",
    "validarSalarioAnual no valido que el campo no contenga numeros negativos."
  );

  console.assert(
    validarSalarioAnual(5263) === "",
    "validarSalarioAnual no valido para un numero valido."
  );
}

probarValidarNumeroFamiliares();
probarValidarSalarioAnual();
