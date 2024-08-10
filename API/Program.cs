using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt=>{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//Adding Cors Policy for API allowance
builder.Services.AddCors(opt =>{
    opt.AddPolicy("CorsPolicy", policy => {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapControllers();

//database connection
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try{
    var context = services.GetRequiredService<DataContext>();
    //create database if not exist
    await context.Database.MigrateAsync();
    //Seeding data
    await Seed.SeedData(context);
}catch(Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
