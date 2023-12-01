using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using vacinacao_backend.Repositories;
using vacinacao_backend.Services;

namespace vacinacao_backend {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<UsuarioService>();
            builder.Services.AddScoped<AlergiaService>();
            builder.Services.AddScoped<VacinaService>();
            builder.Services.AddScoped<AgendaService>();
            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<VacinacaoContext>(options => { options.UseNpgsql(builder.Configuration.GetConnectionString("postgre")); });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}