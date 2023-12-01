using Microsoft.EntityFrameworkCore;
using vacinacao_backend.Models;
using vacinacao_backend.Models.Enums;
using vacinacao_backend.Repositories;

namespace vacinacao_backend.Services {
    public class AgendaService {

        private readonly VacinacaoContext _vacinacaoContext;

        public AgendaService(VacinacaoContext vacinacaoContext) {
            _vacinacaoContext = vacinacaoContext;
        }

        public async Task<List<Agenda>> FindAllAgendamentos() {
            return await _vacinacaoContext.Agendamentos.ToListAsync();
        }

        public async Task<List<Agenda>> FindAgendamentosBySituacao(EnumSituacao situacao) {
            return await _vacinacaoContext.Agendamentos.Where(a => a.Situacao == situacao).ToListAsync();
        }

        public async Task<List<Agenda>> FindAgendamentosByData(DateTime data) {
            return await _vacinacaoContext.Agendamentos.Where(a => a.Data.Date == data.ToUniversalTime().Date).ToListAsync();
        }

        public async Task InsertAgendamento(Agenda agendamento) {
            await _vacinacaoContext.Agendamentos.AddAsync(agendamento);
            var vacina = await _vacinacaoContext.Vacinas.Where(v => v.Id == agendamento.VacinaId).FirstAsync();
            for (int i = 1; i < vacina.Doses; i++) {
                var proximaData = agendamento.Data;
                int novoIntervalo = vacina.Intervalo!.Value * i;
                switch (vacina.Periodicidade) {
                    case EnumPeriodicidade.Dias:
                        proximaData = proximaData.AddDays(novoIntervalo);
                        break;
                    case EnumPeriodicidade.Semanas:
                        proximaData = proximaData.AddDays(novoIntervalo * 7);
                        break;
                    case EnumPeriodicidade.Meses:
                        proximaData = proximaData.AddMonths(novoIntervalo);
                        break;
                    case EnumPeriodicidade.Anos:
                        proximaData = proximaData.AddYears(novoIntervalo);
                        break;
                }
                var novaAgenda = new Agenda(agendamento);
                novaAgenda.Data = proximaData;
                await _vacinacaoContext.Agendamentos.AddAsync(novaAgenda);
            }
            await _vacinacaoContext.SaveChangesAsync();
        }

        public async Task DeleteAgendamento(int id) {
            var agendamento = _vacinacaoContext.Agendamentos.Where(a => a.Id == id).FirstOrDefault();
            if(agendamento.Situacao != EnumSituacao.Agendado) {
                throw new InvalidOperationException("Não é possível deletar um agendamento que já foi concluído");
            }
            var agendamentosVacinaUsuario = await _vacinacaoContext.Agendamentos.Where(a => a.VacinaId == agendamento.VacinaId && a.UsuarioId == agendamento.UsuarioId && a.Situacao == EnumSituacao.Agendado).ToListAsync();
            _vacinacaoContext.Agendamentos.RemoveRange(agendamentosVacinaUsuario);
            await _vacinacaoContext.SaveChangesAsync();
        }

        public async Task UpdateSituacaoAgendamento(int id, EnumSituacao situacao, string observacoes) {
            var agendamento = await _vacinacaoContext.Agendamentos.Where(a => a.Id == id).FirstAsync();
            _vacinacaoContext.Agendamentos.Attach(agendamento);
            agendamento.Situacao = situacao;
            agendamento.Observacoes = observacoes;
            agendamento.DataSituacao = DateTime.UtcNow;
            await _vacinacaoContext.SaveChangesAsync();
        }
    }
}
