const {calcularPrecoPrazo} = require('correios-brasil');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


exports.trackDelivery = catchAsyncErrors(async(req, res, next) =>{
  
    const {cep, nVlPeso, nVlComprimento, nVlAltura, nVlLargura} = req.body;

    let args = {
        sCepOrigem: '19050270',
        sCepDestino: cep,
        nVlPeso: nVlPeso,
        nCdFormato: '1',
        nVlComprimento: nVlComprimento,
        nVlAltura: nVlAltura,
        nVlLargura: nVlLargura,
        nCdServico: ['04014', '04510'],
        nVlDiametro: '0',
    }    

    calcularPrecoPrazo(args).then(response => {
        res.status(201).json({
            success: true,
            response,
        })
    });        
    
});