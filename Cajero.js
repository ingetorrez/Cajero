var imagenes=[];
imagenes["50"] = "imgs/billete50.png";
imagenes["20"] = "imgs/billete20.png";
imagenes["10"] = "imgs/billete10.png"; 
class Billetes{
    constructor(v,c){
        this.valor=v;
        this.cantidad=c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
}

var txtMonto = document.getElementById("txtMonto");
var btnRetirar = document.getElementById("btnRetirar");
var Resultado = document.getElementById("Resultado"); 
var Max = document.getElementById("Max"); Max

btnRetirar.addEventListener("click",realizarRetiro);
var caja =[];
caja.push(new Billetes(50,50));
caja.push(new Billetes(20, 50));
caja.push(new Billetes(10, 50));


var entrega = [];
var div;
var papeles;
var dinero;

totalEnCaja();

function realizarRetiro() {
    dinero = txtMonto.value;
    var total = totalEnCaja();
    Resultado.innerHTML='';
    if(dinero.length>0){
        
        if(!isNaN(dinero)){
            dinero = Math.floor(dinero);
            
            if(dinero<=total){
                
                if(valMonto()){
                    for(var c of caja){
                        
                        if (dinero>0) {
                            
                            div = Math.floor(dinero/c.valor);
                            if(div==0){
                                continue;
                            }else{
                                if (div > c.cantidad) {
                                    papeles = c.cantidad;
                                } else {
                                    papeles = div;
                                }
                                
                                entrega.push(new Billetes(c.valor,papeles));
                                dinero-=(c.valor * papeles);

                                c.cantidad = c.cantidad-papeles;
                                totalEnCaja();
                                
                            }
                            if(dinero==0){
                                putResultado();
                                break;
                            }
                            
                        }else{
                            putResultado();
                            break;
                        }
                    }
                }else{
                    Resultado.innerHTML = '!!! Monto Invalido, intentelo con otro monto...';    
                }
            }else{
                Resultado.innerHTML='!!! Cantidad a retirar no disponible, intente con otro monto...';
            }
        }else{
            Resultado.innerHTML = '!!! El monto debe ser un numero entero valido...';
        }
    }
}

function totalEnCaja() {
    var total = 0; 
    var msgbilletes = 'Billetes : ';
    for(var c of caja){
        if (c.cantidad>0) {
            total += c.valor * c.cantidad;
            var img = new Image();
            img.src=imagenes[c.valor];
            msgbilletes += '<img class="imgbillete" src="' + img.src + '" > = ' + c.cantidad + '  ';
        }
        
    }
    Max.innerHTML = 'Monto maximo a retirar ' + total + '<br>';
    Max.innerHTML += msgbilletes;
    return total;
}

function valMonto() {
    return (dinero%caja[caja.length-1].valor==0)?true:false;
}

function putResultado() {
    Resultado.innerHTML='<hr>';
    for(var e of entrega){
        for (let index = 0; index < e.cantidad; index++) {
            Resultado.innerHTML += '<img src="' + e.imagen.src + '" >';
            // console.log(e.imagen);
        }
        
    }
    entrega.splice(0,entrega.length);
}