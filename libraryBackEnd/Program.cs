using libraryBackEnd.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Call Db Context
builder.Services.AddDbContext<LibraryDbContext>(options => options.UseSqlServer(
             builder.Configuration.GetConnectionString("myCon")));


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AngularApp", policyBuilder =>
                          {
                              policyBuilder.WithOrigins("http://localhost:4200")
                                           .AllowAnyMethod()
                                           .AllowAnyHeader()
                                           .AllowCredentials();
                          });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AngularApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
