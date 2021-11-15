
import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import bebida from "../assets/images/Bebida.svg"
import Doce from "../assets/images/Doce.svg"


import { db } from "./firebase"

export const cardapio = {

    hamburgueres: [{
        type: Hamburguer,
        name: "hamburguer",
        desc: ["Carne 220g", "alface", "ovo", "cheddar", "bacon"],
        img: "https://image.freepik.com/fotos-gratis/hamburguer-de-vista-frontal-em-um-carrinho_141793-15542.jpg",
        value: 20,
        quant: 1,
        falseItem: true

    }],

    batatas: [{
        type: Batata,
        name: "Batata",
        desc: ["Batata M", "Katchup", "Maionese"],
        img: "https://image.freepik.com/fotos-gratis/batatas-fritas-crocantes-com-ketchup-e-maionese_1150-26588.jpg",
        value: 9
        ,
        quant: 1
    }, {
        type: Batata,
        name: "Batata",
        desc: ["Batata M", "Katchup", "Maionese"],
        img: "https://image.freepik.com/fotos-gratis/batatas-fritas-crocantes-com-ketchup-e-maionese_1150-26588.jpg",
        value: 9
        ,
        quant: 1
    }, {
        type: Batata,
        name: "Batata",
        desc: ["Batata M", "Katchup", "Maionese"],
        img: "https://image.freepik.com/fotos-gratis/batatas-fritas-crocantes-com-ketchup-e-maionese_1150-26588.jpg",
        value: 9
        ,
        quant: 1
    }],

    combos: [{
        type: Combo,
        name: "Combo completo",
        desc: ["Hambúrguer 220g", "Refrigerante 500ml", "Batata-frita M"],
        img: "https://blog.saipos.com/wp-content/uploads/2021/05/Como-montar-combos-para-hamburgueria-SAIPOS-sistema-para-restaurante.jpeg",
        value: 45,
        quant: 1

    }, {
        type: Combo,
        name: "Combo completo",
        desc: ["Hambúrguer 220g", "Refrigerante 500ml", "Batata-frita M"],
        img: "https://blog.saipos.com/wp-content/uploads/2021/05/Como-montar-combos-para-hamburgueria-SAIPOS-sistema-para-restaurante.jpeg",
        value: 45,
        quant: 1

    }, {
        type: Combo,
        name: "Combo completo",
        desc: ["Hambúrguer 220g", "Refrigerante 500ml", "Batata-frita M"],
        img: "https://blog.saipos.com/wp-content/uploads/2021/05/Como-montar-combos-para-hamburgueria-SAIPOS-sistema-para-restaurante.jpeg",
        value: 45,
        quant: 1

    }],

    bebidas: [{


        type: bebida,
        name: "Suco",
        desc: ["Laranja 500ml"],
        img: "https://image.freepik.com/fotos-gratis/waterlemon-e-suco-de-laranja-em-copo-de-bebida_74190-2215.jpg",
        value: 7
        ,
        quant: 1
    }, {


        type: bebida,
        name: "Suco",
        desc: ["Laranja 500ml"],
        img: "https://image.freepik.com/fotos-gratis/waterlemon-e-suco-de-laranja-em-copo-de-bebida_74190-2215.jpg",
        value: 7
        ,
        quant: 1
    }, {


        type: bebida,
        nome: "Suco",
        desc: ["Laranja 500ml"],
        img: "https://image.freepik.com/fotos-gratis/waterlemon-e-suco-de-laranja-em-copo-de-bebida_74190-2215.jpg",
        value: 7
        ,
        quant: 1
    }],

    doces: [{
        type: Doce,
        nome: "Cachoro Quente",
        desc: ["Chocoçate ao leite", "1kg"],
        img: "https://image.freepik.com/fotos-gratis/mini-cupcakes-de-vista-frontal-no-jornal-na-foto-escura-do-natal_140725-105741.jpg",
        value: 14,
        quant: 1
    }, {
        type: Doce,
        nome: "Cachoro Quente",
        desc: ["Chocoçate ao leite", "1kg"],
        img: "https://image.freepik.com/fotos-gratis/mini-cupcakes-de-vista-frontal-no-jornal-na-foto-escura-do-natal_140725-105741.jpg",
        value: 14,
        quant: 1
    }, {
        type: Doce,
        nome: "Cachoro Quente",
        desc: ["Chocoçate ao leite", "1kg"],
        img: "https://image.freepik.com/fotos-gratis/mini-cupcakes-de-vista-frontal-no-jornal-na-foto-escura-do-natal_140725-105741.jpg",
        value: 14,
        quant: 1
    }, {
        type: Doce,
        name: "Cachoro Quente",
        desc: ["Chocoçate ao leite", "1kg"],
        img: "https://image.freepik.com/fotos-gratis/mini-cupcakes-de-vista-frontal-no-jornal-na-foto-escura-do-natal_140725-105741.jpg",
        value: 14,
        quant: 1
    }]


}
function update() {
    db.collection("Cardápio").doc("doces").set(cardapio)
}

