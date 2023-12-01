namespace vacinacao_backend.Models {
    public class Usuario {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateOnly DataNascimento { get; set; }
        public char Sexo { get; set; }
        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Setor { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public List<Agenda>? Agendamentos { get; set; }
        public List<Alergia>? Alergias { get; set; }

        public Usuario() { }

        public Usuario(InsertUsuarioDTO dto) {
            Nome = dto.Nome;
            DataNascimento = dto.DataNascimento;
            Sexo = dto.Sexo;
            Logradouro = dto.Logradouro;
            Numero = dto.Numero;
            Setor = dto.Setor;
            Cidade = dto.Cidade;
            UF = dto.UF;
        }
    }
}
