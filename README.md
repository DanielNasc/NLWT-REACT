# Next Level Week - Together - ReactJs 🚀

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png">

## Anotações 📝

### SPA (Single Page Application)
<br>

" [...] Em um SPA, todo o código necessário - HTML, JavaScript, e CSS – ou é obtido com um único carregamento de página, ou **os recursos apropriados são carregados dinamicamente** e adicionados à página conforme necessário, geralmente em resposta a ações do usuário. **A página não é recarregada em qualquer momento do processo** " - <a href= "https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica">Wikipédia</a>

<br>

### Conceitos do React

<br>

- Componentes: Pequenos pedaços de códigos que juntos formam a aplicação;
- Propriedade: Semelhantes aos atributos do HTML
    ex: <br>
    ```html
        <a href="https://www.youtube.com/c/cccounte">Click</a>
    ```
Só que há a possibilidade de se colocar outros nomes e valores. <br>
   ex: <br>
**Arquivo1.tsx**

```tsx
       type BananaProps = {
          text?: string,
          children?: number
       }

       export function Button(props: BananaProps){
          return (
          <button>{props.text || props.children || "Hello Button!" }</button>
           )
```
    
**Arquivo2.tsx**
   ```tsx
       import React from 'react';
       import ReactDOM from 'react-dom';

       import {Button} from './Arquivo1'       
       
       ReactDOM.render(
         <React.StrictMode>
           <App />
           < Button text = "Button 1" />
           <Button>
             {2}
           </Button>
           < Button />
           < Button />
         </React.StrictMode>,
         document.getElementById('root')
       );

   ```


- Estado: Informação mantida pelo componente
