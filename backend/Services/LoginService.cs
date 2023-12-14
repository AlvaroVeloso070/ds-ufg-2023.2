using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using vacinacao_backend.Models;
using vacinacao_backend.Models.DTOs;
using vacinacao_backend.Repositories;

namespace vacinacao_backend.Services {
    public class LoginService {

        private readonly VacinacaoContext _vacinacaoContext;
        private readonly string jwtKey;

        public LoginService(VacinacaoContext vacinacaoContext, IConfiguration configuration) {
            _vacinacaoContext = vacinacaoContext;
            jwtKey = configuration["JwtSettings:Key"]!;
        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO request) {
			try {
                var usuario = await _vacinacaoContext.Usuarios.Where(u => u.Email == request.Email && u.Senha == request.Senha).SingleAsync();
                var response = new LoginResponseDTO { AccessToken = GenerateAccessToken(usuario) };
                return response;
			}
			catch (Exception e) {
                throw new AuthenticationException("Email ou senha inválidos!");
			}
        }

        private string GenerateAccessToken(Usuario usuario) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtKey);

            var claims = new List<Claim> {
                new("isAdmin", usuario.IsAdmin.ToString().ToLower()),
                new(JwtRegisteredClaimNames.Email, usuario.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Issuer = "id.teste.com",
                Audience = "vacinacao.teste.com",
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }
    }
}
