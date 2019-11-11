#include <iostream>
#include <string>
#include <vector>
#include <windows.h>
#include <cwchar>


using namespace std;


struct Nodo{
    string funcion;
    string clase;
    vector<Nodo> hijos;
    string descripcion;
    bool fin;
};

Nodo Raiz;

void fuente(int x){
    CONSOLE_FONT_INFOEX cfi;
    cfi.cbSize = sizeof(cfi);
    cfi.nFont = 0;
    cfi.dwFontSize.X = 0;                   //Width of each character in the font
    cfi.dwFontSize.Y = x;                  //Height
    cfi.FontFamily = FF_DONTCARE;
    cfi.FontWeight = FW_NORMAL;
    std::wcscpy(cfi.FaceName, L"Consolas"); //Choose your font
    SetCurrentConsoleFontEx(GetStdHandle(STD_OUTPUT_HANDLE), FALSE, &cfi);
}

void interfaz(Nodo n){

}

int main()
{
    system("cls")
    fuente(24);
    cout << n.funcion <<endl;
    fuente(11);
    cout << "Prueba"<<endl;
    cout << "Hello world!" << endl;
    return 0;
}
