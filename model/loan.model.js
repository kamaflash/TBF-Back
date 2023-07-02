const {Schema, model} = require('mongoose')

const loanSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    cantTotal: {
        type: Number,
        required: true,
    },
    cuota: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
    },
    createFinnish: {
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