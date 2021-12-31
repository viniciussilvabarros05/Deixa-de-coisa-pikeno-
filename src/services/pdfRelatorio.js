import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts"


 function generatorRelatorio(data) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs


    function sumAllLucros() {
        const AllLucros = data.reduce((acumulator, atual) => {
            return acumulator + atual.value
        }, 0)

        return AllLucros
    }

    function sumAllVendas() {
        const allVendas = data.reduce((acumulator, atual) => {


            return acumulator + atual.name.length
        }, 0)

        return allVendas
    }
    function handleValue(value = 0) {

        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }

    const date = new Date
    const reportTitle = [

        {
            text: `${date}`,
            fontSize: 10,
            bold: true,
            margin: [15, 0, 0, 15]
        },

    ]
    const dados = data.map(item => {
        return [
            { text: item.name.map((request) => request.name + ", "), style: 'tableHeader', fontSize: 12 },
            { text: handleValue(item.value), style: 'tableHeader', fontSize: 12 },
            { text: item.quant, style: 'tableHeader', fontSize: 12 },

        ]
    })

    const details = [

        {
            table: {
                headerRows: 1,
                widths: [200, '*', '*', 100],
                body: [

                    [
                        { text: 'Pedidos', style: 'tableHeader', fontSize: 18 },
                        { text: 'Valor', style: 'tableHeader', fontSize: 18 },
                        { text: 'Total', style: 'tableHeader', fontSize: 18 },

                    ],

                    ...dados,

                    [
                        { text: "Total", style: 'tableHeader', fontSize: 16 },
                        { text: '=', style: 'bold', fontSize: 16 },
                        { text: handleValue(sumAllLucros), style: 'bold', fontSize: 16 }
                    ],
                    [
                        { text: "Total de Clientes", style: 'tableHeader', fontSize: 12 },
                        { text: '=', style: 'tableHeader', fontSize: 12 },
                        { text: sumAllVendas, style: 'tableHeader', fontSize: 12 }
                    ]
                ]
            },
            layout: "headerLineOnly"
        }]


    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage,
                alignment: 'right',
                fontSize: 9,
                margin: [30, 5, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [30, 15, 15, 30],
        header: [reportTitle],
        content: [details],
        footer: Rodape,
    }
    let base64
  

     pdfMake.createPdf(docDefinitions).getBase64(data => {
     
    });

}