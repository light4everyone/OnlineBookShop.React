using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OnlineBookShop.API.Infrastructure.Extensions;
using OnlineBookShop.API.Infrastructure.Middlewares;
using OnlineBookShop.API.Repositories.Implementation;
using OnlineBookShop.API.Repositories.Interfaces;
using OnlineBookShop.Domain.Auth;
using System.Reflection;

namespace OnlineBookShop.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<OnlineBookShopDbContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(Configuration.GetConnectionString("OnlineBookShopConnection"));
            });

            services.AddIdentity<User, Role>(options => 
            {
                options.Password.RequiredLength = 8;
            })
            .AddEntityFrameworkStores<OnlineBookShopDbContext>();

            var authOptions = services.ConfigureAuthOptions(Configuration);
            services.AddJwtAuthentication(authOptions);
            services.AddControllers(options => 
            {
                options.Filters.Add(new AuthorizeFilter());
            });

            services.AddScoped<IRepository, EFCoreRepository>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddSwaggerGen((c) =>
            {
                c.EnableAnnotations();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseMiddleware<ErrorHandlingMiddleware>();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Online Book Shop Api");
            });

            app.UseCors(configurePolicy => configurePolicy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
