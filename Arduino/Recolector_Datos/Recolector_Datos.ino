#include <ESP8266WiFi.h>  //librería necesaria para la conexión wifi
#include <FirebaseArduino.h>
#include <DHT.h>    // importa la Librerias DHT
#include <DHT_U.h>
#include <string>
#include <NTPClient.h>  //importamos la librería del cliente NTP
#include <WiFiUdp.h> // importamos librería UDP para comunicar con 
                     // NTP

using namespace std;

int SENSOR =0;     // pin DATA de DHT22 a pin digital 2
float TEMPERATURA;
float HUMEDAD;
DHT dht(SENSOR, DHT11);   
int n = 0;
String pos="";
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "0.south-america.pool.ntp.org",-18000,6000);

#define FIREBASE_HOST "datos-climaticos-f76b2.firebaseio.com"
#define FIREBASE_AUTH "oRm8dWIa9c6wa1wiOi8oR9EWlvasmIbGuTutDMVF"
#define WIFI_SSID "Alvamoli2"
#define WIFI_PASSWORD "famonidoma500"
String nombre="Nicolas";


//#################################### FUNCIONES SECUNTAREAS ####################################

//-------- Ingresa los datos en el path "s" (Funcion recursiva para verificar que se ingresen los datos) ----------
void ingreso(String s, float val){
  Firebase.setFloat(s,val);
  if(Firebase.failed()){
    reconectando();
    ingreso(s,val);
  }
}
//-------  Se conecta y reconecta con el internet, y verifica que haya comunicacion con la base de datos -------
void reconectando(){
  digitalWrite(2,LOW);
  Serial.println("Preparando conexion ");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando: ");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Conectado ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
  digitalWrite(2,HIGH);
}

//------- Recupera el valor de el ultimo indice ------------
void get_n() { 
  n = Firebase.getFloat("Cantidad_Dat/Indice"+nombre);
  Serial.println(n);
  if(n == 0){
    Serial.println("n es igual a 0");
    reconectando();
    get_n();
  }
}

//###########################################################################################

//  Se conecta con el WIFI, Inicializa los componentes, Funcion Setup
void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  digitalWrite(2,HIGH);
  reconectando();
  timeClient.begin();
}

//  Funcion loop, se repite infinitamente
void loop() {

  while(Firebase.getInt("Bandera_Inicio") != 1){}
  
  //------------  Captura los datos -----------
  float h = dht.readHumidity(); //Leemos la Humedad
  float t = dht.readTemperature(); //Leemos la temperatura en grados Celsius
  float a = analogRead(A0);
  float idc = dht.computeHeatIndex(t, h, false);
  timeClient.update();

  //------------  Muestra los datos en el monitor serial -------------
  
  Serial.println("------------ CAPTURA ------------");
  Serial.print("Humedad: ");
  Serial.println(h);
  Serial.print("Temperatura: ");
  Serial.println(t);
  Serial.print("Aire: ");
  Serial.println(a);
  Serial.print("Sensacion termica: ");
  Serial.println(idc);
  Serial.print("Hora: ");
  Serial.println(timeClient.getFormattedTime());
  Serial.print("Hora: ");
  Serial.println(timeClient.getHours());
  Serial.print("Segundos transcurridos desde el 1 de enero de 1970: ");
  Serial.println(timeClient.getEpochTime());

  //--------- Recupera el ultmo indice y lo incrementa -------
  get_n();
  n++;
  pos= String(n);

  //-------- sube los datos a firebase -------------
  ingreso("Datos/"+nombre+"/"+pos+"/Temperatura_C", t);
  ingreso("Datos/"+nombre+"/"+pos+"/Humedad_por", h);
  ingreso("Datos/"+nombre+"/"+pos+"/Sensacion_Termica", idc);
  ingreso("Datos/"+nombre+"/"+pos+"/Monoxido_Carbono_PPM_",a);
  ingreso("Datos/"+nombre+"/"+pos+"/Hora",timeClient.getHours());
  ingreso("Datos/"+nombre+"/"+pos+"/Minutos",timeClient.getMinutes());
  ingreso("Datos/"+nombre+"/"+pos+"/Segundos",timeClient.getSeconds());
  ingreso("Datos/"+nombre+"/"+pos+"/Dia_Semana",timeClient.getDay());
  ingreso("Datos/"+nombre+"/"+pos+"/Tiempo",timeClient.getEpochTime());
  ingreso("Cantidad_Dat/Indice"+nombre,n);

  Serial.println("------------ Termino de subir ------------");

  delay(60000);
}
