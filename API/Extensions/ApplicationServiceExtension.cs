using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities;
using FluentValidation.AspNetCore;
using FluentValidation;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt=>{
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            //Adding Cors Policy for API allowance
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            //Mediator
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            //Mapper for data conversion
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            return services;
        }
    }
}