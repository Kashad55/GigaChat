using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddJsonFile("ocelot.json");
builder.Services.AddOcelot(builder.Configuration);

//builder.Services.AddHttpClient("apiGatewayServices", httpClient =>
//{
//    httpClient.BaseAddress = new Uri("https://localhost:7004/");
//});
builder.Services.AddCors(options =>
{

    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
}
);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAngularApp");

app.MapControllers();

app.UseOcelot().Wait();

app.Run();
