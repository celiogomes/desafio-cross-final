import { Controller, Get } from '@nestjs/common';
import { EtlService } from './etl.service';

@Controller('etl')
export class EtlController {
  
  //importação do service etl
  constructor(private readonly etlService: EtlService) {}

  @Get()
  async index(){

    // variavel para incrementar valor quando a busca da API retornar objeto
    let valorParaBuscaPage = 1;

    // variavel auxiliar para manipulação da ordenação dos valores
    let copia = 0;

    // variavel que armazena os objetos das paginas
    let lista = [];

    //variavel que junta todas os arrays pagina por pagina em um unico vetor
    let element= [];

    // vetor que recebe os valores desordenados da variavel element e passa
    // pelo laço de ordenação devolvendo o mesmo ordenado
    let listOrdenada = [];

    //variavel que armazena paginas com error
    let pages_error = [];

    //variavel para incremento da busca da pagina no laço de busca
    let index = 1;
        /*
            1. Extract
            Realize chamadas na nossa API REST para extrair um conjunto de números 
            da nossa base de dados.
        */

        //laço de busca e armazenamento do objeto nos vetores
        while (valorParaBuscaPage > 0) {
          //busca da page
          const resposta = await this.etlService.findOne(index);
          // variavel de armazenamento de do tamanho da resposta
          let qtd = resposta.length;
          // verificação do tamanho da resposta
            if (qtd <=2) {
              // verificação do final da busca
              if (qtd == 0) {
                // mudança da variavel para encerrar a busca
                valorParaBuscaPage = -1;
              }else{
                // armazena as paginas que ocorreu erro
                pages_error.push(resposta)
              }
            }
            else{
              //metodo de incremento da variavel no array lista
              lista.push(resposta)
              index = index + 1;
            }
        }

        //metodo para união de todos os conjuntos de valores de todas as paginas
        element = [].concat(...lista);

        //armazenamento dos valores dos elementos
        listOrdenada = element;

        // variavel que determinará a quantidade de repetições que o laço ira fazer para a ordenação
        const tamanho = listOrdenada.length;

        /*
            2. Transform
            A etapa de transformação consiste em ordenar todos os
             números extraídos na etapa anterior. 
             IMPORTANTE: a ordenação deve ser feita com o conjunto final contendo todos os números
            extraídos de todas as páginas.
            IMPORTANTE 2: Você deve implementar o algoritmo de ordenação. Não é permitido utilizar
            nenhum recurso da linguagem que faça toda a ordenação para você.
        */
      console.log("Laço ordenação");
      //laços de repetições para a ordenação dos valores
      // laço de vezes que sera necessario para a ordenação total dos valos
      for (let j = 1; j <= tamanho; j++) {
        //laço que ordenara o valor maior na ultima posição
        for (let i = 0; i < tamanho -1; i++) {
              //verificador dos valores
              if (listOrdenada[i] > listOrdenada[i+1]) {
                  copia = listOrdenada[i];
                  listOrdenada[i] = listOrdenada[i+1];
                  listOrdenada[i+1] = copia;          
              }
          }
      }

        /*
        3. Load
        A aplicação deve expor uma API que disponibiliza o conjunto final de números ordenados da
        etapa de transform. Fique a vontade para escolher o tipo da API (rest, soap, graphql etc),
        modelagem dos métodos e formato dos dados.
        */
      console.log("Lista de PAges error")
      console.log(pages_error)
      return listOrdenada;
  }
}
