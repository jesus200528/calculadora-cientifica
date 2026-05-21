
// crear las propiedades del objeto

let p = {

    teclas: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    cantisignos: 0,
    catdecimal: false,
    resultado: false

};

// crear los métodos

let m = {
 
    inicio: function () {

        for (let i = 0; i < p.teclas.length; i++) {

            p.teclas[i].addEventListener("click", m.oprimirtecla);

        }

        document.addEventListener("keydown", m.oprimirteclado);

    },

    oprimirtecla: function (tecla) {

        p.accion = tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;

        m.calculadora(p.accion, p.digito);

    },

    oprimirteclado: function (keyboard) {

        p.digito = keyboard.key;

        if(p.digito == "Enter"){

            p.accion = "igual";
            p.digito = "=";

        }else if(p.digito == "."){

            p.accion = "decimal";

        }else if(p.digito == "+" ||
                 p.digito == "-" ||
                 p.digito == "*" ||
                 p.digito == "/"){

            p.accion = "signo";

        }else if(p.digito >= 0 && p.digito <= 9){

            p.accion = "numero";

        }else{

            return;
        }

        m.calculadora(p.accion, p.digito);

    },

    calculadora: function (accion,digito) {
        switch (accion) {

            case "numero":

                p.cantisignos = 0;

                if(p.operaciones.innerHTML == 0)
                {

                    p.operaciones.innerHTML = digito;
                }else{

                    if(p.resultado){
                        p.operaciones.innerHTML = digito;
                        p.resultado = false;

                    }else{
                        p.operaciones.innerHTML += digito;

                    }

                }

            break;


            case "signo":
                p.cantisignos++
                
                if(p.cantisignos == 1){

                    if(p.operaciones.innerHTML != 0){

                        p.operaciones.innerHTML += digito;
                        p.catdecimal = false;

                    }

                }

            break;

            case "decimal":
                if(!p.catdecimal){
                    p.operaciones.innerHTML += digito;
                    p.catdecimal = true;

                }

            break;

            case "igual":

                p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
                p.resultado = true;
                p.cantisignos = 0;

            break;

        }

        switch (accion) {

            case "raiz":

                p.operaciones.innerHTML = Math.sqrt(p.operaciones.innerHTML);
                p.resultado = true;

            break;

            case "cuadrado":

                p.operaciones.innerHTML = Math.pow(p.operaciones.innerHTML,2);
                p.resultado = true;

            break;

            case "seno":

               p.operaciones.innerHTML = Math.sin(Number(p.operaciones.innerHTML) * Math.PI / 180);
               p.resultado = true;

            break;

            case "coseno":

              p.operaciones.innerHTML = Math.cos(Number(p.operaciones.innerHTML) * Math.PI / 180);
              p.resultado = true;

            break;
        }

    },

    borrarcalculadora: function () {

        p.operaciones.innerHTML = 0;

    }

};

// iniciar

m.inicio();

