#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>    // importa la Librerias DHT
#include <DHT_U.h>
#include <string>

using namespace std;

int SENSOR =0;     // pin DATA de DHT22 a pin digital 2
float TEMPERATURA;
float HUMEDAD;
DHT dht(SENSOR, DHT11);   
int n = 0;
String pos="";

#define FIREBASE_HOST "datos-climaticos-f76b2.firebaseio.com"
#define FIREBASE_AUTH "oRm8dWIa9c6wa1wiOi8oR9EWlvasmIbGuTutDMVF"
#define WIFI_SSID "Alvamoli2"
#define WIFI_PASSWORD "famonidoma500"


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

  get_n();
}

//------- Recupera el valor de el ultimo indice ------------
void get_n() {
  n = Firebase.getFloat("Nicolas/IndiceUlt");
  Serial.println(n);
  if(n == 0){
    Serial.println("n es igual a 0");
    reconectando();
  }
}

//###########################################################################################

//  Se conecta con el WIFI, Inicializa los componentes, Funcion Setup
void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  digitalWrite(2,HIGH);
  reconectando();
}

//  Funcion loop, se repite infinitamente
void loop() {

  //------------  Captura los datos -----------
  float h = dht.readHumidity(); //Leemos la Humedad
  float t = dht.readTemperature(); //Leemos la temperatura en grados Celsius
  float a = analogRead(A0);
  float idc = dht.computeHeatIndex(t, h, false);

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

  //--------- Recupera el ultmo indice y lo incrementa -------
  get_n();
  n++;
  pos= String(n);

  //-------- sube los datos a firebase -------------
  ingreso("Nicolas/IndiceUlt",n);
  ingreso("Nicolas/"+pos+"/Tempe(Celsius)", t);
  ingreso("Nicolas/"+pos+"/Hum(Porcentaje)", h);
  ingreso("Nicolas/"+pos+"/Indice de calor(Celsius)", idc);
  ingreso("Nicolas/"+pos+"/Aire(PPM)",a);

  Serial.println("------------ Termino de subir ------------");
  
  delay(60000);
}
