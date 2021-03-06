import mongoose from 'mongoose';

export default (mongoose) => {
  const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    value: {
      type: Number,
      require: true,
      validate(value) {
        if (value < 0)
          throw new Error('Valor negativo para a nota não permitido');
      },
    },
    lastModified: { type: Date, default: Date.now },
  });

  studentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    /*remove(object.password);*/
    object.id = _id;
    return object;
  });
  const Student = mongoose.model('student', studentSchema, 'students');

  return Student;
};
