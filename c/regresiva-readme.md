# Cómo lo usé

Después del `<header>` puse el siguiente `<iframe>`

```
<!--Regresiva ini-->
        <iframe frameborder='0px' scrolling='no' src='https://locademiacripto.github.io/web/c/regresiva.html' 
        style='width:100%;height:auto;position:relative;top:0px;left:0px;z-index:2147483649'/>
<!--Regresiva fin-->
```

## Versión 2
Versión mejorada

```
<!--Redireccionador si no está en la web de destino que se muestre -->
  <b:if cond='data:blog.canonicalUrl != &quot;https://www.locademiacripto.com/p/black-friday.html&quot;'>
    <!--Regresiva ini-->
        <iframe frameborder='0px' scrolling='no' src='https://locademiacripto.github.io/web/c/fin-regresiva.html' style='width:100%;height:auto;position:relative;top:0px;left:0px;z-index:2147483649'/>
<!--Regresiva fin-->
  </b:if>
  <!-- redirectores fin -->
```
