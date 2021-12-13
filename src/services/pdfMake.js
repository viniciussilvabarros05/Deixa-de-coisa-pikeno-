import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

function makeNoteRequests(request) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    function handleValue(value = 0) {

        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }

    const reportTitle = [
        {
            text: request.nameClient,
            fontSize: 10,
            bold: true,
            margin: [15, 0, 0, 50]
        },

    ]
    const dados = request.name.map(item => {
        return [
            { text: item.name, style: 'tableHeader', fontSize: 7 },
            { text: handleValue(item.value), style: 'tableHeader', fontSize: 7 },
            { text: item.quantidade, style: 'tableHeader', fontSize: 7 },

        ]
    })

    const details = [
       {text:request.hour.fulltime, fontSize:8},
       {text:request.hour, fontSize:8},
        {
            table: {
                headerRows: 1,
                widths: [50, '*', '*', 50],
                body: [

                    [
                        { text: 'Pedido', style: 'tableHeader', fontSize: 10 },
                        { text: 'Valor', style: 'tableHeader', fontSize: 10 },
                        { text: 'Total', style: 'tableHeader', fontSize: 10 },

                    ],

                    ...dados,

                    [
                        { text: "Total", style: 'tableHeader', fontSize: 8 },
                        { text: '=', style: 'tableHeader', fontSize: 8 },
                        { text: handleValue(request.value), style: 'tableHeader', fontSize: 8 }
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
                margin: [5, 5, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'B7',
        pageMargins: [15, 15, 15, 30],
        header: [reportTitle],
        content: [details],
        footer: Rodape,
    }

    pdfMake.createPdf(docDefinitions).download()
}

export default makeNoteRequests