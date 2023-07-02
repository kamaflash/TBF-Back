const {Schema, model} = require('mongoose')

const IncomeSchema = Schema({
    origin: {
        type: String,
        required: true
    },
    cant: {
        type: Number,
        required: true,
    },
    tipe: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
    },
    time: {
        type: Boolean,
        required: true,
        default: false

    },
    uid:{
        type: String,
    },
    associationId:{
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


IncomeSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Income', IncomeSchema);