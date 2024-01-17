using vacinacao_backend.Exceptions;
using vacinacao_backend.Models;
using vacinacao_backend.Models.DTOs;
using vacinacao_backend.Models.Enums;
using vacinacao_backend.Services;

namespace vacinacao_testes {
    public class AgendaTest {

        [Fact]
        public async Task InsertAgendamentoCom1DoseTest() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 1 };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 12, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);

            var agendamentos = await agendaService.FindAllAgendamentos();

            Assert.Single(agendamentos);
            Assert.Equal(1, agendamentos[0].VacinaId);
            Assert.Equal(1, agendamentos[0].UsuarioId);
        }

        [Theory]
        [InlineData(EnumPeriodicidade.Dias, "2024-01-10T14:00:00Z", "2024-01-11T14:00:00Z", "2024-01-12T14:00:00Z")]
        [InlineData(EnumPeriodicidade.Semanas, "2024-01-10T14:00:00Z", "2024-01-17T14:00:00Z", "2024-01-24T14:00:00Z")]
        [InlineData(EnumPeriodicidade.Meses, "2024-01-10T14:00:00Z", "2024-02-10T14:00:00Z", "2024-03-10T14:00:00Z")]
        [InlineData(EnumPeriodicidade.Anos, "2024-01-10T14:00:00Z", "2025-01-10T14:00:00Z", "2026-01-10T14:00:00Z")]
        public async Task InsertAgendamentoComMaisDe1DoseTest(EnumPeriodicidade periodicidade, string data1, string data2, string data3) {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = periodicidade };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = DateTime.Parse(data1), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);

            var agendamentos = await agendaService.FindAllAgendamentos();
            agendamentos.OrderBy(a => a.Data);

            Assert.Equal(3, agendamentos.Count);
            Assert.Equal(DateTime.Parse(data1), agendamentos[0].Data);
            Assert.Equal(DateTime.Parse(data2), agendamentos[1].Data);
            Assert.Equal(DateTime.Parse(data3), agendamentos[2].Data);
            Assert.Equal(1, agendamentos[0].UsuarioId);
            Assert.Equal(1, agendamentos[0].VacinaId);
        }

        [Fact]
        public async Task UpdateSituacaoAgendamentoTest() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 1 };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");

            var agendamentos = await agendaService.FindAllAgendamentos();

            Assert.Single(agendamentos);
            Assert.Equal(EnumSituacao.Realizado, agendamentos[0].Situacao);
            Assert.Equal("OBS", agendamentos[0].Observacoes);
        }

        [Fact]
        public async Task FindAgendamentosBySituacaoTest() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");

            var agendamentosSituacao = await agendaService.FindAgendamentosBySituacao(EnumSituacao.Realizado);
            var agendamentosTotal = await agendaService.FindAllAgendamentos();

            Assert.Equal(3, agendamentosTotal.Count);
            Assert.Single(agendamentosSituacao);
            Assert.Equal(EnumSituacao.Realizado, agendamentosSituacao[0].Situacao);
        }

        [Fact]
        public async Task FindAgendamentosByDataTest() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");

            var agendamentosData = await agendaService.FindAgendamentosByData(new DateTime(2024, 01, 10));
            var agendamentosTotal = await agendaService.FindAllAgendamentos();

            Assert.Equal(3, agendamentosTotal.Count);
            Assert.Single(agendamentosData);
            Assert.Equal(new DateTime(2024, 01, 10), agendamentosData[0].Data.Date);
        }

        [Fact]
        public async Task DeleteAgendamentosTest() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.DeleteAgendamento(1);

            var agendamentos = await agendaService.FindAllAgendamentos();

            Assert.Empty(agendamentos);
        }

        [Fact]
        public async Task DeleteAgendamentoComSituacaoDiferenteDeAgendadoDeveGerarErro() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");

            await Assert.ThrowsAsync<InvalidOperationException>(async () => { await agendaService.DeleteAgendamento(1); });
        }

        [Fact]
        public async Task InsertAgendamentoParaUsuarioInvalidoLancaExcecao() {
            var agendaService = ServiceFactory.CreateAgendaService();

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await Assert.ThrowsAsync<UsuarioNaoEncontradoException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }

        [Fact]
        public async Task InsertAgendamentoParaUsuarioMenorDeIdadeLancaExcecao() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-15).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await Assert.ThrowsAsync<UsuarioMenorDeIdadeException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }

        [Fact]
        public async Task InsertAgendamentoComVacinaInvalidaLancaExcecao() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await Assert.ThrowsAsync<VacinaNaoEncontradaException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }

        [Fact]
        public async Task InsertAgendamentoEmQueUsuarioJaAgendouAVacinaLancaExcecao() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);

            await Assert.ThrowsAsync<AgendamentoInvalidoException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }

        [Fact]
        public async Task InsertAgendamentoEmQueUsuarioJaVacinouLancaExcecao() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");
            await agendaService.UpdateSituacaoAgendamento(2, EnumSituacao.Realizado, "OBS");
            await agendaService.UpdateSituacaoAgendamento(3, EnumSituacao.Realizado, "OBS");

            await Assert.ThrowsAsync<AgendamentoInvalidoException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }

        [Fact]
        public async Task InsertAgendamentoComDosesJaRealizadasDeveInserirSomenteAsDosesRestantes() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123" };
            await usuarioService.InsertUsuario(usuario);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento);
            await agendaService.UpdateSituacaoAgendamento(1, EnumSituacao.Realizado, "OBS");
            await agendaService.UpdateSituacaoAgendamento(2, EnumSituacao.Realizado, "OBS");
            await agendaService.UpdateSituacaoAgendamento(3, EnumSituacao.Cancelado, "OBS");

            var agendamento2 = new Agenda { Data = new DateTime(2024, 07, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };
            await agendaService.InsertAgendamento(agendamento2);

            var agendamentosComSituacaoAgendada = await agendaService.FindAgendamentosBySituacao(EnumSituacao.Agendado);
            Assert.Single(agendamentosComSituacaoAgendada);
            Assert.Equal(new DateTime(2024, 07, 10, 14, 00, 00), agendamentosComSituacaoAgendada[0].Data);
        }

        [Fact]
        public async Task InsertAgendamentoEmQueUsuarioTemAlergiaDaVacinaLancaExcecao() {
            var context = ServiceFactory.CreateContext();
            var agendaService = ServiceFactory.CreateAgendaService(context);
            var usuarioService = ServiceFactory.CreateUsuarioService(context);
            var vacinaService = ServiceFactory.CreateVacinaService(context);
            var alergiaService = ServiceFactory.CreateAlergiaService(context);

            var vacina = new Vacina { Titulo = "Vacina Teste", Descricao = "Não fique doente", Doses = 3, Intervalo = 1, Periodicidade = EnumPeriodicidade.Meses };
            await vacinaService.InsertVacina(vacina);

            var alergia = new Alergia { Nome = "Alergia da vacina teste", VacinaId = 1 };
            await alergiaService.InsertAlergia(alergia);

            var usuario = new InsertUsuarioDTO() { Nome = "Nome Teste", DataNascimento = DateOnly.Parse(DateTime.Now.AddYears(-30).ToLongDateString()), Sexo = 'M', Logradouro = "Rua 2", Numero = 150, Setor = "Centro", Cidade = "Goiânia", UF = "GO", Email = "emailteste@teste.com", Senha = "123", Alergias = new List<int> { 1 } };
            await usuarioService.InsertUsuario(usuario);

            var agendamento = new Agenda { Data = new DateTime(2024, 01, 10, 14, 00, 00), UsuarioId = 1, VacinaId = 1 };

            await Assert.ThrowsAsync<AgendamentoInvalidoException>(async () => {
                await agendaService.InsertAgendamento(agendamento);
            });
        }
    }
}
