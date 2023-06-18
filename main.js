const DolarCity = {
    conversion: [
      { tipo: "Dólar Blue", valor: 500 },
      { tipo: "Dólar Oficial", valor: 250 },
      { tipo: "Dólar CCL", valor: 450 },
      { tipo: "Dólar Turista", valor: 600 }
    ],
    convertir: function (monto, claveFiscal) {
      let resultado = "";
      const montoPesos = monto < 1000 ? monto * 1000 : monto;
      if (montoPesos > 1000 && !this.validarClaveFiscal(claveFiscal)) { //ojo con la validacion porque para el condicional if con que haya una condicion verdadera el resto no importa. Esto se traduce a (F, V)=>V/(V,F)=>V cuando deberia ser (V, V) =>V. A veces aunque quede tosco es mejor anidar validaciones y evitar errores. Ademas te sirve para saber en donde esta el error. Te quedaria algo asi como;
      // if(V){
        //if(V){
          // ValidacionCorrecta
        //}else{Error2}
      //}else{Error1}
      //Igualmente anidar condicionales dependiendo el contexto no es lo mejor. En este caso aplica :) Logica 101 
        alert("NO SE PUEDE CONVERTIR. Monto superior a 1000 y la clave fiscal no es válida.");
      } else {
        this.conversion.forEach((moneda) => {
          const conversion = montoPesos / moneda.valor;
          resultado += `Monto en ${moneda.tipo}: ${conversion}<br>`;
        });
      }
      return resultado;
    },
    validarClaveFiscal: function (claveFiscal) {
      return claveFiscal.length === 6;
    }
  };
  
  const EuroCity = {
    conversion: [
      { tipo: "Euro Blue", valor: 600 },
      { tipo: "Euro Oficial", valor: 300 }
    ],
    convertir: function (monto, claveFiscal) {
      let resultado = "";
      const montoPesos = monto < 1000 ? monto * 1000 : monto;
      if (montoPesos > 1000 && !this.validarClaveFiscal(claveFiscal)) { // Como esta parte se repite se puede hacer una funcion que ejecute este codigo y ponerla en ambos lados para evitar un choclo de codigo. No es necesario pero para la codificacion en un futuro de algo mas groso vas a necesitarlo. Si algo se repite mas de una vez, si hace una funcion o procedimiento. Una funcion devuelve un resultado. Un procedimiento cambia una variable en el main.
        alert("NO SE PUEDE CONVERTIR. Monto superior a 1000 y la clave fiscal no es válida.");
      } else {
        this.conversion.forEach((moneda) => {
          const conversion = montoPesos / moneda.valor;
          resultado += `Monto en ${moneda.tipo}: ${conversion}<br>`;
        });
      }
      return resultado;
    },
    validarClaveFiscal: function (claveFiscal) {
      return true;
    }
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("convertButton");
    button.addEventListener("click", convertirMoneda);
  });
  
  function convertirMoneda() {
    const monto = parseFloat(document.getElementById("monto").value);
    const claveFiscal = prompt("Ingrese su clave fiscal de 6 dígitos:");
  
    const selectMoneda = document.getElementById("selectMoneda");
    const tipoMoneda = selectMoneda.options[selectMoneda.selectedIndex].value;
  
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";
  
    let resultado;
    if (tipoMoneda === "dolar") {
      resultado = DolarCity.convertir(monto, claveFiscal);
    } else if (tipoMoneda === "euro") {
      resultado = EuroCity.convertir(monto, claveFiscal);
    }
  
    resultadoDiv.innerHTML = resultado;
  }

  const conversionesHistoricas = [
    { inicio: 1990, fin: 2001, tasa: 1 },
    { inicio: 2001, fin: 2008, tasa: 3 },
    { inicio: 2008, fin: 2010, tasa: 10 },
    { inicio: 2010, fin: 2015, tasa: 15 },
    { inicio: 2016, fin: 2018, tasa: 40 },
    { inicio: 2018, fin: 2020, tasa: 100 },
    { inicio: 2021, fin: 2022, tasa: 300 },
    { inicio: 2023, fin: 2023, tasa: 500 }
  ];
  
  function convertirDolarAPesos(dolar, anio) {
    let tasaDeCambio = 1;
  
    for (let i = 0; i < conversionesHistoricas.length; i++) {
      const conversion = conversionesHistoricas[i];
      if (anio >= conversion.inicio && anio <= conversion.fin) {
        tasaDeCambio = conversion.tasa;
        break;
      }
    }
  
    const pesos = dolar * tasaDeCambio;
    return pesos;
  }
  
  // Ejemplo de uso
  const anio = 2005;
  const dolar = 10;
  
  const pesosConvertidos = convertirDolarAPesos(dolar, anio);
  console.log(`${dolar} dólar(es) en el año ${anio} equivale(n) a ${pesosConvertidos} pesos.`);
  