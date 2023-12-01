namespace vacinacao_backend.Models {
    public class InsertUsuarioDTO {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateOnly DataNascimento { get; set; }
        public char Sexo { get; set; }
        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Setor { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public List<int>? Alergias { get; set; }
    }
}
