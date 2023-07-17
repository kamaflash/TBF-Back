const {Schema, model} = require('mongoose')

const loanSchema = Schema({
    tipe: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantTotal: {
        type: Number,
        required: true,
    },
    cantPendiente: {
        type: Number,
    },
    recibos: {
        type: Number,
    },
    recibosPendientes: {
        type: Number,
    },
    cuota: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
    },
    finishAt: {
        type: Date,
        required: true,
        
    },
    uid:{
        type: String,
    },
    interes:{
        type: String,
    },
    description:{
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
})


loanSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Loan', loanSchema);