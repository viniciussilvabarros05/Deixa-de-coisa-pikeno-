
import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Bebida from "../assets/images/Garrafa.svg"
import Doce from "../assets/images/Bolo.svg"

export const cardapio = {
    hamburgueres: [{
        type: Hamburguer,
        name: "hamburguer",
        desc: ["Carne 220g", "alface", "ovo", "cheddar","bacon"],
        img: "https://image.freepik.com/fotos-gratis/hamburguer-de-vista-frontal-em-um-carrinho_141793-15542.jpg",
        value: 20

    }],

    Batatas: [{
        type: Batata,
        name: "Batata",
        desc: "Coxinha de frango sabor massa de trigo",
        img: "https://image.freepik.com/fotos-gratis/batatas-fritas-crocantes-com-ketchup-e-maionese_1150-26588.jpg",
        value: 9

    }],

    ComboCompleto: [{
        type: Combo,
        name: "Combo completo",
        desc: "Para as dragas de plantão",
        img: "https://blog.deliverymuch.com.br/wp-content/uploads/2020/06/O-que-%C3%A9-fast-food-Conhe%C3%A7a-o-milion%C3%A1rio-mercado-de-comidas-r%C3%A1pidas-750x410.jpg",
        value: 45

    }],

    Bebida: [{


        type: Bebida,
        name: "Suco",
        desc: "Nada melhor do que uma panqueca quentinha no domingo durante o Faustão",
        img: ":https://image.freepik.com/fotos-gratis/waterlemon-e-suco-de-laranja-em-copo-de-bebida_74190-2215.jpg",
        value: 7
    }],
    
    Doces: [{
        type: Doce,
        name: "Cachoro Quente",
        desc: "O melhor da região",
        img: "https://image.freepik.com/fotos-gratis/mini-cupcakes-de-vista-frontal-no-jornal-na-foto-escura-do-natal_140725-105741.jpg",
        value: 14
    }]


}