function login()
{
    let user=document.getElementById("usuario").value;
    let pass=document.getElementById("contrasena").value;
}

if(user=="usuario" && pass=="1234")
    {
        window.location="index-usuario.html";
    }
    else
    {
        alert("datos incorrectos")
    }