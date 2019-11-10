const mongoose = require('mongoose');

const Apontamento = mongoose.model('Apontamento');

const diaValido = (dia) => {
  if (!dia) return false;

  let diaDoMes;
  [diaDoMes, mes, ano] = dia.split("/");

  diaDoMes = parseInt(diaDoMes);
  mes = parseInt(mes);
  ano = parseInt(ano);

  if (isNaN(diaDoMes) || isNaN(mes) || isNaN(ano)) {
    return false;
  }

  if (diaDoMes < 0 || diaDoMes > 31) return false;

  if (mes < 0 || mes > 12 ) return false;

  if (ano < 0 || ano < 2000) return false;

  return true;
}

const horarioValido = (horario) => {
  if (!horario) return false;

  let hora, minuto;
  [hora, minuto] = horario.split(':');

  if (isNaN(hora) || isNaN(minuto)) return false;

  if (hora < 0 || hora > 23) return false;

  if (minuto < 0 || minuto > 59) return false;

  return true;
}

const horarioDeEntradaValido = (horarioDeEntrada) => {
  if (!horarioDeEntrada) return false;

  if (!horarioValido(horarioDeEntrada)) return false;

  return true;
}

const horarioDeSaidaValido = (horarioDeSaida) => {
  if (!horarioDeSaida) return false;

  if (!horarioValido(horarioDeSaida)) return false;

  return true;
}

const pausasValidas = (pausas) => {
  if (!pausas) return true;

  if (!pausas instanceof Array) return false;

  const invalido = pausas.find(({ duracao }) => parseInt(duracao) < 0  || parseInt(duracao) > 1440 );
  if (invalido) return false;

  return true;
}

const calcularTotalEmMinutos = (entrada, saida, pausas) => {
  let horaEntrada, minutoEntrada, horaSaida, minutoSaida;

  [horaEntrada, minutoEntrada] = entrada.split(':');
  [horaSaida, minutoSaida] = saida.split(':');

  horaEntrada = parseInt(horaEntrada);
  minutoEntrada = parseInt(minutoEntrada);
  horaSaida = parseInt(horaSaida);
  minutoSaida = parseInt(minutoSaida);

  const horas =  horaSaida - horaEntrada;

  const minutoPausa = pausas.map((p) => parseInt(p.duracao) ).reduce((acc, d) => acc + d );

  const totalEmMinutos = ((horas * 60) - minutoEntrada) + minutoSaida - minutoPausa;

  const totalHora = parseInt(totalEmMinutos / 60);
  const prefix = totalHora < 10 ? "0" : "";

  const total = `${prefix}${totalHora}:${totalEmMinutos % 60}`;

  return { totalEmMinutos, total };
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const apontamentos = await Apontamento.paginate({}, { page, limit: 10 });

    return res.json(apontamentos);
  },

  async show(req, res) {
    const apontamento = await Apontamento.findById(req.params.id);

    return res.json(apontamento);
  },

  async create(req, res) {
    const { dia, entrada, saida, pausas } = req.body;

    if (!diaValido(dia)) {
      return res.status(422).json({ erro: "campo 'dia' possui valor inválido." });
    }

    if (!horarioDeEntradaValido(entrada)) {
      return res.status(422).json({ erro: "campo 'entrada' possui valor inválido." });
    }

    if (!horarioDeSaidaValido(saida)) {
      return res.status(422).json({ erro: "campo 'saida' possui valor inválido." });
    }

    if (!pausasValidas(pausas)) {
      return res.status(422).json({ erro: "campo 'pausas' possui valor inválido." });
    }

    const { totalEmMinutos, total } = calcularTotalEmMinutos(entrada, saida, pausas);

    const apontamento = await Apontamento.create({
      dia,
      entrada,
      saida,
      pausas,
      totalEmMinutos,
      total
    });

    return res.status(201).json(apontamento);
  },

  async destroy(req, res) {
    const query = { _id: req.params.id };
    const retorno = await Apontamento.deleteOne(query);

    if (retorno.deletedCount === 0) {
      return res.status(404).end();
    }

    return res.status(204).end();
  }
};
